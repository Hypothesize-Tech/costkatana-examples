# Cost Katana Webhooks Examples

**Get real-time notifications for cost alerts, budget events, security incidents, and system events.**

Webhooks allow you to receive instant HTTP callbacks when important events occur in Cost Katana, enabling you to build reactive, automated workflows.

## Quick Start

### 1. Create a Webhook

```bash
curl -X POST https://cost-katana-backend.store/api/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cost Alerts",
    "url": "https://your-server.com/webhooks/cost",
    "events": ["cost.alert", "budget.exceeded"],
    "secret": "your_webhook_secret"
  }'
```

### 2. Receive Webhooks

Your server will receive POST requests with this structure:

```json
{
  "event_id": "evt_abc123",
  "event_type": "cost.alert",
  "occurred_at": "2024-01-15T10:30:00Z",
  "severity": "high",
  "title": "Daily Cost Threshold Exceeded",
  "description": "Current: $125.50, Threshold: $100.00",
  "data": {
    "cost": {
      "amount": 125.50,
      "threshold": 100.00
    }
  }
}
```

### 3. Verify Signatures

Always verify webhook signatures for security:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
  const signedPayload = `${t}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expectedSig));
}
```

## Examples by Integration Method

### HTTP Headers (.http files)

Direct REST API calls for webhook management:

- **[create-webhook.http](./http-headers/create-webhook.http)** - Create, list, update, delete webhooks
- **[cost-alerts.http](./http-headers/cost-alerts.http)** - Cost and budget alert payloads
- **[security-alerts.http](./http-headers/security-alerts.http)** - Security event payloads
- **[workflow-events.http](./http-headers/workflow-events.http)** - Workflow and system events
- **[webhook-signature.http](./http-headers/webhook-signature.http)** - Signature verification guide

### NPM/TypeScript Examples

Production-ready Node.js webhook implementations:

- **[create-webhook.ts](./npm-package/create-webhook.ts)** - Complete webhook management
- **[cost-alerts.ts](./npm-package/cost-alerts.ts)** - Cost monitoring with alerts
- **[security-webhooks.ts](./npm-package/security-webhooks.ts)** - Security event monitoring
- **[webhook-verification.ts](./npm-package/webhook-verification.ts)** - Signature verification
- **[retry-policies.ts](./npm-package/retry-policies.ts)** - Automatic retry configuration
- **[webhook-testing.ts](./npm-package/webhook-testing.ts)** - Test webhook deliveries

### Python SDK Examples

Python webhook implementations:

- **[basic-webhook.py](./python-sdk/basic-webhook.py)** - Create and manage webhooks
- **[cost-alerts.py](./python-sdk/cost-alerts.py)** - Cost monitoring setup
- **[webhook-server.py](./python-sdk/webhook-server.py)** - Flask webhook receiver
- **[verify-signature.py](./python-sdk/verify-signature.py)** - Signature verification utility

### Framework Integrations

Complete webhook receivers for popular frameworks:

- **[express-webhook.ts](./frameworks/express-webhook.ts)** - Express.js implementation
- **[nextjs-webhook.ts](./frameworks/nextjs-webhook.ts)** - Next.js API route
- **[fastify-webhook.ts](./frameworks/fastify-webhook.ts)** - Fastify integration
- **[nestjs-webhook.ts](./frameworks/nestjs-webhook.ts)** - NestJS module

## Webhook Events

### Cost & Budget Events (🔴 Critical)

| Event | Description | When It Fires |
|-------|-------------|---------------|
| `cost.alert` | Cost threshold exceeded | When daily/weekly/monthly costs exceed your threshold |
| `cost.threshold_exceeded` | Specific threshold crossed | Custom cost threshold violations |
| `budget.warning` | Budget warning (75%, 90%) | Approaching budget limits |
| `budget.exceeded` | Budget limit exceeded | Monthly/daily budget exceeded |
| `cost.spike_detected` | Unusual cost increase | 300%+ increase detected |
| `cost.anomaly_detected` | Abnormal cost pattern | AI-detected cost anomalies |

### Security Events (🔒 High Priority)

| Event | Description | When It Fires |
|-------|-------------|---------------|
| `security.alert` | Security threat detected | Prompt injection, rate limit abuse |
| `compliance.violation` | Compliance issue | PII detected, policy violations |
| `data.privacy_alert` | Privacy concern | Sensitive data exposure risk |
| `moderation.blocked` | Content blocked | Policy violation, harmful content |

### Optimization Events (💡 Opportunities)

