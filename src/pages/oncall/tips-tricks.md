---
layout: "../../layouts/OnCallPost.astro"
title: "🪄 Tips and Tricks"
description: "Some tips and tricks to help you be a better oncall"
pubDate: "Jul 26 2023"
---

## Datadog

### Find correlated metrics

<img src="/find-correlated-metrics.png" />

Clicking on an error, or line on a graph will allow you to view correlated metrics, as well as related traces and events. This can be useful for:

- Similar metrics in the same container
- Correlated events in different containers 
- Similar issues in the past, and how they were resolved

<img src="/correlated-metrics.png" /><br>