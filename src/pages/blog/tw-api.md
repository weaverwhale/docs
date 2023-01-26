---
layout: "../../layouts/BlogPost.astro"
title: "🐋 Triple Whale Public API"
description: "Information about the public API, interfacing with it, and adding endpoints"
pubDate: "Jan 25 2023"
---

## About the API

Kellet Atkinson and I (Mike Weaver) have worked on examples both in Python and Node. This is housed in a repository, found here: https://github.com/Triple-Whale/triple-whale-public-apis

With the Triple Whale API, you can easily integrate our powerful analytics and attribution features into your own applications and workflows. The API provides two main endpoints for interacting with Triple Whale data:

## Available Endpoints

### Metrics Endpoint

[`/tw-metrics`](https://developers.triplewhale.com/swagger/index.html#/summary/summary-add-metrics)

This endpoint allows you to push custom metrics into the Triple Whale summary page/dashboard and extract any data pushed in to the summary page by your external service.

- POST [`/tw-metrics/metrics`](https://developers.triplewhale.com/swagger/index.html#/summary/summary-get-metrics)
- GET [`/tw-metrics/metrics-data`](https://developers.triplewhale.com/swagger/index.html#/summary/summary-add-metrics)

### Attribution Endpoint

With this endpoint, you can export full customer journey data for all customers who placed an order.

- POST [`/attribution/get-orders-with-journeys`](https://developers.triplewhale.com/swagger/index.html#/attribution/attribution-get-orders-with-journeys-post) 


## Public Docs

To learn more about the specifics of each endpoint, and to explore the full range of available options, be sure to check out the [Swagger Docs](https://developers.triplewhale.com/swagger/index.html).

## Authentication

The Triple Whale API uses OAuth2 for authentication. In order to access the API, you must first [register your app with the Triple Whale OAuth server via the Triple Whale website](https://developers.triplewhale.com/register-new-app). 

Make sure to include proper app and redirect URIs in your application, or your requests will be rejected by the OAuth server.
  
### Adding Endpoint to Hydra

As the api grows, we want to expose data/endpoints from our internal API to the external API service. To do this, it's actually super easy using the `apiConfig` middleware, directing the openApi configuration to leverage `hydra`:

```javascript
import { apiConfig } from '@tw/utils/module/express';

// implement this helper if not used
 apiConfig({
  // hydra: [] is the magic that adds the endpoint to the API
  openApi: { interfaces: ['client'], security: { firebase: [], hydra: [] } },
  selfAuth: true,
}),
```

## Summary Page Endpoint

One piece of information that people frequently would like access to is the summary page data. Specifically, the data that is exclusive to Triple Whale, like ROAS or Net Profit. 

Interestingly enough, this data is not stored in a database, but rather generated JIT (just in time) on the frontend with the raw data that we collect from various sources.

In order to provide this data in API form, the team has created a special microservice called `/summary-page` which basically ports over the redux store into the backend, and mimics the functionality of the frontend, on the backend. **this is not a great solution, but it WORKS**

Our intention is to take this data and make it available to the public API, which I will try to document the process of here.

#### compareStats

All this data described above boils down to one function, and therefore one endpoint: `compareStats`

```javascript

endpointWrapper(async (req, res) => {
  logger.info(req.body);

  // validate
  const valid = validateApiRequest(req);
  if (!valid.success) {
    return res.status(400).json(valid);
  }

  // ensure we have access to the store's data
  if (!req.body.shopDomain) req.body.shopDomain = req.header('x-tw-shop-id');
  if (req['user']) {
    const authResp = await checkUserAccessToResource(
      req['user'],
      'shopify',
      req.body.shopDomain as string
    );
    if (!authResp.result === true) return deny(res);
  }

  // COMPARE STATS
  const stats: CompareStatsResponse = await compareStats(req.body);
  res.send(stats);
})
```

@TODO explain `compareStats`

@TODO explain SummarySection dictionaries

@TODO dictionary & types location: `/Users/michaelweaver/Websites/triplewhale/backend/packages/constants/src/SummaryMetrics/SummaryMetrics.ts`
