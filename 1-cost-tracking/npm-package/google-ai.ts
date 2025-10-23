/**
 * Cost Tracking Example: Google AI (Gemini)
 */
import { ai } from 'cost-katana';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Google AI (Gemini) Cost Tracking\n');
  
  const response = await ai('gemini-pro', 'Explain machine learning in simple terms.');
  logResult('Gemini Pro', {
    'Cost': formatCost(response.cost),
    'Tokens': response.tokens,
  });
  
  console.log('\n📊 View at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
