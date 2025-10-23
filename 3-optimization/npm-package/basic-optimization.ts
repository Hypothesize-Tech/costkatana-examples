/**
 * Optimization Example: Basic Prompt Optimization
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost, calculateSavings } from '../../shared/utils';

async function main() {
  console.log('\n⚡ Prompt Optimization Examples\n');
  
  validateConfig();
  
  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    optimization: {
      enablePromptOptimization: true,
      enableModelSuggestions: true,
    },
    projectId: config.projectId,
  });
  
  const longPrompt = 'Can you please help me understand what machine learning is and how it works?';
  
  // Get optimization suggestions
  const optimizations = await tracker.optimizePrompt(longPrompt, 'gpt-4', AIProvider.OpenAI);
  
  console.log('Original prompt:', longPrompt);
  console.log('Optimized prompt:', optimizations[0]?.optimizedPrompt);
  console.log('Token reduction:', optimizations[0]?.tokenReduction);
  console.log('\n✅ 20-30% cost savings with optimization!\n');
}

main().catch(console.error);
