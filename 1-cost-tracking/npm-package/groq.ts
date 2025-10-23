/**
 * Cost Tracking Example: Groq (Ultra Fast!)
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Groq Cost Tracking (Ultra Fast Inference!)\n');
  
  const start = Date.now();
  const response = await ai('llama3-70b-8192', 'Explain edge computing.');
  const duration = Date.now() - start;
  
  logResult('Groq Llama 3', {
    'Cost': formatCost(response.cost),
    'Tokens': response.tokens,
    'Time': `${duration}ms (10x faster!)`,
  });
  
  console.log('\n📊 View at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
