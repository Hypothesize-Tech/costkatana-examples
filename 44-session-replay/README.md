# Cost Katana Session Replay Examples

**Record and replay AI interactions for debugging, analysis, and compliance.**

Session Replay allows you to capture in-app AI interactions with full context including prompts, responses, costs, latency, and user actions. Perfect for debugging AI applications, analyzing user behavior, and maintaining audit trails.

## Quick Start

### 1. Start Recording a Session

```typescript
import { SessionReplayClient } from 'cost-katana/trace';

const client = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

const { sessionId } = await client.startRecording({
  userId: 'user_123',
  feature: 'chat',
  label: 'Customer Support Chat'
});

console.log('Recording started:', sessionId);
```

### 2. Record AI Interactions

```typescript
await client.recordInteraction({
  sessionId,
  interaction: {
    timestamp: new Date(),
    model: 'gpt-4',
    prompt: 'What is the status of my order?',
    response: 'Let me check that for you...',
    tokens: { input: 15, output: 25 },
    cost: 0.0008,
    latency: 1200,
    provider: 'openai',
    requestMetadata: {
      temperature: 0.7,
      max_tokens: 500
    }
  }
});
```

### 3. View Session Replay

Visit your Cost Katana dashboard at `https://costkatana.com/sessions/replay/{sessionId}` to:
- 🎬 Play back the session timeline
- 💰 See costs per interaction
- ⏱️ Analyze latency patterns
- 🔍 Search through prompts and responses
- 📊 View aggregate statistics

## Examples by Integration Method

### HTTP Headers (.http files)

Direct REST API calls for session replay:

- **[start-recording.http](./http-headers/start-recording.http)** - Start a new recording session
- **[record-interaction.http](./http-headers/record-interaction.http)** - Record AI interactions
- **[record-user-action.http](./http-headers/record-user-action.http)** - Track user actions
- **[end-recording.http](./http-headers/end-recording.http)** - End a recording session
- **[list-sessions.http](./http-headers/list-sessions.http)** - List all session replays
- **[get-replay.http](./http-headers/get-replay.http)** - Retrieve a specific replay

### NPM/TypeScript Examples

Production-ready Node.js session replay implementations:

- **[basic-recording.ts](./npm-package/basic-recording.ts)** - Simple session recording
- **[chat-recording.ts](./npm-package/chat-recording.ts)** - Chat conversation recording
- **[experimentation-recording.ts](./npm-package/experimentation-recording.ts)** - Experiment tracking
- **[react-hook-recording.ts](./npm-package/react-hook-recording.ts)** - React hook for automatic recording
- **[auto-recording.ts](./npm-package/auto-recording.ts)** - Automatic recording with middleware
- **[advanced-filtering.ts](./npm-package/advanced-filtering.ts)** - Advanced session filtering

### Python SDK Examples

Python session replay implementations:

- **[basic-recording.py](./python-sdk/basic-recording.py)** - Simple session recording in Python
- **[chat-recording.py](./python-sdk/chat-recording.py)** - Chat conversation recording
- **[agent-recording.py](./python-sdk/agent-recording.py)** - AI agent interaction tracking
- **[workflow-recording.py](./python-sdk/workflow-recording.py)** - Multi-step workflow recording

## Features

### 🎬 AI Interaction Recording
- Record every AI request and response
- Capture full prompts and completions
- Track tokens, costs, and latency
- Store provider metadata

### 👤 User Action Tracking
- Log button clicks and UI interactions
- Track navigation and page views
- Record form submissions
- Monitor user engagement

### 💻 Code Context Capture
- Record active file and cursor position
- Capture code snippets
- Track language and syntax
- Monitor workspace state

### 📊 System Metrics
- CPU and memory usage
- Active request counts
- Performance metrics
- Resource utilization

### 🎯 Session Types

#### Chat Sessions
Record conversational AI interactions:
```typescript
feature: 'chat'
```

#### Experimentation Sessions
Track A/B tests and experiments:
```typescript
feature: 'experimentation'
```

#### Workflow Sessions
Monitor multi-step AI workflows:
```typescript
feature: 'workflow'
```

#### Agent Sessions
Record autonomous AI agent actions:
```typescript
feature: 'agent'
```

#### Notebook Sessions
Track Jupyter/notebook AI interactions:
```typescript
feature: 'notebook'
```

## Advanced Features

### Filtering and Search

```typescript
const { replays, total } = await client.listSessionReplays({
  userId: 'user_123',
  feature: 'chat',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-31'),
  page: 1,
  limit: 20
});

console.log(`Found ${total} replays`);
```

### Export and Sharing

```bash
# Export session as JSON
curl https://api.costkatana.com/api/session-replay/session_123/export \
  -H "Authorization: Bearer YOUR_API_KEY"

# Generate shareable link
curl -X POST https://api.costkatana.com/api/session-replay/session_123/share \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Replay Statistics

```typescript
const replay = await client.getSessionReplay(sessionId);

