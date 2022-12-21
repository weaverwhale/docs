---
layout: "../../layouts/DocsPost.astro"
title: "Repo Overview"
description: "Lorem ipsum dolor sit amet"
pubDate: "Dec 15 2022"
---

# TW Repo Overview

“Most important packages”
- BACKEND
- CLIENT
- ADMIN

A lot of shared code between “helper” packages, and many repo’s are shared

BACKEND

History:
- GCP and Firestore Database
- All server functions were server less cloud functions
    - Difficult to maintain
    - Hard to CI/CD
- 90% of code is duplicated within each cloud function

Old infra: Cloud Functions
New infra: Microservices

Functions folder: OLD
- index.js contains cloud functions
- Big yikes

Services folder: NEW
- Each folder is a microservice
- Each folder is a docker instance

GCP Cloud Run: Managed docker containers for each microservice
- Pulumi manages each cloud function here
- New service = new pulumi

Services/SERVICE/infra/index.ts 
- JS “Infrastructure as code”
- Everything is written in the code, not on the cloud itself
- Every service has it’s own folder
- REPO: service-starter is what’s used for a new service


API service: 
- Is sort of a proxy for other services
    - Some use nest.js, kind of a bad decision, don’t use so much now
    - But other services use express/ts
- Internal Microservices within API (services/api/src/modules)
    - Many things have been migrated V2, but old V1 code still exists here

“NEW API gateway”
- OpenAPI
- openapi.yml configuration


CLIENT

Hosted on firebase
- firebase.yml configures that setup
- In firebase rewrites, if it does not exist in the source/destination, it goes to API cloud functions

Using React & Redux
Internal packages used as well
- Currently used but want to change it

ADMIN

“API” cloud function used for oAuth2 flow authentication
- Express application
- View routes (app.use), these are all used for authentication
    - EXAMPLE: functions/auth/index
        - LOGIN in “firebase.yml” config is not listed, so it defaults to this API cloud function

“Before” things were in firestore
- “Shops” are all Shopify shops
    - “shops/users” are all users that have access
    - “Users/shop” is backwards, and is what populates in the admin.triplewhale (many to many relationship) SEE FIRESTORE RULES
- “Workspaces” are pods

Firestore Rules
- You can go from the client to the location, only if you have permission
- Authentication within firebase creates a userID, and that is what is compared against here to give admin permission
    - WE have admin permission to all shops, so we canSeeShop
- BUT we want to get rid of this
    - Very difficult because there are a lot of connections from the client to here
- Insights was just migrated to “snowflake”

Google BigTable is used for ad channel data, and are still considering other options

Probably moving everything to mongoDB

PIXEL

triplepx.txt is the pixel
- Tracks “metrics” based on user activity
    - ATC, clicks, etc.
- Is encrypted (nice)
- Currently replacing conversions with an internal service


