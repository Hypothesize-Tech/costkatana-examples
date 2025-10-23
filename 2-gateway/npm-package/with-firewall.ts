/**
 * Gateway Example: Security Firewall
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🛡️ Gateway Security Firewall Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  const gateway = tracker.initializeGateway();
  
  try {
    await gateway.makeFirewallProtectedRequest(
      '/v1/chat/completions',
      { model: 'gpt-4', messages: [{ role: 'user', content: 'Safe request' }] },
      { enabled: true, advanced: true, blockThreshold: 0.8 }
    );
    console.log('✅ Safe request passed firewall!\n');
  } catch (error: any) {
    console.log('🚫 Request blocked by firewall:', error.message);
  }
}

main().catch(console.error);
