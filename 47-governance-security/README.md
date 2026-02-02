# AI Governance & Security

> **Zero-trust agent governance with comprehensive security controls**

AI Governance & Security provides enterprise-grade controls for AI agents with zero-trust architecture, RBAC, sandbox execution, and comprehensive auditing.

## Overview

The Governance system implements defense-in-depth with 6 security layers:

1. **Layer 1: Identity Verification** - Zero-trust agent authentication
2. **Layer 2: Permission Checks** - Role-based access control (RBAC)
3. **Layer 3: Rate Limiting** - Hierarchical rate limits
4. **Layer 4: Budget Validation** - Multi-level budget caps
5. **Layer 5: Sandbox Isolation** - Resource-constrained execution
6. **Layer 6: Audit Trails** - Comprehensive decision logging

## Features

- **Agent Identity Management** - Secure token-based authentication
- **Capability Management** - Fine-grained permissions for models and providers
- **Sandbox Execution** - Isolated agent execution with CPU/memory/disk limits
- **Budget Controls** - Per-request, daily, and monthly budget caps
- **Rate Limiting** - Per-minute, per-hour, and concurrent execution limits
- **Audit Logging** - Forensic-level logging of all agent decisions

## Quick Start

### TypeScript/Node.js
```bash
npm install cost-katana
export COST_KATANA_API_KEY=your_key_here
npx ts-node npm-package/create-agent.ts
```

### Python
```bash
pip install costkatana
export COST_KATANA_API_KEY=your_key_here
python python-sdk/create_agent.py
```

### HTTP REST
1. Open `http-headers/governance.http` in VS Code
2. Install [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
3. Update the API key
4. Click "Send Request"

## Examples

| File | Description |
|------|-------------|
| `npm-package/create-agent.ts` | Create governed AI agent |
| `npm-package/configure-rbac.ts` | Configure role-based access |
| `npm-package/sandbox-execution.ts` | Execute agents in sandbox |
| `python-sdk/create_agent.py` | Python agent creation |
| `python-sdk/audit_logs.py` | Access audit trails |
| `http-headers/governance.http` | HTTP API examples |

## Documentation

- [Full Documentation](https://docs.costkatana.com/features/governance)
- [API Reference](https://docs.costkatana.com/api/governance)
- [Best Practices](https://docs.costkatana.com/guides/governance)

## Support

- [Discord Community](https://discord.gg/D8nDArmKbY)
- [GitHub Issues](https://github.com/Hypothesize-Tech/costkatana-backend)
- [Email Support](mailto:support@costkatana.com)

