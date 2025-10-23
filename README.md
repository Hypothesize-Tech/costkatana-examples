# Cost Katana Examples

> **Production-ready examples for every Cost Katana feature**

[![Documentation](https://img.shields.io/badge/docs-costkatana.com-blue)](https://docs.costkatana.com)
[![Discord](https://img.shields.io/badge/discord-join-7289da)](https://discord.gg/D8nDArmKbY)
[![GitHub](https://img.shields.io/badge/github-costkatana-black)](https://github.com/costkatana)

## Overview

This repository contains **300+ production-ready code examples** demonstrating how to use Cost Katana across **44 different features**. Whether you're building with TypeScript, Python, or directly via HTTP APIs, you'll find working examples with full error handling and best practices.

**What you'll find here:**
- 🟦 **TypeScript/Node.js** - Complete SDK examples with type safety
- 🟨 **Python** - Pythonic examples with the Cost Katana SDK
- 🟩 **HTTP REST APIs** - Direct API calls you can test immediately
- 🔧 **Framework Integrations** - Express, Next.js, Fastify, NestJS, FastAPI

---

## Quick Start

### 1. Get Your API Key
Sign up at [costkatana.com/dashboard](https://costkatana.com/dashboard) to get your API key.

### 2. Choose Your Language

**TypeScript/Node.js:**
```bash
npm install cost-katana
export COST_KATANA_API_KEY=your_key_here
npx ts-node 1-cost-tracking/npm-package/openai.ts
```

**Python:**
```bash
pip install costkatana
export COST_KATANA_API_KEY=your_key_here
python 1-cost-tracking/python-sdk/openai.py
```

**HTTP (REST Client):**
1. Install [REST Client for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Open any `.http` file
3. Update the API key
4. Click "Send Request"

---

## Examples by Category

### 💰 Cost Management

Track and optimize your AI spending with comprehensive cost management tools.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Cost Tracking](1-cost-tracking/)** | Monitor costs across all AI providers | HTTP, TypeScript, Python |
| **[Analytics](5-analytics/)** | Analyze spending patterns and trends | HTTP, TypeScript, Python |
| **[Budgets](19-budgets/)** | Set spending limits and alerts | HTTP, TypeScript, Python |
| **[Cost Optimization](41-cost-optimization/)** | AI-powered cost reduction recommendations | HTTP, TypeScript, Python |
| **[Unexplained Costs](30-unexplained-costs/)** | Detect anomalies in spending | HTTP, TypeScript, Python |

**Expected Savings:** 30-80% cost reduction through optimization

---

### 🚀 Performance & Optimization

Boost performance and reduce costs with intelligent caching and optimization.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Semantic Caching](14-cache/)** | Cache similar requests (30-40% savings) | HTTP, TypeScript, Python, Frameworks |
| **[Cortex Optimization](4-cortex/)** | AI-powered prompt compression | HTTP, TypeScript, Python |
| **[Model Routing](40-model-routing/)** | Route to optimal models automatically | HTTP, TypeScript, Python |
| **[Failover](39-failover/)** | Auto-failover between providers | HTTP, TypeScript, Python |

**Performance Gains:** 3-10x faster responses with caching

---

### 🔔 Monitoring & Alerts

Stay informed with real-time notifications and comprehensive monitoring.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Webhooks](10-webhooks/)** | Real-time event notifications (65+ events) | HTTP, TypeScript, Python, Frameworks |
| **[OpenTelemetry](11-observability/)** | Distributed tracing & metrics | HTTP, TypeScript, Python, Frameworks |
| **[Monitoring](17-monitoring/)** | System health & performance | HTTP, TypeScript, Python |
| **[Alerts](42-alerts/)** | Custom alert rules | HTTP, TypeScript, Python |
| **[Email Tracking](32-email-tracking/)** | Automated email notifications | HTTP, TypeScript, Python |

**Coverage:** 65+ webhook event types available

---

### 🤖 AI Orchestration

Build complex AI workflows and multi-agent systems.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Workflows](13-workflows/)** | Multi-step AI orchestration | HTTP, TypeScript, Python, FastAPI |
| **[Agents](27-agents/)** | AI agent management | HTTP, TypeScript, Python |
| **[Memory](20-memory/)** | Persistent agent context | HTTP, TypeScript, Python |
| **[Templates](21-templates/)** | Reusable prompt templates | HTTP, TypeScript, Python |

**Capabilities:** Parallel execution, conditional branching, error handling

---

### 🔒 Security & Compliance

Protect your AI applications with built-in security features.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Key Vault](15-key-vault/)** | Secure API key management | HTTP, TypeScript, Python |
| **[Guardrails](12-guardrails/)** | Content moderation & PII detection | HTTP, TypeScript, Python |
| **[Security](16-security/)** | Threat detection & scanning | HTTP, TypeScript, Python |
| **[MFA](28-mfa/)** | Multi-factor authentication | HTTP, TypeScript, Python |
| **[Audit Logs](37-audit-logs/)** | Complete audit trail | HTTP, TypeScript, Python |

**Protection:** PII detection, toxicity filtering, prompt injection defense

---

### 🔧 Developer Tools

Essential tools for development and testing.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Gateway](2-gateway/)** | Unified API for all providers | HTTP, TypeScript, Python |
| **[CLI](9-cli/)** | Command-line interface | Shell scripts, Guides |
| **[Python SDK](8-python-sdk/)** | Complete Python package | Python examples |
| **[CKQL](26-ckql/)** | SQL-like query language | HTTP, TypeScript, Python |
| **[Notebooks](25-notebooks/)** | Interactive analysis | HTTP, TypeScript, Python |

---

### 📊 Analytics & Reporting

Comprehensive analytics and automated reporting.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Reports](43-reports/)** | Automated report generation | HTTP, TypeScript, Python |
| **[Feedback](22-feedback/)** | Request quality ratings | HTTP, TypeScript, Python |
| **[Tagging](23-tagging/)** | Custom request tagging | HTTP, TypeScript, Python |
| **[Experiments](24-experiments/)** | A/B testing & comparison | HTTP, TypeScript, Python |
| **[AI Cost Monitoring](33-ai-cost-monitoring/)** | Real-time cost tracking | HTTP, TypeScript, Python |

---

### 👥 Team & Organization

Collaborate effectively with team management features.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Projects](18-projects/)** | Project organization | HTTP, TypeScript, Python |
| **[Team Management](36-team-management/)** | Team collaboration | HTTP, TypeScript, Python |
| **[User Telemetry](35-user-telemetry/)** | Usage analytics | HTTP, TypeScript, Python |
| **[Rate Limiting](38-rate-limiting/)** | API rate controls | HTTP, TypeScript, Python |

