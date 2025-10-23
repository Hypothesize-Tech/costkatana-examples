/**
 * Express.js + Cost Katana Integration Example
 * Production-ready RESTful API with automatic cost tracking
 */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AICostTracker, AIProvider } from 'cost-katana';
import { config } from '../../shared/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Initialize Cost Katana tracker
let tracker: AICostTracker;

(async () => {
  try {
    tracker = await AICostTracker.create({
      providers: [
        { provider: AIProvider.OpenAI, apiKey: config.openaiKey },
        { provider: AIProvider.Anthropic, apiKey: config.anthropicKey },
      ],
      tracking: { enableAutoTracking: true },
      optimization: { enablePromptOptimization: true },
      projectId: config.projectId,
    });
    
    console.log('✅ Cost Katana tracker initialized');
  } catch (error: any) {
    console.error('❌ Failed to initialize tracker:', error.message);
    process.exit(1);
  }
})();

// Cost Katana middleware
function costKatanaMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!tracker) {
    return res.status(503).json({ error: 'Service temporarily unavailable' });
  }
  
  (req as any).tracker = tracker;
  next();
}

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'cost-katana-express-api',
    timestamp: new Date().toISOString(),
    costKatana: tracker ? 'initialized' : 'not initialized'
  });
});

// Chat endpoint with cost tracking
app.post('/api/chat', costKatanaMiddleware, async (req: Request, res: Response) => {
  try {
    const { message, model = 'gpt-4', options = {} } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const tracker = (req as any).tracker as AICostTracker;
    
    const startTime = Date.now();
    
    const response = await tracker.makeRequest({
      model,
      messages: [
        { role: 'user' as const, content: message }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 500,
    });
    
    const processingTime = Date.now() - startTime;
    
    res.json({
      response: response.choices[0].message.content,
      metadata: {
        cost: response.usage?.estimatedCost || 0,
        tokens: response.usage?.total_tokens || 0,
        model: response.model,
        processingTime: `${processingTime}ms`,
        provider: 'OpenAI'
      }
    });
    
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      message: error.message
    });
  }
});

// Optimize prompt endpoint
app.post('/api/optimize', costKatanaMiddleware, async (req: Request, res: Response) => {
  try {
    const { prompt, model = 'gpt-4', targetReduction = 30 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const tracker = (req as any).tracker as AICostTracker;
    
    const optimizations = await tracker.optimizePrompt(prompt, model, AIProvider.OpenAI);
    
    res.json({
      original: prompt,
      optimized: optimizations[0]?.optimizedPrompt || prompt,
      tokenReduction: optimizations[0]?.tokenReduction || 0,
      estimatedSavings: optimizations[0]?.costSaved || 0,
      suggestions: optimizations.map(opt => ({
        prompt: opt.optimizedPrompt,
        reduction: opt.tokenReduction,
        savings: opt.costSaved
      }))
    });
    
  } catch (error: any) {
    console.error('Optimization error:', error);
    res.status(500).json({
      error: 'Failed to optimize prompt',
      message: error.message
    });
  }
});

// Analytics endpoint
app.get('/api/analytics', costKatanaMiddleware, async (req: Request, res: Response) => {
  try {
    const tracker = (req as any).tracker as AICostTracker;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    
    const analytics = await tracker.getAnalytics(startDate, endDate);
    
    res.json({
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
        fromCortex: analytics.savingsFromCortex || 0,
        total: analytics.totalSavings || 0,
      }
    });
    
  } catch (error: any) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Failed to fetch analytics',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Express + Cost Katana API Server`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`\n📚 Available Endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/chat       - Chat with AI`);
  console.log(`   POST   http://localhost:${PORT}/api/optimize   - Optimize prompt`);
  console.log(`   GET    http://localhost:${PORT}/api/analytics  - Get analytics`);
  console.log(`   GET    http://localhost:${PORT}/api/health     - Health check`);
  console.log(`\n📊 View dashboard: https://costkatana.com/dashboard\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

