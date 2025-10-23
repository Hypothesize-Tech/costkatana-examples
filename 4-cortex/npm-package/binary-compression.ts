/**
 * Cortex Binary Compression
 * Additional 10-15% savings with binary serialization
 */
import { ai } from 'cost-katana';
import { formatCost } from '../../shared/utils';

async function main() {
  console.log('\n��️  Cortex Binary Compression\n');
  
  const prompt = 'Write comprehensive guide on microservices (3000 words)';
  
  // Standard Cortex
  const standard = await ai('gpt-4', prompt, { cortex: true });
  console.log(`Standard Cortex: ${formatCost(standard.cost)}`);
  
  // With binary compression
  const binary = await ai('gpt-4', prompt, {
    cortex: true,
    cortexConfig: { binaryCompression: 'aggressive' }
  });
  console.log(`With Binary: ${formatCost(binary.cost)}`);
  console.log(`Extra Savings: ${((1 - binary.cost / standard.cost) * 100).toFixed(1)}%\n`);
  
  console.log('✅ Binary adds 10-15% more savings!\n');
}

main().catch(console.error);
