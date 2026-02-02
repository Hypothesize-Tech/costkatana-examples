/**
 * Data Network Effects - Basic Learning Loop
 * 
 * Demonstrates how to:
 * - Get optimization recommendations
 * - Provide feedback (accept/reject)
 * - Track outcomes and learning
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('🔄 Data Network Effects - Basic Learning Loop\n');

    // 1. Get optimization recommendations
    console.log('💡 Fetching recommendations...');
    const recommendations = await client.networkEffects.getRecommendations({
      types: ['model_switch', 'provider_switch', 'caching'],
      minSavings: 0.01,
      limit: 5,
    });

    console.log(`\n✅ Found ${recommendations.length} recommendations:\n`);

    for (const [index, rec] of recommendations.entries()) {
      console.log(`${index + 1}. ${rec.title}`);
      console.log(`   Type: ${rec.type}`);
      console.log(`   Current: ${rec.current.model} @ $${rec.current.cost.toFixed(6)}/request`);
      console.log(`   Suggested: ${rec.suggested.model} @ $${rec.suggested.cost.toFixed(6)}/request`);
      console.log(`   Potential Savings: $${rec.estimatedSavings.toFixed(4)}/month (${rec.savingsPercent}%)`);
      console.log(`   Confidence: ${rec.confidence} (${rec.confidenceScore}%)`);
      console.log(`   Based on: ${rec.dataPoints} similar use cases`);
      console.log('');
    }

    // 2. Accept a recommendation
    if (recommendations.length > 0) {
      const recommendation = recommendations[0];
      
      console.log(`✅ Accepting recommendation: ${recommendation.title}`);
      const acceptance = await client.networkEffects.acceptRecommendation({
        recommendationId: recommendation.id,
        applyImmediately: false, // Test first
        feedback: {
          reason: 'Looks promising, will test',
          confidence: 0.8,
        },
      });

      console.log(`Acceptance ID: ${acceptance.acceptanceId}`);
      console.log(`Status: ${acceptance.status}`);
      console.log(`Will track outcomes for ${acceptance.trackingPeriod} days\n`);

      // 3. Simulate tracking outcomes (in real usage, this happens over time)
      console.log('📊 Simulating outcome tracking...\n');
      
      // After some time has passed and you have data
      await client.networkEffects.trackOutcome({
        recommendationId: recommendation.id,
        acceptanceId: acceptance.acceptanceId,
        actualOutcome: {
          implemented: true,
          actualSavings: 0.035, // $0.035 saved
          qualityImpact: 0.02, // 2% quality change
          latencyImpact: -50, // 50ms faster
          userSatisfaction: 0.9, // 90% satisfied
        },
      });

      console.log('✅ Outcome tracked successfully\n');
    }

    // 4. View learning statistics
    console.log('📈 Learning Loop Statistics:');
    const stats = await client.networkEffects.getLearningStats({
      timeRange: '30d',
    });

    console.log(`\nRecommendations Made: ${stats.totalRecommendations}`);
    console.log(`Accepted: ${stats.accepted} (${stats.acceptanceRate}%)`);
    console.log(`Rejected: ${stats.rejected} (${stats.rejectionRate}%)`);
    console.log(`\nOutcomes Measured: ${stats.outcomesMeasured}`);
    console.log(`Successful: ${stats.successful} (${stats.successRate}%)`);
    console.log(`Failed: ${stats.failed}`);
    console.log(`\nTotal Savings: $${stats.totalSavings.toFixed(2)}`);
    console.log(`Avg Savings per Acceptance: $${stats.avgSavingsPerAcceptance.toFixed(4)}`);
    console.log(`\nRecommendation Quality Score: ${stats.recommendationQuality}/1.0`);
    console.log(`Prediction Accuracy: ${stats.predictionAccuracy}%`);
    console.log(`User Trust Score: ${stats.userTrustScore}/1.0`);

    // 5. View what the system is learning
    console.log('\n🧠 Learning Insights:');
    const insights = await client.networkEffects.getLearningInsights();

    console.log('\nTop Performing Recommendations:');
    insights.topPerforming.forEach((item, index) => {
      console.log(`${index + 1}. ${item.type}: ${item.successRate}% success, $${item.avgSavings} avg savings`);
    });

    console.log('\nImprovements Over Time:');
    console.log(`Recommendation Accuracy: ${insights.improvements.accuracy.trend} (${insights.improvements.accuracy.change})`);
    console.log(`User Acceptance Rate: ${insights.improvements.acceptanceRate.trend} (${insights.improvements.acceptanceRate.change})`);
    console.log(`Savings per Recommendation: ${insights.improvements.savings.trend} (${insights.improvements.savings.change})`);

    console.log('\n✅ Learning loop example completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

