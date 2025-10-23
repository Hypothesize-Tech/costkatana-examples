/**
 * Gateway Example: Automatic Retries
 * Handle rate limits and failures automatically
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🔄 Gateway Automatic Retry Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway({
    enableRetries: true,
    retryConfig: {
      count: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 10000
    }
  });
  
  const response = await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Explain resilience patterns.' }]
  });
  
  console.log('✅ Request completed with automatic retry protection!\n');
}

main().catch(console.error);