| Event | Description | When It Fires |
|-------|-------------|---------------|
| `optimization.suggested` | Cost savings opportunity | AI suggests optimization |
| `optimization.completed` | Optimization applied | Successfully optimized |
| `savings.milestone_reached` | Savings goal achieved | $X saved milestone |

### Workflow & System Events (⚙️ Operations)

| Event | Description | When It Fires |
|-------|-------------|---------------|
| `workflow.started` | Workflow initiated | Multi-step workflow begins |
| `workflow.completed` | Workflow finished | All steps completed |
| `workflow.failed` | Workflow error | Step or workflow failed |
| `experiment.completed` | A/B test finished | Experiment results ready |
| `training.completed` | Fine-tuning done | Model training finished |

### Model Performance Events (📊 Monitoring)

| Event | Description | When It Fires |
|-------|-------------|---------------|
| `model.performance_degraded` | Quality decreased | Performance drop detected |
| `model.error_rate_high` | Too many errors | Error rate above threshold |
| `model.latency_high` | Slow responses | Latency spike |
| `model.quota_warning` | Quota limit near | Approaching provider limits |

**View all 65+ events:** `GET /api/webhooks/events`

## Webhook Configuration

### Basic Webhook

```json
{
  "name": "My Webhook",
  "url": "https://your-server.com/webhooks/endpoint",
  "events": ["cost.alert", "budget.exceeded"],
  "active": true,
  "secret": "your_webhook_secret"
}
```

### Advanced Configuration

```json
{
  "name": "Advanced Webhook",
  "url": "https://your-server.com/webhooks/endpoint",
  "events": ["cost.alert", "budget.exceeded", "security.alert"],
  "description": "Production cost and security monitoring",
  "active": true,
  "secret": "your_webhook_secret",
  "filters": {
    "severity": ["high", "critical"],
    "models": ["gpt-4", "claude-3-5-sonnet-20241022"]
  },
  "retryConfig": {
    "maxRetries": 5,
    "backoffMultiplier": 2,
    "initialDelay": 5000
  },
  "timeout": 10000
}
```

### Retry Policy

Configure automatic retries for failed deliveries:

```json
{
  "retryConfig": {
    "maxRetries": 5,
    "backoffMultiplier": 2,
    "initialDelay": 5000
  }
}
```

**Retry Schedule:**
- Attempt 1: Immediate
- Attempt 2: 5 seconds
- Attempt 3: 10 seconds
- Attempt 4: 20 seconds
- Attempt 5: 40 seconds
- Attempt 6: 80 seconds

## Security Best Practices

### 1. Always Verify Signatures ✅

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const [t, v1] = signature.split(',').map(x => x.split('=')[1]);
  
  // Check timestamp (prevent replay attacks)
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - parseInt(t)) > 300) {
    return false;
  }
  
  // Verify signature
  const signedPayload = `${t}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(v1),
    Buffer.from(expectedSig)
  );
}
```

### 2. Use HTTPS Only ✅

```json
{
  "url": "https://your-server.com/webhooks" // ✅ Secure
  // NOT: "http://..." ❌ Insecure
}
```

### 3. Implement Idempotency ✅

```javascript
const processedEvents = new Set();

app.post('/webhooks', (req, res) => {
  const eventId = req.body.event_id;
  
  if (processedEvents.has(eventId)) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  processWebhook(req.body);
  processedEvents.add(eventId);
  
  res.status(200).json({ received: true });
});
```

### 4. Respond Quickly ✅

```javascript
app.post('/webhooks', async (req, res) => {
  // 1. Verify signature
  if (!verifySignature(req.body, req.headers['x-costkatana-signature'])) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // 2. Respond immediately
  res.status(200).json({ received: true });
  
  // 3. Process asynchronously
  processWebhookAsync(req.body).catch(console.error);
});
```

## Real-World Use Cases

### 1. Slack Alerts for Budget Overruns

```javascript
app.post('/webhooks/budget', async (req, res) => {
  const event = req.body;
  
  if (event.event_type === 'budget.exceeded') {
    await sendSlackAlert({
      channel: '#finance',
      title: '🚨 Budget Exceeded',
      message: event.data.description,
      severity: 'critical'
    });
  }
  
  res.json({ received: true });
});
```

### 2. PagerDuty for Security Incidents

```javascript
if (event.event_type === 'security.alert') {
  await pagerduty.trigger({
    routing_key: process.env.PAGERDUTY_KEY,
    event_action: 'trigger',
    payload: {
      summary: event.data.title,
      severity: 'critical',
      source: 'cost-katana'
    }
  });
}
```

