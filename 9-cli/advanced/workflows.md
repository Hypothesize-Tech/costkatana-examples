# CLI Example: Advanced Workflows

## 1. Batch Processing

```bash
# Process multiple files
for file in *.txt; do
  cost-katana ask "Summarize this: $(cat $file)" --output "summary_$file"
done
```

## 2. Piped Input

```bash
# Use CLI in pipes
echo "Explain Docker" | cost-katana ask

# From git logs
git log --oneline -10 | cost-katana ask "Summarize these commits"

# From curl
curl https://api.github.com/repos/docker/docker | cost-katana ask "Analyze this repo"
```

## 3. Daily Standup

```bash
# Morning routine
cost-katana ask "What are the top 3 AI trends today?" --model gpt-4 --cortex

# Check costs
cost-katana budget status

# View analytics
cost-katana analyze --days 7
```

## 4. Code Review

```bash
# Review code changes
git diff | cost-katana ask "Review this code and suggest improvements"

# Explain errors
npm test 2>&1 | cost-katana ask "Explain these test failures"
```

## 5. Documentation Helper

```bash
# Generate docs from code
cat src/api/*.ts | cost-katana ask "Generate API documentation" --output API.md

# Update README
cost-katana ask "Write a README for a React component library" --output README.md
```

## 6. Multi-Model Comparison

```bash
# Compare responses across models
for model in gpt-4 claude-3-5-sonnet-20241022 gemini-pro; do
  echo "\n=== $model ==="
  cost-katana ask "Explain quantum computing" --model $model
done
```

## 7. Cost Tracking Script

```bash
#!/bin/bash
# daily-ai-report.sh

echo "Daily AI Usage Report"
echo "===================="
cost-katana analyze --days 1
cost-katana budget status
cost-katana models --usage
```
