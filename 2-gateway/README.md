# Gateway Examples

Route AI requests through Cost Katana's intelligent gateway with caching, retries, failover, and security features.

## Overview

The Cost Katana Gateway provides:
- 🌐 **Universal Routing** - Route to any AI provider through one endpoint
- 💾 **Semantic Caching** - Save 100% on cached requests
- 🔄 **Automatic Retries** - Exponential backoff with intelligent retry logic
- 🛡️ **Security Firewall** - Block prompt injection and malicious content
- 🔑 **Proxy Keys** - Secure API key management
- 🔀 **Multi-Provider Failover** - Automatic fallback when providers fail
- 📊 **Workflow Tracking** - Track multi-step AI workflows

## Quick Start

### HTTP Headers Method

```http
POST https://cost-katana-backend.store/api/gateway/v1/chat/completions
CostKatana-Auth: Bearer YOUR_COSTKATANA_KEY
CostKatana-Target-Url: https://api.openai.com
CostKatana-Cache-Enabled: true
CostKatana-Retry-Enabled: true
Content-Type: application/json

{
  "model": "gpt-4",
  "messages": [{"role": "user", "content": "Hello!"}]
}
```

### NPM Package Method

```typescript
import { AICostTracker } from 'cost-katana';

const tracker = await AICostTracker.create(config);
const gateway = tracker.initializeGateway();

const response = await gateway.openai({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
}, {
  cache: true,
  retry: true
});
```

## Examples

### HTTP Headers

1. [Basic Routing](./http-headers/basic-routing.http) - Route to any provider
2. [With Caching](./http-headers/with-caching.http) - Save 100% on repeated requests
3. [With Retry](./http-headers/with-retry.http) - Automatic retry on failures
4. [With Firewall](./http-headers/with-firewall.http) - Security scanning
5. [Proxy Keys](./http-headers/proxy-keys.http) - Secure key management
6. [Failover](./http-headers/failover.http) - Multi-provider fallback
7. [Workflows](./http-headers/workflows.http) - Track multi-step processes

### NPM Package

1. [Basic Routing](./npm-package/basic-routing.ts)
2. [With Caching](./npm-package/with-caching.ts)
3. [With Retry](./npm-package/with-retry.ts)
4. [With Firewall](./npm-package/with-firewall.ts)
5. [Proxy Keys](./npm-package/proxy-keys.ts)
6. [Failover](./npm-package/failover.ts)
7. [Workflows](./npm-package/workflows.ts)

## Key Features

### 1. Semantic Caching

Save 100% on repeated or similar requests:

```http
CostKatana-Cache-Enabled: true
CostKatana-Semantic-Cache-Enabled: true
CostKatana-Similarity-Threshold: 0.85
```

**Benefits:**
- Exact match caching (free repeated requests)
- Semantic similarity matching (catches paraphrases)
- Configurable similarity threshold
- User-scoped or global caching

### 2. Automatic Retries

Exponential backoff with intelligent retry:

```http
CostKatana-Retry-Enabled: true
CostKatana-Retry-Count: 3
CostKatana-Retry-Factor: 2
CostKatana-Retry-Min-Timeout: 1000
CostKatana-Retry-Max-Timeout: 10000
```

**Benefits:**
- Handles rate limits automatically
- Exponential backoff (1s → 2s → 4s)
- Configurable retry count
- Min/max timeout control

### 3. Security Firewall

Block malicious prompts automatically:

```http
CostKatana-Firewall-Enabled: true
CostKatana-Firewall-Advanced: true
CostKatana-Firewall-Prompt-Threshold: 0.8
```

**Blocks:**
- Prompt injection attacks
- Jailbreak attempts
- Data exfiltration
- Malicious content
- PII leakage

### 4. Proxy Keys

Secure API key management:

```http
CostKatana-Auth: Bearer ck-proxy-your_proxy_key
```

**Benefits:**
- Hide real API keys
- Set budget limits per key
- Rate limiting per key
- IP whitelisting
- Easy key rotation

### 5. Multi-Provider Failover

Automatic fallback when providers fail:

```http
CostKatana-Failover-Policy: cost-optimized
```

**Policies:**
- `fastest`: Prioritize speed
- `cheapest`: Prioritize cost
- `cost-optimized`: Balance cost and quality
- `quality-first`: Prioritize model quality
- Custom: Define your own rules

### 6. Workflow Tracking

Track multi-step AI workflows:

