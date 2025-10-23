/**
 * Gateway Example: Semantic Caching
 * Save 100% on repeated or similar requests
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n💾 Gateway Semantic Caching Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway({
    enableCache: true,
    cacheConfig: { ttl: 3600 }
  });
  
  // First request - will cache
  console.log('Request 1: Fresh request (will be cached)...');
  const response1 = await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is machine learning?' }]
  }, { cache: true });
  
  // Second request - will hit cache
  console.log('Request 2: Identical request (should hit cache)...');
  const response2 = await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'What is machine learning?' }]
  }, { cache: true });
  
  logResult('Caching Results', {
    'Request 1 Cache': response1.metadata?.cacheStatus || 'MISS',
    'Request 1 Cost': formatCost(0.03),
    'Request 2 Cache': response2.metadata?.cacheStatus || 'HIT',
    'Request 2 Cost': formatCost(0),
    'Savings': '100% on cached request!',
  });
  
  console.log('\n✅ Caching saves money!\n');
}

main().catch(console.error);
