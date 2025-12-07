/**
 * Cost Intelligence Stack - Configure Intelligence
 * 
 * Demonstrates how to:
 * - Configure intelligence performance modes
 * - Set up custom telemetry sampling
 * - Enable/disable specific intelligence layers
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('⚙️ Cost Intelligence Stack - Configuration\n');

    // 1. Configure intelligence performance mode
    console.log('🎯 Setting intelligence performance mode...');
    await client.intelligence.configure({
      mode: 'high', // 'low', 'medium', or 'high'
      sampling: {
        rate: 1.0, // 100% sampling
        strategy: 'adaptive', // 'fixed' or 'adaptive'
      },
      layers: {
        telemetry: {
          enabled: true,
          streaming: true,
          batchSize: 100,
        },
        intelligence: {
          enabled: true,
          anomalyDetection: true,
          recommendationEngine: true,
          confidenceThreshold: 0.7,
        },
        routing: {
          enabled: true,
          strategy: 'cost-optimized', // 'fastest', 'cost-optimized', 'balanced'
          fallbackEnabled: true,
        },
        enforcement: {
          enabled: true,
          budgetChecks: true,
          preFlightValidation: true,
        },
        caching: {
          enabled: true,
          strategies: ['exact', 'semantic', 'deduplication'],
          ttl: 3600, // 1 hour
        },
        simulation: {
          enabled: true,
          autoSuggest: true,
          trackAccuracy: true,
        },
      },
    });

    console.log('✅ Intelligence configured successfully!\n');

    // 2. Set up custom telemetry rules
    console.log('📡 Setting up custom telemetry rules...');
    await client.intelligence.setTelemetryRules({
      captureRules: [
        {
          condition: 'cost > 0.10',
          action: 'always_capture',
          priority: 'high',
        },
        {
          condition: 'latency > 5000',
          action: 'always_capture',
          priority: 'high',
        },
        {
          condition: 'model contains "gpt-4"',
          action: 'sample',
          sampleRate: 0.5,
        },
      ],
    });

    console.log('✅ Telemetry rules configured!\n');

    // 3. Configure anomaly detection thresholds
    console.log('🔍 Configuring anomaly detection...');
    await client.intelligence.setAnomalyThresholds({
      cost: {
        percentileThreshold: 95, // Alert if cost is in top 5%
        absoluteThreshold: 10.0, // Alert if cost > $10
        windowSize: '1h',
      },
      requests: {
        percentileThreshold: 90,
        absoluteThreshold: 1000,
        windowSize: '5m',
      },
      latency: {
        percentileThreshold: 95,
        absoluteThreshold: 10000, // 10 seconds
        windowSize: '15m',
      },
    });

    console.log('✅ Anomaly detection configured!\n');

    // 4. Set up recommendation preferences
    console.log('💡 Configuring recommendations...');
    await client.intelligence.setRecommendationPreferences({
      autoApply: false, // Require manual approval
      minSavings: 0.01, // Only suggest if savings > $0.01
      priority: ['cost', 'latency', 'quality'], // Prioritize cost savings
      excludeTypes: [], // Include all recommendation types
      notificationChannels: ['dashboard', 'email'], // Where to send recommendations
    });

    console.log('✅ Recommendations configured!\n');

    // 5. Get current configuration
    console.log('📋 Current Intelligence Configuration:');
    const config = await client.intelligence.getConfiguration();
    console.log(JSON.stringify(config, null, 2));

    console.log('\n✅ Configuration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

