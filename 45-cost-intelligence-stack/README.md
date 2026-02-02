# Cost Intelligence Stack

> **6-Layer real-time cost intelligence system with continuous analysis and automated recommendations**

The Cost Intelligence Stack provides comprehensive cost insights through a multi-layered architecture that captures, analyzes, routes, enforces, caches, and simulates AI operations.

## Overview

The Cost Intelligence Stack consists of 6 layers:

1. **Layer 1: Telemetry** - Real-time data capture with streaming support
2. **Layer 2: Intelligence** - Continuous analysis with anomaly detection
3. **Layer 3: Routing** - Telemetry-driven routing with plan-tier mapping
4. **Layer 4: Enforcement** - Pre-flight checks and budget limits
5. **Layer 5: Caching** - Exact, semantic, and deduplication caching
6. **Layer 6: Simulation** - What-if scenarios and alternative suggestions

## Features

- **Real-time Insights** - Live cost tracking and trend analysis
- **Anomaly Detection** - AI-powered detection of unusual spending patterns
- **Automated Recommendations** - Continuous optimization suggestions
- **Performance Modes** - Configurable modes (low, medium, high)
- **Telemetry Streaming** - Real-time data streaming for immediate analysis
- **Simulation Engine** - Test scenarios before applying changes

## Quick Start

### TypeScript/Node.js
```bash
npm install cost-katana
export COST_KATANA_API_KEY=your_key_here
npx ts-node npm-package/basic-intelligence.ts
```

### Python
```bash
pip install costkatana
export COST_KATANA_API_KEY=your_key_here
python python-sdk/basic_intelligence.py
```

### HTTP REST
1. Open `http-headers/intelligence.http` in VS Code
2. Install [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
3. Update the API key
4. Click "Send Request"

## Examples

| File | Description |
|------|-------------|
| `npm-package/basic-intelligence.ts` | Get cost intelligence insights |
| `npm-package/configure-intelligence.ts` | Configure intelligence modes |
| `npm-package/real-time-telemetry.ts` | Stream telemetry data |
| `python-sdk/basic_intelligence.py` | Python intelligence example |
| `python-sdk/anomaly_detection.py` | Detect cost anomalies |
| `python-sdk/simulation.py` | Run what-if simulations |
| `http-headers/intelligence.http` | HTTP API examples |

## Documentation

- [Full Documentation](https://docs.costkatana.com/features/cost-intelligence)
- [API Reference](https://docs.costkatana.com/api/intelligence)
- [Best Practices](https://docs.costkatana.com/guides/intelligence)

## Support

- [Discord Community](https://discord.gg/D8nDArmKbY)
- [GitHub Issues](https://github.com/Hypothesize-Tech/costkatana-backend)
- [Email Support](mailto:support@costkatana.com)

