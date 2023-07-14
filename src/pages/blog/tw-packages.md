---
layout: "../../layouts/BlogPost.astro"
title: "📦 TW Packages"
description: "Random info about TW packages"
pubDate: "Jul 14 2023"
---

# TW Packages

The `tw` cli package undergoes frequent updates, and sometimes we will need to update it locally

```bash
npm i -g @tw/cli -f 
```

Often we need to re-auth our client for npm or gcp; luckily we have a `tw` helper for this

```bash
tw auth
```

Sometimes, this will not work, and we will need to re-auth our client manually

```bash
npx google-artifactregistry-auth -y --repo-config=./.npmrc
```

SOMETIMES, this will not work, and we will need to re-login:

```bash
gcloud auth application-default login
```