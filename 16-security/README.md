# Cost Katana Security Examples

**Threat detection, security scanning, and compliance monitoring.**

## Quick Start
```bash
curl -X POST https://cost-katana-backend.store/api/security/scan \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"type": "request", "data": {"prompt": "Check this"}}'
```

## Features
✅ Prompt Injection Detection
✅ Rate Limit Abuse Detection
✅ Anomaly Detection
✅ Compliance Monitoring

## Examples
- **[security-scan.http](./http-headers/security-scan.http)** - HTTP examples
- **[security.ts](./npm-package/security.ts)** - TypeScript
- **[security.py](./python-sdk/security.py)** - Python
