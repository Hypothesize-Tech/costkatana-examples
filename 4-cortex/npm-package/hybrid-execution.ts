/**
 * Cortex Hybrid Execution
 * Mix Cortex and standard processing
 */
import { ai } from 'cost-katana';

async function main() {
  console.log('\n⚡ Cortex Hybrid Execution\n');
  
  const response = await ai('gpt-4', 'Mix of short and long content', {
    cortex: true,
    cortexConfig: { hybridExecution: true }
  });
  
  console.log('✅ Hybrid mode optimizes only where beneficial!');
  console.log('   • Short parts: Standard processing (fast)');
  console.log('   • Long parts: Cortex processing (cheap)\n');
}

main().catch(console.error);
