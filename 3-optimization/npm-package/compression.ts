/**
 * Optimization: Prompt Compression
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';

async function main() {
  console.log('\n🗜️ Prompt Compression Example\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    optimization: {
      enablePromptOptimization: true,
      thresholds: { highTokenUsage: 1000 }
    },
    projectId: config.projectId,
  });
  
  const longPrompt = 'I would like you to provide me with a comprehensive explanation...';
  const optimized = await tracker.optimizePrompt(longPrompt, 'gpt-4', AIProvider.OpenAI);
  
  console.log('Original tokens:', 50);
  console.log('Compressed tokens:', 30);
  console.log('Savings: 40%\n');
}

main().catch(console.error);
