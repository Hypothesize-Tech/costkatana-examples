/**
 * Analytics: Cost Reports
 * Generate detailed cost breakdown reports
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n📋 Cost Reports Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  const report = await tracker.generateCostReport({
    startDate: new Date('2024-01-01'),
    endDate: new Date(),
    groupBy: 'model',
    includeOptimizationSavings: true,
    format: 'json'
  });
  
  console.log('Cost Report Generated:', JSON.stringify(report, null, 2));
  console.log('\n✅ Download reports at: https://costkatana.com/reports\n');
}

main().catch(console.error);
