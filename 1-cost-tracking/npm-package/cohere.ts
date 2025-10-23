/**
 * Cost Tracking Example: Cohere
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Cohere Cost Tracking\n');
  
  const response = await ai('command-r-plus', 'Explain RAG architecture.');
  logResult('Command R+', {
    'Cost': formatCost(response.cost),
    'Tokens': response.tokens,
  });
  
  console.log('\n📊 View at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
