# Quick Start Guide

Get up and running with Cost Katana examples in 5 minutes!

## 🚀 Setup (2 minutes)

### 1. Prerequisites

- Node.js 18+ installed
- Cost Katana API key ([Get one here](https://costkatana.com/settings/api-keys))
- For **gateway** examples: only `COST_KATANA_API_KEY` is required
- For **direct provider** examples: an OpenAI / Anthropic / etc. key as noted per folder

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/cost-katana/costkatana-examples.git
cd costkatana-examples

# Install dependencies
npm install
```

### 3. Configuration

```bash
# Copy environment template
cp shared/env.example .env

# Edit .env file
nano .env  # or use your favorite editor
```

**Minimum for gateway + dashboard:**
```bash
COST_KATANA_API_KEY=dak_your_api_key_here
```

**Recommended (per-project analytics):**
```bash
PROJECT_ID=your_project_id_here
```

**Direct provider examples** (when not using the hosted gateway for that call):
```bash
OPENAI_API_KEY=sk-your_openai_key  # or ANTHROPIC_API_KEY, etc.
```

## 🎯 Run Your First Example (3 minutes)

### Option 0: Add headers to existing OpenAI calls (no SDK)

**No code refactor** — keep calling `api.openai.com` and add Cost Katana headers:

```http
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer YOUR_OPENAI_KEY
CostKatana-Auth: Bearer YOUR_COSTKATANA_KEY
CostKatana-Project-Id: YOUR_PROJECT_ID
```

`CostKatana-Project-Id` is optional if you only need account-level tracking.

See: `1-cost-tracking/http-headers/openai.http`

### Option 1: Gateway in TypeScript (`gateway()` — least configuration)

Uses **`cost-katana`** and only **`COST_KATANA_API_KEY`** in `.env` for most `2-gateway` samples:

```bash
npm run example 2-gateway/npm-package/basic-routing.ts
```

Other one-liner-friendly gateway scripts: `2-gateway/npm-package/without-tracking.ts`, `with-caching.ts`, `with-retry.ts`.

### Option 2: NPM cost-tracking example (direct provider)

1. **Run an example**
   ```bash
   npm run example 1-cost-tracking/npm-package/openai.ts
   ```

2. **See the output** (cost + tokens in the terminal)

3. **View in dashboard**
   - [costkatana.com/dashboard](https://costkatana.com/dashboard)

### Option 3: HTTP file (VS Code REST Client)

1. Install **REST Client** (Huachao Mao) in VS Code  
2. Open `1-cost-tracking/http-headers/openai.http` (or `2-gateway/http-headers/without-tracking.http`)  
3. Replace placeholders and click **Send Request**  
4. Check the [dashboard](https://costkatana.com/dashboard)

## 📚 What to Explore Next

### By Goal

**Save Money**
```bash
# See 100% savings with caching
npm run example 2-gateway/npm-package/with-caching.ts

# See 40-75% savings with Cortex
npm run example 4-cortex/npm-package/basic-cortex.ts
```

**High Availability**
```bash
# Automatic retries
npm run example 2-gateway/npm-package/with-retry.ts

# Multi-provider failover
npm run example 6-advanced/npm-package/multi-provider-failover.ts
```

**Security**
```bash
# Security firewall
npm run example 2-gateway/npm-package/with-firewall.ts
```

### By Provider

**OpenAI**
- HTTP: `1-cost-tracking/http-headers/openai.http`
- NPM: `npm run example 1-cost-tracking/npm-package/openai.ts`

**Anthropic**
- HTTP: `1-cost-tracking/http-headers/anthropic.http`
- NPM: `npm run example 1-cost-tracking/npm-package/anthropic.ts`

**AWS Bedrock**
- NPM: `npm run example 1-cost-tracking/npm-package/aws-bedrock.ts`

**Google AI**
- HTTP: `1-cost-tracking/http-headers/google-ai.http`

**And more!** See [README.md](./README.md) for the feature index.

## 💡 Common Use Cases

### 1. Enable Caching to Save 100%
**For repeated requests:**

```http
CostKatana-Cache-Enabled: true
CostKatana-Semantic-Cache-Enabled: true
```

See: `2-gateway/http-headers/with-caching.http`

### 2. Use Cortex for 40-75% Savings
**For long-form content:**

```typescript
const response = await ai('gpt-4', longPrompt, { cortex: true });
```

See: `4-cortex/npm-package/basic-cortex.ts`

### 3. Build Production API
**Full Express.js example:**

```bash
npm run example 7-frameworks/express/index.ts
```

Then visit: `http://localhost:3000/api/chat`

## 🔍 Browse Examples

### By Feature
- [Cost Tracking](./1-cost-tracking/) - Track usage and costs
- [Gateway](./2-gateway/) - Caching, retries, security
- [Optimization](./3-optimization/) - 20-40% savings
- [Cortex](./4-cortex/) - 40-75% savings
- [Analytics](./5-analytics/) - Reports and exports
- [Advanced](./6-advanced/) - Complex use cases
- [Frameworks](./7-frameworks/) - Express, Next.js, etc.

### Full Index
See [README.md](./README.md) for complete navigation.

## 📊 Expected Results

After running examples, you'll see:

1. **In Terminal**
   - Formatted output with costs
   - Token usage
   - Response previews

2. **In Dashboard**
   - All requests tracked
   - Cost breakdowns
   - Usage analytics
   - Savings reports

3. **In Code**
   - Production-ready patterns
   - Best practices
   - Error handling
   - Real-world examples

## 🆘 Troubleshooting

### "Module not found"
```bash
npm install
```

### "Invalid API key"
Check your `.env` file:
```bash
cat .env
```

### "Command not found: npm run example"
Update package.json:
```json
{
  "scripts": {
    "example": "ts-node"
  }
}
```

### Examples not working?
1. Check API keys are valid
2. Check you have credits with provider
3. Check network connection
4. See detailed logs in terminal

## 💬 Get Help

- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)
- **Email**: support@costkatana.com
- **Docs**: [docs.costkatana.com](https://docs.costkatana.com)
- **Dashboard**: [costkatana.com](https://costkatana.com)

## ⭐ Next Steps

1. **Try different providers** - Compare costs
2. **Enable caching** - Save on repeated requests
3. **Use Cortex** - Maximum savings on long content
4. **Integrate your app** - See framework examples
5. **Monitor in dashboard** - Analyze and optimize

---

**Ready?** Start with the gateway (simplest):
```bash
npm run example 2-gateway/npm-package/basic-routing.ts
```

Or add headers to your existing OpenAI client (Option 0 above), or run full cost-tracking:
```bash
npm run example 1-cost-tracking/npm-package/openai.ts
```