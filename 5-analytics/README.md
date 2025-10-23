# Analytics & Reporting Examples

Monitor AI usage, costs, and performance with Cost Katana's comprehensive analytics suite.

## Features

### 1. Usage Analytics
- Track requests, tokens, and costs over time
- Filter by project, user, model, provider
- Real-time dashboards
- Custom date ranges

### 2. Cost Reports
- Detailed cost breakdowns
- Budget tracking and forecasts
- Cost allocation by project/team
- Trend analysis

### 3. Data Export
- Export to CSV, JSON, Excel
- Scheduled reports
- API access for custom integrations
- Webhook notifications

## Quick Start

```typescript
import { AICostTracker } from 'cost-katana';

const tracker = await AICostTracker.create(config);

// Get analytics
const analytics = await tracker.getAnalytics(startDate, endDate);

// Generate report
const report = await tracker.generateCostReport({
  groupBy: 'project',
  format: 'pdf'
});

// Export data
const csv = await tracker.exportUsageData('csv', startDate, endDate);
```

## Examples

- [Usage Analytics](./npm-package/usage-analytics.ts) - Real-time usage tracking
- [Cost Reports](./npm-package/cost-reports.ts) - Generate detailed reports
- [Export Data](./npm-package/export-data.ts) - Export for custom analysis

## Metrics Tracked

| Metric | Description |
|--------|-------------|
| Total Requests | Number of AI API calls |
| Token Usage | Prompt + completion tokens |
| Total Cost | Aggregated costs in USD |
| Average Cost/Request | Mean cost per request |
| Cost by Model | Breakdown by AI model |
| Cost by Provider | Breakdown by AI provider |
| Cost by Project | Project-level allocation |
| Savings from Optimization | Money saved through optimization |
| Savings from Caching | Money saved from cache hits |
| Savings from Cortex | Money saved through Cortex |

## Dashboard Features

Visit [costkatana.com/analytics](https://costkatana.com/analytics) for:

- **Real-time Dashboard**: Live usage metrics
- **Cost Trends**: Historical cost analysis
- **Savings Reports**: Optimization impact
- **Budget Alerts**: Get notified when approaching limits
- **Custom Reports**: Build your own views
- **Team Analytics**: Multi-user insights

## API Endpoints

```typescript
// Get usage summary
GET /api/analytics/usage?startDate=2024-01-01&endDate=2024-01-31

// Get cost breakdown
GET /api/analytics/costs?groupBy=project

// Export data
GET /api/analytics/export?format=csv&startDate=2024-01-01
```

## Best Practices

1. **Set up budget alerts** to avoid overspending
2. **Review analytics weekly** to identify optimization opportunities
3. **Export data regularly** for long-term archival
4. **Tag requests** for better cost attribution
5. **Monitor savings metrics** to track optimization ROI

## Support

- **Docs**: [docs.costkatana.com/analytics](https://docs.costkatana.com/analytics)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/Wcwzw8wM)

