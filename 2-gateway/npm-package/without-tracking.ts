/**
 * Gateway Example: Simple proxy + privacy options
 *
 * Uses `gateway()` — only `COST_KATANA_API_KEY` is required (see shared/env.example).
 * No `AICostTracker` or provider `TrackerConfig` needed for gateway proxy calls.
 *
 * For sensitive payloads, use `omitRequest` / `omitResponse` so content is not stored in logs.
 */

import { gateway } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function exampleSimpleGateway() {
  validateConfig(['costKatanaKey']);

  const g = gateway({
    baseUrl: config.gatewayUrl
  });

  const response = await g.openai({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Hello from the gateway example.' }]
  });

  console.log('Response:', response.data);
}

/**
 * Omit request/response bodies from stored logs (privacy-sensitive flows).
 */
async function examplePrivacyOmit() {
  validateConfig(['costKatanaKey']);

  const g = gateway({ baseUrl: config.gatewayUrl });

  const response = await g.openai(
    {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'Sensitive prompt' }]
    },
    {
      omitRequest: true,
      omitResponse: true
    }
  );

  console.log('Response received (content may be omitted from dashboard logs):', response.data);
}

/**
 * Cached high-volume pattern: same gateway(), enable cache on the client config.
 */
async function exampleCachedRequest() {
  validateConfig(['costKatanaKey']);

  const g = gateway({
    baseUrl: config.gatewayUrl,
    enableCache: true
  });

  const response = await g.openai(
    {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'What is 2+2?' }]
    },
    { cache: true }
  );

  console.log('Cached request metadata:', response.metadata);
}

if (require.main === module) {
  exampleSimpleGateway().catch(console.error);
}

export { exampleSimpleGateway, examplePrivacyOmit, exampleCachedRequest };
