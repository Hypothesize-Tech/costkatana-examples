/**
 * Closed-Loop Cost Brain - Shadow Mode
 * 
 * Demonstrates how to:
 * - Enable shadow mode to test optimizations
 * - Log interventions without applying them
 * - Analyze potential savings before enabling
 */

import { ai, CostKatana, ANTHROPIC } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('👻 Closed-Loop Cost Brain - Shadow Mode\n');

    // 1. Enable Shadow Mode
    console.log('⚙️ Enabling Cost Brain in Shadow Mode...');
    await client.brain.enable({
      mode: 'shadow', // Log interventions without applying
      interventions: {
        modelDowngrade: true,
        providerSwitch: true,
        promptCompression: true,
        requestBlocking: false, // Don't block in shadow mode
      },
      shadowConfig: {
        logAllDecisions: true,
        compareQuality: true,
        estimateSavings: true,
      },
    });

    console.log('✅ Shadow mode enabled - interventions will be logged but not applied\n');

    // 2. Make AI requests (actual requests go through, brain logs what it would do)
    console.log('💬 Making AI requests...\n');

    const prompts = [
      'Summarize the benefits of cloud computing',
      'Write a haiku about programming',
      'Explain machine learning to a 5-year-old',
    ];

    for (const [index, prompt] of prompts.entries()) {
      console.log(`${index + 1}. Request: "${prompt}"`);
      
      const response = await ai(ANTHROPIC.CLAUDE_3_5_SONNET, prompt);
      
      console.log(`   Actual Cost: $${response.cost.toFixed(6)}`);
      
      if (response.brain?.shadow) {
        console.log(`   🔮 Shadow Decision:`);
        console.log(`      Would Intervene: ${response.brain.shadow.wouldIntervene}`);
        
        if (response.brain.shadow.wouldIntervene) {
          console.log(`      Suggested Action: ${response.brain.shadow.suggestedAction}`);
          console.log(`      Potential Model: ${response.brain.shadow.suggestedModel}`);
          console.log(`      Estimated Savings: $${response.brain.shadow.estimatedSavings.toFixed(6)}`);
          console.log(`      Confidence: ${response.brain.shadow.confidence}`);
        }
      }
      console.log('');
    }

    // 3. Get shadow mode analytics
    console.log('📊 Shadow Mode Analytics:\n');
    const shadowStats = await client.brain.getShadowAnalytics({
      timeRange: '1h',
    });

    console.log(`Total Requests Analyzed: ${shadowStats.totalRequests}`);
    console.log(`Would Have Intervened: ${shadowStats.wouldIntervene} (${shadowStats.interventionRate}%)`);
    console.log(`Potential Savings: $${shadowStats.potentialSavings.toFixed(4)}`);
    console.log(`Avg Confidence: ${shadowStats.avgConfidence}`);

    console.log('\n📈 Intervention Recommendations:');
    shadowStats.recommendations.forEach((rec, index) => {
      console.log(`\n${index + 1}. ${rec.type}`);
      console.log(`   Frequency: ${rec.frequency} times`);
      console.log(`   Avg Savings: $${rec.avgSavings.toFixed(6)}`);
      console.log(`   Recommendation: ${rec.recommendation}`);
    });

    // 4. Decision: Enable or keep testing
    console.log('\n💡 Decision Helper:');
    const decision = await client.brain.shouldEnable({
      minSavings: 0.10, // Enable if savings > $0.10
      minConfidence: 0.8, // Enable if confidence > 80%
      minInterventionRate: 0.3, // Enable if intervention rate > 30%
    });

    if (decision.shouldEnable) {
      console.log('✅ Recommendation: ENABLE Cost Brain');
      console.log(`   Reason: ${decision.reason}`);
      console.log(`   Expected Monthly Savings: $${decision.projectedMonthlySavings.toFixed(2)}`);
    } else {
      console.log('⏸️  Recommendation: Keep testing in shadow mode');
      console.log(`   Reason: ${decision.reason}`);
    }

    console.log('\n✅ Shadow mode example completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

