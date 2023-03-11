---
layout: "../../layouts/BlogPost.astro"
title: "🪲 Pubsub Debugging"
description: "Notes debugging & fixing pubsub issues"
pubDate: "Mar 10 2023"
---

## The Issue

> “The oldest message is the biggest problem” -Chezki -AJ

A store was sending 10x any normal store in shopify purchases, causing the pub/sub service's queue to clog up

Specifically, the queue was behind almost an hour, causing reporting within triple whale to be incorrect (lagging behind)

<br>


## The Solution

> "Can nuke any store if they are making too many requests" -AJ

We turned off the pixel, then removed the Shopify JWT access token. This stops us from collecting data via the pixel, and stop recieving messages from Shopify after a purchase

<br>

## Helpful Links

```bash
# Takes you to the store
?shop-domain=groomie-club.myshopify.com
```

Since we are admin, we can access any shopify store with the `?shop-domain=` query parameter

```bash
&direct=1
```

direct=1 adds Direct, Excluded and Non-attributed orders to the pixel page. When you select Linear All model the total number of Pixel Purchases should equal the total number of purchases reported by Shopify on the Summary page

Cloud run link for Pixel: https://console.cloud.google.com/run/detail/us-central1/pixel/metrics?project=shofifi

GCP Dashboard for Pixel: https://console.cloud.google.com/monitoring/dashboards/builder/3fb63c22-b02c-49aa-9c1c-4a[…]rdBuilderState=%257B%2522editModeEnabled%2522:false%257D

