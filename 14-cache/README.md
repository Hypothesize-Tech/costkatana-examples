# Cost Katana Cache Management Examples

**Save 30-40% on AI costs with intelligent semantic caching.**

Cost Katana's semantic caching system automatically caches AI responses and recognizes semantically similar queries, delivering instant responses and significant cost savings without sacrificing quality.

## Quick Start

### 1. Enable Caching

```bash
curl -X POST https://api.costkatana.com/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-Enable-Cache: true" \
  -H "X-Cache-TTL: 3600" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is AI?"}]
  }'
```

**Response includes:**
```
X-Cache-Status: miss
X-Cache-Key: semantic_hash_abc123
```

### 2. Cache Hit (Same Query)

```bash
# Repeat same request
curl -X POST https://api.costkatana.com/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-Enable-Cache: true" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is AI?"}]
  }'
```

**Response includes:**
```
X-Cache-Status: hit
X-Cost-Saved: 0.045
X-Tokens-Saved: 150
```

### 3. Semantic Match (Similar Query)

```bash
# Different wording, same meaning
curl -X POST https://api.costkatana.com/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-Enable-Cache: true" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Explain artificial intelligence"}]
  }'
```

**Response includes:**
```
X-Cache-Status: hit
X-Similarity-Score: 0.92
X-Cost-Saved: 0.045
```

## Examples by Integration Method

### HTTP Headers (.http files)

Direct REST API caching:

- **[cache-stats.http](./http-headers/cache-stats.http)** - Monitor cache statistics and savings
- **[cache-control.http](./http-headers/cache-control.http)** - Clear, warmup, export/import cache
- **[semantic-caching.http](./http-headers/semantic-caching.http)** - Advanced semantic matching

### NPM/TypeScript Examples

Production-ready caching implementations:

- **[cache-stats.ts](./npm-package/cache-stats.ts)** - Monitor cache performance
- **[cache-control.ts](./npm-package/cache-control.ts)** - Cache management operations
- **[semantic-caching.ts](./npm-package/semantic-caching.ts)** - Semantic similarity demos
- **[cache-optimization.ts](./npm-package/cache-optimization.ts)** - Optimization best practices
- **[cache-middleware.ts](./npm-package/cache-middleware.ts)** - Express middleware

### Python SDK Examples

Python caching implementations:

- **[cache_stats.py](./python-sdk/cache_stats.py)** - Cache statistics and monitoring
- **[cache_control.py](./python-sdk/cache_control.py)** - Cache control operations
- **[semantic_caching.py](./python-sdk/semantic_caching.py)** - Semantic caching demos

## How Semantic Caching Works

### 1. Traditional Caching (Exact Match)

```
Query 1: "What is the capital of France?"  → Cache MISS → Call AI → Cache result
Query 2: "What is the capital of France?"  → Cache HIT  → Return cached
Query 3: "Tell me France's capital city"   → Cache MISS → Call AI (different text)
```

**Problem:** Different wording = Cache miss

### 2. Semantic Caching (Meaning-Based)

```
Query 1: "What is the capital of France?"  → Cache MISS → Call AI → Cache result
Query 2: "What is the capital of France?"  → Cache HIT  → Return cached
Query 3: "Tell me France's capital city"   → Cache HIT  → Return cached (same meaning!)
```

**Solution:** Semantic similarity = Cache hit

### Technical Process

1. **Convert query to embedding** (vector representation)
2. **Search for similar embeddings** in cache
3. **Calculate similarity score** (cosine similarity)
4. **If score > threshold** (default 0.90), return cached response
5. **Otherwise**, call AI model and cache the result

## Cache Headers

### Request Headers

| Header | Description | Default | Example |
|--------|-------------|---------|---------|
| `X-Enable-Cache` | Enable/disable caching | `false` | `true` |
| `X-Cache-TTL` | Time to live (seconds) | `3600` | `86400` |
| `X-Semantic-Threshold` | Similarity threshold (0-1) | `0.90` | `0.85` |
| `X-Cache-Scope` | Cache scope | `global` | `user` |
| `X-Cache-Bypass` | Force bypass cache | `false` | `true` |
| `X-Cache-Refresh` | Update cache | `false` | `true` |

### Response Headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-Cache-Status` | Cache hit/miss/bypass | `hit` |
| `X-Cache-Key` | Unique cache key | `semantic_hash_abc123` |
| `X-Cache-Age` | Age in seconds | `15` |
| `X-Cost-Saved` | Cost saved (USD) | `0.045` |
| `X-Tokens-Saved` | Tokens saved | `150` |
| `X-Similarity-Score` | Semantic similarity | `0.92` |
| `X-Original-Query` | Original cached query | `What is...` |

## Cache Strategies

### Strategy 1: Long TTL for Factual Content ✅

```typescript
// Factual content rarely changes
await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is the capital of France?' }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-TTL': '86400' // 24 hours
  }
});
```

### Strategy 2: Short TTL for Dynamic Content ✅

```typescript
// Time-sensitive content
await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is the current stock price?' }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-TTL': '300' // 5 minutes
  }
});
```

### Strategy 3: User-Scoped Caching ✅

