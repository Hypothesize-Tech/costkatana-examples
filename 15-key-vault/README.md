# Cost Katana Key Vault Examples

**Securely manage API keys with proxy keys, rate limiting, and budget controls.**

The Key Vault provides enterprise-grade API key management with proxy keys that add an extra security layer, rate limiting, budget controls, and detailed usage analytics.

## Quick Start

### 1. Store Provider Key

```bash
curl -X POST https://cost-katana-backend.store/api/key-vault/provider-keys \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"provider": "openai", "apiKey": "sk-proj-...", "name": "Production Key"}'
```

### 2. Create Proxy Key

```bash
curl -X POST https://cost-katana-backend.store/api/key-vault/proxy-keys \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "Frontend Proxy",
    "permissions": ["chat"],
    "rateLimit": {"requestsPerMinute": 60},
    "budgetLimit": 100
  }'
```

### 3. Use Proxy Key

```bash
curl -X POST https://cost-katana-backend.store/api/gateway/v1/chat/completions \
  -H "Authorization: Bearer pk_your_proxy_key" \
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "Hello"}]}'
```

## Examples

### HTTP Headers (.http files)
- **[provider-keys.http](./http-headers/provider-keys.http)** - Manage provider API keys
- **[proxy-keys.http](./http-headers/proxy-keys.http)** - Create and manage proxy keys
- **[analytics.http](./http-headers/analytics.http)** - View key usage analytics

### NPM/TypeScript
- **[key-vault.ts](./npm-package/key-vault.ts)** - Provider key management
- **[proxy-keys.ts](./npm-package/proxy-keys.ts)** - Proxy key operations
- **[key-analytics.ts](./npm-package/key-analytics.ts)** - Usage analytics

### Python SDK
- **[key_vault.py](./python-sdk/key_vault.py)** - Provider keys
- **[proxy_keys.py](./python-sdk/proxy_keys.py)** - Proxy keys
- **[key_analytics.py](./python-sdk/key_analytics.py)** - Analytics

## Features

### Proxy Keys
✅ Rate limiting (per minute/hour/day)
✅ Budget limits
✅ Model restrictions
✅ Permission controls
✅ Expiration dates
✅ Easy revocation
✅ Usage analytics

### Security
✅ Encrypted storage
✅ Never expose real keys
✅ Instant revocation
✅ Audit logs
✅ Access controls

## Use Cases

### 1. Frontend Applications
Safely expose AI capabilities to frontend without revealing real API keys.

### 2. Third-Party Integrations
Provide limited access to partners with budget and rate controls.

### 3. Team Management
Issue keys per team member with usage tracking.

## Support
- **Docs**: [docs.costkatana.com/key-vault](https://docs.costkatana.com/key-vault)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**🥷 Secure API key management with proxy keys!**
