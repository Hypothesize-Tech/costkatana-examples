/**
 * Closed-Loop Cost Brain - Basic Example
 * 
 * Demonstrates how to:
 * - Enable Cost Brain for autonomous optimization
 * - Make AI requests with brain interventions
 * - View brain decisions and savings
 */

import { ai, CostKatana, OPENAI } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('🧠 Closed-Loop Cost Brain - Basic Example\n');

    // 1. Enable Cost Brain
    console.log('⚙️ Enabling Cost Brain...');
    await client.brain.enable({
      mode: 'autonomous', // 'autonomous', 'assisted', or 'shadow'
      interventions: {
        modelDowngrade: true,
        providerSwitch: true,
        promptCompression: true,
        requestBlocking: true,
      },
      thresholds: {
        maxCostPerRequest: 0.50, // Max $0.50 per request
        qualityThreshold: 0.85, // Minimum quality score
      },
    });

    console.log('✅ Cost Brain enabled in autonomous mode\n');

    // 2. Make an AI request (Brain will optimize automatically)
    console.log('💬 Making AI request with Cost Brain...');
    const response = await ai(OPENAI.GPT_4_TURBO, 
      'Explain quantum computing in simple terms',
      {
        maxTokens: 500,
        temperature: 0.7,
      }
    );

    console.log('\n📊 Response:');
    console.log(response.text);
    console.log('\n💰 Cost Analysis:');
    console.log(`Original Estimated Cost: $${response.metrics.originalEstimatedCost.toFixed(6)}`);
    console.log(`Actual Cost: $${response.cost.toFixed(6)}`);
    console.log(`Savings: $${response.metrics.savings.toFixed(6)} (${response.metrics.savingsPercent}%)`);

    // 3. Check if Brain intervened
    if (response.brain) {
      console.log('\n🧠 Brain Interventions:');
      console.log(`Intervened: ${response.brain.intervened}`);
      
      if (response.brain.intervened) {
        console.log(`Intervention Type: ${response.brain.interventionType}`);
        console.log(`Original Model: ${response.brain.originalModel}`);
        console.log(`Optimized Model: ${response.brain.optimizedModel}`);
        console.log(`Reason: ${response.brain.reason}`);
        console.log(`Quality Score: ${response.brain.qualityScore}`);
      }
    }

    // 4. Get brain statistics
    console.log('\n📈 Cost Brain Statistics:');
    const stats = await client.brain.getStatistics({
      timeRange: '24h',
    });

    console.log(`Total Requests: ${stats.totalRequests}`);
    console.log(`Interventions: ${stats.interventions} (${stats.interventionRate}%)`);
    console.log(`Total Savings: $${stats.totalSavings.toFixed(4)}`);
    console.log(`Avg Savings per Request: $${stats.avgSavingsPerRequest.toFixed(6)}`);
    console.log(`Quality Score: ${stats.avgQualityScore}/1.0`);

    console.log('\n📊 Intervention Breakdown:');
    console.log(`Model Downgrades: ${stats.interventionTypes.modelDowngrade}`);
    console.log(`Provider Switches: ${stats.interventionTypes.providerSwitch}`);
    console.log(`Prompt Compressions: ${stats.interventionTypes.promptCompression}`);
    console.log(`Requests Blocked: ${stats.interventionTypes.requestBlocking}`);

    console.log('\n✅ Cost Brain example completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

