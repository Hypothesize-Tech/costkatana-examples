# CLI Example: Advanced Configuration

## Config File

Create `~/.cost-katana/config.json`:

```json
{
  "defaultModel": "gpt-4",
  "cortex": true,
  "cache": true,
  "retry": true,
  "temperature": 0.7,
  "maxTokens": 2000,
  "budget": {
    "daily": 10,
    "weekly": 50,
    "monthly": 200
  },
  "alerts": {
    "email": "user@example.com",
    "threshold": 0.75
  }
}
```

## View Current Config

```bash
cost-katana config
```

**Output:**
```json
{
  "model": "gpt-4",
  "cortex": true,
  "cache": true,
  "budget": {
    "daily": 10.00,
    "spent": 2.45,
    "remaining": 7.55
  }
}
```

## Update Config

```bash
# Set default model
cost-katana config set model gpt-4

# Enable Cortex
cost-katana config set cortex true

# Set temperature
cost-katana config set temperature 0.7

# Set daily budget
cost-katana config set budget.daily 20
```

## Environment Profiles

```bash
# Development
export COST_KATANA_ENV=dev
cost-katana config set model gpt-3.5-turbo

# Production
export COST_KATANA_ENV=prod
cost-katana config set model gpt-4
cost-katana config set cortex true
```

## Project-Specific Config

```bash
# In project directory, create .cost-katana.json
{
  "project": "my-app",
  "model": "claude-3-5-sonnet-20241022",
  "tags": ["production", "api"]
}
```

## Reset to Defaults

```bash
cost-katana config reset
```
