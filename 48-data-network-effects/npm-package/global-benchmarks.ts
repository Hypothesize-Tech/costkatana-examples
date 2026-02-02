/**
 * Data Network Effects - Global Benchmarks
 * 
 * Demonstrates how to:
 * - Compare your performance against global benchmarks
 * - Access anonymized aggregate data
 * - See how you rank
 */

import { CostKatana } from 'cost-katana';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!,
});

async function main() {
  try {
    console.log('🌍 Data Network Effects - Global Benchmarks\n');

    // 1. Get global benchmarks
    console.log('📊 Fetching global benchmarks...');
    const benchmarks = await client.networkEffects.getGlobalBenchmarks({
      metrics: ['cost', 'latency', 'quality', 'cacheHitRate'],
      timeRange: '30d',
      filters: {
        industry: 'technology', // Optional: compare within your industry
        companySize: 'medium', // Optional: compare with similar-sized companies
      },
    });

    console.log('\n💰 Cost per Request:');
    console.log(`Your Average: $${benchmarks.cost.yours.toFixed(6)}`);
    console.log(`Global Average: $${benchmarks.cost.globalAverage.toFixed(6)}`);
    console.log(`Global Median: $${benchmarks.cost.globalMedian.toFixed(6)}`);
    console.log(`Top 10% (Best): $${benchmarks.cost.top10Percent.toFixed(6)}`);
    console.log(`Your Percentile: ${benchmarks.cost.yourPercentile}th`);
    console.log(`Status: ${benchmarks.cost.status} ${benchmarks.cost.emoji}`);

    console.log('\n⚡ Average Latency:');
    console.log(`Yours: ${benchmarks.latency.yours}ms`);
    console.log(`Global Average: ${benchmarks.latency.globalAverage}ms`);
    console.log(`Top 10%: ${benchmarks.latency.top10Percent}ms`);
    console.log(`Your Percentile: ${benchmarks.latency.yourPercentile}th`);
    console.log(`Status: ${benchmarks.latency.status} ${benchmarks.latency.emoji}`);

    console.log('\n✨ Quality Score:');
    console.log(`Yours: ${benchmarks.quality.yours}/1.0`);
    console.log(`Global Average: ${benchmarks.quality.globalAverage}/1.0`);
    console.log(`Top 10%: ${benchmarks.quality.top10Percent}/1.0`);
    console.log(`Your Percentile: ${benchmarks.quality.yourPercentile}th`);

    console.log('\n💾 Cache Hit Rate:');
    console.log(`Yours: ${benchmarks.cacheHitRate.yours}%`);
    console.log(`Global Average: ${benchmarks.cacheHitRate.globalAverage}%`);
    console.log(`Top 10%: ${benchmarks.cacheHitRate.top10Percent}%`);
    console.log(`Your Percentile: ${benchmarks.cacheHitRate.yourPercentile}th`);

    // 2. Get performance trends
    console.log('\n📈 Your Performance Trends (vs Global):');
    const trends = await client.networkEffects.getPerformanceTrends({
      metrics: ['cost', 'optimization'],
      timeRange: '90d',
      compareToGlobal: true,
    });

    trends.forEach(trend => {
      console.log(`\n${trend.metric}:`);
      console.log(`  Your Trend: ${trend.yourTrend} (${trend.yourChange})`);
      console.log(`  Global Trend: ${trend.globalTrend} (${trend.globalChange})`);
      console.log(`  Relative Performance: ${trend.relativePerformance}`);
    });

    // 3. Get improvement opportunities based on benchmarks
    console.log('\n💡 Improvement Opportunities:');
    const opportunities = await client.networkEffects.getImprovementOpportunities({
      basedOnBenchmarks: true,
      minImpact: 'medium',
    });

    opportunities.forEach((opp, index) => {
      console.log(`\n${index + 1}. ${opp.title}`);
      console.log(`   Category: ${opp.category}`);
      console.log(`   Impact: ${opp.impact}`);
      console.log(`   Potential Savings: $${opp.potentialSavings.toFixed(2)}/month`);
      console.log(`   Based on: Top ${opp.benchmarkPercentile}% performers`);
      console.log(`   Action: ${opp.recommendedAction}`);
    });

    // 4. See what top performers are doing
    console.log('\n🏆 What Top Performers Are Doing:');
    const topPractices = await client.networkEffects.getTopPractices({
      percentile: 10, // Top 10%
      category: 'all',
    });

    topPractices.forEach((practice, index) => {
      console.log(`\n${index + 1}. ${practice.practice}`);
      console.log(`   Adoption Rate (Top 10%): ${practice.adoptionRate}%`);
      console.log(`   Your Adoption: ${practice.yourAdoption ? '✅ Yes' : '❌ No'}`);
      console.log(`   Avg Benefit: ${practice.avgBenefit}`);
    });

    console.log('\n✅ Global benchmarks example completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

