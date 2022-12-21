---
layout: "../../layouts/DocsPost.astro"
title: "Quick Hitters"
pubDate: "Dec 21 2022"
---


## BACKEND

### DEV

#### Bring backend server up

```
tw up
```

#### Testing with Prod DB:

```
tw up --project=shofifi
```

### STAGING

1. Ensure you are checked out on your dev branch
2. `tw deploy internal` (internal = microservice)
    * Select `staging`
3. TEST THOROUGHLY

### DEPLOY TO PRODUCTION

1. Merge code
2. Checkout master
3. tw deploy MICROSERVICE
* Select shofifi & staging

—

## ADMIN

### DEV

```
cd {SOMEPATH}/triplewhale/admin
npm start
```

### STAGING

1. Change `firebase.initializer.js` variables `isStaging = true` and `isLocalhost = false`
2. npm run deploy:channel (Channel = Microservice)
3. TEST

### DEPLOY

Automatically will deploy after merge to production

—

## CLIENT

### DEV
```
cd {SOMEPATH}/triplewhale/client
npm start
```

## STAGING

Automatically will deploy after creating a pull request


## DEPLOY

Automatically will deploy after merge to production




