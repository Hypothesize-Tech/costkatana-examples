/**
 * Cost Katana Cache: Express Middleware
 * 
 * Automatic caching middleware for Express.js applications.
 */

import express, { Request, Response, NextFunction } from 'express';

interface CacheOptions {
  ttl?: number;
  semanticThreshold?: number;
  scope?: 'user' | 'global';
  bypassCondition?: (req: Request) => boolean;
}

/**
 * Express middleware for automatic caching
 */
export function cacheMiddleware(options: CacheOptions = {}) {
  const {
    ttl = 3600,
    semanticThreshold = 0.90,
    scope = 'global',
    bypassCondition
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    // Check if caching should be bypassed
    if (bypassCondition && bypassCondition(req)) {
      return next();
    }

    // Add cache headers to request
    req.headers['x-enable-cache'] = 'true';
    req.headers['x-cache-ttl'] = ttl.toString();
    req.headers['x-semantic-threshold'] = semanticThreshold.toString();
    req.headers['x-cache-scope'] = scope;

    // Intercept response to log cache info
    const originalJson = res.json.bind(res);
    res.json = function(body: any) {
      const cacheStatus = res.getHeader('x-cache-status');
      const costSaved = res.getHeader('x-cost-saved');
      
      if (cacheStatus === 'hit') {
        console.log(`💰 Cache hit - Saved $${costSaved}`);
      }

      return originalJson(body);
    };

    next();
  };
}

// Example usage
const app = express();

// Apply caching to all AI routes
app.use('/api/ai', cacheMiddleware({
  ttl: 3600, // 1 hour
  semanticThreshold: 0.90,
  scope: 'global',
  bypassCondition: (req) => {
    // Bypass cache for transactional endpoints
    return req.path.includes('/transaction');
  }
}));

// Route-specific caching
app.post('/api/ai/factual', cacheMiddleware({ ttl: 86400 }), async (req, res) => {
  // Long TTL for factual content
});

app.post('/api/ai/dynamic', cacheMiddleware({ ttl: 300 }), async (req, res) => {
  // Short TTL for dynamic content
});

export default app;
