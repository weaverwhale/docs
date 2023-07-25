---
layout: "../../layouts/OnCallPost.astro"
title: "🪲 General Issues"
description: "Some general issues that we see, and how to handle them"
pubDate: "Jul 21 2023"
---

## General Issues

Generally speaking, there are only a handful of notifications we see:

1. Bad code / server errors
1. Oldest unacked messages
1. Container restarts
1. Spike in errors

### Bad Code / Server Errors

400/500 errors = **Real critical issue**

Container restarts = *could* be bad

### Oldest Unacked Messages

Oldest unacked messages > 1 hour = *could* be bad

This generally means that the queue is backed up, and the consumer is not able to keep up with the producer of the messages

Sometimes we run batch jobs that produce a lot of messages, and the server is not able to keep up

Other times, this is a sign of a bad code deploy or a sign that the server is not able to keep up with the load

### Spike in Errors

Sometimes we see a spike in errors, but it's *likely* **not** a critical issue

Similar to oldest unacked, these regularly pop up from hourly syncs, large batch jobs, or other scheduled tasks

We should still investigate, but it's not likely to be a critical issue unless correlated with other alerts

### Container Restarts

Sometimes containers restart for no reason; this is *likely* **not** a critical issue

Remember, we have ***Phoenix servers*** 🐦‍🔥

Since they are Kubernetes pods, they are somewhat designed to burn down and rise up automatically - like a phoenix!

Other times, this is a sign of a bad code deploy, or bad requests that are causing the server to crash

<br/>

## 🕸️ The Application Web

Sometimes when one service is down, it can cause other services to go down, or vice versa

Make sure to check the logs of other services to see if they are also having issues, which is a robust feature within Datadog. We cover [finding correlated metrics in Datadog here](/oncall/tips-tricks#datadog).

<br/>