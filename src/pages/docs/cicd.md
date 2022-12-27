---
layout: "../../layouts/DocsPost.astro"
title: "CI/CD"
description: "Continuous Integration / Continuous Deployment Flow"
pubDate: "Dec 20 2022"
---

## Staging Channels

### When you create PR

- Create private hosted test env
- Generate test URL for testing
- Posted in the `staging-channels` slack

#### When PR is merged, you will see 🚀🚀🚀 in slack!


## For CLIENT Repo

```bash
deploy:channel:prod package.json command
```

- This script will “push to production” with a private hosting env
- If this works, you can 100% be sure it will work

After `hosting:channel:deploy`, make sure to change branch from `pods-array` to your branch (or technically whatever you want)

NOTE: This will push whatever you have on your local computer, not your branch within Github
- Ensure `isLocalhost = false`, `isStaging = false`, etc. to ensure production is true


## For SERVER Repo

### Deploying to production is NOT automatic

Need to go to master branch, run `tw deploy internal`
- Will ask which projects you want to deploy
- You can deploy to production, or staging
- On master branch, it will ask where you want to deploy, on branch it will push to staging

<br>

## Deployment Flow

#### The general flow for deployments, as described by Chezi

<hr>

### General Flow

1. Do work
1. Test Locally
1. Create PR
1. Test on staging (with test links)
1. ONLY THEN add reviewer and send in slack


### Chezi: Let's do the process

- make a branch for BE and FE
- make your changes
- Test in stg very carefully  (deploy to STG BE and FE)
- I will approve the BE - deploy it to prod
- Make client channel point to prod
- test yourself on prod
- I'll approve the client, and it will be pushed to prod