---

### 🔌 Integrations

Connect with your favorite tools and platforms.

| Feature | Description | Examples |
|---------|-------------|----------|
| **[Integrations](44-integrations/)** | Third-party connections | HTTP, TypeScript, Python |
| **[Ingestion](34-ingestion/)** | Data import pipelines | HTTP, TypeScript, Python |
| **[Express.js](7-frameworks/)** | Express integration | TypeScript |
| **[Next.js](7-frameworks/)** | Next.js integration | TypeScript |
| **[FastAPI](7-frameworks/)** | FastAPI integration | Python |

---

## Complete Feature List

All 44 features with direct links to examples:

<details>
<summary><strong>📋 Click to expand full feature index</strong></summary>

### Core Features (1-9)
1. [Cost Tracking](1-cost-tracking/) - Track AI costs across providers
2. [Gateway](2-gateway/) - Unified API gateway
3. [Optimization](3-optimization/) - General optimizations
4. [Cortex](4-cortex/) - Prompt optimization
5. [Analytics](5-analytics/) - Cost analytics
6. [Advanced](6-advanced/) - Advanced features
7. [Frameworks](7-frameworks/) - Framework integrations
8. [Python SDK](8-python-sdk/) - Python examples
9. [CLI](9-cli/) - Command-line interface

