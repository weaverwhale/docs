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
npm run infra:install #install everything
npm start
```

#### Ensure Branch and Submodules are up to date

```bash
cd {SOMEPATH}/triplewhale/backend
git pull origin master
git merge master # may need to commit here
git submodule update --recursive --remote
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

### Staging

Ensure you are checked out on your dev branch
```bash
tw deploy <SERVICE>
``` 

Select *only* `staging`

TEST THOROUGHLY

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

### Updating `@tw` Packages

Sometimes we want to update `@tw` packages, and in order to do that we have to link packages that normally go to NPM to our local env.

In order to link Triple Whale packages locally, run below within your desired repo:

```bash
tw packages:link
```

Then choose the packages and relevant services you would like to link them to