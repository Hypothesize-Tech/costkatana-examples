/**
 * Fastify + Cost Katana Integration Example
 * 
 * High-performance API server with automatic cost tracking
 * 
 * Run: npm run dev
 */

import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { ai, AICostTracker, AIProvider } from 'cost-katana';

const fastify = Fastify({
  logger: true,
  bodyLimit: 1048576 // 1MB
});

const PORT = process.env.PORT || 3000;

// Initialize Cost Katana tracker
let tracker: AICostTracker;

// Register plugins
async function registerPlugins() {
  // CORS
  await fastify.register(cors, {
    origin: true
  });
  
  // Rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes'
  });
}

// Initialize tracker
async function initializeTracker() {
  try {
    tracker = await AICostTracker.create({
      providers: [
        { provider: AIProvider.OpenAI, apiKey: process.env.OPENAI_API_KEY || '' },
        { provider: AIProvider.Anthropic, apiKey: process.env.ANTHROPIC_API_KEY || '' },
      ],
      tracking: { enableAutoTracking: true },
      optimization: { enablePromptOptimization: true },
      projectId: process.env.COST_KATANA_PROJECT_ID || '',
    });
    
    fastify.log.info('Cost Katana tracker initialized');
  } catch (error: any) {
    fastify.log.error('Failed to initialize tracker:', error);
    throw error;
  }
}

// Schema definitions for validation
const chatSchema = {
  body: {
    type: 'object',
    required: ['message'],
    properties: {
      message: { type: 'string', minLength: 1 },
      model: { type: 'string', default: 'gpt-4' },
      options: {
        type: 'object',
        properties: {
          temperature: { type: 'number', minimum: 0, maximum: 2 },
          maxTokens: { type: 'number', minimum: 1, maximum: 4000 }
        }
      }
    }
  }
};

const optimizeSchema = {
  body: {
    type: 'object',
    required: ['prompt'],
    properties: {
      prompt: { type: 'string', minLength: 1 },
      model: { type: 'string', default: 'gpt-4' },
      targetReduction: { type: 'number', minimum: 10, maximum: 80, default: 30 }
    }
  }
};

// Routes

// Health check
fastify.get('/api/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return {
    status: 'ok',
    service: 'fastify-cost-katana-api',
    timestamp: new Date().toISOString(),
    costKatana: tracker ? 'initialized' : 'not initialized'
  };
});

// Chat endpoint
interface ChatBody {
  message: string;
  model?: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

fastify.post<{ Body: ChatBody }>(
  '/api/chat',
  { schema: chatSchema },
  async (request, reply) => {
    const { message, model = 'gpt-4', options = {} } = request.body;
    
    try {
      const startTime = Date.now();
      
      const response = await tracker.makeRequest({
        model,
        messages: [{ role: 'user' as const, content: message }],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
      });
      
      const processingTime = Date.now() - startTime;
      
      return {
        response: response.choices[0].message.content,
        metadata: {
          cost: response.usage?.estimatedCost || 0,
          tokens: response.usage?.total_tokens || 0,
          model: response.model,
          processingTime: `${processingTime}ms`,
          provider: 'OpenAI'
        }
      };
      
    } catch (error: any) {
      request.log.error('Chat error:', error);
      reply.code(500);
      return {
        error: 'Failed to process chat request',
        message: error.message
      };
    }
  }
);

// Optimize endpoint
interface OptimizeBody {
  prompt: string;
  model?: string;
  targetReduction?: number;
}

fastify.post<{ Body: OptimizeBody }>(
  '/api/optimize',
  { schema: optimizeSchema },
  async (request, reply) => {
    const { prompt, model = 'gpt-4', targetReduction = 30 } = request.body;
    
    try {
      const optimizations = await tracker.optimizePrompt(prompt, model, AIProvider.OpenAI);
      
      return {
        original: prompt,
        optimized: optimizations[0]?.optimizedPrompt || prompt,
        metrics: {
          tokenReduction: optimizations[0]?.tokenReduction || 0,
          costSaved: optimizations[0]?.costSaved || 0,
        },
        alternatives: optimizations.slice(1, 4).map(opt => ({
          prompt: opt.optimizedPrompt,
          reduction: opt.tokenReduction,
          savings: opt.costSaved
        }))
      };
      
    } catch (error: any) {
      request.log.error('Optimization error:', error);
      reply.code(500);
      return {
        error: 'Failed to optimize prompt',
        message: error.message
      };
    }
  }
);

// Analytics endpoint
fastify.get('/api/analytics', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const analytics = await tracker.getAnalytics(startDate, endDate);
    
    return {
      period: '30-days',
      summary: {
        totalRequests: analytics.totalRequests || 0,
        totalCost: analytics.totalCost || 0,
        avgCostPerRequest: analytics.avgCostPerRequest || 0,
        totalTokens: analytics.totalTokens || 0,
        cacheHitRate: `${((analytics.cacheHitRate || 0) * 100).toFixed(1)}%`,
      },
      savings: {
        fromOptimization: analytics.savingsFromOptimization || 0,
        fromCaching: analytics.savingsFromCaching || 0,
        total: analytics.totalSavings || 0,
      }
    };
    
  } catch (error: any) {
    request.log.error('Analytics error:', error);
    reply.code(500);
    return {
      error: 'Failed to fetch analytics',
      message: error.message
    };
  }
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: error.message || 'Internal server error',
    statusCode: error.statusCode || 500
  });
});

// Start server
async function start() {
  try {
    // Register plugins
    await registerPlugins();
    
    // Initialize tracker
    await initializeTracker();
    
    // Start listening
    await fastify.listen({ port: PORT as number, host: '0.0.0.0' });
    
    console.log(`\n🚀 Fastify + Cost Katana API Server`);
    console.log(`   Server running on http://localhost:${PORT}`);
    console.log(`\n📚 Available Endpoints:`);
    console.log(`   POST   http://localhost:${PORT}/api/chat       - Chat with AI`);
    console.log(`   POST   http://localhost:${PORT}/api/optimize   - Optimize prompt`);
    console.log(`   GET    http://localhost:${PORT}/api/analytics  - Get analytics`);
    console.log(`   GET    http://localhost:${PORT}/api/health     - Health check`);
    console.log(`\n📊 View dashboard: https://costkatana.com/dashboard\n`);
    
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

// Graceful shutdown
const closeGracefully = async (signal: string) => {
  console.log(`Received ${signal}, closing server gracefully`);
  await fastify.close();
  process.exit(0);
};

process.on('SIGTERM', () => closeGracefully('SIGTERM'));
process.on('SIGINT', () => closeGracefully('SIGINT'));

// Start the server
start();

