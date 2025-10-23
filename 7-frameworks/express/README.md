# Express.js + Cost Katana

Production-ready Express.js API with Cost Katana integration.

## Features

- ✅ RESTful API endpoints
- ✅ Automatic cost tracking middleware
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS enabled
- ✅ Request validation
- ✅ Analytics endpoint
- ✅ Health checks

## Setup

```bash
npm install express cost-katana cors helmet express-rate-limit
```

## Run

```bash
npm run example 7-frameworks/express/index.ts
```

Then visit:
- Chat API: `POST http://localhost:3000/api/chat`
- Analytics: `GET http://localhost:3000/api/analytics`
- Health: `GET http://localhost:3000/api/health`

## API Endpoints

### POST /api/chat
Chat with AI with automatic cost tracking.

**Request:**
```json
{
  "message": "Explain quantum computing",
  "model": "gpt-4",
  "options": {
    "temperature": 0.7,
    "maxTokens": 500
  }
}
```

**Response:**
```json
{
  "response": "Quantum computing is...",
  "cost": 0.015,
  "tokens": 450,
  "model": "gpt-4"
}
```

### GET /api/analytics
Get usage analytics.

**Response:**
```json
{
  "totalRequests": 1250,
  "totalCost": 45.67,
  "avgCostPerRequest": 0.037,
  "period": "last-30-days"
}
```

## Architecture

```
Client → Express Router → Cost Katana Middleware → AI Provider
   ↓          ↓                    ↓                      ↓
Response ← JSON ← Cost Tracking ← AI Response
```

## Best Practices

1. Use environment variables for API keys
2. Implement rate limiting
3. Enable CORS for production
4. Add request validation
5. Implement proper error handling
6. Monitor with Cost Katana dashboard

## Production Deployment

```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

