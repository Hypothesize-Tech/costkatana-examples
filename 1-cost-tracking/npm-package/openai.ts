/**
 * Cost Tracking Example: OpenAI
 * 
 * This example demonstrates automatic cost tracking for OpenAI requests
 * using the cost-katana NPM package.
 * 
 * Run: npm run example 1-cost-tracking/npm-package/openai.ts
 */

import { ai, chat, AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost, formatTokens } from '../../shared/utils';

async function main() {
  console.log('\n🚀 OpenAI Cost Tracking Examples\n');
  
  // Validate configuration
  validateConfig(['costKatanaKey', 'projectId', 'openaiKey']);
  
  // Example 1: Simple AI Call with Automatic Tracking
  console.log('📝 Example 1: Simple GPT-4 Request');
  try {
    const response = await ai('gpt-4', 'Explain quantum computing in simple terms.');
    
    logResult('GPT-4 Response', {
      'Text Preview': response.text.substring(0, 100) + '...',
      'Cost': formatCost(response.cost),
      'Tokens': formatTokens(response.tokens),
      'Model': response.model,
      'Provider': response.provider,
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 2: Chat Session with Cost Tracking
  console.log('\n📝 Example 2: Chat Session with Total Cost');
  try {
    const session = chat('gpt-3.5-turbo', {
      systemMessage: 'You are a helpful assistant specialized in technology.',
    });
    
    await session.send('What is TypeScript?');
    await session.send('How is it different from JavaScript?');
    await session.send('Give me a code example.');
    
    logResult('Chat Session Summary', {
      'Messages': session.messages.length,
      'Total Cost': formatCost(session.totalCost),
      'Total Tokens': formatTokens(session.totalTokens),
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 3: Advanced Tracking with Manual Configuration
  console.log('\n📝 Example 3: Advanced Tracking with Custom Metadata');
  try {
    const tracker = await AICostTracker.create({
      providers: [{
        provider: AIProvider.OpenAI,
        apiKey: config.openaiKey,
      }],
      optimization: {
        enablePromptOptimization: true,
        enableModelSuggestions: true,
        enableCachingSuggestions: true,
      },
      tracking: {
        enableAutoTracking: true,
      },
      projectId: config.projectId,
    });
    
    // Make request and track with custom metadata
    const request = {
      model: 'gpt-4',
      messages: [
        { role: 'system' as const, content: 'You are an expert software architect.' },
        { role: 'user' as const, content: 'Design a scalable microservices architecture.' },
      ],
      maxTokens: 1000,
      temperature: 0.7,
    };
    
    const response = await tracker.makeRequest(request);
    
    // Custom tracking with tags
    await tracker.trackUsage({
      provider: AIProvider.OpenAI,
      model: 'gpt-4',
      promptTokens: response.usage?.prompt_tokens || 0,
      completionTokens: response.usage?.completion_tokens || 0,
      totalTokens: response.usage?.total_tokens || 0,
      estimatedCost: 0.01, // Will be calculated automatically
      tags: ['production', 'architecture', 'high-priority'],
      metadata: {
        environment: 'production',
        feature: 'design-assistant',
        team: 'platform',
        department: 'engineering',
      },
    });
    
    logResult('Advanced Tracking', {
      'Request': 'Successful',
      'Tags Added': '3 tags',
      'Metadata': 'Custom fields tracked',
      'Status': 'Tracked in dashboard',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 4: Cost Comparison Across Models
  console.log('\n📝 Example 4: Cost Comparison - GPT-4 vs GPT-3.5-turbo');
  try {
    const prompt = 'Explain the difference between REST and GraphQL.';
    
    const gpt4Response = await ai('gpt-4', prompt);
    const gpt35Response = await ai('gpt-3.5-turbo', prompt);
    
    logResult('Cost Comparison', {
      'GPT-4 Cost': formatCost(gpt4Response.cost),
      'GPT-3.5-turbo Cost': formatCost(gpt35Response.cost),
      'Savings': formatCost(gpt4Response.cost - gpt35Response.cost),
      'Percentage': `${((1 - gpt35Response.cost / gpt4Response.cost) * 100).toFixed(1)}% cheaper`,
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 5: Embeddings Cost Tracking
  console.log('\n📝 Example 5: Embeddings API with Cost Tracking');
  try {
    const tracker = await AICostTracker.create({
      providers: [{
        provider: AIProvider.OpenAI,
        apiKey: config.openaiKey,
      }],
      tracking: {
        enableAutoTracking: true,
      },
      projectId: config.projectId,
    });
    
    // Track embeddings request
    await tracker.trackUsage({
      provider: AIProvider.OpenAI,
      model: 'text-embedding-ada-002',
      promptTokens: 50,
      completionTokens: 0,
      totalTokens: 50,
      estimatedCost: 0.00001, // Very cheap!
      tags: ['embeddings', 'search'],
      metadata: {
        feature: 'semantic-search',
        inputType: 'document',
      },
    });
    
    logResult('Embeddings Tracking', {
      'Model': 'text-embedding-ada-002',
      'Tokens': '50',
      'Cost': '~$0.00001',
      'Use Case': 'Semantic search',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n✅ All OpenAI examples completed!');
  console.log('📊 View your tracked data at: https://costkatana.com/dashboard\n');
}

// Run examples
main().catch(console.error);

