---
layout: "../../layouts/OnboardingPost.astro"
title: "🥊 Quick Hitters"
description: "Easy-access to the most commonly used commands and workflows on the \"big three\" repositories"
pubDate: "Dec 21 2022"
---

<br>

## Backend

---

### Development

```bash
cd <SOMEPATH>/triplewhale/backend
nvm use 18
npm run infra:install # install everything
tw auth
tw up <SERVICE> # see below for more info on TW CLI
```

#### Ensure Branch and Submodules are up to date

```bash
cd <SOMEPATH>/triplewhale/backend
git pull origin master
git merge master # may need to commit here
git submodule update --recursive --remote
```

#### Reinstall all Services

This is especially helpful when pulling changes from master

```bash
npm run services:reinstall
```

### TW CLI

After git/npm actions, to run any of the backend services we utilize the Triple Whale CLI

For more information/documentation, [view the README](https://github.com/Triple-Whale/backend-packages/tree/aa6183e3e13e7e6b16328ea915dbe37e31ec15e6/cli)

### Auth and install

```bash
tw auth
sudo npm i -g @tw/cli
```

#### Bring backend services up

```bash
tw up
```

Select desired services from dropdown 

#### Bring specific service up

```bash
tw up <SERVICE>
```

#### Testing with Prod DB

```bash
tw up --project=shofifi
```

### Deploy to Staging

Ensure you are checked out on your dev branch
```bash
tw deploy <SERVICE>
``` 

Select *only* `staging`, then **TEST THOROUGHLY**

### Deploy to Production

Merge code into master within Github, then checkout master locally

```bash
git checkout master
```

Now deploy!

```bash
tw deploy <SERVICE>
```

Select `shofifi` & `staging`

`shofifi` = production

`staging` = staging

**NOTE**: You will know this is finished when the `api-gateway` GCP service has successfully deployed, and are notified in the `staging-channels` slack channel with three rocket ships

🚀🚀🚀

<br>
<br>


## Backend Packages

---

The [TW CLI](#tw-cli) is just one of the internal packages housed under `backend/packages`

Some more examples are `utils`, `constants`, `types`, but that is not an exhaustive list, and it changes all the time

Each sub-package is prefixed with `@tw`, and named according to their folder (eg: `@tw/utils`) when used as a dependency

### Local Package Development

Sometimes we will need to update these packages, and in order to do that we have to link them to our local environment

```bash
# For packages
cd backend/<PACKAGE>
npm i
npm link

#for frontend
npm link @tw/<PACKAGE>
npm start
```

Or, simply run below to have a much more concise UI/selection experience:

```bash
tw packages:link
```

Then choose the packages and relevant packages you would like hosted locally, and the services you would like to link them to

To get up and running locally:

```bash
tw auth
npm install
npm start # to test
```

Once testing is complete (for instance checking an endpoint via Postman, or testing admin), you can now begin publishing

#### `tw publish` is to packages as `tw deploy` is to backend. We use this to push `@tw` packages to both staging and production


### Publish To Staging

Ensure you are checked out on your test branch and up to date with master. Test, create a pull request, then publish to staging for additionaly testing:

```bash
cd <SOMEPATH>/triplewhale/backend
git checkout <BRANCH>
tw publish <PACKAGE> # eg: tw publish utils
```

This will provide a GCP console link, which will output a new *test* version after build.

You can then get that version, update it in `package.json`, and test your staging changes locally

```json
{
  "@tw/utils": "^<TEST VERSION>"
}
```

Then install to pull your updates into `node_modules`, just as we did previously, and test.

### Publish to Production

Once your PR is merged, checkout master, and publish your changes to acquire a production version

```bash
git checkout <BRANCH>
git pull origin master
tw publish <PACKAGE> # eg: tw publish utils
```

This will provide a GCP console link, which will output a new version after building

When its done you’ll get a notification on `#cloud-build`

Get that version, and update it in `package.json`

```json
{
  "@tw/utils": "^<PRODUCTION VERSION>"
}
```

Then install to pull your updates into `node_modules`

From here, the deployment for packages is complete. 

Now we must go through the normal deployment flow for both `backend` and `client`.

For instance, if we were updating a package within backend, we go thorugh the deployment flow, and then run

```bash
tw deploy <SERVICE> # select staging and/or shofifi
```

As detailed above (and below for client), after successful deployment, we should see rocket ships in slack

🚀🚀🚀

<br>
<br>

## Admin

---

### Development

```bash
cd <SOMEPATH>/triplewhale/admin
npm run start
```

### Deploy to Staging

1. Change `firebase.initializer.js` variables `isStaging = true` and `isLocalhost = false`
2. npm run deploy:channel (Channel = Microservice)
3. TEST

### Deploy to Production

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: You will be notified in the `staging-channels-admin` slack channel with three rocket ships

🚀🚀🚀

<br>
<br>


## Client

---

### Development

```bash
cd <SOMEPATH>/triplewhale/client
nvm use 18
npm run dev:install #this will usually fix errors
npm start #will start and use local backend
```

#### To run on a specific backend, run one of these

```bash
npm run start-dev:local #local (tw up)
npm run start-dev:staging #staging backend
npm run start-dev:production #production backend
```

### Deploy to Staging

Automatically will create staging environment after creating a pull request, and post a message to the `staging-channels` slack

Will be updated automatically after pushing to that PR/branch, but points to STAGING

#### If you want a production link with current branch

Checkout branch, and run below to acquire a real link leveraging production DB

```bash
npm run deploy:channel:prod #IMPORTANT: change branch within this node process
```

### Deploy to Production

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: in instances with a backend and corresponding frontend PR, only merge client PR after the `api-gateway` GCP service has been successfully deployed