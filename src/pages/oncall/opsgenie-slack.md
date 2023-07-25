---
layout: "../../layouts/OnCallPost.astro"
title: "🧞 Opsgenie & Slack"
description: "Quick SOP for setting up Opsgenie & slack for on-call"
pubDate: "Jul 20 2023"
---

<div class="iframe-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/390pZ9egMEs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Opsgenie is the main "air traffic controller" for on-call, and is where we can see the history of alerts, and where we can acknowledge alerts

Slack is where we get notified of alerts, assign priority, discuss causes and formulate solutions

To get started being on-call, you'll need to do a few things:

## Opsgenie

### Ensure you are indeed on-call

<img src="/oncall-start.png" /><br>

Don't be on call for no reason! You should get an email about it, and you can ensure this by checking the schedule in OpsGenie

### Confirm the schedule is correct

General on-call is:

- **9am** to **5pm** - **Mon** thru **Thurs**
- **7am Fri** to **5pm Sat** 

<img src="/oc-schedule.png" /><br>

### Ensure your contact information is correct

Ideally you should have your phone number and email in OpsGenie, and subscribe for SMS, Voice, and the Mobile app which we cover below

<img src="/oc-contact.png" /><br>

### Ensure your notifications are set up correctly

<img src="/oc-rules.png" /><br>

## Slack

### Ensure you have notifications turned on

These are the two channels that we should *always* be investigating:

- `#datadog-alerts`
- `#critical-bugs`

You should have **all messages** turned on for both

<img src="/datadog-alerts.png" /><br>

### Create groups for ease of access

You can create groups in slack for ease of access to channels; here's an example:

<img src="/slack-groups.png" /><br>

## Apps

**Both of these apps should be installed on your phone**

**Notifications should be turned on for both**

This allows you to not be tied to your computer and acknowledge alerts on the go

We need to ack both within opsGenie and within slack, so it's important to have both apps installed

**NOTE: if we do not ack within opsgenie within 15 minutes, everyone that has ever been on call will get blasted with notifications until someone acks it**