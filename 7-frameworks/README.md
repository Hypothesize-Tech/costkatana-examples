# Framework Integration Examples

Integrate Cost Katana with popular web frameworks for production-ready applications.

## Supported Frameworks

### 1. Express.js
**Best For:** RESTful APIs, microservices

**Features:**
- Middleware for automatic tracking
- Route-level cost monitoring
- Error handling
- Rate limiting integration

[View Example](./express/)

### 2. Next.js
**Best For:** Full-stack React applications, SSR/SSG

**Features:**
- API routes with Cost Katana
- Server-side rendering optimization
- Client-side cost tracking
- Real-time cost display

[View Example](./nextjs/)

### 3. Fastify
**Best For:** High-performance APIs

**Features:**
- Ultra-fast JSON serialization
- Schema validation with Cortex
- Plugin architecture
- Built-in logging

[View Example](./fastify/)

### 4. NestJS
**Best For:** Enterprise applications, microservices

**Features:**
- Dependency injection
- Service-based architecture
- Guards and interceptors
- Testing utilities

[View Example](./nestjs/)

## Quick Comparison

| Framework | Performance | Learning Curve | Best For |
|-----------|-------------|----------------|----------|
| Express | Good | Easy | General purpose APIs |
| Next.js | Excellent | Moderate | Full-stack React apps |
| Fastify | Excellent | Easy | High-performance APIs |
| NestJS | Good | Steep | Enterprise applications |

## Common Integration Pattern

```typescript
// 1. Initialize Cost Katana
import { AICostTracker } from 'cost-katana';

const tracker = await AICostTracker.create(config);

// 2. Create middleware/interceptor
function costKatanaMiddleware(req, res, next) {
  req.tracker = tracker;
  next();
}

// 3. Use in routes
app.post('/api/chat', async (req, res) => {
  const response = await req.tracker.makeRequest({
    model: 'gpt-4',
    messages: req.body.messages
  });
  
  res.json(response);
});
```

## Best Practices

1. **Initialize tracker once** at application startup
2. **Use middleware** for automatic tracking
3. **Handle errors gracefully** with try-catch
4. **Implement rate limiting** for production
5. **Enable caching** for repeated requests
6. **Monitor costs** with analytics dashboard
7. **Set budgets** to prevent overspending

## Production Checklist

- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Rate limiting enabled
- [ ] Caching configured
- [ ] Monitoring set up
- [ ] Budgets configured
- [ ] Load tested
- [ ] Security reviewed

## Support

- **Examples**: See framework-specific folders
- **Docs**: [docs.costkatana.com/frameworks](https://docs.costkatana.com/frameworks)

