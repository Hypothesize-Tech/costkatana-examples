/**
 * Cost Intelligence Stack - Real-time Telemetry Streaming
 * 
 * Demonstrates how to:
 * - Stream real-time telemetry data
 * - Monitor live cost and performance metrics
 * - React to intelligence events
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('📡 Cost Intelligence Stack - Real-time Telemetry\n');

    // 1. Start telemetry stream
    console.log('🔴 Starting telemetry stream...\n');

    const stream = client.intelligence.streamTelemetry({
      metrics: ['cost', 'requests', 'latency', 'tokens'],
      interval: 5000, // Update every 5 seconds
      filters: {
        minCost: 0.001, // Only show requests > $0.001
      },
    });

    // 2. Handle telemetry events
    stream.on('data', (telemetry) => {
      console.log(`[${new Date().toISOString()}] Telemetry Update:`);
      console.log(`  Cost: $${telemetry.cost.toFixed(6)}`);
      console.log(`  Requests: ${telemetry.requests}`);
      console.log(`  Avg Latency: ${telemetry.avgLatency}ms`);
      console.log(`  Total Tokens: ${telemetry.tokens}`);
      console.log('');
    });

    // 3. Handle anomaly events
    stream.on('anomaly', (anomaly) => {
      console.log(`⚠️  ANOMALY DETECTED:`);
      console.log(`  Type: ${anomaly.type}`);
      console.log(`  Severity: ${anomaly.severity}`);
      console.log(`  Value: ${anomaly.value}`);
      console.log(`  Expected Range: ${anomaly.expectedMin} - ${anomaly.expectedMax}`);
      console.log(`  Recommendation: ${anomaly.recommendation}`);
      console.log('');
    });

    // 4. Handle recommendation events
    stream.on('recommendation', (recommendation) => {
      console.log(`💡 NEW RECOMMENDATION:`);
      console.log(`  Title: ${recommendation.title}`);
      console.log(`  Type: ${recommendation.type}`);
      console.log(`  Estimated Savings: $${recommendation.estimatedSavings.toFixed(4)}`);
      console.log(`  Action: ${recommendation.action}`);
      console.log('');
    });

    // 5. Handle errors
    stream.on('error', (error) => {
      console.error('❌ Stream Error:', error.message);
    });

    // 6. Handle stream close
    stream.on('close', () => {
      console.log('🔴 Telemetry stream closed');
    });

    console.log('✅ Streaming telemetry data... (Press Ctrl+C to stop)\n');

    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('\n\n🛑 Stopping telemetry stream...');
      await stream.close();
      console.log('✅ Stream closed gracefully');
      process.exit(0);
    });

    // Alternatively, demonstrate batch telemetry retrieval
    console.log('📊 Example: Batch Telemetry Retrieval\n');
    
    const batchTelemetry = await client.intelligence.getTelemetryBatch({
      startTime: new Date(Date.now() - 3600000), // Last hour
      endTime: new Date(),
      granularity: '5m',
      metrics: ['cost', 'requests', 'latency'],
    });

    console.log('Batch Telemetry Summary:');
    console.log(`  Total Data Points: ${batchTelemetry.dataPoints.length}`);
    console.log(`  Total Cost: $${batchTelemetry.summary.totalCost.toFixed(4)}`);
    console.log(`  Total Requests: ${batchTelemetry.summary.totalRequests}`);
    console.log(`  Avg Latency: ${batchTelemetry.summary.avgLatency}ms`);
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