### Infrastructure (10-17)
10. [Webhooks](10-webhooks/) - Real-time notifications
11. [Observability](11-observability/) - OpenTelemetry & tracing
12. [Guardrails](12-guardrails/) - Content moderation
13. [Workflows](13-workflows/) - Multi-step orchestration
14. [Cache](14-cache/) - Semantic caching
15. [Key Vault](15-key-vault/) - Secure key management
16. [Security](16-security/) - Threat detection
17. [Monitoring](17-monitoring/) - System health

### Management (18-24)
18. [Projects](18-projects/) - Project management
19. [Budgets](19-budgets/) - Budget tracking
20. [Memory](20-memory/) - Agent memory
21. [Templates](21-templates/) - Prompt templates
22. [Feedback](22-feedback/) - Request feedback
23. [Tagging](23-tagging/) - Custom tagging
24. [Experiments](24-experiments/) - A/B testing

### Specialized Features (25-44)
25. [Notebooks](25-notebooks/) - Interactive notebooks
26. [CKQL](26-ckql/) - Query language
27. [Agents](27-agents/) - AI agents
28. [MFA](28-mfa/) - Multi-factor auth
29. [Moderation](29-moderation/) - Content moderation
30. [Unexplained Costs](30-unexplained-costs/) - Anomaly detection
31. [Cortex Training](31-cortex-training/) - Custom training
32. [Email Tracking](32-email-tracking/) - Email notifications
33. [AI Cost Monitoring](33-ai-cost-monitoring/) - Real-time monitoring
34. [Ingestion](34-ingestion/) - Data ingestion
35. [User Telemetry](35-user-telemetry/) - Telemetry config
36. [Team Management](36-team-management/) - Team collaboration
37. [Audit Logs](37-audit-logs/) - Audit trail
38. [Rate Limiting](38-rate-limiting/) - Rate controls
39. [Failover](39-failover/) - Provider failover
40. [Model Routing](40-model-routing/) - Intelligent routing
41. [Cost Optimization](41-cost-optimization/) - Recommendations
42. [Alerts](42-alerts/) - Alert management
43. [Reports](43-reports/) - Report generation
44. [Integrations](44-integrations/) - Third-party integrations

</details>

---

## Framework Integration Examples

### Express.js
```typescript
import express from 'express';
import { CostKatana } from 'cost-katana';

const app = express();
const katana = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY });

app.post('/chat', async (req, res) => {
  const response = await katana.chat.completions.create({
    model: 'gpt-4',
    messages: req.body.messages
  });
  res.json({ 
    response: response.choices[0].message, 
    cost: response.cost 
  });
});
```
**See:** [7-frameworks/express/](7-frameworks/express/)

### Next.js API Route
```typescript
// app/api/chat/route.ts
import { CostKatana } from 'cost-katana';

export async function POST(req: Request) {
  const katana = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY });
  const { messages } = await req.json();
  
  const response = await katana.chat.completions.create({
    model: 'gpt-4',
    messages
  });
  
  return Response.json({ response: response.choices[0].message });
}
```
**See:** [7-frameworks/nextjs/](7-frameworks/nextjs/)

### FastAPI (Python)
```python
from fastapi import FastAPI
from cost_katana import CostKatana

app = FastAPI()
katana = CostKatana(api_key=os.getenv("COST_KATANA_API_KEY"))

@app.post("/chat")
async def chat(messages: list):
    response = katana.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    return {"response": response.choices[0].message, "cost": response.cost}
```
**See:** [7-frameworks/](7-frameworks/) for all framework examples

---

## Real-World Use Cases

### Use Case 1: Multi-Agent Customer Support

