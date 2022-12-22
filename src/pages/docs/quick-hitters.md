---
layout: "../../layouts/DocsPost.astro"
title: "Quick Hitters"
description: "Easy-access to most commonly used commands and workflows"
pubDate: "Dec 21 2022"
---

<br>

## Backend

---

### Development

#### Ensure Branch and Submodules are up to date

```bash
cd {SOMEPATH}/triplewhale/backend
git pull origin master
git merge master # may need to commit here
git submodule update --recursive --remote
```

#### Bring backend services up

```
tw up
```

Select desired services from dropdown 

#### Bring specific service up

```
tw up <SERVICE>
```

#### Testing with Prod DB

```
tw up --project=shofifi
```

### Staging

Ensure you are checked out on your dev branch
```
tw deploy <SERVICE>
``` 

Select *only* `staging`

TEST THOROUGHLY

### Deploy to Production

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

## Admin

---

### Development

```
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

```
cd {SOMEPATH}/triplewhale/client
npm start
```

### Staging

Automatically will deploy after creating a pull request

### Deploy to Production

Automatically will deploy after merge to production via a GitHub Action

**NOTE**: only merge after the `api-gateway` GCP service has been deployed