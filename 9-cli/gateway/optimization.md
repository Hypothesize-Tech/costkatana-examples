# CLI Example: Gateway with Optimization

## Enable All Features

```bash
cost-katana chat --cortex --cache --retry
```

**Output:**
```
🥷 Cost Katana Chat
Model: gpt-4 | Cortex: ON | Cache: ON | Retry: ON

You: Write a comprehensive guide to Docker
AI: [Generates 2000-word guide with 85% cost savings]
💰 Cost: $0.0089 (saved $0.059 with Cortex!)
💾 Cached for future use
✅ Auto-retry enabled

You: Write a comprehensive guide to Docker
AI: [Same response from cache]
💰 Cost: $0.0000 (FREE - from cache!)
```

## Benefits Combined

- **Cortex**: 40-75% cost savings
- **Cache**: 100% free on repeat requests
- **Retry**: Never fails on rate limits
- **Failover**: Switches providers if needed

## Production Setup

```bash
# Add to your shell profile (~/.zshrc or ~/.bashrc)
alias ck="cost-katana chat --cortex --cache --retry"

# Now just use:
ck
```
