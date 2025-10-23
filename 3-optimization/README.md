# Optimization Examples

Reduce AI costs by 20-40% with intelligent prompt optimization.

## Features

1. **Basic Optimization** - General prompt improvements (20-30% savings)
2. **Prompt Compression** - Remove unnecessary tokens (30-40% savings)
3. **Context Trimming** - Smart conversation history management
4. **Request Fusion** - Batch similar requests

## Quick Start

### HTTP Example
```http
POST https://cost-katana-backend.store/api/optimizations
CostKatana-Auth: Bearer YOUR_KEY
{
  "prompt": "Your long prompt here...",
  "service": "openai",
  "model": "gpt-4"
}
```

### NPM Example
```typescript
import { AICostTracker } from 'cost-katana';
const optimized = await tracker.optimizePrompt(prompt, model, provider);
```

## Examples

- [Basic Optimization HTTP](./http-headers/basic-optimization.http)
- [Compression HTTP](./http-headers/compression.http)
- [Context Trimming HTTP](./http-headers/context-trimming.http)
- [Request Fusion HTTP](./http-headers/request-fusion.http)

## Cost Savings

| Technique | Savings | Use Case |
|-----------|---------|----------|
| Basic | 20-30% | All prompts |
| Compression | 30-40% | Verbose prompts |
| Context Trim | 40-60% | Long conversations |
| Request Fusion | 50-70% | Batch operations |

📊 View savings at: https://costkatana.com/analytics/savings
