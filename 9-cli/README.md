# Cost Katana CLI Examples (`cost-katana-cli`)

**Chat with AI from your terminal. Track costs automatically.**

## Installation

```bash
npm install -g cost-katana-cli
```

## Quick Start

```bash
# Setup (one-time)
cost-katana init

# Start chatting
cost-katana chat
```

## Examples by Feature

### 1. Basic Commands
- [Interactive Chat](./basic/chat.md) - Real-time chat with AI
- [Quick Questions](./basic/ask.md) - Single-question mode
- [Model Selection](./basic/models.md) - Choose and compare models

### 2. Gateway Features
- [With Caching](./gateway/caching.md) - Save costs with cache
- [With Optimization](./gateway/optimization.md) - Enable Cortex

### 3. Optimization
- [Cost Comparison](./optimization/compare.md) - Compare model costs
- [Budget Tracking](./optimization/budget.md) - Set spending limits

### 4. Cortex
- [Enable Cortex](./cortex/enable.md) - 40-75% cost savings
- [Long-Form Content](./cortex/long-form.md) - Blog posts, articles

### 5. Advanced Usage
- [Workflows](./advanced/workflows.md) - Batch processing, piped input, daily routines
- [Automation & CI/CD](./advanced/automation.md) - GitHub Actions, cron jobs, hooks
- [Configuration](./advanced/configuration.md) - Config files, profiles, project settings

## Essential Commands

### Interactive Chat
```bash
# Basic chat
cost-katana chat

# With specific model
cost-katana chat --model claude-3-sonnet

# With system prompt
cost-katana chat --system "You are a coding expert"

# With Cortex optimization
cost-katana chat --cortex
```

### Quick Questions
```bash
# Single question
cost-katana ask "What is Docker?"

# Save to file
cost-katana ask "Explain Python" --output answer.md

# Different model
cost-katana ask "Write a poem" --model gpt-4
```

### Analytics
```bash
# View spending
cost-katana analyze

# Last 7 days
cost-katana analyze --days 7

# Export to CSV
cost-katana analyze --export costs.csv
```

### Model Management
```bash
# List available models
cost-katana models

# Filter by provider
cost-katana models --provider openai

# Show with prices
cost-katana models --prices
```

### Budget Control
```bash
# Set daily budget
cost-katana budget set --daily 10

# Check status
cost-katana budget status

# Get alerts
cost-katana budget alerts
```

## Chat Session Commands

While in a chat session:

- `help` - Show commands
- `cost` - Show session cost
- `models` - Switch model
- `clear` - Clear history
- `save` - Save conversation
- `quit` - Exit

## Configuration

```bash
# View current config
cost-katana config

# Update default model
cost-katana config set model gpt-4

# Set temperature
cost-katana config set temperature 0.7
```

## Environment Variables

```bash
# Alternative to init command
export COST_KATANA_API_KEY="dak_your_key"
export COST_KATANA_MODEL="gpt-4"
```

## Real-World Workflows

### Code Review Assistant
```bash
$ cost-katana chat --system "You are a senior developer. Be concise."

You: Review this code: [paste code]
AI: Here are the issues...
💰 Cost: $0.0045

You: How do I fix issue #2?
AI: Here's how to fix it...
💰 Session: $0.0067
```

### Content Generation
```bash
$ cost-katana chat --model gpt-4 --cortex

You: Write a blog post about AI
AI: [Generates comprehensive post with 70% cost savings]
💰 Cost: $0.0123 (saved $0.041 with Cortex!)
```

### Quick Documentation
```bash
# Get quick answers
$ cost-katana ask "How to use async/await in JavaScript?"
> Async/await is used for handling asynchronous operations...
💰 Cost: $0.0002

# Save to file
$ cost-katana ask "Python best practices" --output best-practices.md
✅ Saved to best-practices.md
```

## Cost Optimization Tips

### Use Cheaper Models for Simple Tasks
```bash
# For simple questions (10x cheaper)
cost-katana chat --model gpt-3.5-turbo

# For complex analysis
cost-katana chat --model gpt-4
```

### Enable Cortex for Long Content
```bash
# 40-75% savings on long-form content
cost-katana chat --cortex
```

### Enable Caching
```bash
# Free repeated answers
cost-katana chat --cache
```

## Comparison

### Traditional AI CLIs
- Complex setup with multiple API keys
- Different commands for each provider
- No cost visibility
- No optimization

### Cost Katana CLI
- Simple 2-step setup
- One command for all providers
- Real-time cost tracking
- Built-in 40-75% optimization
- Dashboard integration

## Features

- ✅ Universal AI access (all providers)
- ✅ Real-time cost tracking
- ✅ 40-75% cost savings with Cortex
- ✅ Smart caching
- ✅ Budget alerts
- ✅ Beautiful terminal UI
- ✅ Conversation history
- ✅ Dashboard integration

## Dashboard Integration

All CLI usage is automatically tracked at [costkatana.com/dashboard](https://costkatana.com/dashboard):

- Real-time cost tracking
- Usage by model
- Daily/weekly/monthly stats
- Budget alerts
- Optimization recommendations

## Troubleshooting

### "API key not found"
```bash
# Re-run init
cost-katana init

# Or set environment variable
export COST_KATANA_API_KEY="dak_your_key"
```

### "Model not available"
```bash
# List available models
cost-katana models

# Try a different model
cost-katana chat --model gpt-3.5-turbo
```

### "Rate limit exceeded"
```bash
# CLI automatically retries
# Try a different model if persistent
cost-katana chat --model claude-3-haiku
```

## Support

- **Docs**: [docs.costkatana.com/cli](https://docs.costkatana.com/cli)
- **NPM**: [npmjs.com/package/cost-katana-cli](https://www.npmjs.com/package/cost-katana-cli)
- **GitHub**: [github.com/Hypothesize-Tech/costkatana-cli](https://github.com/Hypothesize-Tech/costkatana-cli)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**Start chatting with AI in your terminal!**

```bash
npm install -g cost-katana-cli
cost-katana init
cost-katana chat
```

