# CLI Example: Cost Comparison

## Compare Models

```bash
cost-katana compare "Explain quantum computing" --models gpt-4,claude-3-sonnet,gemini-pro
```

**Output:**
```
Comparing models for: "Explain quantum computing"

Model                 | Cost      | Tokens | Time
------------------------------------------------------
gpt-4                | $0.0045   | 150    | 2.3s
claude-3-sonnet      | $0.0023   | 145    | 1.9s
gemini-pro           | $0.0008   | 160    | 1.5s

💡 Cheapest: gemini-pro (82% savings vs gpt-4)
⚡ Fastest: gemini-pro
```