**Goal:** Build a customer support system with multiple AI agents handling different tasks.

**Features Used:**
- [Agents](27-agents/) - Create specialized agents
- [Workflows](13-workflows/) - Orchestrate agent interactions
- [Memory](20-memory/) - Maintain conversation context
- [Webhooks](10-webhooks/) - Get notified of escalations

**Expected Results:**
- 24/7 automated support
- 70% reduction in support costs
- Context-aware responses

---

### Use Case 2: Cost-Optimized Content Generation

**Goal:** Generate marketing content at scale while minimizing costs.

**Features Used:**
- [Cortex Optimization](4-cortex/) - Compress prompts
- [Semantic Caching](14-cache/) - Cache similar requests
- [Model Routing](40-model-routing/) - Use optimal models
- [Cost Tracking](1-cost-tracking/) - Monitor spending

**Expected Results:**
- 60-80% cost reduction
- 10x content generation speed
- $10K+ monthly savings

---

### Use Case 3: Enterprise AI Platform

**Goal:** Build a secure, compliant AI platform for enterprise use.

**Features Used:**
- [Key Vault](15-key-vault/) - Secure key management
- [Guardrails](12-guardrails/) - Content moderation
- [Audit Logs](37-audit-logs/) - Compliance tracking
- [MFA](28-mfa/) - Enhanced security
- [Team Management](36-team-management/) - Role-based access

**Expected Results:**
- SOC 2 compliance ready
- Zero security incidents
- Full audit trail

---

## ROI Calculator

### Scenario: 1000 AI Requests/Day

**Without Cost Katana:**
```
1000 requests/day × $0.045/request = $45/day
Monthly: $1,350
Yearly: $16,425
```

**With Cost Katana (Caching + Optimization):**
```
1000 requests/day × 20% actual calls × $0.03/request = $6/day
Monthly: $180
Yearly: $2,190

SAVINGS: $14,235/year (87% reduction)
```

**ROI Breakdown:**
- **Semantic Caching:** 70-80% hit rate = 70-80% cost savings
- **Cortex Optimization:** 30-40% token reduction
- **Model Routing:** 15-25% savings using optimal models
- **Failover:** Prevent downtime costs

---

## Best Practices

### 1. Security
```typescript
// ✅ DO: Use environment variables
const apiKey = process.env.COST_KATANA_API_KEY;

// ❌ DON'T: Hardcode API keys
const apiKey = 'ck_live_abc123'; // NEVER DO THIS
```

### 2. Error Handling
```typescript
try {
  const response = await katana.chat.completions.create({...});
} catch (error) {
  if (error.status === 429) {
    // Rate limiting - implement exponential backoff
    await exponentialBackoff();
  } else if (error.status === 500) {
    // Server error - try failover
    await failoverToBackupProvider();
  }
  // Log error for monitoring
  logger.error('AI request failed', { error, context });
}
```

### 3. Caching Strategy
```typescript
// High-precision responses: Higher threshold
const critical = await katana.chat.completions.create({
  model: 'gpt-4',
  messages: [...],
  cache: { enabled: true, threshold: 0.95 } // 95% match required
});

// General queries: Lower threshold
const general = await katana.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [...],
  cache: { enabled: true, threshold: 0.80 } // 80% match OK
});
```

### 4. Monitoring
```typescript
// Always track costs and performance
const response = await katana.chat.completions.create({...});

// Log metrics
logger.info('AI request completed', {
  cost: response.cost,
  tokens: response.usage.total_tokens,
  latency: response.latency,
  cached: response.cached,
  model: response.model
});
```

---

## Repository Structure

