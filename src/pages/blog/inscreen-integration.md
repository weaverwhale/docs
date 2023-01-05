---
layout: "../../layouts/BlogPost.astro"
title: "InScreen Integration"
description: "Information about InScreen"
pubDate: "Jan 3 2023"
---

This will serve as a placeholder for information as I attempt to integrate [InScreen](https://www.inscreen.com/).

For easy access: [Inscreen Documentation](https://docs.inscreen.com/)

## Definitions

### Tenant

The product which integrates inScreen. Usually an inScreen’s customer.

#### In our case, TripleWhale is the **tenant**

### Team

The group of users who have access to the same product and/or set of pages. Usually the customer’s customer.

#### In our case, a store (.myshopify.com) is a **team**

### User

The single user who has access to the Tenant’s product. Can belong to 1 or more teams.

#### In our case, an individual user is a **user**

### Anchor

Any visual or logical element on the product in the context of which a discussion thread can be created.

### Locator

A unique identifier for the data the anchor represents. The same locator may be used for multiple anchors that show the same data, for example, if the data can be viewed on multiple screens.

## Backend Integration

### Step 1: Provision teams and users 

inScreen doesn’t require end-users to sign up to inScreen separately. Hence, inScreen’s customers’ applications need to authenticate sessions to inScreen using the same login data as the application itself.

### Step 2: Authenticating a session

This per-page action creates an encrypted token that identifies the current user with inScreen. This allows your system’s users to interact with inScreen without having to authenticate again. The payload is encrypted, not merely signed, so there is no concern if you treat your user IDs as Personal Data. The tokens are created with a short expiry time, so they can be embedded in your site’s HTML (assuming the HTML isn’t cached).

You should use an inScreen-provided library/package for your language to generate these tokens.

```javascript
import { createInScreenToken } from '@inscreen/sdk-server';

const inScreenToken = createInScreenToken(apiKey, {
  v: 1,
  userId: 'TENANT_USER_ID_HERE',
  teamId: 'TENANT_TEAM_ID_HERE',
});
```

### Testing without Server

Generally, inScreen authentication tokens must be created securely on the server side. However, this makes the initial testing with a sandbox account annoying when starting. The code below demonstrates how to create inScreen authentication tokens from the client side using inScreen's servers. This code only works for sandbox accounts and will return an error when used with non-sandbox tenants (HTTP 403 Forbidden).

```javascript
// _ONLY_ for sandbox accounts, it's OK to use the API key from the client side.
// _NEVER_ expose a production API key to the client side.
const apiKey = '.....';

const tenantId = '.....';

const response = fetch('https://us.inscreen.com/api/self-service/auth', {
  method: 'POST',
  headers: {
    'inScreen-Tenant-ID': tenantId,
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tenantUserId: 'luke', 
    tenantTeamId: 'starwars' 
  }),
});

const { token } = await response.json();

window.inScreen.initialize({
  endpoint: 'https://us.inscreen.com/graphql',
  tenantId: tenantId,
  token: token,
});
```

## Frontend Integration

### Step 3: Initialize the inScreen SDK

Load the inScreen SDK from our CDN. Add these tags to the <head> of the application:

```html
<link rel="dns-prefetch" href="https://cdn.inscreen.com/" />
<link rel="dns-prefetch" href="https://us.inscreen.com/" />
<script src="https://cdn.inscreen.com/web-components/v/0/script.js"></script>
```

If you loaded it from a CDN, inScreen will be defined on the window object. Use the following snippet to initialize it:

```javascript
window.inScreen.initialize({
  endpoint: 'https://us.inscreen.com/graphql',
  tenantId: 'TENANT_ID', // This value was given to you by inScreen. It is **not** your API key.
  token: inScreenToken, // This value was generated server-side in an earlier step. It is **not** your API key.
});
```

### Step 4: Mark collaborative elements on the page

To enable collaboration on an element, add inside of it a child element like this:

```html
<div class="element-to-enable-inscreen-on">
  <!-- other content -->
  <inscreen-anchor version="A" locator="LOCATOR_STRING_HERE" behavior="floating-controls" />
</div>
```

Locator strings are unique identifiers for logical collaborative content. One very simple approach would be to use object IDs, or page URLs, as locator strings for everything. This approach can work, just note that inScreen’s Version A, default variant does not permit having :: inside simple locator strings.

A more interesting structure includes nesting. If a super-entity with ID `123` has sub-entities, `456` and `789`, setting the locator string of them to be `123::456` and `123::789` respectively, allows inScreen to perform aggregations, such as "List all comments on `123` or sub-entities", "Subscribe to all changes in `123` or sub-entities". inScreen supports unbound nesting, as long as the locator string is not longer than 4,096 bytes.

### Step 5: Select the interface behavior

inScreen currently provides two sets of out-of-the-box behaviors: (a) Floating controls; (b) Sidebar drawer, which are described below.

Please note that these elements are highly customizable, and can be controlled by using CSS variables. On top of that, we are constantly adding new sets of behaviors to our library, based customers' requests, to make sure we align with the look and feel of every application.

#### Floating controls

Setting floating controls for an anchor will implement the following behavior:

Hover on any point of the anchor’s area will surface a “new comment button” adjacent to the anchor (location can be customized)

Click on the new comment button will open a “new comment box” near the new comment button (location can be customized)

Submitted threads will be presented constantly adjacent to the anchor (location can be customized)

To enable floating controls for an anchor, simply set `behavior="floating-controls"` and inScreen will do everything else automatically.

Floating controls currently support two styling archetypes: `behavior-style="bubbles"` (default) and `behavior-style="stickies"`. The difference is purely visual.

#### Sidebar drawer

Setting floating controls for an anchor will implement the following behavior:

Hover on any point of the anchor’s area will surface a new comment button adjacent to the anchor (location can be customized)

Alternatively, you can implement a fixed button, within or beside the defined anchor, which will invoke an API call (see inScreen.openDrawer in the Client-Side APIs section )

Clicking on the button will open a drawer. This drawer will contain the new comment box, as well as existing threads

To enable the sidebar drawer, you need to embed `<inscreen-drawer />` in your application’s HTML. Note that the inScreen drawer will be inside the viewport bounding rectangle of its parent element, so deciding where to place the `<inscreen-drawer />` tag can be important if you want it to take top-menubars/sidebars/footers into consideration.

The drawer doesn’t open on its own, except for when loading deep-links from email/IM notifications. To open the drawer, see `inScreen.openDrawer` in the Client-Side APIs section.

Anchors that work with the drawer must have a title defined `title="TEXT HERE"`. It is recommended to have all anchors that should work with the drawer set with `behavior="drawer"`. While functioning mostly the same as `behavior="none"`, anchors that are set with `behavior="drawer"` will have their deep-links (those that are embedded in email/IM notifications) automatically open the drawer.

Like all inScreen standard components, the drawer can be styled and configured with CSS variables.

<!--
-----------------------------------------------
BEGIN SANDBOX CODE
-----------------------------------------------
-->

<!-- 

## Sandbox Integration

Below is some code wrapped in a DCL function, that follows the above documentation in order to integrate on the frontend 


<link rel="dns-prefetch" href="https://cdn.inscreen.com/" />
<link rel="dns-prefetch" href="https://us.inscreen.com/" />
<script src="https://cdn.inscreen.com/web-components/v/0/script.js"></script>

<style>
  .element-to-enable-inscreen-on {
    background: var(--middle-blue);
    color: var(--white);
    padding: 0.15rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(var(--black), 0.5);
  }

  inscreen-inline-anchor-indicator h1 {
    color: var(--white) !important;
    line-height: 1;
  }
</style>

<h4 id="token-id"></h4>

<div class="element-to-enable-inscreen-on">
  <h1 id="inscreen-1">inScreen Anchor - Floating Controls</h1>
  <inscreen-anchor version="A" locator="inscreen-1" behavior="floating-controls" />
</div>

<br>

<div class="element-to-enable-inscreen-on">
  <h1 id="inscreen-2">inScreen Anchor - Stickies</h1>
  <inscreen-anchor version="A" locator="inscreen-2" behavior="floating-controls" behavior-style="stickies" />
</div>

<br>

<div class="element-to-enable-inscreen-on">
  <inscreen-inline-anchor-indicator
    hidden
    locator="inscreen-3"
    action="single-floating-control"
  >
    <h1 slot="empty">💬 Custom Anchor - Empty State</h1>
    <h1 slot="read">💬 Custom Anchor - Read State</h1>
    <h1 slot="unread">💬 Custom Anchor - Unread State</h1>
  </inscreen-inline-anchor-indicator>
  <inscreen-anchor version="A" locator="inscreen-3" />
</div>

<script>
  document.addEventListener('DOMContentLoaded', async () => {
    // initialize backend 
    // using client side sandbox auth for sandbox
    const apiKey = "testkey";
    const tenantId = "starwars";

    const response = fetch('https://us.inscreen.com/api/self-service/auth', {
      method: 'POST',
      headers: {
        'inScreen-Tenant-ID': tenantId,
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenantUserId: 'luke',
        tenantTeamId: 'starwars'
      }),
    }).then(res => res.json());

    const { token } = await response;
    const tokenInfo = `InScreen Token: ${token}`
    document.getElementById('token-id').innerHTML = tokenInfo

    // initialize frontend
    window.inScreen.initialize({
      endpoint: 'https://us.inscreen.com/graphql',
      tenantId: tenantId,
      token: token,
    });
  })
</script>

-->

<!--
-----------------------------------------------
END SANDBOX CODE
-----------------------------------------------
-->

## Integrating Into Backend

Now that we have a demo, we can integrate into TW's codebase

Given the above, we need to create one public endpoint, and one private one (with one additional at some point):

1. **Public** - An endpoint on our end that provides a token to use on the frontend
1. **Private** - Pushing a Shop and it's users to InScreen; this allows InScreen to know who we are on the frontend after doing above
1. **Private 2** - Pushing ***ALL*** Shops and users to Inscreen

Attaching to the `account-manager` microservice, we can create these endpoints

### Public

```javascript
// Public Express Route
// services/account-manager/src/endpoints/users/index.ts
userRouter.post(
  '/inScreenCreateToken',
  apiConfig({
    openApi: { interfaces: ['client'], security: { firebase: [] } },
  }),
  wrapperApi(inScreenCreateToken, (req) => [req.body.shopId, req.body.userId])
);
```

And the actual method

```javascript
// services/account-manager/src/endpoints/users/inScreen.ts
export const inScreenCreateToken = (req) => {
  // shopId = myshopify domain
  // userId = tw firebase ID
  const { shopId, userId } = req.body;

  const token = createInScreenToken(apiKey, {
    v: 1,
    teamId: shopId,
    userId: userId,
  });

  return {
    token: token,
  };
```

### Private

```javascript
// Private Express Route
// services/account-manager/src/endpoints/users/index.ts
userRouter.post(
  '/inScreenProvisionShopAndUsers', 
  inScreenProvisionShopAndUsers
);
```

And the actual method

```javascript
// services/account-manager/src/endpoints/users/inScreen.ts
export const inScreenProvisionShopAndUsers = async (req, res) => {
  const { shopId } = req.body;
  if (!shopId) return res.status(403).json({ message: 'shopId required' });
  const shop = (await firestore().collection('shops').doc(shopId).get()).data();
  const users = await getShopUsers(shopId);

  const provisionedShop = await provisionShop(shop, users);
  const provisionedUsers = await Promise.all(users.map((u) => provisionUser(u, shopId)));

  return res.json({
    provisionedShop,
    provisionedUsers,
  });
};
```

The third method would be similar to this, but loop through *ALL* stores 

**NOTE:** This is obviously missing some methods, as it is still in development, and this code meant to just give an idea of the work needed

## Integrating Into Frontend

The frontend integration is quite similar to the sandbox above, with a few differences

Instead of requesting a token from InScreen, we request the token from our new endpoint detailed above

**NOTE:** Since we use a React SPA, we unfortunately have to load their SDK inline rather than attaching to the header

```javascript
const loadInScreen = (shopId, user) => {
  const exists = document.getElementById('inScreen');
  if (!exists) {
    const script = document.createElement('script');
    script.src = 'https://cdn.inscreen.com/web-components/v/0/script.js';
    script.id = 'inScreen';
    document.body.appendChild(script);
    script.onload = () => { 
      getInScreenToken(shopId, user)
    }
  }
};

const getInScreenToken = async (shopId, userId) => {
  const response = await axiosInstance.post(
    '/v2/account-manager/users/inScreenCreateToken',
    { shopId, userId }
  );

  const { token } = response.data;

  // initialize frontend
  // @ts-ignore
  window.inScreen.initialize({
    endpoint: 'https://us.inscreen.com/graphql',
    tenantId: '<TENANT-ID>',
    token: token,
  });
}
```

And the associated component that utilizes the API call and InScreen SDK is shown below

**NOTE:** The `InScreenTooltip` is for the button, and the `InScreenAnchor` is for the actual element/screenshot

```javascript

export const InScreenTooltip = (props) => {
  const uid = props.uid || 0
  const shopId = useSelector((state: RootState) => state.currentShopId);
  const user = useSelector((state: RootState) => state.user);
  loadInScreen(shopId, user.uid)

  return (
    <Tooltip content="Add a comment">
      <div 
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ marginBottom: '-3px' }}
      >
        <inscreen-inline-anchor-indicator 
          hidden 
          locator={uid} 
          action="single-floating-control" 
        >
          <div slot="empty">
            <ConversationMinor  
              width={16}
              height={16}
              className="fill-logo flex cursor-pointer"
            />
          </div>
          <div slot="read">
            <ConversationMinor  
              width={16}
              height={16}
              className="fill-logo flex cursor-pointer"
            />
          </div>
          <div slot="unread">
            <ConversationMinor 
              width={16}
              height={16}
              className="fill-logo flex cursor-pointer"
            />
          </div>
        </inscreen-inline-anchor-indicator>
      </div>
    </Tooltip>
  )
}

export const InScreenAnchor = (props) => {
  const uid = props.uid || 0

  return (
    <inscreen-anchor version="A" locator={uid} />
  )
}
```

And Voila; we have a working version of InScreen on the Summary page

**WIP** - I'm sure there will be more updates here, but having a high level understanding of how to integrate a new product into TW's codebase is nice to have/reference in the future