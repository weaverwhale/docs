---
layout: "../../layouts/OnCallPost.astro"
title: "1️⃣ Real Issue: Klaviyo"
description: "Walking through a real world issue (P3) with our klaviyo integration"
pubDate: "Jul 30 2023"
---

# Real Issue #1

> "Customers cannot connect to Triple Whale's Klaviyo integration"

## 📝 Summary

<img src="/k1.png" /><br>

## 📈 Impact

This issue impacted the **entire customer base** of Triple Whale. Klaviyo integration is a core feature, and customers could not connect their Klaviyo accounts to Triple Whale.

This was declared a **`P3`** issue, as it was not a complete outage, but it was a major issue that impacted all customers.

## 📊 Metrics

There were no error metrics to report, although we had multiple reports of the issue from customers, CS, and sales.

<img src="/k2.png" /><br>

## 📝 Root Cause

The initial assumption was that there was an issue with only new customers' API keys. We had reports that this was a known issue, and that we should reach out to Klaviyo for more info.

After investigating for a bit, and knowing this was a widespread issue, we reached out to the klaviyo team, telling them about our issue, and asking if there was anything on their side that they could see as an issue.

<img src="/k7.png" /><br>

At the same time, we tried to try to replicate the issue using an existing customers' account that reported an issue, and their API key.

<img src="/k6.png" /><br>

We were able to replicate the issue, and noticed that the error was **404**; meaning *our* endpoint was not available, and this had nothing to do with Klaviyo, or API keys themselves.

Investigating even further, we find that the `openapi.yml` file for the `klaviyo` service was missing the endpoint `/klaviyo/connect`.

We can make some presumtions about what happened, but inevitably **this is the root cause of the issue**.

[We know based on prior knowledge](/blog/tw-api#adding-endpoint-to-hydra) that we require an `apiConfig()` middleware in order to expose endpoints to `openapi.yml`, and the endpoint in question was missing this middleware.

## 📝 Resolution

1. Add the `apiConfig()` middleware to the `/klaviyo/connect` endpoint
1. Re-run `tw up klaviyo`, which updated the `openapi.yml` file to include our endpoints

You can see these changes below:

<img src="/k4.png" />
<img src="/k5.png" />
<img src="/k3.png" /><br>

## 📝 Follow Up

We notified CS and sales that the fix was deployed, which closed the loop on this issue.

<img src="/k9.png" /><br>
