/**
 * Cost Tracking Example: DeepSeek
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 DeepSeek Cost Tracking (Very Cheap!)\n');
  
  const response = await ai('deepseek-chat', 'Implement binary search in TypeScript.');
  logResult('DeepSeek', {
    'Cost': formatCost(response.cost) + ' (95% cheaper than GPT-4!)',
    'Tokens': response.tokens,
  });
  
  console.log('\n📊 View at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
