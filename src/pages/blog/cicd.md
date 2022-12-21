---
layout: "../../layouts/BlogPost.astro"
title: "CI/CD"
description: "Lorem ipsum dolor sit amet"
pubDate: "Dec 20 2022"
---


# CI/CD

Staging-channels

When you create PR
- Create private hosted test env
- Generate test URL for testing
- Posted in the staging-channels

When PR is merged, you see rockets in this channel


For CLIENT Repo

deploy:channel:prod package.json command

This script will “push to production” with a private hosting env
 If this works, you can 100% be sure it will work

After hosting:channel:deploy, make sure to change branch from “pods-array” to your branch (or technically whatever you want)

NOTE: This will push whatever you have on your local computer, not your branch
- Ensure isLocalhost is false, isStaging is false, etc. to ensure production is true


For SERVER Repo

Deploying to production is NOT automatic

Need to go to master branch, run tw deploy internal
- Will ask which projects you want to deploy
- You can deploy to production, or staging
- On master branch, it will ask where you want to deploy, on branch it will push to staging


