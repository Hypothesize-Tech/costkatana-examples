/**
 * Gateway Example: Disable Auto-Tracking
 * 
 * This example shows how to use the gateway with auto-tracking disabled.
 * The gateway will still proxy requests but won't track usage in the database.
 */

import { AICostTracker } from 'cost-katana';

async function exampleWithoutTracking() {
  // Initialize tracker
  const tracker = await AICostTracker.create({
    providers: [
      {
        provider: 'openai' as any,
        apiKey: process.env.OPENAI_API_KEY || 'your-openai-key'
      }
    ],
    tracking: {
      enableAutoTracking: true
    }
  });

  // Initialize gateway with autoTrack disabled
  const gateway = tracker.initializeGateway({
    baseUrl: 'https://api.costkatana.com/api/gateway',
    apiKey: process.env.API_KEY || 'your-cost-katana-key',
    autoTrack: false // Disable tracking for all requests through this gateway
  });

  // Make a request - this will be proxied but not tracked
  const response = await gateway.openai(
    {
      model: 'gpt-4',
      messages: [
        { role: 'user', content: 'Hello, this request will not be tracked!' }
      ]
    },
    {
      targetUrl: 'https://api.openai.com'
      // autoTrack is already false from gateway config
    }
  );

  console.log('Response received:', response.data);
  console.log('Note: This request was NOT tracked in the database');
}

/**
 * Example: Per-Request Auto-Track Control
 * 
 * You can also control tracking on a per-request basis
 */
async function examplePerRequestTracking() {
  const tracker = await AICostTracker.create({
    providers: [
      {
        provider: 'openai' as any,
        apiKey: process.env.OPENAI_API_KEY || 'your-openai-key'
      }
    ],
    tracking: {
      enableAutoTracking: true
    }
  });

  // Initialize gateway with autoTrack enabled by default
  const gateway = tracker.initializeGateway({
    baseUrl: 'https://api.costkatana.com/api/gateway',
    apiKey: process.env.API_KEY || 'your-cost-katana-key',
    autoTrack: true // Default: track all requests
  });

  // This request WILL be tracked (uses gateway default)
  const trackedResponse = await gateway.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'This will be tracked' }]
    },
    {
      targetUrl: 'https://api.openai.com'
    }
  );

  // This request will NOT be tracked (per-request override)
  const untrackedResponse = await gateway.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'This will NOT be tracked' }]
    },
    {
      targetUrl: 'https://api.openai.com',
      autoTrack: false // Override gateway default for this request
    }
  );

  console.log('Tracked response:', trackedResponse.data);
  console.log('Untracked response:', untrackedResponse.data);
}

/**
 * Example: Use Cases for Disabling Tracking
 */
async function exampleUseCases() {
  const tracker = await AICostTracker.create({
    providers: [
      {
        provider: 'openai' as any,
        apiKey: process.env.OPENAI_API_KEY || 'your-openai-key'
      }
    ],
    tracking: {
      enableAutoTracking: true
    }
  });

  const gateway = tracker.initializeGateway({
    baseUrl: 'https://api.costkatana.com/api/gateway',
    apiKey: process.env.API_KEY || 'your-cost-katana-key',
    autoTrack: true // Default: track most requests
  });

  // Use Case 1: Test/Development Requests
  // Don't pollute production analytics with test data
  if (process.env.NODE_ENV === 'test') {
    const testResponse = await gateway.openai(
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Test prompt' }]
      },
      {
        targetUrl: 'https://api.openai.com',
        autoTrack: false // Skip tracking for tests
      }
    );
  }

  // Use Case 2: High-Volume Proxy-Only Scenarios
  // When you just need the gateway features (caching, retries) but not tracking
  const highVolumeRequest = await gateway.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'High volume request' }]
    },
    {
      targetUrl: 'https://api.openai.com',
      autoTrack: false, // Reduce database load
      cache: true // Still use caching
    }
  );

  // Use Case 3: Privacy-Sensitive Requests
  // When tracking sensitive data is not desired
  const sensitiveRequest = await gateway.openai(
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Sensitive information' }]
    },
    {
      targetUrl: 'https://api.openai.com',
      autoTrack: false, // Don't track sensitive requests
      omitRequest: true, // Also omit request content
      omitResponse: true // And response content
    }
  );
}

// Run examples
if (require.main === module) {
  exampleWithoutTracking().catch(console.error);
  examplePerRequestTracking().catch(console.error);
  exampleUseCases().catch(console.error);
}

export { exampleWithoutTracking, examplePerRequestTracking, exampleUseCases };

