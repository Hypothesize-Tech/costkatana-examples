# CLI Example: Quick Questions

## Single Question

```bash
cost-katana ask "What is the capital of France?"
```

**Output:**
```
> The capital of France is Paris.
💰 Cost: $0.0001
```

## Save to File

```bash
cost-katana ask "Explain async/await in JavaScript" --output answer.md
```

## With Different Model

```bash
cost-katana ask "Write a haiku about coding" --model gpt-4
```
