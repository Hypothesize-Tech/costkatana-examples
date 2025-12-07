"""
Data Network Effects - Basic Learning Loop

Demonstrates how to:
- Get optimization recommendations
- Provide feedback (accept/reject)
- Track outcomes and learning
"""

import os
from costkatana import CostKatana

client = CostKatana(api_key=os.getenv('COST_KATANA_API_KEY'))

def main():
    try:
        print('🔄 Data Network Effects - Basic Learning Loop\n')

        # 1. Get optimization recommendations
        print('💡 Fetching recommendations...')
        recommendations = client.network_effects.get_recommendations(
            types=['model_switch', 'provider_switch', 'caching'],
            min_savings=0.01,
            limit=5
        )

        print(f'\n✅ Found {len(recommendations)} recommendations:\n')

        for index, rec in enumerate(recommendations, 1):
            print(f'{index}. {rec["title"]}')
            print(f'   Type: {rec["type"]}')
            print(f'   Current: {rec["current"]["model"]} @ ${rec["current"]["cost"]:.6f}/request')
            print(f'   Suggested: {rec["suggested"]["model"]} @ ${rec["suggested"]["cost"]:.6f}/request')
            print(f'   Potential Savings: ${rec["estimatedSavings"]:.4f}/month ({rec["savingsPercent"]}%)')
            print(f'   Confidence: {rec["confidence"]} ({rec["confidenceScore"]}%)')
            print('')

        # 2. Accept a recommendation
        if recommendations:
            recommendation = recommendations[0]
            
            print(f'✅ Accepting recommendation: {recommendation["title"]}')
            acceptance = client.network_effects.accept_recommendation(
                recommendation_id=recommendation['id'],
                apply_immediately=False,
                feedback={
                    'reason': 'Looks promising, will test',
                    'confidence': 0.8
                }
            )

            print(f'Acceptance ID: {acceptance["acceptanceId"]}')
            print(f'Status: {acceptance["status"]}\n')

            # 3. Track outcome
            print('📊 Tracking outcome...\n')
            client.network_effects.track_outcome(
                recommendation_id=recommendation['id'],
                acceptance_id=acceptance['acceptanceId'],
                actual_outcome={
                    'implemented': True,
                    'actualSavings': 0.035,
                    'qualityImpact': 0.02,
                    'latencyImpact': -50,
                    'userSatisfaction': 0.9
                }
            )

            print('✅ Outcome tracked successfully\n')

        # 4. View learning statistics
        print('📈 Learning Loop Statistics:')
        stats = client.network_effects.get_learning_stats(time_range='30d')

        print(f'\nRecommendations Made: {stats["totalRecommendations"]}')
        print(f'Accepted: {stats["accepted"]} ({stats["acceptanceRate"]}%)')
        print(f'\nOutcomes Measured: {stats["outcomesMeasured"]}')
        print(f'Successful: {stats["successful"]} ({stats["successRate"]}%)')
        print(f'\nTotal Savings: ${stats["totalSavings"]:.2f}')
        print(f'Recommendation Quality: {stats["recommendationQuality"]}/1.0')
        print(f'Prediction Accuracy: {stats["predictionAccuracy"]}%')

        print('\n✅ Learning loop example completed!')

    except Exception as error:
        print(f'❌ Error: {error}')
        exit(1)

if __name__ == '__main__':
    main()

