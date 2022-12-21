---
layout: "../../layouts/BlogPost.astro"
title: "QUICK HITTERS"
pubDate: "Dec 21 2022"
---

TW DEV ENV QUICK HITTERS


BACKEND

DEV
tw services:up --select

* Testing with Prod DB:
tw up <services> --project=shofifi

STAGING
1. Ensure you are checked out on your dev branch
2. tw deploy internal (internal = microservice)
    * Select staging
3. TEST THOROUGHLY

DEPLOY
1. Merge code
2. Checkout master
3. tw deploy MICROSERVICE
* Select shofifi & staging

—

ADMIN

DEV
SOMEPATH/triplewhale/admin - npm start

STAGING
1. Change firebase.initializer.js isStaging = true; isLocalhost = false
2. npm run deploy:channel (Channel = Microservice)
3. TEST

DEPLOY
Automatically will deploy after merge to production

—

CLIENT

DEV
SOMEPATH/triplewhale/client - npm start

STAGING


DEPLOY




