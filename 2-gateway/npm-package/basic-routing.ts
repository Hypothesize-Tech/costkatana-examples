/**
 * Gateway Example: Basic Routing
 * Route requests through Cost Katana gateway with automatic tracking
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult } from '../../shared/utils';

async function main() {
  console.log('\n🌐 Gateway Basic Routing Example\n');
  
  validateConfig(['costKatanaKey', 'projectId']);
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    tracking: { enableAutoTracking: true },
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway({
    baseUrl: config.gatewayUrl,
    enableCache: false,
    enableRetries: false,
  });
  
  const response = await gateway.openai({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Explain AI gateways.' }]
  });
  
  logResult('Gateway Response', {
    'Status': 'Success',
    'Processing Time': response.metadata?.processingTime || 'N/A',
    'Cache Status': response.metadata?.cacheStatus || 'MISS',
  });
  
  console.log('\n✅ Request routed through gateway!\n');
}

main().catch(console.error);
