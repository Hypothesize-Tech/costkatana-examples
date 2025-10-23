# CLI Example: Model Selection

## List All Models

```bash
cost-katana models
```

**Output:**
```
Available Models:

OpenAI:
  • gpt-4           - Most capable
  • gpt-3.5-turbo   - Fast & cheap

Anthropic:
  • claude-3-5-sonnet-20241022 - Balanced
  • claude-3-haiku              - Fastest

Google:
  • gemini-pro   - Multimodal
  • gemini-flash - Ultra fast
```

## With Prices

```bash
cost-katana models --prices
```

**Output:**
```
Model            | Input ($/1M) | Output ($/1M)
-------------------------------------------------
gpt-4           | $30.00       | $60.00
gpt-3.5-turbo   | $0.50        | $1.50
claude-3-sonnet | $3.00        | $15.00
```

## Filter by Provider

```bash
cost-katana models --provider openai
```
