# Data Network Effects (Learning Loops)

> **Self-improving AI system that gets smarter with every user interaction**

Data Network Effects is Cost Katana's learning loop system where recommendations → outcomes → weight updates lead to continuous improvement for all users.

## Overview

The system implements a continuous learning cycle:

1. **Recommendations** - System suggests optimizations
2. **User Feedback** - Accept or reject suggestions
3. **Outcome Measurement** - Track actual results (cost, performance)
4. **Learning Signals** - Calculate recommendation quality and accuracy
5. **Weight Updates** - Adjust system for future recommendations
6. **Collective Intelligence** - Everyone benefits from shared learnings

## Features

- **Learning Loops** - Continuous improvement from user interactions
- **Performance Aggregation** - Collective intelligence from all users
- **Semantic Clustering** - Group similar use cases for insights
- **Global Benchmarks** - Compare against anonymized aggregate data
- **Recommendation Quality Tracking** - Measures accuracy of suggestions
- **Multi-Dimensional Learning** - Improves cost, speed, quality, satisfaction

## Quick Start

### TypeScript/Node.js
```bash
npm install cost-katana
export COST_KATANA_API_KEY=your_key_here
npx ts-node npm-package/basic-learning.ts
```

### Python
```bash
pip install costkatana
export COST_KATANA_API_KEY=your_key_here
python python-sdk/basic_learning.py
```

### HTTP REST
1. Open `http-headers/network-effects.http` in VS Code
2. Install [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
3. Update the API key
4. Click "Send Request"

## Examples

| File | Description |
|------|-------------|
| `npm-package/basic-learning.ts` | Track recommendations and outcomes |
| `npm-package/feedback-loop.ts` | Accept/reject suggestions |
| `npm-package/global-benchmarks.ts` | Compare against global data |
| `python-sdk/basic_learning.py` | Python learning loop example |
| `python-sdk/outcomes.py` | Track recommendation outcomes |
| `http-headers/network-effects.http` | HTTP API examples |

## Documentation

- [Full Documentation](https://docs.costkatana.com/features/network-effects)
- [API Reference](https://docs.costkatana.com/api/network-effects)
- [Best Practices](https://docs.costkatana.com/guides/network-effects)

## Support

- [Discord Community](https://discord.gg/D8nDArmKbY)
- [GitHub Issues](https://github.com/Hypothesize-Tech/costkatana-backend)
- [Email Support](mailto:support@costkatana.com)

