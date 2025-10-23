/**
 * Cost Katana Cache: Monitor Cache Statistics
 * 
 * Track cache performance and cost savings.
 * 
 * Run: npx ts-node 18-cache/npm-package/cache-stats.ts
 */

import axios from 'axios';
import CostKatana from 'cost-katana';

const API_BASE = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

const client = new CostKatana({ apiKey: API_KEY! });

async function getCacheStats() {
  try {
    const response = await axios.get(
      `${API_BASE}/cache/stats`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    const stats = response.data.data;

    console.log('📊 Cache Statistics:\n');
    console.log('Redis Cache:');
    console.log(`  Hits: ${stats.redis.hits}`);
    console.log(`  Misses: ${stats.redis.misses}`);
    console.log(`  Total Requests: ${stats.redis.totalRequests}`);
    console.log(`  Hit Rate: ${stats.redis.hitRate.toFixed(2)}%`);
    console.log(`  Cost Saved: $${stats.redis.costSaved.toFixed(2)}`);
    console.log(`  Tokens Saved: ${stats.redis.tokensSaved.toLocaleString()}`);
    
    console.log('\nCombined Statistics:');
    console.log(`  Total Hit Rate: ${stats.combined.hitRate.toFixed(2)}%`);
    console.log(`  Total Cost Saved: $${stats.combined.totalCostSaved.toFixed(2)}`);
    console.log(`  Avg Cost Saved/Request: $${stats.combined.averageCostSaved.toFixed(4)}`);

    return stats;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function demonstrateCaching() {
  console.log('\n🥷 Cache Demonstration\n');

  // First request (cache miss)
  console.log('1️⃣ First request (cache miss)...');
  const response1 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is the capital of France?' }]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Cache-TTL': '3600'
    }
  });

  console.log(`  Cache Status: ${response1.headers?.['x-cache-status']}`);
  console.log(`  Response: ${response1.choices[0].message.content?.substring(0, 50)}...`);

  // Second request (cache hit)
  console.log('\n2️⃣ Second request (cache hit)...');
  const response2 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is the capital of France?' }]
  }, {
    headers: { 'X-Enable-Cache': 'true' }
  });

  console.log(`  Cache Status: ${response2.headers?.['x-cache-status']}`);
  console.log(`  Cost Saved: $${response2.headers?.['x-cost-saved']}`);
  console.log(`  Tokens Saved: ${response2.headers?.['x-tokens-saved']}`);

  // Semantic match (similar query)
  console.log('\n3️⃣ Semantically similar request...');
  const response3 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Tell me the capital city of France' }]
  }, {
    headers: { 'X-Enable-Cache': 'true' }
  });

  console.log(`  Cache Status: ${response3.headers?.['x-cache-status']}`);
  console.log(`  Similarity Score: ${response3.headers?.['x-similarity-score']}`);
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  try {
    await getCacheStats();
    await demonstrateCaching();
    
    console.log('\n✅ Cache statistics demo complete!');
    console.log('\n💡 Benefits:');
    console.log('  • 70-90% cache hit rate typical');
    console.log('  • 30-40% cost reduction');
    console.log('  • Instant responses from cache');
    console.log('  • Semantic similarity matching');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { getCacheStats, demonstrateCaching };
