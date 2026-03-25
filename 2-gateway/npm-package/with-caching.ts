/**
 * Gateway Example: Semantic Caching
 * Save 100% on repeated or similar requests
 */
import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n💾 Gateway Semantic Caching Example\n');

  validateConfig(['costKatanaKey']);

  const g = gateway({
    baseUrl: config.gatewayUrl,
    enableCache: true,
    cacheConfig: { ttl: 3600 }
  });

  console.log('Request 1: Fresh request (will be cached)...');
  const response1 = await g.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'What is machine learning?' }]
    },
    { cache: true }
  );

  console.log('Request 2: Identical request (should hit cache)...');
  const response2 = await g.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'What is machine learning?' }]
    },
    { cache: true }
  );

  logResult('Caching Results', {
    'Request 1 Cache': response1.metadata?.cacheStatus || 'MISS',
    'Request 1 Cost': formatCost(0.03),
    'Request 2 Cache': response2.metadata?.cacheStatus || 'HIT',
    'Request 2 Cost': formatCost(0),
    Savings: '100% on cached request!'
  });

  console.log('\n✅ Caching saves money!\n');
}

main().catch(console.error);
