---
layout: "../../layouts/BlogPost.astro"
title: "☸️ Pulumi/GCP"
description: "Brain dump during the deployment of inscreen and modifying Pulumi settings for GCP"
pubDate: "Feb 24 2023"
---

# Pulumi/GCP Deployment Brain Dump

https://www.pulumi.com/

## What is Pulumi?

Pulumi speeds up your inner dev loop for Infrastructure as Code (IaC) by allowing you to use an IDE giving you statement completion, real-time type checking, and interactive documentation out of the box. In addition you can leverage all of the capabilities of the programming language of your choice so you can reduce the total number of lines of code you’re writing.

## Current Situation

We are using Pulumi to deploy our infrastructure to GCP -- we are tring to move to kubernetes in order to autoscale and (I assume) decrease costs. Pulumi will allow that to happen. Useful information and usecase for the problem I ran into.

### Problem

I was trying to provison all stores and users in the database within InScreen. 

I was using the following code, trying to run it in a cloud run function, but it kept failing and/or timing out. The presumption was that the code was just taking too long to run, **_but_** the actual issue is that the  **_size_** of the  **_users_** payload was too large, and the memory limit was too low. Pulumi has a size limit of 100kb, and the payload was at times over 1.5mb.

```javascript
  export const inScreenProvisionAllShopsAndUsers = async (req, res) => {
    // Below is heavy and will take a while to run
    let shopsSnapshot = await firestore().collection('shops').get();
    let shops = shopsSnapshot.docs.map<any>((s) => ({ id: s.id, ...s.data() } as any));
    shops = shops.filter((s) => !s.inScreen?.enabled);

    const formattedShops = shops.map((shop) => formatShop(shop, shop.id));

    // This is heavy as well
    // Sometimes shop users have > 5000 memberships
    // This is a problem because users like that create a huge payload
    // at times over 1.5mb
    let formattedShopUsers = [].concat(
      ...(await Promise.all(shops.map(async (shop) => await getShopUsers(shop.id)).flat()))
    );

    formattedShopUsers = uniqBy(formattedShopUsers, 'tenantUserId');
    formattedShopUsers = formattedShopUsers.filter((x) => x.memberships.length < 200);

    // We try to split shops into chunks of 50
    // This works well when in this case
    const shopChunks = splitArrayToChunks(formattedShops, 50);
    await Promise.all(
      shopChunks.map(async (chunk) => {
        await addTaskToQueue(
          'inscreen-provisioning-queue',
          serviceId,
          'users/inScreenProvisionShops',
          { shops: chunk },
          { dispatchDeadline: 1800 }
        );
      })
    );


    // We also split the users into chunks of 50
    // This (assumingly) also takes time to run
    // but more importantly sometimes has that large payload
    let userChunks = splitArrayToChunks(formattedShopUsers, 50);
    await Promise.all(
      userChunks.map(async (chunk) => {
        await addTaskToQueue(
          'inscreen-provisioning-queue',
          serviceId,
          'users/inScreenProvisionUsers',
          { users: chunk },
          { dispatchDeadline: 1800 }
        );
      })
    );

    res.send({
      shops: formattedShops,
      users: formattedShopUsers,
    });
  };
```

### Solution

W increased the memory limit and CPUs available; this allowed the function to run. You can see the Pulumi code below:

```javascript
  const service = createCloudRunService(serviceId, projectId, location, {
    maxInstances: 50,
    timeoutSeconds: 600,
    // memoryLimit: '4Gi', //This is the problem
    memoryLimit: '8Gi', // This helps
    cpu: 2, // This also helps
    secretVersion,
    vpcConnectorName: 'app-vpc-connector',
    vpcAccessEgress: 'private-ranges-only',
  });
```

We actually also swapped logic in order to batch users with greater than 200 shops, and ran those locally -- this bypasses the size limit, CPU limits, and memory limits.

```javascript
formattedShopUsers = uniqBy(formattedShopUsers, 'tenantUserId');
// This gets the big fish
// >= 200 stores
formattedShopUsers = formattedShopUsers.filter((x) => x.memberships.length >= 200);

// instead of pushing to the queue, we send it here
let userChunks = splitArrayToChunks(formattedShopUsers, 50);
await Promise.all(
  userChunks.map(async (chunk) => {
    await provisionUsers(chunk);
  })
);
```

For a one time task, this took the project over the finish line, and also taught me about how to use Pulumi.