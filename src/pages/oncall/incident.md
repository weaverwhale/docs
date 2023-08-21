---
layout: "../../layouts/OnCallPost.astro"
title: "🚨 Declaring An Incident"
description: "There is an outage; how do I declare an incident?"
pubDate: "Aug 18 2023"
---

## Decision tree

```mermaid
flowchart TB
    A[DataDog Alert Fires] --> B[Assess the issue]
        B -- No outage --> C[No incident to declare]
        B -- Outage --> D[Declare an incident]
    D -- determine impact --> E[Assign severity]
    E --> F[Escalate]

```

## Incident declaration

Within a datadog monitor, you can declare an incident by clicking the "Declare Incident" button. This will trigger an incident report in Datadog, and notify within Slack under `incident-<severity>` channel.

## Slack Notifications

<img src="/incident1.png" /><br>

As the incident progresses, Datadog will update the Slack channel with the status of the incident. This is done by updating the incident report in Datadog.

## Impact Identification

<img src="/incident2.png" /><br>

## Severity determination

<img src="/incident4.png" /><br>

## Escalation path

Depending on the severity of the incident, you may need to escalate the incident to the next level of support. This can should be based on your best judgement, and the severity of the incident.

We cover this more in depth in the [Escalation](/oncall/escalate) page.

## Incident resolution

Once the incident is resolved, you can resolve the incident in Datadog by clicking the "Resolve Incident" button. This will update the incident report in Datadog, and notify within Slack under `incident-<severity>` channel.

## Last Month Incident Report

https://us5.datadoghq.com/dash/integration/incident_management_overview?from_ts=1689706095776&to_ts=1692384495776&live=true

<img src="/incident3.png" /><br>