/**
 * Cost Katana Key Vault: Analytics
 * 
 * Run: npx ts-node 19-key-vault/npm-package/key-analytics.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.costkatana.com/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function getKeyVaultDashboard() {
  const response = await axios.get(
    `${API_BASE}/key-vault/dashboard`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log('📊 Key Vault Dashboard:');
  console.log(`  Provider Keys: ${response.data.data.providerKeys}`);
  console.log(`  Proxy Keys: ${response.data.data.proxyKeys}`);
  return response.data.data;
}

async function getProxyKeyAnalytics() {
  const response = await axios.get(
    `${API_BASE}/key-vault/analytics`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log('📈 Proxy Key Analytics:');
  console.log(`  Total Requests: ${response.data.data.totalRequests}`);
  console.log(`  Total Cost: $${response.data.data.totalCost}`);
  return response.data.data;
}

async function main() {
  console.log('🥷 Key Vault: Analytics\n');
  await getKeyVaultDashboard();
  await getProxyKeyAnalytics();
}

if (require.main === module) main();
export { getKeyVaultDashboard, getProxyKeyAnalytics };
