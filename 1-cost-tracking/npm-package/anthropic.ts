/**
 * Cost Tracking Example: Anthropic Claude
 * 
 * This example demonstrates automatic cost tracking for Anthropic Claude requests.
 * 
 * Run: npm run example 1-cost-tracking/npm-package/anthropic.ts
 */

import { ai, chat } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost, formatTokens, calculateSavings } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Anthropic Claude Cost Tracking Examples\n');
  
  // Validate configuration
  validateConfig(['costKatanaKey', 'projectId']);
  
  // Example 1: Claude 3.5 Sonnet - Balanced Performance
  console.log('📝 Example 1: Claude 3.5 Sonnet');
  try {
    const response = await ai('claude-3-5-sonnet-20241022', 
      'Analyze the trade-offs between microservices and monolithic architecture.',
      {
        maxTokens: 1024,
        temperature: 0.7,
      }
    );
    
    logResult('Claude 3.5 Sonnet Response', {
      'Text Preview': response.text.substring(0, 100) + '...',
      'Cost': formatCost(response.cost),
      'Tokens': formatTokens(response.tokens),
      'Model': response.model,
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 2: Claude 3 Haiku - Cost Optimized
  console.log('\n📝 Example 2: Claude 3 Haiku (Budget Model)');
  try {
    const response = await ai('claude-3-haiku-20240307', 
      'What are the key principles of agile development?',
      {
        maxTokens: 512,
        temperature: 0.5,
      }
    );
    
    logResult('Claude 3 Haiku Response', {
      'Text Preview': response.text.substring(0, 100) + '...',
      'Cost': formatCost(response.cost),
      'Tokens': formatTokens(response.tokens),
      'Model': 'Claude 3 Haiku (10x cheaper)',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 3: Cost Comparison - Sonnet vs Haiku
  console.log('\n📝 Example 3: Cost Comparison - Sonnet vs Haiku');
  try {
    const prompt = 'Explain the benefits of serverless architecture.';
    
    const sonnetResponse = await ai('claude-3-5-sonnet-20241022', prompt, { maxTokens: 500 });
    const haikuResponse = await ai('claude-3-haiku-20240307', prompt, { maxTokens: 500 });
    
    const savings = calculateSavings(sonnetResponse.cost, haikuResponse.cost);
    
    logResult('Model Cost Comparison', {
      'Sonnet Cost': formatCost(sonnetResponse.cost),
      'Haiku Cost': formatCost(haikuResponse.cost),
      'Savings': formatCost(savings.saved),
      'Percentage': `${savings.percentage.toFixed(1)}% cheaper`,
      'Recommendation': 'Use Haiku for simple tasks',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 4: Chat Session with System Prompt
  console.log('\n📝 Example 4: Chat Session with System Instructions');
  try {
    const session = chat('claude-3-5-sonnet-20241022', {
      systemMessage: 'You are a senior software architect with expertise in distributed systems.',
      temperature: 0.6,
      maxTokens: 2048,
    });
    
    const response1 = await session.send('What are the key patterns in event-driven architecture?');
    const response2 = await session.send('How do I handle eventual consistency?');
    
    logResult('Architecture Consultation Session', {
      'Messages Exchanged': session.messages.length,
      'Total Cost': formatCost(session.totalCost),
      'Total Tokens': formatTokens(session.totalTokens),
      'Average Cost/Message': formatCost(session.totalCost / 2),
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Example 5: Claude 3 Opus - Maximum Capability
  console.log('\n📝 Example 5: Claude 3 Opus (Premium Model)');
  try {
    const response = await ai('claude-3-opus-20240229', 
      'Write a comprehensive technical specification for a real-time collaborative document editing system.',
      {
        maxTokens: 4096,
        temperature: 0.5,
      }
    );
    
    logResult('Claude 3 Opus Response', {
      'Text Length': `${response.text.length} characters`,
      'Cost': formatCost(response.cost),
      'Tokens': formatTokens(response.tokens),
      'Use Case': 'Complex reasoning and long-form content',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n✅ All Anthropic examples completed!');
  console.log('\n💡 Cost Optimization Tip:');
  console.log('   • Use Haiku for simple tasks (10x cheaper)');
  console.log('   • Use Sonnet for balanced performance');
  console.log('   • Use Opus only for complex reasoning tasks\n');
  console.log('📊 View your tracked data at: https://costkatana.com/dashboard\n');
}

// Run examples
main().catch(console.error);

