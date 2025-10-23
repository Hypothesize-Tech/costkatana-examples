/**
 * Cost Katana Cache: Semantic Caching
 * 
 * Advanced semantic similarity caching for AI requests.
 * 
 * Run: npx ts-node 18-cache/npm-package/semantic-caching.ts
 */

import CostKatana from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

async function semanticCachingDemo() {
  console.log('🥷 Semantic Caching Demonstration\n');

  // Original query
  console.log('1️⃣ Original query...');
  const response1 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'What are the benefits of cloud computing?' }
    ]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Semantic-Threshold': '0.90'
    }
  });

  console.log(`  Cache Status: ${response1.headers?.['x-cache-status']}`);
  console.log(`  Response: ${response1.choices[0].message.content?.substring(0, 100)}...`);

  // Semantically similar query (different wording)
  console.log('\n2️⃣ Semantically similar query...');
  const response2 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Tell me the advantages of using cloud services' }
    ]
  }, {
    headers: { 'X-Enable-Cache': 'true' }
  });

  console.log(`  Cache Status: ${response2.headers?.['x-cache-status']}`);
  console.log(`  Similarity Score: ${response2.headers?.['x-similarity-score']}`);
  console.log(`  Cost Saved: $${response2.headers?.['x-cost-saved']}`);
  console.log(`  Original Query: ${response2.headers?.['x-original-query']}`);

  // Different context (cache miss)
  console.log('\n3️⃣ Different context (cache miss)...');
  const response3 = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a cloud expert' },
      { role: 'user', content: 'What are the benefits of cloud computing?' }
    ]
  }, {
    headers: { 'X-Enable-Cache': 'true' }
  });

  console.log(`  Cache Status: ${response3.headers?.['x-cache-status']}`);
  console.log('  Reason: Different system message creates different context');

  console.log('\n💡 Semantic Caching Features:');
  console.log('  ✅ Recognizes paraphrased queries');
  console.log('  ✅ Handles different phrasings');
  console.log('  ✅ Context-aware matching');
  console.log('  ✅ Model-specific caching');
  console.log('  ✅ User-scoped caching');
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  try {
    await semanticCachingDemo();
    console.log('\n✅ Semantic caching demo complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { semanticCachingDemo };
