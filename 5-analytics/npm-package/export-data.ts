/**
 * Analytics: Export Data
 * Export usage data for custom analysis
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import * as fs from 'fs';

async function main() {
  console.log('\n💾 Export Data Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  // Export as CSV
  const csvData = await tracker.exportUsageData('csv', new Date('2024-01-01'), new Date());
  fs.writeFileSync('usage-data.csv', csvData);
  console.log('✅ Exported to usage-data.csv');
  
  // Export as JSON  
  const jsonData = await tracker.exportUsageData('json', new Date('2024-01-01'), new Date());
  fs.writeFileSync('usage-data.json', JSON.stringify(jsonData, null, 2));
  console.log('✅ Exported to usage-data.json\n');
}

main().catch(console.error);
