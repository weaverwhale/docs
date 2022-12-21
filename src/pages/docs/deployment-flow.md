---
layout: "../../layouts/DocsPost.astro"
title: "Deployment Flow"
description: "Lorem ipsum dolor sit amet"
pubDate: "Dec 19 2022"
---

## General Flow:

- Do work
- Test Locally
- Create PR
- Test on staging (with test links)
- ONLY THEN add reviewer and send in slack


## Let's do the process:

- make a branch for BE and FE
- make your changes
- Test in stg very carefully  (deploy to STG BE and FE)
- I will approve the BE - deploy it to prod
- Make client channel point to prod
- test yourself on prod
- I'll approve the client, and it will be pushed to prod

