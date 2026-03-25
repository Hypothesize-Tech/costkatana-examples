/**
 * Gateway Example: Security Firewall
 */
import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🛡️ Gateway Security Firewall Example\n');

  validateConfig(['costKatanaKey']);

  const g = gateway({ baseUrl: config.gatewayUrl });

  try {
    await g.makeFirewallProtectedRequest(
      '/v1/chat/completions',
      { model: 'gpt-4', messages: [{ role: 'user', content: 'Safe request' }] },
      { enabled: true, advanced: true, promptThreshold: 0.8 }
    );
    console.log('✅ Safe request passed firewall!\n');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.log('🚫 Request blocked by firewall:', message);
  }
}

main().catch(console.error);
