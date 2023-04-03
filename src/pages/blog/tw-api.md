---
layout: "../../layouts/BlogPost.astro"
title: "🐋 Public API"
description: "Information about the public Triple Whale API, interfacing with it, and adding endpoints"
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

To learn more about the specifics of each endpoint, and to explore the full range of available options, be sure to check out the [Swagger Docs](https://developers.triplewhale.com/swagger/index.html). We detail how these docs are updated below (in `apiConfig`)

## Authentication

The Triple Whale API uses OAuth2 for authentication. In order to access the API, you must first [register your app with the Triple Whale OAuth server via the Triple Whale website](https://developers.triplewhale.com/register-new-app). 

Make sure to include proper app and redirect URIs in your application, or your requests will be rejected by the OAuth server.

## Ensuring Auto OpenAPI Formatting

As the api grows, we want to expose data/endpoints from our internal API to the external API service. To do this, the first step is to ensure we are enabling `autoOpenApi`, which is a parameter in the TW middelware `getExpressApp`

```javascript
import { getExpressApp } from '@tw/utils/module/express';

const [app, router] = getExpressApp({ 
  enableProfiler: true, 
  // This will enable openapi.yml auto-creation and auto-formatting 
  // based on the below apiConfig
  autoOpenApi: true 
});
```
  
## Adding Endpoint to Hydra

The next step is to expose the endpoint, and add firebase + hydra + auth0 validation to the endpoint.  

To do this, it's actually super easy using the `apiConfig` middleware, directing the openApi configuration to leverage these three technologies:

```javascript
import { apiConfig } from '@tw/utils/module/express';

...
// implement this helper if not used
apiConfig({
  // type validation
  // and auto-formatting of Swagger docs
  body: new SummaryPageRequest(), 
  openApi: {
    interfaces: ['public', 'client'],
    // @ts-ignore
    security: { firebase: [], hydra: [], auth0: [] },
    overwriteExternalPath: { prefix: 'summary' },
  },
  validate: false,
})
...
```

## Summary Page Endpoint

One piece of information that people frequently would like access to is the summary page data. Specifically, the data that is exclusive to Triple Whale, like ROAS or Net Profit. 

Interestingly enough, this data is not stored in a database, but rather generated JIT (just in time) on the frontend with the raw data that we collect from various sources.

In order to provide this data in API form, the team has created a special microservice called `/summary-page` which basically ports over the redux store into the backend, and mimics the functionality of the frontend, on the backend. **this is not a great solution, but it WORKS**

Our intention is to take this data and make it available to the public API, which I will try to document the process of here.

### compareStats

All this data described above boils down to one function, and therefore one endpoint: `compareStats`, which we can interface with like so:

```javascript
...
endpointWrapper(async (req, res) => {
  logger.info(req.body);

   // validate
  const valid = validateSummaryRequest(req);
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

  // sanitize
  const sanitize = sanitizeSummaryRequest(req.body);

  // COMPARE STATS
  const stats: CompareStatsResponse = await compareStats(sanitize);
  res.send(stats);
})
...
```

### Body Params

Compare stats accepts a variety of params, configurations, etc. A type def should help explain the params it accepts:

```typescript
export class SummaryPageRequest {
  shopDomain: string;
  periods: {
    start: string;
    end: string;
  }[];
  todayHour: number;
  key: moment.Moment | string;
  includeCalculatedStats?: boolean;
  includeRawStats?: boolean;
  activeOrderSegment: {
    id: string;
    type: string;
  }[];
}
```

Some notes on how it works:

- 2 start/end dates = comparison
- 1 start/end date + calculatedStats=true = tw proprietary data

### Dictionary

In the response, there are various keys that map to dictionaries, which provide more contextual information about what the value does. These mapped values can be found here: `/packages/constants/src/SummaryMetrics/SummaryMetrics.ts`

An example for one of the most important/powerful metrics TW offers: `netProfit`:

```javascript
...
 totalNetProfit: {
  id: 'totalNetProfit',
  title: 'Net Profit',
  hasBackgroundByDefault: true,
  type: 'currency',
  color: '#9999ff',
  metricId: 'totalNetProfit',
  accessRoles: ['expenses'],
  valueToFixed: 0,
  tip: 'Net Profit = Sales - Returns - Expenses (COGS, Shipping, Handling, Payment Gateways, Taxes, Custom Expenses) - Blended Ad Spend.',
  services: ['triple-whale'],
  icon: 'tripleWhale',
  additionalMarketplaceBadge: true,
},
...
```

## `@tw/stats` STATS Helpers

> "This trick is the most important line(s) in Triple Whale" - Chezi

Within `compareStats`, there are a few "Triple Whale trick" lines that are SUPER important, and have been with the TW app since it's inception.

These lines map dicitonary files to helper functions, which generate and map data on the fly.

These lines are replicated both on the frontend (for JIT calculation) and on the backend, within the `summary-page` microservice



```javascript
metricsToCompare.forEach((selectorName: string) => {
  if (selectorName && STATS[selectorName]) {
    try {
      // Below is line 333 of compareStats.ts
      // This line maps all the metric/chart IDs to the proper funciton
      calculatedPeriodData[selectorName] = STATS[selectorName as string](state);
      // if isNaN set to 0, unless type is object
      if (
        calculatedPeriodData[selectorName] === null ||
        calculatedPeriodData[selectorName] === Infinity ||
        (typeof calculatedPeriodData[selectorName] !== 'object' &&
          isNaN(calculatedPeriodData[selectorName]))
      ) {
        calculatedPeriodData[selectorName] = 0; // workaround
      }
    } catch (e) {
      console.log('ERROR ======== ', selectorName, e.message);
    }
  }
});
```

#### This line alone is what makes the summary page work.

Similarly on the `Summary.ts` file on the frontend:

```javascript
export const getTileValue = (state: Partial<RootState>, originalMetric: BaseSummaryMetric<any>) => {
  let value = 0;
  try {
    value =
      state && originalMetric && typeof STATS[originalMetric.metricId] === 'function'
        // HERE! Notice it's the same as above
        ? STATS[originalMetric.metricId](state)
        : 0;
    if (originalMetric?.statObjectKey) {
      value = value[originalMetric.statObjectKey];
      if (value && originalMetric.specificStat) {
        value = value[originalMetric.specificStat];
      }
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }
  return value;
};
```

and the method below it:

```javascript
export const selectTileChart = createSelector(
  [(state: RootState) => state, (state: RootState, metric: BaseSummaryMetric<any>) => metric],
  (state, metric) => {
    let chart: AbstractChart[] = [];
    try {
      chart =
        metric && typeof STATS[metric.chart!] === 'function'
          //  You get the idea... right?
          ? STATS[metric.chart!]?.(state)
          : [];

      if (metric?.statObjectKey) {
        chart = chart[metric.statObjectKey];
        if (chart && metric.specificStat) {
          chart = chart[metric.specificStat];
        }
      }
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
    return chart;
  }
);
```

We basically need to duplicate this functionality in our new API endpoint

## Putting it all together

> "Need to do some mapping" -Chezi

Now that we have our dictionary, our STATS helper, and our raw data, we can combine it all together, and return some formatted data!

Within a DTO (Data transfer object) mapper, we take our response, map it to our dictionary values, and return it in our response

```javascript
export const sanitizeSummaryResponse = (data: CompareStatsResponse) => {
  const dictatedData = Object.keys(SummaryMetrics).flatMap((metric) => {
    const currentMetric = SummaryMetrics[metric as SummaryMetricIdsTypes];
    const { id, title, metricId, tip, type, services } = currentMetric;

    const returnData = {
      delta:
        data.comparisons[0][currentMetric.metricId] &
        (data.comparisons[0][currentMetric.metricId].web?.revenue ||
          data.comparisons[0][currentMetric.metricId]),
      values: { current: 0, previous: 0 },
      charts: { current: [], previous: [] },
    };

    ['current', 'previous'].map((period) => {
      [
        { t: 'values', id: 'metricId' },
        { t: 'charts', id: 'chart' },
      ].map((type) => {
        try {
          returnData[type.t][period] =
            currentMetric && typeof STATS[currentMetric[type.id]] === 'function'
              // THE MAGIC LINE 🪄🪄🪄
              ? STATS[currentMetric[type.id]]?.(data[`${period}PeriodRawStats`])
              : returnData[type.t][period];
          if (currentMetric?.statObjectKey) {
            returnData[type.t][period] = returnData[type.t][currentMetric.statObjectKey];
            if (returnData[type.t][period] && currentMetric.specificStat) {
              returnData[type.t][period] = returnData[type.t][currentMetric.specificStat];
            }
          }
        } catch (e) {}
      });
    });

    return {
      id,
      title,
      metricId,
      tip,
      services,
      type,
      ...returnData,
    };
  });

  return {
    metrics: dictatedData,
  };
};
```

This not only ensures that if we change the API in the future, we will know about it from this DTO (it will return `500`-level error), but we also ensure the end user has pre-formatted data, without having access to our "raw data"
