/**
 * Cortex Intelligent Routing
 * Auto-detect when to use Cortex based on cost-benefit
 */
import { ai } from 'cost-katana';
import { formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🧠 Cortex Intelligent Routing\n');
  
  // Long content - will use Cortex
  console.log('Test 1: Long content (should use Cortex)');
  const long = await ai('gpt-4', 'Write 2000-word guide on Docker', {
    cortex: true,
    cortexConfig: { intelligentRouting: true, priority: 'cost' }
  });
  console.log(`✅ Used Cortex: ${long.cortexMetrics?.enabled || false}`);
  console.log(`💰 Cost: ${formatCost(long.cost)}\n`);
  
  // Short content - will skip Cortex
  console.log('Test 2: Short question (should skip Cortex)');
  const short = await ai('gpt-4', 'What is Docker?', {
    cortex: true,
    cortexConfig: { intelligentRouting: true, priority: 'cost' }
  });
  console.log(`✅ Used Cortex: ${short.cortexMetrics?.enabled || false}`);
  console.log(`�� Cost: ${formatCost(short.cost)}\n`);
  
  console.log('✅ Intelligent routing optimizes automatically!\n');
}

main().catch(console.error);
