---
layout: "../../layouts/OnCallPost.astro"
title: "🧞 Opsgenie & Slack"
description: "Quick SOP for setting up Opsgenie & slack for on-call"
pubDate: "Jul 20 2023"
---


Opsgenie is the main "air traffic controller" for on-call, and is where we can see the history of alerts, and where we can acknowledge alerts.

To get started, you'll need to do a few things:

## Ensure you are indeed on-call

Don't be on call for no reason! Ensure you are on call by checking the schedule in OpsGenie.

## Confirm the schedule is correct

General on-call is:

- **9am** to **5pm** - **Mon** thru **Thurs**
- **7am Fri** to **5pm Sat** 

<img src="/oc-schedule.png" /><br>

## Ensure your contact information is correct in OpsGenie

Ideally you should have your phone number and email in OpsGenie, and subscribe for SMS, Voice, and the Mobile app which we cover below.

<img src="/oc-contact.png" /><br>

## Ensure your notifications are set up correctly



<img src="/oc-rules.png" /><br>

## Ensure you have the OpsGenie and Slack apps installed on your phone

At least one of these apps should be installed on your phone, and notifications should be turned on for both.

This allows you to not be tied to your computer, and to be able to acknowledge alerts on the go.

We need to ack both within opsGenie and within slack, so it's important to have both apps installed.

**NOTE: if we do not ack within opsgenie within 15 minutes, everyone that has ever been on call will get blasted with notifications until someone acks it.**

## Ensure you have notifications turned on for #datadog-alerts and #critical-bugs

These are the two channels that we will be getting alerts in; you should have **ALL** notifications turned on for both.