```http
CostKatana-Workflow-Id: workflow_abc123
CostKatana-Workflow-Name: content-generation
CostKatana-Workflow-Step: generate-outline
```

**Benefits:**
- Track end-to-end workflow costs
- Analyze step-by-step performance
- Identify bottlenecks
- Optimize complex processes

## Gateway Headers Reference

### Authentication
- `CostKatana-Auth`: Bearer token or proxy key (required)

### Routing
- `CostKatana-Target-Url`: Target provider URL (required for direct routing)
- `CostKatana-Failover-Policy`: Multi-provider failover policy

### Caching
- `CostKatana-Cache-Enabled`: Enable/disable caching
- `CostKatana-Semantic-Cache-Enabled`: Enable semantic similarity
- `CostKatana-Similarity-Threshold`: Similarity threshold (0-1)
- `CostKatana-Cache-User-Scope`: User-specific caching
- `Cache-Control`: Standard cache control header

### Retry
- `CostKatana-Retry-Enabled`: Enable/disable retries
- `CostKatana-Retry-Count`: Number of retry attempts (1-10)
- `CostKatana-Retry-Factor`: Exponential backoff factor (1-5)
- `CostKatana-Retry-Min-Timeout`: Minimum wait time in ms
- `CostKatana-Retry-Max-Timeout`: Maximum wait time in ms

### Security
- `CostKatana-Firewall-Enabled`: Enable security firewall
- `CostKatana-Firewall-Advanced`: Advanced threat detection
- `CostKatana-Firewall-Prompt-Threshold`: Detection threshold
- `CostKatana-LLM-Security-Enabled`: Enable LLM-specific security

### Tracking
- `CostKatana-Project-Id`: Project for cost allocation
- `CostKatana-Session-Id`: Session identifier
- `CostKatana-Workflow-Id`: Workflow identifier
- `CostKatana-Workflow-Name`: Workflow name
- `CostKatana-Workflow-Step`: Current workflow step
- `CostKatana-User-Id`: End user identifier

### Custom Properties
- `CostKatana-Property-[Name]`: Custom metadata (e.g., `CostKatana-Property-Environment`)

### Privacy
- `CostKatana-Omit-Request`: Don't log request content
- `CostKatana-Omit-Response`: Don't log response content

## Response Headers

The gateway adds these response headers:

- `CostKatana-Id`: Unique request ID
- `CostKatana-Cache-Status`: HIT or MISS
- `CostKatana-Processing-Time`: Gateway processing time
- `CostKatana-Budget-Remaining`: Remaining budget (if applicable)
- `CostKatana-Retry-Count`: Number of retries performed

## Use Cases

### High Availability API
Use failover for 99.99% uptime:
```typescript
const response = await gateway.makeRequest(endpoint, data, {
  failoverPolicy: 'fastest',
  retry: true,
  retryCount: 3
});
```

### Cost-Sensitive Application
Aggressive caching to minimize costs:
```typescript
const response = await gateway.makeRequest(endpoint, data, {
  cache: true,
  semanticCache: true,
  similarityThreshold: 0.90
});
```

### Enterprise Security
Enable firewall for production:
```typescript
const response = await gateway.makeRequest(endpoint, data, {
  firewall: {
    enabled: true,
    advanced: true,
    blockThreshold: 0.8
  }
});
```

## Best Practices

1. **Always enable caching** for repeated requests
2. **Use semantic caching** for similar but not identical requests
3. **Enable retries** for production reliability
4. **Enable firewall** for user-facing applications
5. **Use proxy keys** instead of exposing real API keys
6. **Track workflows** for complex multi-step processes
7. **Set appropriate budgets** on proxy keys
8. **Monitor gateway analytics** for optimization opportunities

## Performance

| Feature | Impact | Benefit |
|---------|--------|---------|
| Caching | 100% cost reduction | Free repeated requests |
| Semantic Cache | 80-95% cost reduction | Catches similar requests |
| Retries | +50-200ms latency | Higher reliability |
| Firewall | +10-20ms latency | Security & compliance |
| Failover | +100-500ms latency | 99.99% availability |

## Next Steps

- **Optimization**: Reduce costs 20-40% → [../3-optimization](../3-optimization/)
- **Cortex**: Save 70-95% with meta-language → [../4-cortex](../4-cortex/)
- **Analytics**: Monitor usage and costs → [../5-analytics](../5-analytics/)

## Support

- **Docs**: [docs.costkatana.com/gateway](https://docs.costkatana.com/gateway)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)
- **Email**: support@costkatana.com

