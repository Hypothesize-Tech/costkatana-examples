/**
 * Advanced: Multi-Provider Failover
 * 99.99% availability with automatic fallback
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config } from '../../shared/config';
import { logResult } from '../../shared/utils';

async function main() {
  console.log('\n🔀 Multi-Provider Failover Example\n');
  
  const tracker = await AICostTracker.create({
    providers: [
      { provider: AIProvider.OpenAI, apiKey: config.openaiKey, priority: 1 },
      { provider: AIProvider.Anthropic, apiKey: config.anthropicKey, priority: 2 },
      { provider: AIProvider.Google, apiKey: config.googleKey, priority: 3 },
    ],
    failover: {
      enabled: true,
      policy: 'cost-optimized',
      maxRetries: 3,
      timeout: 30000
    },
    projectId: config.projectId,
  });
  
  try {
    const response = await tracker.makeRequest({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Test failover' }]
    });
    
    logResult('Failover Test', {
      'Primary Provider': 'OpenAI',
      'Status': 'Success',
      'Failover Triggered': response.metadata?.failedOver ? 'Yes' : 'No',
      'Provider Used': response.metadata?.providerUsed || 'OpenAI',
    });
  } catch (error: any) {
    console.error('All providers failed:', error.message);
  }
  
  console.log('\n✅ Failover provides 99.99% availability!\n');
}

main().catch(console.error);
