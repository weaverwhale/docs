---
layout: "../../layouts/BlogPost.astro"
title: "📞 On-Call"
description: "Helpful tips and info for being on-call"
pubDate: "Jul 19 2023"
---

On-Call might seem daunting, but it's not! The purpose of on-call is not to identify and fix issues, but to identify and escalate issues. The purpose of this document is to help you identify issues and escalate them to the right people.

We have some general tools we use, some general issues we see, and a general decision tree of how to deal with and escalate said issues.

## General Tools

The general tools you will interact with while being on-call are:

1. Slack
1. DataDog
1. OpsGenie
1. GCP Console

### Slack

Slack is the main tool we use for communication; it is also the first place most of us get notified of issues

### DataDog

DataDog is the main tool we use for monitoring, and what we use to push alerts to Slack

### OpsGenie

OpsGenie is the main tool we use for on-call scheduling and escalation. It is what orcestrates the on-call schedule, and is a part of the escalation process.

### GCP Console

GCP is where all our infra lives; it is also where we can see the logs of our services. We can also see the logs of our services in DataDog, and it also provides links to GCP

## General Issues

Generally speaping, there are three types of notifications we see:

1. Bad code / server errors
1. Oldest unacked messages
1. Container restarts

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

## 🕸️ The Application Web

Sometimes when one service is down, it can cause other services to go down

Make sure to check the logs of other services to see if they are also having issues

## General Decision Tree

WIP