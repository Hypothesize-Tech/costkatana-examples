# Quick Start Guide

Get up and running with Cost Katana examples in 5 minutes!

## 🚀 Setup (2 minutes)

### 1. Prerequisites

- Node.js 18+ installed
- Cost Katana API key ([Get one here](https://costkatana.com/settings/api-keys))
- At least one AI provider API key (OpenAI, Anthropic, etc.)

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

**Required variables:**
```bash
COST_KATANA_API_KEY=dak_your_api_key_here
PROJECT_ID=your_project_id_here
OPENAI_API_KEY=sk-your_openai_key  # or another provider
```

## 🎯 Run Your First Example (3 minutes)

### Option 1: HTTP Example (Simplest)

1. **Install VS Code REST Client extension**
   - Open VS Code
   - Install "REST Client" extension by Huachao Mao

2. **Open any `.http` file**
   ```
   1-cost-tracking/http-headers/openai.http
   ```

3. **Update placeholder keys**
   - Replace `YOUR_COSTKATANA_KEY` with your key
   - Replace `YOUR_OPENAI_KEY` with your OpenAI key
   - Replace `YOUR_PROJECT_ID` with your project ID

4. **Click "Send Request"**
   - Look for the "Send Request" link above the POST line
   - Click it and see the response!

5. **View tracked data**
   - Go to [costkatana.com/dashboard](https://costkatana.com/dashboard)
   - See your request tracked with costs!

### Option 2: NPM Example (Best DX)

1. **Run an example**
   ```bash
   npm run example 1-cost-tracking/npm-package/openai.ts
   ```

2. **See the output**
   ```
   🚀 OpenAI Cost Tracking Examples

   📝 Example 1: Simple GPT-4 Request
   ============================================================
     GPT-4 Response
   ============================================================
   Text Preview         : Quantum computing is...
   Cost                 : $0.030000
   Tokens               : 450
   Model                : gpt-4
   Provider             : OpenAI
   ============================================================
   ```

3. **View in dashboard**
   - [costkatana.com/dashboard](https://costkatana.com/dashboard)

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

**And more!** See [INDEX.md](./INDEX.md) for all examples.

## 💡 Common Use Cases

### 1. Track Costs for Existing API
**No code changes needed!** Just add headers:

```http
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer YOUR_OPENAI_KEY
CostKatana-Auth: Bearer YOUR_COSTKATANA_KEY
CostKatana-Project-Id: YOUR_PROJECT_ID
```

See: `1-cost-tracking/http-headers/openai.http`

### 2. Enable Caching to Save 100%
**For repeated requests:**

```http
CostKatana-Cache-Enabled: true
CostKatana-Semantic-Cache-Enabled: true
```

See: `2-gateway/http-headers/with-caching.http`

### 3. Use Cortex for 40-75% Savings
**For long-form content:**

```typescript
const response = await ai('gpt-4', longPrompt, { cortex: true });
```

See: `4-cortex/npm-package/basic-cortex.ts`

### 4. Build Production API
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
See [INDEX.md](./INDEX.md) for complete navigation.

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

**Ready?** Start with:
```bash
npm run example 1-cost-tracking/npm-package/openai.ts
```