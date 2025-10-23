/**
 * Gateway Example: Multi-Provider Failover
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🔀 Gateway Multi-Provider Failover Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [
      { provider: AIProvider.OpenAI, apiKey: config.openaiKey },
      { provider: AIProvider.Anthropic, apiKey: config.anthropicKey },
    ],
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway();
  
  // Gateway will automatically failover if primary provider fails
  const response = await gateway.makeRequest(
    '/v1/chat/completions',
    { model: 'gpt-4', messages: [{ role: 'user', content: 'Test failover' }] },
    { failoverPolicy: 'cost-optimized' }
  );
  
  console.log('✅ Request completed with failover protection!\n');
}

main().catch(console.error);
