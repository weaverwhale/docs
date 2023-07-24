---
layout: "../../layouts/OnCallPost.astro"
title: "🪲 General Issues"
description: "Some general issues that we see, and how to handle them"
pubDate: "Jul 21 2023"
---

## General Issues

Generally speaking, there are three types of notifications we see:

1. Bad code / server errors
1. Oldest unacked messages
1. Container restarts
1. The application web

### Bad Code / Server Errors

400/500 errors = **Real critical issue**

Container restarts = could be bad

### Oldest Unacked Messages

Oldest unacked messages > 1 hour = could be bad

This generally means that the queue is backed up, and the consumer is not able to keep up with the producer

Sometimes we run batch jobs that produce a lot of messages, and the server is not able to keep up

Other times, this is a sign of a bad code deploy or a sign that the server is not able to keep up with the load

### Container Restarts

*🐦‍🔥 "Phoenix servers"*

Sometimes containers restart for no reason; since they are Kubernetes pods, they are somewhat designed to burn down and rise up automatically - like a phoenix!

Other times, this is a sign of a bad code deploy, or bad requests that are causing the server to crash

### 🕸️ The Application Web

Sometimes when one service is down, it can cause other services to go down, or vice versa

Make sure to check the logs of other services to see if they are also having issues

<br>