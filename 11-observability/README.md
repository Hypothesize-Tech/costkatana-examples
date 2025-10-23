# Cost Katana OpenTelemetry & Observability Examples

**Complete observability for your AI applications with distributed tracing, metrics, and logs.**

OpenTelemetry integration enables you to track AI requests across microservices, monitor performance, debug issues, and attribute costs accurately - all using industry-standard observability tools.

## Quick Start

### 1. Basic Traced Request

```typescript
import CostKatana from 'cost-katana';

const client = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY });

const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
}, {
  headers: {
    'X-Session-Id': 'my_session_123',
    'X-Service-Name': 'my-ai-app'
  }
});

console.log('Trace ID:', response.headers?.['x-trace-id']);
console.log('Duration:', response.headers?.['x-request-duration']);
console.log('Cost:', response.headers?.['x-cost']);
```

### 2. W3C Trace Context

```bash
curl -X POST https://cost-katana-backend.store/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01" \
  -d '{"model":"gpt-4","messages":[{"role":"user","content":"Hello"}]}'
```

### 3. View Session Traces

```bash
curl https://cost-katana-backend.store/api/v1/sessions/my_session_123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Examples by Integration Method

### HTTP Headers (.http files)

Direct REST API calls with trace headers:

- **[basic-tracing.http](./http-headers/basic-tracing.http)** - Distributed tracing fundamentals
- **[custom-spans.http](./http-headers/custom-spans.http)** - Custom span creation and attributes
- **[baggage-propagation.http](./http-headers/baggage-propagation.http)** - Context propagation across services
- **[metrics-export.http](./http-headers/metrics-export.http)** - Exporting metrics (Prometheus, OTLP)

### NPM/TypeScript Examples

Production-ready Node.js observability implementations:

- **[basic-tracing.ts](./npm-package/basic-tracing.ts)** - Complete distributed tracing setup
- **[custom-spans.ts](./npm-package/custom-spans.ts)** - Custom business operation tracking
- **[trace-context.ts](./npm-package/trace-context.ts)** - Microservice trace propagation
- **[metrics-collection.ts](./npm-package/metrics-collection.ts)** - Collecting and monitoring metrics
- **[otel-full-stack.ts](./npm-package/otel-full-stack.ts)** - Complete OpenTelemetry integration
- **[jaeger-export.ts](./npm-package/jaeger-export.ts)** - Export traces to Jaeger

### Python SDK Examples

Python observability implementations:

- **[basic-tracing.py](./python-sdk/basic-tracing.py)** - Distributed tracing in Python
- **[custom-spans.py](./python-sdk/custom-spans.py)** - Custom spans with metadata
- **[metrics.py](./python-sdk/metrics.py)** - Metrics collection and monitoring
- **[distributed-trace.py](./python-sdk/distributed-trace.py)** - Multi-service tracing

### Framework Integrations

Complete framework implementations with OpenTelemetry:

- **[express-otel.ts](./frameworks/express-otel.ts)** - Express.js with auto-instrumentation
- **[nextjs-otel.ts](./frameworks/nextjs-otel.ts)** - Next.js App Router integration
- **[fastify-otel.ts](./frameworks/fastify-otel.ts)** - Fastify high-performance tracing
- **[nestjs-otel.ts](./frameworks/nestjs-otel.ts)** - NestJS module with observability

## Core Concepts

### Distributed Tracing

Track requests across multiple services to understand your AI application's behavior.

**Key Headers:**
- `X-Session-Id`: Groups related requests together
- `X-Parent-Trace-Id`: Links child traces to parents
- `traceparent`: W3C standard trace context (128-bit trace ID)
- `tracestate`: Additional vendor-specific context

**Response Headers:**
- `X-Trace-Id`: Unique identifier for this trace
- `X-Request-Duration`: Request duration in milliseconds
- `X-Cost`: Request cost in USD

### Custom Spans

Add business context to your traces with custom spans:

```typescript
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Process document' }]
}, {
  headers: {
    'X-Session-Id': 'doc_session_123',
    'X-Span-Name': 'document_extraction',
    'X-Span-Attributes': JSON.stringify({
      document_type: 'pdf',
      page_count: 25,
      language: 'en'
    })
  }
});
```

### Baggage Propagation

Propagate business context across service boundaries:

```typescript
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
}, {
  headers: {
    'baggage': 'user_id=user123,tenant_id=tenant456,environment=production'
  }
});
```

**Baggage automatically propagates to:**
- All downstream services
- Logs and traces
- Metrics and spans
- Cost attribution

## Real-World Use Cases

### 1. Microservice Tracing

Track AI requests across your microservices architecture:

```typescript
// Service A: API Gateway
const serviceA = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Request' }]
}, {
  headers: {
    'X-Session-Id': 'microservice_session',
    'X-Service-Name': 'api-gateway',
    'traceparent': `00-${traceId}-${spanId}-01`
  }
});