### 3. Automated Throttling on High Costs

```javascript
if (event.event_type === 'cost.spike_detected') {
  const spike = event.data.spike.changePercentage;
  
  if (spike > 500) {
    await enableThrottling({ rate: 0.5 }); // 50% throttle
    await sendUrgentAlert('Cost spike >500%, throttling enabled');
  }
}
```

### 4. Cost Optimization Recommendations

```javascript
if (event.event_type === 'optimization.suggested') {
  const savings = event.data.optimization.potentialSavings;
  
  await sendEmail({
    to: 'team@company.com',
    subject: `💰 Save $${savings}/month`,
    body: event.data.recommendation
  });
}
```

## Testing Webhooks

### Test Endpoint

Use webhook.site for testing:

```bash
# 1. Go to https://webhook.site and get your unique URL
# 2. Create webhook with that URL
curl -X POST https://cost-katana-backend.store/api/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "Test Webhook",
    "url": "https://webhook.site/your-unique-id",
    "events": ["cost.alert"]
  }'

# 3. Test it
curl -X POST https://cost-katana-backend.store/api/webhooks/{id}/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Local Testing with ngrok

```bash
# 1. Start your local server
node server.js  # Port 3000

# 2. Expose with ngrok
ngrok http 3000

# 3. Use ngrok URL for webhook
https://abc123.ngrok.io/webhooks/costkatana
```

## Monitoring & Troubleshooting

### Check Webhook Status

```bash
GET /api/webhooks/{webhookId}
```

### View Delivery History

```bash
GET /api/webhooks/{webhookId}/deliveries?limit=20
```

### Get Webhook Statistics

```bash
GET /api/webhooks/{webhookId}/stats
```

**Response:**
```json
{
  "totalDeliveries": 1250,
  "successfulDeliveries": 1200,
  "failedDeliveries": 50,
  "successRate": 96.0,
  "averageResponseTime": 145
}
```

### Replay Failed Delivery

```bash
POST /api/webhooks/deliveries/{deliveryId}/replay
```

## Common Issues

### Issue 1: Webhooks Not Received

**Causes:**
- Firewall blocking requests
- HTTPS certificate issues
- Server timeout (>30s response)

**Solutions:**
- Check firewall rules
- Ensure valid SSL certificate
- Respond within 5 seconds

### Issue 2: Signature Verification Failing

**Causes:**
- Wrong secret
- Modified payload
- Clock skew

**Solutions:**
- Verify webhook secret
- Don't modify request body before verification
- Sync server time with NTP

### Issue 3: Too Many Retries

**Causes:**
- Server always returning 5xx
- Timeout issues

**Solutions:**
- Fix server errors
- Respond with 200 OK quickly
- Process webhooks asynchronously

## Dashboard Integration

All webhook activity is visible in the Cost Katana dashboard:

- 📊 Real-time delivery status
- 📈 Success/failure rates
- 🔍 Delivery history and logs
- ⚡ Retry attempts
- 📉 Response time trends

Visit: [costkatana.com/dashboard/webhooks](https://costkatana.com/dashboard/webhooks)

## API Reference

### Webhook Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhooks` | GET | List all webhooks |
| `/api/webhooks` | POST | Create webhook |
| `/api/webhooks/:id` | GET | Get webhook details |
| `/api/webhooks/:id` | PUT | Update webhook |
| `/api/webhooks/:id` | DELETE | Delete webhook |
| `/api/webhooks/:id/test` | POST | Test webhook |
| `/api/webhooks/:id/stats` | GET | Get statistics |

### Delivery Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhooks/:id/deliveries` | GET | List deliveries |
| `/api/webhooks/deliveries/:id` | GET | Get delivery details |
| `/api/webhooks/deliveries/:id/replay` | POST | Replay delivery |

### Events

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhooks/events` | GET | List all available events |

## Cost

✅ **Webhooks are FREE!**

- No additional costs
- Unlimited deliveries
- Automatic retries included
- Helps prevent unexpected costs by alerting early

## Support

- **Documentation**: [docs.costkatana.com/webhooks](https://docs.costkatana.com/webhooks)
- **Dashboard**: [costkatana.com/dashboard/webhooks](https://costkatana.com/dashboard/webhooks)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**🥷 Stay informed with real-time webhooks!**

Get instant alerts for cost spikes, budget overruns, and security incidents. Never be surprised by unexpected costs again.

