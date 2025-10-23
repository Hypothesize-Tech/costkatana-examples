import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, 'env.example') });

export const config = {
  // Cost Katana
  costKatanaKey: process.env.COST_KATANA_API_KEY || '',
  projectId: process.env.PROJECT_ID || '',
  gatewayUrl: process.env.COST_KATANA_GATEWAY_URL || 'https://cost-katana-backend.store/api/gateway',
  
  // Provider Keys
  openaiKey: process.env.OPENAI_API_KEY || '',
  anthropicKey: process.env.ANTHROPIC_API_KEY || '',
  googleKey: process.env.GOOGLE_API_KEY || '',
  cohereKey: process.env.COHERE_API_KEY || '',
  groqKey: process.env.GROQ_API_KEY || '',
  deepseekKey: process.env.DEEPSEEK_API_KEY || '',
  azureKey: process.env.AZURE_OPENAI_KEY || '',
  azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
  
  // AWS
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsRegion: process.env.AWS_REGION || 'us-east-1',
};

export function validateConfig(requiredKeys: string[] = ['costKatanaKey', 'projectId']): void {
  const missing: string[] = [];
  
  for (const key of requiredKeys) {
    if (!config[key as keyof typeof config]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please copy shared/env.example to .env and fill in your credentials.`
    );
  }
}

