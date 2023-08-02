---
layout: "../../layouts/OnCallPost.astro"
title: "2️⃣ Real Issue: Pixel"
description: "Real world issue 2: pixel kubernetes cluster"
pubDate: "Aug 1 2023"
---

# Real Issue #2

> "Triggered: <pixel> Spike in request errors on post_/pubsubtrekevent"

<br>

> "Triggered: <pixel> Container restarts are high for pixel"

## 📝 Summary

<img src="/p1.png" /><br>

## 📈 Impact

After a quick review of datadog and the app, it seems the service isn't down, but it was throwing errors and restarting containers. This initially tells us that the service is sick, and we need to investigate further.

We ack the alert and start investigating. No priority yet.

## 📊 Metrics

A quick search in Slack shows that this is a known issue, and actually related to a memory leak Chezki is working on - most likely related to uncaught errors or exceptions.

It's not crucial, but we should investigate it. We can declare this a **`P4`** issue.

<img src="/p2.png" /><br>

After a while, Chezki confirms that this is indeed an "unhealthy pod", so we know our initial assumption was correct.

## 📝 Root Cause

The pixel is throwing errors related to timing out; this means we have a sick pod (or pods) that are not responding to requests. This is causing a spike in errors and container restarts, confirmed by Chezki.

<img src="/p3.png" /><br>



## 📝 Resolution

Delete the pod and allow kubernetes to recreate it, effectively healing itself.

<img src="/p4.png" /><br>

Below, we can see the drastic drop in errors and restarts after the pod is deleted.

<img src="/p5.png" /><br>
