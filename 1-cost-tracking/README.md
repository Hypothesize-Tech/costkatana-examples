# Cost Tracking Examples

Track AI usage and costs automatically across all providers with automatic token counting, cost calculation, and analytics.

## Overview

Cost Katana automatically tracks:
- ✅ Token usage (prompt + completion)
- ✅ Accurate cost calculation
- ✅ Response time
- ✅ Model and provider information
- ✅ Request metadata and tagging
- ✅ Error tracking

## Integration Methods

### 1. HTTP Headers (No Code Changes)

Add `CostKatana-*` headers to your existing API calls:

```http
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer YOUR_OPENAI_KEY
CostKatana-Auth: Bearer YOUR_COSTKATANA_KEY
CostKatana-Project-Id: YOUR_PROJECT_ID
Content-Type: application/json

{
  "model": "gpt-4",
  "messages": [{"role": "user", "content": "Hello!"}]
}
```

**Advantages:**
- No code changes required
- Works with any HTTP client
- Provider-agnostic

**Examples:**
- [OpenAI](./http-headers/openai.http)
- [Anthropic](./http-headers/anthropic.http)
- [AWS Bedrock](./http-headers/aws-bedrock.http)
- [Google AI](./http-headers/google-ai.http)
- [Cohere](./http-headers/cohere.http)
- [Azure](./http-headers/azure.http)
- [DeepSeek](./http-headers/deepseek.http)
- [Groq](./http-headers/groq.http)

### 2. NPM Package (Best Developer Experience)

Use the `cost-katana` SDK:

```typescript
import { ai } from 'cost-katana';

const response = await ai('gpt-4', 'Hello!');
console.log(response.text);
console.log(`Cost: $${response.cost}`);
```

**Advantages:**
- TypeScript type safety
- Automatic tracking
- Advanced features
- Better error handling

**Examples:**
- [OpenAI](./npm-package/openai.ts)
- [Anthropic](./npm-package/anthropic.ts)
- [AWS Bedrock](./npm-package/aws-bedrock.ts)
- [Google AI](./npm-package/google-ai.ts)
- [Cohere](./npm-package/cohere.ts)
- [Azure](./npm-package/azure.ts)
- [DeepSeek](./npm-package/deepseek.ts)
- [Groq](./npm-package/groq.ts)

## Quick Start

### HTTP Method

1. Get your Cost Katana API key from [costkatana.com/settings/api-keys](https://costkatana.com/settings/api-keys)
2. Open any `.http` file in VS Code with REST Client extension
3. Replace `YOUR_COSTKATANA_KEY` and provider keys
4. Click "Send Request"
5. View costs in [costkatana.com/dashboard](https://costkatana.com/dashboard)

### NPM Method

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp ../shared/env.example ../.env
# Edit .env with your keys
```

3. Run an example:
```bash
npm run example 1-cost-tracking/npm-package/openai.ts
```

## Tracked Metrics

All examples automatically track:

| Metric | Description | Example |
|--------|-------------|---------|
| **Prompt Tokens** | Input tokens | 150 |
| **Completion Tokens** | Output tokens | 300 |
| **Total Tokens** | Sum of prompt + completion | 450 |
| **Cost** | Exact cost in USD | $0.0045 |
| **Response Time** | Latency in ms | 1234 |
| **Model** | AI model used | gpt-4 |
| **Provider** | AI provider | OpenAI |
| **Error Status** | Any errors | false |

## Tagging & Metadata

Add custom tags and metadata for better cost attribution:

### HTTP Headers
```http
CostKatana-Property-Environment: production
CostKatana-Property-Feature: chatbot
CostKatana-Property-Team: engineering
CostKatana-User-Id: user_123
```

### NPM Package
```typescript
await tracker.trackUsage({
  provider: 'openai',
  model: 'gpt-4',
  promptTokens: 150,
  completionTokens: 300,
  tags: ['production', 'chatbot'],
  metadata: {
    environment: 'production',
    feature: 'chatbot',
    team: 'engineering'
  }
});
```

## Provider-Specific Notes

### OpenAI
- ✅ Supports: GPT-4, GPT-3.5-turbo, GPT-4o, embeddings, DALL-E
- 📊 Token counting: Automatic via tiktoken
- 💰 Pricing: Per-token pricing

### Anthropic
- ✅ Supports: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- 📊 Token counting: From API response
- 💰 Pricing: Per-token pricing

### AWS Bedrock
- ✅ Supports: Nova Pro, Nova Lite, Claude on Bedrock, Titan
- 📊 Token counting: From API response
- 💰 Pricing: Per-token pricing (varies by model)

### Google AI
- ✅ Supports: Gemini Pro, Gemini Flash, PaLM 2
- 📊 Token counting: From API response
- 💰 Pricing: Per-character or per-token

### Cohere
- ✅ Supports: Command R+, Command, Embed
- 📊 Token counting: From API response
- 💰 Pricing: Per-token pricing

### Azure OpenAI
- ✅ Supports: All OpenAI models on Azure
- 📊 Token counting: Automatic via tiktoken
- 💰 Pricing: Per-token pricing (Azure rates)

### DeepSeek
- ✅ Supports: DeepSeek Chat, DeepSeek Coder
- 📊 Token counting: From API response
- 💰 Pricing: Per-token pricing (very competitive)

### Groq
- ✅ Supports: Llama 3, Mixtral, Gemma
- 📊 Token counting: From API response
- 💰 Pricing: Per-token pricing (fast inference)

## View Your Data

After running examples, view your tracked data at:

- **Dashboard**: [costkatana.com/dashboard](https://costkatana.com/dashboard)
- **Analytics**: [costkatana.com/analytics](https://costkatana.com/analytics)
- **Exports**: Download CSV or JSON reports

## Next Steps

- **Gateway**: Route through Cost Katana's intelligent gateway → [../2-gateway](../2-gateway/)
- **Optimization**: Reduce costs 20-40% → [../3-optimization](../3-optimization/)
- **Cortex**: Save 70-95% with meta-language → [../4-cortex](../4-cortex/)

## Support

- **Docs**: [docs.costkatana.com](https://docs.costkatana.com)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/Wcwzw8wM)
- **Email**: support@costkatana.com

