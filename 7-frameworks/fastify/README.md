# Fastify + Cost Katana

High-performance API server with Cost Katana integration.

## Setup

```bash
npm install fastify cost-katana
```

## Example

```typescript
import Fastify from 'fastify';
import { ai } from 'cost-katana';

const fastify = Fastify({ logger: true });

// Chat endpoint
fastify.post('/api/chat', async (request, reply) => {
  const { message } = request.body as { message: string };
  
  const response = await ai('gpt-4', message);
  
  return {
    response: response.text,
    cost: response.cost,
    tokens: response.tokens
  };
});

// Start server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
```

## Features

- ✅ Ultra-fast JSON serialization
- ✅ Schema validation
- ✅ Built-in logging
- ✅ Plugin architecture
- ✅ TypeScript support

## Performance

Fastify is 2-3x faster than Express for AI workloads.
