/**
 * Cost Katana Cache: Optimization Strategies
 * 
 * Best practices for cache optimization and cost savings.
 * 
 * Run: npx ts-node 18-cache/npm-package/cache-optimization.ts
 */

import CostKatana from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

async function optimizationStrategies() {
  console.log('🥷 Cache Optimization Strategies\n');

  // Strategy 1: Longer TTL for stable content
  console.log('1️⃣ Long TTL for stable content...');
  await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is the capital of France?' }]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Cache-TTL': '86400' // 24 hours
    }
  });
  console.log('  ✅ Used 24-hour TTL for factual content');

  // Strategy 2: Shorter TTL for dynamic content
  console.log('\n2️⃣ Short TTL for dynamic content...');
  await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is the current stock price?' }]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Cache-TTL': '300' // 5 minutes
    }
  });
  console.log('  ✅ Used 5-minute TTL for time-sensitive content');

  // Strategy 3: User-scoped caching
  console.log('\n3️⃣ User-scoped caching...');
  await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Show me my recent orders' }]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Cache-Scope': 'user'
    }
  });
  console.log('  ✅ Used user-scoped cache for personalized content');

  // Strategy 4: Cache bypass for critical requests
  console.log('\n4️⃣ Cache bypass for critical requests...');
  await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Process this transaction' }]
  }, {
    headers: { 'X-Cache-Bypass': 'true' }
  });
  console.log('  ✅ Bypassed cache for transactional content');

  // Strategy 5: Lower semantic threshold for more hits
  console.log('\n5️⃣ Adjusted semantic threshold...');
  await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Explain AI to me' }]
  }, {
    headers: {
      'X-Enable-Cache': 'true',
      'X-Semantic-Threshold': '0.85' // More lenient matching
    }
  });
  console.log('  ✅ Used 0.85 threshold for broader matching');

  console.log('\n📊 Optimization Best Practices:');
  console.log('  1. Use long TTL (24h+) for factual content');
  console.log('  2. Use short TTL (5-15min) for dynamic content');
  console.log('  3. Enable user-scoped cache for personalized queries');
  console.log('  4. Bypass cache for transactional operations');
  console.log('  5. Adjust semantic threshold based on use case');
  console.log('  6. Monitor cache hit rates and adjust');
  console.log('  7. Warmup cache for common queries');
  console.log('  8. Clear stale cache regularly');

  console.log('\n💰 Expected Savings:');
  console.log('  Hit Rate 70%: 30% cost reduction');
  console.log('  Hit Rate 80%: 40% cost reduction');
  console.log('  Hit Rate 90%: 50% cost reduction');
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  try {
    await optimizationStrategies();
    console.log('\n✅ Optimization strategies demo complete!');
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { optimizationStrategies };
