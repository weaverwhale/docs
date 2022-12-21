---
layout: "../../layouts/DocsPost.astro"
title: "Quick Hitters"
description: "Easy-access to most commonly used commands and workflows"
pubDate: "Dec 21 2022"
---

<br>

## BACKEND

---

### DEVELOPMENT

#### Ensure Submodules are up to date
```bash
git pull origin master
git merge master # may need to commit here
git submodule update --recursive --remote
```

#### Bring backend services up

```
cd {SOMEPATH}/triplewhale/backend
tw up
```

Select desired services from dropdown 

#### Bring specific service up

```
tw up <SERVICE>
```

#### Testing with Prod DB:

```
tw up --project=shofifi
```

### STAGING

Ensure you are checked out on your dev branch
```
tw deploy <SERVICE>
``` 

Select *only* `staging`

TEST THOROUGHLY

### DEPLOY TO PRODUCTION

Merge code into master within Github, then checkout master locally

```
git checkout master
```

Now deploy!

```
tw deploy <SERVICE>
```

Select `shofifi` & `staging`

**NOTE**: You will know this is finished when the `api-gateway` GCP service has successfully deployed, and are notified in the `staging-channels` slack channel with three rocket ships

🚀🚀🚀

<br>
<br>

## ADMIN

---

### DEVELOPMENT

```
cd {SOMEPATH}/triplewhale/admin
npm start
```

### STAGING

1. Change `firebase.initializer.js` variables `isStaging = true` and `isLocalhost = false`
2. npm run deploy:channel (Channel = Microservice)
3. TEST

### DEPLOY TO PRODUCTION

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: You will be notified in the `staging-channels-admin` slack channel with three rocket ships

🚀🚀🚀

<br>
<br>


## CLIENT

---

### DEVELOPMENT
```
cd {SOMEPATH}/triplewhale/client
npm start
```

### STAGING

Automatically will deploy after creating a pull request

### DEPLOY TO PRODUCTION

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: only merge after the `api-gateway` GCP service has been deployed