// Service B: Business Logic (child of A)
const serviceB = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Process' }]
}, {
  headers: {
    'X-Session-Id': 'microservice_session',
    'X-Parent-Trace-Id': serviceA.headers['x-trace-id'],
    'X-Service-Name': 'business-logic'
  }
});
```

### 2. Cost Attribution by Tenant

Use baggage to attribute AI costs to specific tenants:

```typescript
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Request' }]
}, {
  headers: {
    'baggage': `tenant_id=${tenantId},cost_center=${costCenter}`
  }
});

// Costs are automatically tagged with tenant_id and cost_center
// Query costs by tenant in the dashboard
```

### 3. Document Processing Pipeline

Track complex multi-step AI workflows:

```typescript
const sessionId = 'doc_pipeline_123';

// Step 1: Extract text
const extraction = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Extract text...' }]
}, {
  headers: {
    'X-Session-Id': sessionId,
    'X-Span-Name': 'text_extraction',
    'X-Span-Attributes': JSON.stringify({ document_type: 'pdf', pages: 25 })
  }
});

// Step 2: Entity recognition (child of extraction)
const entities = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Extract entities...' }]
}, {
  headers: {
    'X-Session-Id': sessionId,
    'X-Parent-Trace-Id': extraction.headers['x-trace-id'],
    'X-Span-Name': 'entity_recognition'
  }
});

// Step 3: Summarization (child of entities)
const summary = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Summarize...' }]
}, {
  headers: {
    'X-Session-Id': sessionId,
    'X-Parent-Trace-Id': entities.headers['x-trace-id'],
    'X-Span-Name': 'summarization'
  }
});

// View complete pipeline trace
const session = await fetch(`${API_BASE}/v1/sessions/${sessionId}`, {
  headers: { 'Authorization': `Bearer ${API_KEY}` }
});
```

### 4. Performance Monitoring

Monitor AI request performance in real-time:

```typescript
// Get Prometheus metrics
const metrics = await fetch(`${API_BASE}/metrics`, {
  headers: { 'Authorization': `Bearer ${API_KEY}` }
});

// Metrics include:
// - cost_katana_requests_total{model="gpt-4",status="success"}
// - cost_katana_request_duration_seconds_bucket{model="gpt-4",le="1"}
// - cost_katana_cost_usd_total{model="gpt-4"}
// - cost_katana_tokens_total{model="gpt-4",type="input"}
```

## Export to Observability Platforms

### Jaeger

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces'
  })
});

await sdk.start();

// Make AI requests - traces automatically exported to Jaeger
// View at http://localhost:16686
```

### Prometheus

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'cost-katana'
    metrics_path: '/api/metrics'
    bearer_token: 'YOUR_API_KEY'
    static_configs:
      - targets: ['cost-katana-backend.store']
```

### Datadog

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://http-intake.logs.datadoghq.com/v1/traces',
    headers: {
      'DD-API-KEY': process.env.DD_API_KEY
    }
  })
});
```

### New Relic

```typescript
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://otlp.nr-data.net:4318/v1/traces',
    headers: {
      'api-key': process.env.NEW_RELIC_API_KEY
    }
  })
});
```

## Available Metrics

### Request Metrics

- `cost_katana_requests_total` - Total requests by model/status
- `cost_katana_request_duration_seconds` - Request latency histogram
- `cost_katana_requests_in_flight` - Currently processing requests

### Cost Metrics

- `cost_katana_cost_usd_total` - Total cost by model/provider
- `cost_katana_cost_per_request` - Average cost per request
- `cost_katana_cost_by_tenant` - Cost attributed by tenant (with baggage)

### Token Metrics

- `cost_katana_tokens_total` - Total tokens (input/output) by model
- `cost_katana_tokens_per_request` - Average tokens per request

### Performance Metrics

