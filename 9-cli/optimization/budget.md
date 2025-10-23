# CLI Example: Budget Tracking

## Set Daily Budget

```bash
cost-katana budget set --daily 10
```

**Output:**
```
✅ Daily budget set to $10.00
📊 Current spending today: $2.45
⚠️ You'll receive alerts at 75% and 90%
```

## Check Status

```bash
cost-katana budget status
```

**Output:**
```
Budget Status:

Daily Limit:    $10.00
Today's Spend:  $2.45 (24.5%)
Remaining:      $7.55

Weekly Limit:   $50.00
This Week:      $12.80 (25.6%)
Remaining:      $37.20

✅ Well under budget!
```

## Get Alerts

```bash
cost-katana budget alerts
```

Receive email/dashboard alerts when you hit 75% and 90% of your budget.
