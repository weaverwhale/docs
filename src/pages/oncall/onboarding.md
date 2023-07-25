---
layout: "../../layouts/OnCallPost.astro"
title: "☎️ Onboarding"
description: "Getting started with on call"
pubDate: "Jul 19 2023"
---

<img src="/oncall-start.png" /><br>

On-Call might seem daunting, but it's not! The purpose of on-call is not to identify and *fix* issues, but to identify and **escalate** issues.

The purpose of this document is to help you identify issues and escalate them to the right people.

We have some general tools we use, some general issues we see, and a general decision tree of how to deal with and escalate said issues.

## Main Tools

The general tools you will interact with while being on-call are:

1. Slack
1. DataDog
1. GCP Console
1. OpsGenie

### Slack

Slack is the main tool we use for communication; it is also the first place most of us get notified of issues

The main channels you will interact with are:

- `#cloud-alerts`
- `#datadog-alerts`
- `#on-call`
- `#on-call-knowledge-sharing`
- `#critical-bugs`

If nothing else, `#datadog-alerts` and `#critical-bugs` are mandatory to turn on, as these are where we get notified of issues.

### DataDog

DataDog is the main tool we use for monitoring, and what we use to push alerts to Slack

Within DataDog, we have dashboards for each service, and we can see:

- hits vs errors
- What type of errors are being reported
- Viewing runtime logs
- Unacked messages
- Request latency
- much, much more

We can view different time periods to find anomalies or correlations within a service or between services, which usually starts to provide a picture of the issue at hand.

### GCP Console

GCP is where all our infra lives; it is also where we can see the logs of our services. We can also see the logs of our services in DataDog, and it also provides links to GCP

<br>

### OpsGenie

OpsGenie is the main tool we use for on-call scheduling and escalation. It is what orcestrates the on-call schedule, and is a part of the escalation process.

OpsGenie is also where we acknowledge alerts, and where we can see the history of alerts.

The first thing to ensure is that you have access to OpsGenie, your contact information is correct, and you have the OpsGenie app installed on your phone. This is covered in the [OpsGenie Onboarding](/oncall/opsgenie) article.