- `cost_katana_cache_hit_rate` - Semantic cache hit percentage
- `cost_katana_optimization_rate` - Cortex optimization usage
- `cost_katana_error_rate` - Request failure percentage

### Model Metrics

- `cost_katana_model_latency` - Latency by model/provider
- `cost_katana_model_throughput` - Requests per second by model
- `cost_katana_model_availability` - Model uptime percentage

## W3C Trace Context Standard

Cost Katana fully supports the [W3C Trace Context](https://www.w3.org/TR/trace-context/) standard:

### Format

```
traceparent: version-trace-id-parent-id-flags
```

**Example:**
```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
             ││ │                              │ │                    ││
             ││ └─ trace-id (128-bit hex)     │ └─ span-id (64-bit)  ││
             │└─ version (00)                 └─────────────────────┘│
             └───────────────────────────────────────────────────────┘
                                                              flags (01 = sampled)
```

### Generation

```typescript
function generateTraceContext() {
  const traceId = crypto.randomBytes(16).toString('hex');
  const spanId = crypto.randomBytes(8).toString('hex');
  return `00-${traceId}-${spanId}-01`;
}
```

## Dashboard Integration

All traces are visible in the Cost Katana dashboard:

- 📊 Session timeline view
- 🔍 Trace search and filtering
- 📈 Performance analytics
- 💰 Cost attribution by trace
- ⚠️ Error tracking and alerts
- 🌐 Service dependency mapping

Visit: [costkatana.com/dashboard/traces](https://costkatana.com/dashboard/traces)

## Best Practices

### 1. Use Consistent Session IDs ✅

```typescript
const sessionId = generateSessionId(); // e.g., user_123_workflow_abc

// All related requests use same session ID
await makeRequest1({ sessionId });
await makeRequest2({ sessionId });
await makeRequest3({ sessionId });
```

### 2. Add Business Context ✅

```typescript
headers: {
  'X-Span-Attributes': JSON.stringify({
    user_id: 'user_123',
    feature: 'document_processing',
    document_type: 'contract',
    priority: 'high'
  })
}
```

### 3. Propagate Trace Context ✅

```typescript
// Parent service
const parentResponse = await client.chat.completions.create(..., {
  headers: { 'X-Session-Id': sessionId }
});

// Child service - use parent's trace ID
const childResponse = await client.chat.completions.create(..., {
  headers: {
    'X-Session-Id': sessionId,
    'X-Parent-Trace-Id': parentResponse.headers['x-trace-id']
  }
});
```

### 4. Monitor Key Metrics ✅

```typescript
// Set up alerts on key metrics
const alerts = [
  { metric: 'cost_per_hour', threshold: 100, severity: 'high' },
  { metric: 'p95_latency', threshold: 2000, severity: 'medium' },
  { metric: 'error_rate', threshold: 0.05, severity: 'critical' }
];
```

### 5. Use Sampling in Production ✅

```typescript
const sdk = new NodeSDK({
  sampler: new TraceIdRatioBasedSampler(0.1), // Sample 10% of traces
  // Always sample high-cost requests
  spanProcessor: new BatchSpanProcessor(exporter, {
    maxQueueSize: 2048,
    maxExportBatchSize: 512
  })
});
```

## Troubleshooting

### Issue 1: Traces Not Appearing

**Causes:**
- Incorrect API key
- Missing trace headers
- Sampling disabled

**Solutions:**
- Verify API key is set correctly
- Include `X-Session-Id` header
- Check sampling configuration

### Issue 2: Broken Trace Hierarchy

**Causes:**
- Missing `X-Parent-Trace-Id`
- Session ID mismatch

**Solutions:**
- Always propagate parent trace ID
- Use consistent session ID across requests

### Issue 3: High Cardinality Metrics

**Causes:**
- Too many unique span attributes
- Dynamic attribute values

**Solutions:**
- Limit attribute cardinality
- Use standard attribute names
- Aggregate before exporting

## Cost

✅ **OpenTelemetry integration is FREE!**

- No additional costs
- Unlimited traces
- Full metrics export
- Dashboard visualization included

## Support

- **Documentation**: [docs.costkatana.com/observability](https://docs.costkatana.com/observability)
- **Dashboard**: [costkatana.com/dashboard/traces](https://costkatana.com/dashboard/traces)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**🥷 Full observability for your AI applications!**

Track every AI request, monitor performance in real-time, and debug issues with complete context using industry-standard OpenTelemetry.

