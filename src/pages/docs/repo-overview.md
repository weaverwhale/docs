---
layout: "../../layouts/DocsPost.astro"
title: "Repositories"
description: "A high level overview of how repositories are structured"
pubDate: "Dec 12 2022"
---

## The “most important repos"

- Backend
- Client
- Admin
- Pixel

There is also a lot of shared code between various “helper” `@tw`-prefixed packages

<br>

### BACKEND

History:

- GCP and Firestore Database
- All server functions used to be serverless cloud functions
  - Difficult to maintain
  - Hard to CI/CD
- 90% of code is duplicated within each cloud function

<br>
<hr>

Old infra: **Cloud Functions**

New infra: **Microservices**

<hr>
<br>

Functions folder: **OLD**

- index.js contains cloud functions
- Big yikes

Services folder: **NEW**

- Each folder is a microservice
- Each folder is a docker instance

<br>


#### GCP Cloud Run

Managed docker containers for each microservice

- Pulumi manages each cloud function here
- New service = new pulumi

```bash
Services/<SERVICE>/infra/index.ts 
```

- JS “Infrastructure as code”
- Everything is written in the code, not on the cloud itself
- Every service has it’s own folder
- REPO: service-starter is what’s used for a new service

#### API service

- Many things have been migrated V2, but old V1 code still exists here
- Is sort of a proxy for other services
  - Some use nest.js, kind of a bad decision, don’t use so much now
  - But other services use express/ts
- Internal Microservices within API
  - `services/api/src/modules`

#### NEW API gateway

- OpenAPI
- openapi.yml configuration

<br>

### CLIENT

#### Hosted on firebase

- firebase.yml configures that setup
- In firebase rewrites, if it does not exist in the source/destination, it falls back to `/api` cloud functions detailed above

#### Using React & Redux

Internal packages used as well 

(at least currently, but want to change it in the future)

<br>

### ADMIN

#### “API” cloud function used for oAuth2 flow authentication

- Express application
- View routes (app.use), these are all used for authentication
  - EXAMPLE: functions/auth/index
    - LOGIN in “firebase.yml” config is not listed, so it defaults to this API cloud function

#### “Before” things were in firestore

- “Shops” are all Shopify shops
  - “shops/users” are all users that have access
  - “Users/shop” is backwards, and is what populates in the admin.triplewhale (many to many relationship) SEE FIRESTORE RULES
- “Workspaces” are pods

#### Firestore Rules

- You can go from the client to the location, only if you have permission
- Authentication within firebase creates a userID, and that is what is compared against here to give admin permission
  - WE have admin permission to all shops, so we canSeeShop
- BUT we want to get rid of this
  - Very difficult because there are a lot of connections from the client to here
- Insights was just migrated to “snowflake”

#### Google BigTable 

Bigtable is used for ad channel data, and are still considering other options

Probably moving everything to mongoDB

<br>

### PIXEL

#### triplepx.txt is the pixel

- Tracks “metrics” based on user activity
  - ATC, clicks, etc.
- Is encrypted (nice)
- Currently WIP replacing conversions with an internal service
