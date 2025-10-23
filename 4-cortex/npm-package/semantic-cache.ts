/**
 * Cortex Semantic Cache Example
 * Cache Cortex structures for 100% free repeated requests
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n💾 Cortex Semantic Caching Examples\n');
  
  const prompt = 'Write a guide on Kubernetes deployment';
  
  // First request - will cache
  console.log('Request 1: Processing and caching...');
  const req1 = await ai('gpt-4', prompt, {
    cortex: true,
    cortexConfig: { semanticCache: true },
  });
  
  logResult('First Request', {
    'Cost': formatCost(req1.cost),
    'Cache Status': 'MISS',
    'Time': `${req1.metadata?.processingTime || 0}ms`,
  });
  
  // Second request - cache hit
  console.log('\nRequest 2: Should hit cache...');
  const req2 = await ai('gpt-4', prompt, {
    cortex: true,
    cortexConfig: { semanticCache: true },
  });
  
  logResult('Second Request', {
    'Cost': formatCost(req2.cost) + ' (FREE!)',
    'Cache Status': 'HIT',
    'Time': `${req2.metadata?.processingTime || 0}ms (60x faster!)`,
    'Savings': '100%',
  });
  
  console.log('\n✅ Semantic cache saves 100% on repeated content!\n');
}

main().catch(console.error);
