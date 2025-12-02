/**
 * Cost Katana Key Vault: Proxy Keys
 * 
 * Run: npx ts-node 19-key-vault/npm-package/proxy-keys.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.costkatana.com/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function createProxyKey(config: any) {
  const response = await axios.post(
    `${API_BASE}/key-vault/proxy-keys`,
    config,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log(`✅ Created proxy key: ${response.data.data.proxyKey}`);
  return response.data.data;
}

async function listProxyKeys() {
  const response = await axios.get(
    `${API_BASE}/key-vault/proxy-keys`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log(`📋 Found ${response.data.data.length} proxy keys`);
  return response.data.data;
}

async function main() {
  console.log('🥷 Key Vault: Proxy Keys\n');
  await createProxyKey({
    name: 'Frontend Key',
    permissions: ['chat'],
    rateLimit: { requestsPerMinute: 60 },
    budgetLimit: 100
  });
  await listProxyKeys();
}

if (require.main === module) main();
export { createProxyKey, listProxyKeys };