```
costkatana-examples/
├── 1-cost-tracking/          # Track costs across providers
│   ├── http-headers/         # HTTP REST API examples
│   ├── npm-package/          # TypeScript/Node.js examples
│   ├── python-sdk/           # Python SDK examples
│   └── README.md             # Feature documentation
│
├── 10-webhooks/              # Real-time notifications
│   ├── http-headers/         # Webhook API examples
│   ├── npm-package/          # TypeScript webhook handlers
│   ├── python-sdk/           # Python webhook receivers
│   ├── frameworks/           # Express, Next.js, etc.
│   └── README.md             # Webhook guide
│
├── 14-cache/                 # Semantic caching
├── 13-workflows/             # AI orchestration
├── 27-agents/                # AI agents
└── ... (44 feature directories total)
```

**Each feature directory contains:**
- `README.md` - Complete feature documentation
- `http-headers/` - Direct HTTP API examples
- `npm-package/` - TypeScript/Node.js SDK examples
- `python-sdk/` - Python SDK examples
- `frameworks/` - Framework-specific integrations (when applicable)

---

## Supported Providers

Cost Katana works with all major AI providers:

- ✅ **OpenAI** (GPT-4, GPT-3.5, DALL-E)
- ✅ **Anthropic** (Claude 3 Opus/Sonnet/Haiku)
- ✅ **AWS Bedrock** (All models)
- ✅ **Google AI** (Gemini, PaLM)
- ✅ **Cohere** (Command, Embed)
- ✅ **Azure OpenAI** (All models)
- ✅ **DeepSeek** (DeepSeek models)
- ✅ **Groq** (Llama, Mixtral)
- ✅ **HuggingFace** (Open models)
- ✅ **Ollama** (Local models)
- ✅ **Replicate** (All models)

**300+ AI models supported** across all providers.

---

## Getting Help

### Documentation
📚 **Docs:** [docs.costkatana.com](https://docs.costkatana.com)  
🎓 **Tutorials:** [docs.costkatana.com/tutorials](https://docs.costkatana.com/tutorials)  
📖 **API Reference:** [docs.costkatana.com/api](https://docs.costkatana.com/api)

### Community
💬 **Discord:** [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)  
🐦 **Twitter:** [@costkatana](https://twitter.com/costkatana)  
🐙 **GitHub:** [github.com/costkatana](https://github.com/costkatana)

### Support
📧 **Email:** support@costkatana.com  
🌐 **Dashboard:** [costkatana.com/dashboard](https://costkatana.com/dashboard)  
📊 **Status:** [status.costkatana.com](https://status.costkatana.com)

---

## Contributing

We welcome contributions! Here's how to add your own examples:

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/my-example`)
3. **Add** your example following our structure:
   - Include HTTP, TypeScript, and Python versions
   - Add comprehensive README with use cases
   - Include error handling and best practices
   - Test with real API endpoints
4. **Commit** your changes (`git commit -m 'Add: My awesome example'`)
5. **Push** to your branch (`git push origin feature/my-example`)
6. **Open** a Pull Request

**Code Quality Guidelines:**
- ✅ Production-ready code with error handling
- ✅ Clear comments explaining the logic
- ✅ Type safety (TypeScript) and type hints (Python)
- ✅ Security best practices (no hardcoded keys)
- ✅ Real-world use cases in README

---

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Statistics

```
📊 Repository Metrics

Total Examples:     300+
Features Covered:   44
Languages:          TypeScript, Python, HTTP
Frameworks:         5 (Express, Next.js, Fastify, NestJS, FastAPI)
Lines of Code:      ~15,000+
Documentation:      50 comprehensive READMEs

Updated:            Weekly
Maintained by:      Cost Katana Team
Community:          1000+ developers
```

---

<div align="center">

### 🚀 Ready to Get Started?

**[Browse Examples](#complete-feature-list)** • **[Get API Key](https://costkatana.com/dashboard)** • **[Read Docs](https://docs.costkatana.com)** • **[Join Discord](https://discord.gg/D8nDArmKbY)**

---

**Built with ❤️ by the Cost Katana Team**

*Making AI development simpler, faster, and more cost-effective*

</div>
