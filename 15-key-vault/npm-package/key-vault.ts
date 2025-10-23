/**
 * Cost Katana Key Vault: Provider Keys Management
 * 
 * Run: npx ts-node 19-key-vault/npm-package/key-vault.ts
 */

import axios from 'axios';

const API_BASE = 'https://cost-katana-backend.store/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function createProviderKey(provider: string, apiKey: string, name: string) {
  const response = await axios.post(
    `${API_BASE}/key-vault/provider-keys`,
    { provider, apiKey, name },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log(`✅ Created ${provider} key: ${response.data.data.id}`);
  return response.data.data;
}

async function listProviderKeys() {
  const response = await axios.get(
    `${API_BASE}/key-vault/provider-keys`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log(`📋 Found ${response.data.data.length} provider keys`);
  return response.data.data;
}

async function main() {
  console.log('🥷 Key Vault: Provider Keys\n');
  await createProviderKey('openai', 'sk-proj-...', 'Production Key');
  await listProviderKeys();
}

if (require.main === module) main();
export { createProviderKey, listProviderKeys };
