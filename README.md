# Cost Katana Examples Repository

> **Complete collection of production-ready examples for every Cost Katana feature**

[![Documentation](https://img.shields.io/badge/docs-costkatana.com-blue)](https://docs.costkatana.com)
[![Discord](https://img.shields.io/badge/discord-join-7289da)](https://discord.gg/Wcwzw8wM)
[![GitHub](https://img.shields.io/badge/github-costkatana-black)](https://github.com/costkatana)

## 📚 **What's Inside?**

This repository contains **309 production-ready code examples** covering **50 Cost Katana features** with implementations in:
- 🟦 **HTTP REST APIs** - Direct API testing with `.http` files
- 🟩 **TypeScript/NPM** - Node.js and TypeScript integrations
- 🟨 **Python SDK** - Python implementations
- 🔧 **Frameworks** - Express, Next.js, Fastify, NestJS, FastAPI integrations

---

## 🚀 **Quick Start**

### Prerequisites
```bash
# Get your API key from: https://costkatana.com/dashboard
export COST_KATANA_API_KEY=your_key_here
```

### HTTP Examples (REST Client)
1. Install [REST Client for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Open any `.http` file
3. Click "Send Request"

### TypeScript Examples
```bash
npm install
export COST_KATANA_API_KEY=your_key_here
npx ts-node 10-webhooks/npm-package/create-webhook.ts
```

### Python Examples
```bash
pip install requests
export COST_KATANA_API_KEY=your_key_here
python 10-webhooks/python-sdk/basic-webhook.py
```

---

## 📑 **Complete Feature Index**

### **PHASE 1: Core Features (Sections 1-9)**

| Section | Feature | Files | Description |
|---------|---------|-------|-------------|
| **1** | [Cost Tracking](1-cost-tracking/) | 12 | Track AI request costs across providers |
| **2** | [Gateway](2-gateway/) | 8 | Unified API gateway for all AI providers |
| **3** | [Analytics](5-analytics/) | 6 | Cost analytics and insights |
| **4** | [Cortex](4-cortex/) | 10 | AI-powered prompt optimization (30-40% savings) |
| **5** | [Advanced](6-advanced/) | 4 | Advanced features and patterns |
| **6** | [Frameworks](7-frameworks/) | 15 | Express, Next.js, Fastify, NestJS integrations |
| **7** | [Python SDK](8-python-sdk/) | 18 | Complete Python package examples |
| **8** | [CLI](9-cli/) | 12 | Command-line interface examples |

---

### **PHASE 2: Infrastructure & Orchestration (Sections 10-22)**

| Section | Feature | Files | Description |
|---------|---------|-------|-------------|
| **10** | [🔔 Webhooks](10-webhooks/) | 20 | Real-time event notifications (65+ event types) |
| **11** | [📊 OpenTelemetry](11-observability/) | 19 | Distributed tracing & metrics export |
| **12** | [🛡️ Guardrails](12-guardrails/) | 4 | Content moderation & PII detection |
| **13** | [🔄 Workflows](13-workflows/) | 15 | Multi-step AI orchestration |
| **14** | [💾 Cache](14-cache/) | 12 | Semantic caching (30-40% cost reduction) |
| **15** | [🔐 Key Vault](15-key-vault/) | 12 | Secure API key management |
| **16** | [🔒 Security](16-security/) | 4 | Threat detection & scanning |
| **17** | [📈 Monitoring](17-monitoring/) | 4 | System health & performance |

---

### **PHASE 3: CRUD & Management (Sections 18-24)**

| Section | Feature | Files | Description |
|---------|---------|-------|-------------|
| **18** | [📁 Projects](18-projects/) | 4 | Project management & organization |
| **19** | [💰 Budgets](19-budgets/) | 4 | Budget tracking & alerts |
| **20** | [🧠 Memory](20-memory/) | 4 | Agent memory & context |
| **21** | [📝 Templates](21-templates/) | 4 | Reusable prompt templates |
| **22** | [⭐ Feedback](22-feedback/) | 4 | Request feedback & ratings |
| **23** | [🏷️ Tagging](23-tagging/) | 4 | Custom tagging system |
| **24** | [🧪 Experiments](24-experiments/) | 4 | A/B testing & experimentation |

---

### **PHASE 4: Specialized Features (Sections 25-44)**

| Section | Feature | Files | Description |
|---------|---------|-------|-------------|
| **25** | [📓 Notebooks](25-notebooks/) | 4 | Interactive analysis notebooks |
| **26** | [🔍 CKQL](26-ckql/) | 4 | SQL-like query language |
| **27** | [🤖 Agents](27-agents/) | 4 | AI agent management |
| **28** | [🔐 MFA](28-mfa/) | 4 | Multi-factor authentication |
| **29** | [🚨 Moderation](29-moderation/) | 4 | Content moderation |
| **30** | [❓ Unexplained Costs](30-unexplained-costs/) | 4 | Anomaly detection |
| **31** | [🎓 Cortex Training](31-cortex-training/) | 4 | Custom training data |
| **32** | [📧 Email Tracking](32-email-tracking/) | 4 | Email notifications |
| **33** | [💹 AI Cost Monitoring](33-ai-cost-monitoring/) | 4 | Real-time cost monitoring |
| **34** | [📥 Ingestion](34-ingestion/) | 4 | Data ingestion pipelines |
| **35** | [📡 User Telemetry](35-user-telemetry/) | 4 | Telemetry configuration |
| **36** | [👥 Team Management](36-team-management/) | 4 | Team collaboration |
| **37** | [📋 Audit Logs](37-audit-logs/) | 4 | Complete audit trail |
| **38** | [⚡ Rate Limiting](38-rate-limiting/) | 4 | Rate limit controls |
| **39** | [🔄 Failover](39-failover/) | 4 | Automatic provider failover |
| **40** | [🎯 Model Routing](40-model-routing/) | 4 | Intelligent model routing |
| **41** | [💡 Cost Optimization](41-cost-optimization/) | 4 | AI-powered recommendations |
| **42** | [🚨 Alerts](42-alerts/) | 4 | Custom alert management |
| **43** | [📊 Reports](43-reports/) | 4 | Automated report generation |
| **44** | [🔌 Integrations](44-integrations/) | 4 | Third-party integrations |

---

## 🎯 **Popular Use Cases**

### 1. **Cost Tracking**
```typescript
// Track costs across all AI providers
import { CostKatana } from 'cost-katana';

const client = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY });
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});
console.log('Cost:', response.cost); // Automatic cost calculation
```

### 2. **Semantic Caching (30-40% Savings)**
```bash
# Same request with semantic similarity
curl -X POST https://cost-katana-backend.store/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "X-Use-Cache: true" \
  -H "X-Cache-Threshold: 0.85" \
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "What is AI?"}]}'
```
**Result:** 70-90% cache hit rate = 30-40% cost reduction!

### 3. **Webhooks for Real-Time Alerts**
See [10-webhooks](10-webhooks/) for complete examples.
```python
# Get notified when costs exceed threshold
import requests

webhook = requests.post('https://cost-katana-backend.store/api/webhooks',
    headers={'Authorization': 'Bearer YOUR_KEY'},
    json={
        'url': 'https://your-app.com/webhook',
        'events': ['cost.threshold.exceeded'],
        'config': {'threshold': 100}
    })
```

### 4. **Multi-Step Workflows**
See [13-workflows](13-workflows/) for complete examples.
```typescript
// Orchestrate complex AI workflows
const workflow = await client.workflows.create({
  name: 'Content Pipeline',
  steps: [
    { name: 'generate', model: 'gpt-4', prompt: 'Write article' },
    { name: 'review', model: 'claude-3', prompt: 'Review: {{generate.output}}' },
    { name: 'optimize', model: 'gpt-3.5-turbo', prompt: 'Optimize: {{review.output}}' }
  ]
});
```

---

## 💎 **Code Quality**

All examples follow these standards:
- ✅ **Production-ready** - Full error handling
- ✅ **Type-safe** - TypeScript interfaces
- ✅ **Secure** - Best practices (HMAC verification, input validation)
- ✅ **Documented** - Inline comments explaining logic
- ✅ **Tested** - Real API endpoints (not mocks)
- ✅ **Copy-paste ready** - Use directly in your projects

---

## 📊 **Repository Statistics**

```
Total Files:           309
HTTP Examples:          65
TypeScript Files:       82
Python Files:           78
READMEs:                50
Framework Examples:     34
Total Lines of Code:    ~15,000+
```

### File Distribution
- 🟦 TypeScript: 27% (82 files)
- 🟨 Python: 25% (78 files)
- 🟩 HTTP: 21% (65 files)
- 📘 Documentation: 16% (50 READMEs)
- 🔧 Frameworks: 11% (34 files)

---

## 🛠️ **Framework Integrations**

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
  res.json({ response: response.choices[0].message, cost: response.cost });
});
```

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

---

## 💰 **Cost Savings Examples**

### Before Cost Katana:
```
1000 requests/day × $0.045/request = $45/day
Monthly: $1,350
Yearly: $16,425
```

### After Cost Katana (with caching):
```
1000 requests/day × 80% cache hit rate = 200 actual requests
200 requests × $0.045 = $9/day
Monthly: $270 (80% savings!)
Yearly: $3,285 (saved $13,140!)
```

### Additional Optimizations:
- **Cortex Optimization**: 30-40% token reduction
- **Model Routing**: Use cheaper models for simple tasks
- **Failover**: Automatic fallback to cheaper providers
- **Batch Processing**: Reduce per-request overhead

**Total Potential Savings: 70-90%** 💰

---

## 📖 **Learning Path**

### Beginner
1. Start with [Cost Tracking](1-cost-tracking/)
2. Try [Gateway](2-gateway/) for unified API
3. Explore [Analytics](5-analytics/)

### Intermediate
4. Set up [Webhooks](10-webhooks/) for alerts
5. Enable [Semantic Caching](14-cache/)
6. Use [Cortex](4-cortex/) optimization

### Advanced
7. Implement [Workflows](13-workflows/)
8. Configure [OpenTelemetry](11-observability/)
9. Set up [Guardrails](12-guardrails/) & [Security](16-security/)

### Expert
10. Use [CKQL](26-ckql/) for complex queries
11. Build [AI Agents](27-agents/)
12. Optimize with [Model Routing](40-model-routing/)

---

## 🔗 **Supported Providers**

- ✅ **OpenAI** - GPT-4, GPT-3.5, DALL-E
- ✅ **Anthropic** - Claude 3 Opus/Sonnet/Haiku
- ✅ **AWS Bedrock** - All models
- ✅ **Google AI** - Gemini, PaLM
- ✅ **Cohere** - Command, Embed
- ✅ **Azure OpenAI** - All models
- ✅ **DeepSeek** - DeepSeek models
- ✅ **Groq** - Llama, Mixtral
- ✅ **HuggingFace** - Open models
- ✅ **Ollama** - Local models
- ✅ **Replicate** - All models

---

## 🎓 **Best Practices**

### Security
```typescript
// ✅ DO: Use environment variables
const apiKey = process.env.COST_KATANA_API_KEY;

// ❌ DON'T: Hardcode API keys
const apiKey = 'ck_live_abc123'; // NEVER DO THIS
```

### Error Handling
```typescript
try {
  const response = await katana.chat.completions.create({...});
} catch (error) {
  if (error.status === 429) {
    // Handle rate limiting
    await exponentialBackoff();
  } else if (error.status === 500) {
    // Handle server errors
    await failover();
  }
  throw error;
}
```

### Caching Strategy
```typescript
// Use higher threshold for exact matches
const criticalResponse = await katana.chat.completions.create({
  model: 'gpt-4',
  messages: [...],
  cache: { enabled: true, threshold: 0.95 } // 95% similarity required
});

// Lower threshold for general queries
const generalResponse = await katana.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [...],
  cache: { enabled: true, threshold: 0.80 } // 80% similarity OK
});
```

---

## 📞 **Support & Resources**

- 📚 **Documentation**: [docs.costkatana.com](https://docs.costkatana.com)
- 🌐 **Website**: [costkatana.com](https://costkatana.com)
- 💬 **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/Wcwzw8wM)
- 📧 **Email**: support@costkatana.com
- 🐙 **GitHub**: [github.com/costkatana](https://github.com/costkatana)
- 🐦 **Twitter**: [@costkatana](https://twitter.com/costkatana)

---

## 🤝 **Contributing**

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Add your examples with proper documentation
4. Submit a pull request

**Guidelines:**
- Follow existing code style
- Include error handling
- Add inline comments
- Provide README documentation
- Test with real API endpoints

---

## 📄 **License**

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 **Acknowledgments**

**Created with:**
- 💻 Production-ready code standards
- 🔒 Security best practices
- 📖 Comprehensive documentation
- ✨ Developer experience in mind

**Special Thanks:**
- Cost Katana team
- Community contributors
- Beta testers
- Early adopters

---

## 🎯 **What's Next?**

1. **Explore Examples** - Browse the 50 sections
2. **Try HTTP Examples** - Use REST Client in VS Code
3. **Integrate SDK** - Add to your Node.js/Python project
4. **Set Up Webhooks** - Get real-time alerts
5. **Enable Caching** - Save 30-40% on costs
6. **Monitor Performance** - Use OpenTelemetry
7. **Optimize Prompts** - Try Cortex optimization
8. **Join Community** - Connect on Discord

---

<div align="center">

**Built with ❤️ by the Cost Katana Team**

[Get Started](https://costkatana.com) • [Documentation](https://docs.costkatana.com) • [Discord](https://discord.gg/Wcwzw8wM)

</div>
# costkatana-examples
