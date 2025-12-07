/**
 * Cost Intelligence Stack - Basic Intelligence Example
 * 
 * Demonstrates how to:
 * - Get real-time cost intelligence insights
 * - View telemetry data and trends
 * - Access intelligence recommendations
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('🧠 Cost Intelligence Stack - Basic Intelligence\n');

    // 1. Get current intelligence insights
    console.log('📊 Fetching intelligence insights...');
    const insights = await client.intelligence.getInsights({
      timeRange: '24h',
      includeRecommendations: true,
    });

    console.log('\n✅ Intelligence Insights:');
    console.log(`Total Cost: $${insights.totalCost.toFixed(4)}`);
    console.log(`Total Requests: ${insights.totalRequests}`);
    console.log(`Average Cost per Request: $${insights.avgCostPerRequest.toFixed(6)}`);
    console.log(`Anomalies Detected: ${insights.anomaliesDetected}`);

    // 2. Get telemetry trends
    console.log('\n📈 Fetching telemetry trends...');
    const trends = await client.intelligence.getTrends({
      timeRange: '7d',
      granularity: 'day',
      metrics: ['cost', 'requests', 'latency'],
    });

    console.log(`\n✅ Trend Analysis:`);
    console.log(`Cost Trend: ${trends.cost.direction} (${trends.cost.changePercent}%)`);
    console.log(`Request Trend: ${trends.requests.direction} (${trends.requests.changePercent}%)`);
    console.log(`Latency Trend: ${trends.latency.direction} (${trends.latency.changePercent}ms)`);

    // 3. Get intelligence recommendations
    if (insights.recommendations && insights.recommendations.length > 0) {
      console.log('\n💡 Active Recommendations:');
      insights.recommendations.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.title}`);
        console.log(`   Type: ${rec.type}`);
        console.log(`   Potential Savings: $${rec.estimatedSavings.toFixed(4)}`);
        console.log(`   Priority: ${rec.priority}`);
        console.log(`   Action: ${rec.action}`);
      });
    }

    // 4. Get layer-specific insights
    console.log('\n🏗️ Layer-Specific Insights:');
    
    const layerInsights = await client.intelligence.getLayerInsights();
    
    console.log('\nLayer 1 (Telemetry):');
    console.log(`  Capture Rate: ${layerInsights.telemetry.captureRate}%`);
    console.log(`  Streaming Active: ${layerInsights.telemetry.streamingActive}`);
    
    console.log('\nLayer 2 (Intelligence):');
    console.log(`  Analysis Mode: ${layerInsights.intelligence.mode}`);
    console.log(`  Confidence Score: ${layerInsights.intelligence.confidenceScore}%`);
    
    console.log('\nLayer 3 (Routing):');
    console.log(`  Active Routes: ${layerInsights.routing.activeRoutes}`);
    console.log(`  Optimization Rate: ${layerInsights.routing.optimizationRate}%`);
    
    console.log('\nLayer 4 (Enforcement):');
    console.log(`  Blocked Requests: ${layerInsights.enforcement.blockedRequests}`);
    console.log(`  Budget Utilization: ${layerInsights.enforcement.budgetUtilization}%`);
    
    console.log('\nLayer 5 (Caching):');
    console.log(`  Cache Hit Rate: ${layerInsights.caching.hitRate}%`);
    console.log(`  Cost Savings: $${layerInsights.caching.costSavings.toFixed(4)}`);
    
    console.log('\nLayer 6 (Simulation):');
    console.log(`  Active Simulations: ${layerInsights.simulation.activeSimulations}`);
    console.log(`  Accuracy: ${layerInsights.simulation.accuracy}%`);

    console.log('\n✅ Intelligence query completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

