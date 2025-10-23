/**
 * Analytics: Usage Analytics
 * Track and analyze AI usage patterns
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n📊 Usage Analytics Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  // Get usage analytics for last 30 days
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const analytics = await tracker.getAnalytics(startDate, endDate);
  
  logResult('30-Day Usage Analytics', {
    'Total Requests': analytics.totalRequests?.toLocaleString() || '0',
    'Total Tokens': analytics.totalTokens?.toLocaleString() || '0',
    'Total Cost': formatCost(analytics.totalCost || 0),
    'Avg Cost/Request': formatCost(analytics.avgCostPerRequest || 0),
    'Cache Hit Rate': `${((analytics.cacheHitRate || 0) * 100).toFixed(1)}%`,
    'Total Savings': formatCost(analytics.totalSavings || 0),
  });
  
  console.log('\n✅ View full analytics at: https://costkatana.com/analytics\n');
}

main().catch(console.error);
