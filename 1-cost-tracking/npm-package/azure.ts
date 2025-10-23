/**
 * Cost Tracking Example: Azure OpenAI
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Azure OpenAI Cost Tracking\n');
  
  const response = await ai('gpt-4', 'Design an Azure architecture.');
  logResult('Azure GPT-4', {
    'Cost': formatCost(response.cost),
    'Tokens': response.tokens,
  });
  
  console.log('\n📊 View at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