console.log('Session Statistics:');
console.log('- Total Interactions:', replay.replayData.aiInteractions.length);
console.log('- Total Cost: $', replay.summary.totalCost.toFixed(4));
console.log('- Total Tokens:', replay.summary.totalTokens.input + replay.summary.totalTokens.output);
console.log('- Duration:', replay.duration, 'ms');
console.log('- Error Count:', replay.errorCount);
```

## Integration Patterns

### 1. Automatic Recording for All Chats

```typescript
import { SessionReplayClient } from 'cost-katana/trace';

const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

class ChatService {
  private sessionId?: string;

  async startChat(userId: string) {
    const { sessionId } = await replayClient.startRecording({
      userId,
      feature: 'chat',
      label: `Chat - ${new Date().toISOString()}`
    });
    this.sessionId = sessionId;
  }

  async sendMessage(message: string) {
    const start = Date.now();
    const response = await callAI('gpt-4', message);
    const latency = Date.now() - start;

    if (this.sessionId) {
      await replayClient.recordInteraction({
        sessionId: this.sessionId,
        interaction: {
          timestamp: new Date(),
          model: 'gpt-4',
          prompt: message,
          response: response.text,
          tokens: response.tokens,
          cost: response.cost,
          latency,
          provider: 'openai'
        }
      });
    }

    return response;
  }

  async endChat() {
    if (this.sessionId) {
      await replayClient.endRecording(this.sessionId);
    }
  }
}
```

### 2. React Hook for Automatic Recording

```typescript
import { useState, useEffect } from 'react';
import { SessionReplayClient } from 'cost-katana/trace';

export function useSessionRecording(userId: string, feature: string) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const replayClient = new SessionReplayClient({
    apiKey: process.env.REACT_APP_API_KEY
  });

  useEffect(() => {
    const startRecording = async () => {
      const { sessionId: id } = await replayClient.startRecording({
        userId,
        feature,
        label: `${feature} - ${new Date().toLocaleString()}`
      });
      setSessionId(id);
    };

    startRecording();

    return () => {
      if (sessionId) {
        replayClient.endRecording(sessionId);
      }
    };
  }, [userId, feature]);

  const recordInteraction = async (interaction: any) => {
    if (sessionId) {
      await replayClient.recordInteraction({ sessionId, interaction });
    }
  };

  return { sessionId, recordInteraction };
}
```

### 3. Express Middleware for Automatic Recording

```typescript
import express from 'express';
import { SessionReplayClient } from 'cost-katana/trace';

const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

export function sessionRecordingMiddleware() {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Start recording if this is an AI endpoint
    if (req.path.includes('/api/chat') || req.path.includes('/api/agent')) {
      const { sessionId } = await replayClient.startRecording({
        userId: req.user?.id || 'anonymous',
        feature: 'chat',
        label: `${req.method} ${req.path}`
      });

      req.sessionReplayId = sessionId;

      // Patch res.json to record the interaction
      const originalJson = res.json.bind(res);
      res.json = function(body: any) {
        replayClient.recordInteraction({
          sessionId,
          interaction: {
            timestamp: new Date(),
            model: body.model || 'unknown',
            prompt: req.body.message || '',
            response: body.response || '',
            tokens: body.tokens || { input: 0, output: 0 },
            cost: body.cost || 0,
            latency: Date.now() - req.startTime,
            provider: body.provider || 'unknown'
          }
        });

        return originalJson(body);
      };
    }

    next();
  };
}
```

## Best Practices

1. **Always End Sessions**: Call `endRecording()` when done to ensure data is saved
2. **Use Descriptive Labels**: Make sessions easy to find later
3. **Record User Context**: Include userId for better filtering
4. **Track Errors**: Record when interactions fail for debugging
5. **Monitor Costs**: Use session replays to identify expensive interactions
6. **Respect Privacy**: Redact sensitive data before recording
7. **Set Retention Policies**: Configure how long to keep replays

## Troubleshooting

### Session Not Showing Up
- Verify API key is correct
- Check that `endRecording()` was called
- Ensure userId matches your authentication

### Missing Interactions
- Confirm `recordInteraction()` was called
- Check for errors in the console
- Verify network connectivity

### High Storage Costs
- Implement sampling for high-volume applications
- Set retention policies
- Filter out non-essential interactions

## API Endpoints

All session replay endpoints are available at:

```
POST   /api/session-replay/recording/start
POST   /api/session-replay/:sessionId/snapshot
POST   /api/session-replay/:sessionId/end
GET    /api/session-replay/list
GET    /api/session-replay/:sessionId
POST   /api/session-replay/:sessionId/export
POST   /api/session-replay/:sessionId/share
GET    /api/session-replay/stats
```

See individual example files for detailed usage.

## Related Examples

- [11-observability](../11-observability/) - Distributed tracing with OpenTelemetry
- [17-monitoring](../17-monitoring/) - Real-time monitoring and alerts
- [37-audit-logs](../37-audit-logs/) - Comprehensive audit logging

## Support

For questions or issues:
- 📧 Email: support@costkatana.com
- 💬 Discord: [discord.gg/costkatana](https://discord.gg/D8nDArmKbY)
- 📖 Docs: [docs.costkatana.com](https://docs.costkatana.com)

