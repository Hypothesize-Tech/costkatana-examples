/**
 * Cost Katana Cache: Cache Control Operations
 * 
 * Clear, warmup, export, and import cache.
 * 
 * Run: npx ts-node 18-cache/npm-package/cache-control.ts
 */

import axios from 'axios';

const API_BASE = 'https://cost-katana-backend.store/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function clearCache(filters?: { model?: string; olderThan?: number }) {
  try {
    const params = new URLSearchParams();
    if (filters?.model) params.append('model', filters.model);
    if (filters?.olderThan) params.append('olderThan', filters.olderThan.toString());

    const response = await axios.delete(
      `${API_BASE}/cache/clear?${params.toString()}`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log('✅ Cache cleared:');
    console.log(`  Entries cleared: ${response.data.data.entriesCleared}`);
    console.log(`  Bytes freed: ${(response.data.data.bytesFreed / 1024 / 1024).toFixed(2)} MB`);

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function warmupCache(prompts: string[], model: string = 'gpt-4', ttl: number = 86400) {
  try {
    const response = await axios.post(
      `${API_BASE}/cache/warmup`,
      { prompts, model, ttl },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Cache warmup complete:');
    console.log(`  Cached: ${response.data.data.cached}`);
    console.log(`  Failed: ${response.data.data.failed}`);
    console.log(`  Total Cost: $${response.data.data.totalCost.toFixed(4)}`);

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function exportCache(format: 'json' | 'csv' = 'json') {
  try {
    const response = await axios.get(
      `${API_BASE}/cache/export?format=${format}`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );

    console.log(`✅ Cache exported (${format})`);
    console.log(`  Entries: ${response.data.entries?.length || 0}`);

    return response.data;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function importCache(entries: any[]) {
  try {
    const response = await axios.post(
      `${API_BASE}/cache/import`,
      { entries },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Cache import complete:');
    console.log(`  Imported: ${response.data.data.imported}`);
    console.log(`  Failed: ${response.data.data.failed}`);
    console.log(`  Duplicates: ${response.data.data.duplicates}`);

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  console.log('🥷 Cache Control Operations\n');

  try {
    // 1. Warmup cache
    console.log('1️⃣ Warming up cache...');
    await warmupCache([
      'What is AI?',
      'Explain machine learning',
      'What is deep learning?'
    ]);

    // 2. Export cache
    console.log('\n2️⃣ Exporting cache...');
    await exportCache();

    // 3. Clear old cache entries
    console.log('\n3️⃣ Clearing old cache entries...');
    await clearCache({ olderThan: 86400 }); // Older than 24 hours

    console.log('\n✅ Cache control operations complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { clearCache, warmupCache, exportCache, importCache };
