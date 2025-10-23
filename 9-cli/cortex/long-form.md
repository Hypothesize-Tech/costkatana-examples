# CLI Example: Cortex for Long-Form Content

## Use Case: Content Generation

```bash
cost-katana ask "Write a comprehensive 2000-word guide on microservices architecture" --cortex --model gpt-4 --output microservices-guide.md
```

**Output:**
```
🥷 Generating content with Cortex optimization...

✅ Generated 2,147 words
💰 Cost: $0.0156 (saved $0.094 with Cortex!)
💾 Saved to microservices-guide.md
📊 Savings: 86%
```

## Without Cortex

```bash
$ cost-katana ask "Write a comprehensive 2000-word guide on microservices" --model gpt-4

💰 Cost: $0.1100
```

## With Cortex

```bash
$ cost-katana ask "Write a comprehensive 2000-word guide on microservices" --model gpt-4 --cortex

💰 Cost: $0.0156 (saved $0.094!)
📊 Savings: 86%
```

## Best Use Cases

- Blog posts & articles
- Technical documentation
- Educational content
- API documentation
- Comprehensive guides
- Research papers
- Tutorial content
