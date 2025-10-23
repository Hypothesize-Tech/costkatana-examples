/**
 * Advanced: Feedback Loop
 * Track user feedback for quality optimization
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config } from '../../shared/config';

async function main() {
  console.log('\n⭐ Feedback Loop Example\n');
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    projectId: config.projectId,
  });
  
  // Initialize feedback system
  tracker.initializeFeedback();
  
  // Submit feedback
  const requestId = 'req_abc123';
  await tracker.submitFeedback(requestId, {
    rating: 5,
    helpful: true,
    comment: 'Excellent response quality',
    userId: 'user_456'
  });
  
  console.log('✅ Feedback submitted!');
  console.log('   Track quality metrics to optimize model selection\n');
}

main().catch(console.error);
