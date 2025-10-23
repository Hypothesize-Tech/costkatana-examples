/**
 * Shared utility functions for Cost Katana examples
 */

export function formatCost(cost: number): string {
  return `$${cost.toFixed(6)}`;
}

export function formatTokens(tokens: number): string {
  return tokens.toLocaleString();
}

export function calculateSavings(originalCost: number, optimizedCost: number): {
  saved: number;
  percentage: number;
} {
  const saved = originalCost - optimizedCost;
  const percentage = (saved / originalCost) * 100;
  return { saved, percentage };
}

export function logResult(title: string, data: Record<string, any>): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('='.repeat(60));
  
  Object.entries(data).forEach(([key, value]) => {
    console.log(`${key.padEnd(20)}: ${value}`);
  });
  
  console.log('='.repeat(60) + '\n');
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await sleep(delay);
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export function extractModelFromUrl(url: string): string {
  // Extract model name from various provider URLs
  if (url.includes('openai')) return 'OpenAI';
  if (url.includes('anthropic')) return 'Anthropic';
  if (url.includes('google')) return 'Google AI';
  if (url.includes('cohere')) return 'Cohere';
  if (url.includes('groq')) return 'Groq';
  if (url.includes('deepseek')) return 'DeepSeek';
  if (url.includes('azure')) return 'Azure OpenAI';
  if (url.includes('bedrock') || url.includes('amazonaws')) return 'AWS Bedrock';
  return 'Unknown';
}

