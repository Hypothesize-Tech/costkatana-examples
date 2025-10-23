/**
 * Cost Tracking Example: AWS Bedrock
 * 
 * This example demonstrates automatic cost tracking for AWS Bedrock requests.
 * 
 * Run: npm run example 1-cost-tracking/npm-package/aws-bedrock.ts
 */

import { ai } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost, formatTokens } from '../../shared/utils';

async function main() {
  console.log('\n🚀 AWS Bedrock Cost Tracking Examples\n');
  
  // Validate configuration
  validateConfig(['costKatanaKey', 'projectId', 'awsAccessKeyId', 'awsSecretAccessKey']);
  
  // Example: Nova Pro Request
  console.log('📝 Example: AWS Bedrock Nova Pro');
  try {
    const response = await ai('nova-pro', 
      'Explain the benefits of serverless architecture on AWS.',
      {
        maxTokens: 1000,
        temperature: 0.7,
      }
    );
    
    logResult('Nova Pro Response', {
      'Text Preview': response.text.substring(0, 100) + '...',
      'Cost': formatCost(response.cost),
      'Tokens': formatTokens(response.tokens),
      'Provider': 'AWS Bedrock',
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n✅ AWS Bedrock example completed!');
  console.log('📊 View your tracked data at: https://costkatana.com/dashboard\n');
}

main().catch(console.error);
