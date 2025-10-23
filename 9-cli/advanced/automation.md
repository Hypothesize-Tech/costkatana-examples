# CLI Example: Automation & CI/CD

## GitHub Actions

```yaml
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Cost Katana
        run: |
          npm install -g cost-katana-cli
          echo "COST_KATANA_API_KEY=${{ secrets.COST_KATANA_API_KEY }}" >> $GITHUB_ENV
      
      - name: AI Code Review
        run: |
          git diff origin/main | cost-katana ask "Review this code" --cortex > review.md
          cat review.md
      
      - name: Check Budget
        run: cost-katana budget status
```

## Cron Job for Daily Reports

```bash
# Add to crontab: crontab -e
0 9 * * * /usr/local/bin/cost-katana analyze --days 1 | mail -s "Daily AI Report" team@company.com
```

## Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Review staged changes
git diff --cached | cost-katana ask "Quick code review" --model gpt-3.5-turbo

# Continue with commit
exit 0
```

## Slack Integration

```bash
#!/bin/bash
# Post daily report to Slack

REPORT=$(cost-katana analyze --days 1)
curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
  -H 'Content-Type: application/json' \
  -d "{\"text\":\"$REPORT\"}"
```

## Docker Container

```dockerfile
FROM node:18
RUN npm install -g cost-katana-cli
ENV COST_KATANA_API_KEY=""
CMD ["cost-katana", "chat"]
```

```bash
docker build -t my-ai-cli .
docker run -e COST_KATANA_API_KEY=your_key -it my-ai-cli
```
