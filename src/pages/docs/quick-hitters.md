---
layout: "../../layouts/DocsPost.astro"
title: "Quick Hitters"
description: "Easy-access to the most commonly used commands and workflows on the \"big three\" repositories"
pubDate: "Dec 21 2022"
---

<br>

## Backend

---

### Development

```bash
cd {SOMEPATH}/triplewhale/backend
nvm use 18
npm run infra:install # install everything
npm start
```

#### Ensure Branch and Submodules are up to date

```bash
cd {SOMEPATH}/triplewhale/backend
git pull origin master
git merge master # may need to commit here
git submodule update --recursive --remote
```

### TW CLI

After git/npm actions, to run any of the backend services we utilize the Triple Whale CLI

For more information/documentation, [view the README](https://github.com/Triple-Whale/backend-packages/tree/aa6183e3e13e7e6b16328ea915dbe37e31ec15e6/cli)

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

### Staging

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

**NOTE**: You will know this is finished when the `api-gateway` GCP service has successfully deployed, and are notified in the `staging-channels` slack channel with three rocket ships

🚀🚀🚀

<br>
<br>


## Backend Packages

---

The [TW CLI](#tw-cli) is just one of the internal packages housed under `backend/packages`

Some more examples are `utils`, `constants`, `types`, but that is not an exhaustive list, and it changes all the time

Each sub-package is prefixed with `@tw`, and named according to their folder (eg: `@tw/utils`)

### Local Package Development

Sometimes we will need to update these packages, and in order to do that we have to link them to our local env.

```bash
tw packages:link
```

Then choose the packages and relevant packages you would like hosted locally, and the services you would like to link them to

### Push to Staging & Create New Version

```bash
cd {SOMEPATH}/triplewhale/backend
git checkout <BRANCH>
npm run deploy
```

Commit your code, and create a PR; once approved and merged, we can publish it and acquire a new version

### Publish Changes & Acquire New Version

```bash
git checkout master
git pull origin master
tw publish <PACKAGE> # eg: tw publish utils
```

This will provide a GCP console ling, which will output a new version after building

Get that version, and update it in `package.json`

```json
{
  "@tw/utils": "^<NEW VERSION>"
}
```

Then install to get updates

```bash
tw auth
npm install
npm start # to test
```

Once testing is complete (for instance checking an endpoint via Postman, or testing admin), you can now deploy to staging

From here, the deployment is the same as the backend deployment for both backend and staging

```bash
tw deploy <SERVICE> # select staging and/or shofifi
```

As detailed above, after successful deployment, we should see rocket ships in slack

🚀🚀🚀

<br>
<br>

## Admin

---

### Development

```bash
cd {SOMEPATH}/triplewhale/admin
npm start
```

### Staging

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
cd {SOMEPATH}/triplewhale/client
nvm use 18
npm run dev:install
npm start
```

### Staging

Automatically will deploy after creating a pull request

### Deploy to Production

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: only merge after the `api-gateway` GCP service has been deployed