```typescript
// Personalized content
await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Show me my orders' }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-Scope': 'user'
  }
});
```

### Strategy 4: Cache Bypass for Transactions ✅

```typescript
// Critical operations
await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Process payment' }]
}, {
  headers: {
    'X-Cache-Bypass': 'true'
  }
});
```

### Strategy 5: Adjust Semantic Threshold ✅

```typescript
// More lenient matching for broader cache hits
await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Explain AI' }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Semantic-Threshold': '0.85' // Lower = more hits
  }
});
```

## Cache Management

### Get Statistics

```bash
GET /api/cache/stats
```

**Response:**
```json
{
  "redis": {
    "hits": 1250,
    "misses": 350,
    "hitRate": 78.13,
    "costSaved": 45.67,
    "tokensSaved": 125000
  }
}
```

### Clear Cache

```bash
DELETE /api/cache/clear
DELETE /api/cache/clear?model=gpt-4
DELETE /api/cache/clear?olderThan=86400
```

### Warmup Cache

```bash
POST /api/cache/warmup
{
  "prompts": [
    "What is AI?",
    "Explain machine learning"
  ],
  "model": "gpt-4",
  "ttl": 86400
}
```

### Export/Import Cache

```bash
# Export
GET /api/cache/export?format=json

# Import
POST /api/cache/import
{
  "entries": [...]
}
```

## Cost Savings Calculator

### Example: 1000 requests/day

**Without Caching:**
- 1000 requests × $0.045 = **$45/day**
- Monthly: **$1,350**
- Yearly: **$16,425**

**With 80% Cache Hit Rate:**
- 200 misses × $0.045 = $9/day
- 800 hits × $0 = $0/day
- **Total: $9/day** (80% savings!)
- Monthly: **$270** (save $1,080)
- Yearly: **$3,285** (save $13,140)

### ROI Comparison

| Hit Rate | Daily Cost | Monthly Savings | Yearly Savings |
|----------|-----------|-----------------|----------------|
| 0% | $45 | $0 | $0 |
| 50% | $22.50 | $675 | $8,213 |
| 70% | $13.50 | $945 | $11,498 |
| 80% | $9.00 | $1,080 | $13,140 |
| 90% | $4.50 | $1,215 | $14,783 |

## Real-World Use Cases

### 1. Customer Support Bot

```typescript
// FAQ responses cached for 24 hours
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: customerQuestion }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-TTL': '86400',
    'X-Semantic-Threshold': '0.88' // Lenient for FAQ variations
  }
});

// Result: 85% hit rate, save $5,000/month
```

### 2. Documentation Search

```typescript
// Documentation queries cached for 7 days
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: docQuery }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-TTL': '604800', // 7 days
    'X-Cache-Scope': 'global'
  }
});

// Result: 92% hit rate, save $8,000/month
```

### 3. Content Generation

```typescript
// Common content cached for 1 hour
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: contentPrompt }]
}, {
  headers: {
    'X-Enable-Cache': 'true',
    'X-Cache-TTL': '3600',
    'X-Semantic-Threshold': '0.92' // Strict for content quality
  }
});

// Result: 65% hit rate, save $3,500/month
```

## Best Practices

### 1. Monitor Cache Performance ✅

```typescript
// Check cache stats regularly
const stats = await axios.get('/api/cache/stats');
console.log(`Hit Rate: ${stats.hitRate}%`);
console.log(`Cost Saved: $${stats.costSaved}`);
```

### 2. Optimize TTL Values ✅

- **Factual content**: 24+ hours
- **Dynamic content**: 5-15 minutes
- **Personalized content**: 1-4 hours
- **Transactional**: Don't cache

### 3. Tune Semantic Threshold ✅

- **0.95-1.0**: Very strict (exact match)
- **0.90-0.95**: Strict (recommended)
- **0.85-0.90**: Moderate (FAQ/support)
- **0.70-0.85**: Lenient (general queries)

### 4. Use Model-Specific Caching ✅

Caches are automatically model-specific:
- GPT-4 cache separate from GPT-3.5
- Ensures quality consistency
- Optimizes for model characteristics

### 5. Implement Cache Warmup ✅

```typescript
// Warmup cache before traffic spikes
await warmupCache([
  'Most common question 1',
  'Most common question 2',
  'Most common question 3'
]);
```

## Monitoring & Analytics

All cache activity is visible in the dashboard:

- 📊 Real-time hit/miss rates
- 💰 Cost savings tracking
- 📈 Cache performance trends
- 🔍 Query similarity analysis
- ⚡ Response time improvements

Visit: [costkatana.com/dashboard/cache](https://costkatana.com/dashboard/cache)

## Cost

✅ **Semantic caching is FREE!**

- No additional fees
- Unlimited cache storage (reasonable limits)
- Only pay for AI model calls (cache misses)
- Typical savings: 30-40% on AI costs

## Support

- **Documentation**: [docs.costkatana.com/cache](https://docs.costkatana.com/cache)
- **Dashboard**: [costkatana.com/dashboard/cache](https://costkatana.com/dashboard/cache)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**🥷 Save 30-40% on AI costs with intelligent caching!**

Semantic caching delivers instant responses for similar queries, dramatically reducing costs without sacrificing quality.
