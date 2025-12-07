# Provider-Agnostic AI Development Guide

## Philosophy

Cost Katana is designed to be **completely provider-agnostic**. You should never write code that's tied to a specific AI provider. Instead, use abstract patterns that work across all providers.

## Core Principles

### ✅ DO: Use Abstract Patterns

```typescript
// Good: Provider-agnostic
import { ai } from 'cost-katana';

const response = await ai('best-for-code', 'Generate a hello world function');
console.log(response.text);
```

```python
# Good: Provider-agnostic
from costkatana import ai

response = ai("best-for-speed", "Summarize this document")
print(response.text)
```

### ❌ DON'T: Hardcode Provider Names

```typescript
// Bad: Tied to specific provider
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
});
```

## Abstract Model Selection

Instead of hardcoding model names, use **capability-based selection**:

### By Capability

```typescript
import { ai, ModelCapability } from 'cost-katana';

// Automatically selects best model for each capability
const codeResponse = await ai(ModelCapability.CODE_GENERATION, 'Write a React component');
const chatResponse = await ai(ModelCapability.CONVERSATION, 'Hello, how are you?');
const visionResponse = await ai(ModelCapability.VISION, 'Describe this image', { image: buffer });
```

### By Performance Characteristics

```typescript
import { ai } from 'cost-katana';

// Select by speed
const fast = await ai({ speed: 'fastest' }, prompt);

// Select by cost
const cheap = await ai({ cost: 'cheapest' }, prompt);

// Select by quality
const best = await ai({ quality: 'best' }, prompt);

// Balanced
const balanced = await ai({ speed: 'fast', cost: 'cheap' }, prompt);
```

### By Use Case

```typescript
import { ai } from 'cost-katana';

// Intelligent routing based on use case
const summary = await ai('summarization', longDocument);
const translation = await ai('translation', 'Translate to Spanish: Hello');
const sentiment = await ai('sentiment-analysis', 'This product is amazing!');
const completion = await ai('completion', codeSnippet);
```

## Configuration Examples

### TypeScript/JavaScript SDK

```typescript
// config/ai.config.ts
export const aiConfig = {
  // Let Cost Katana route intelligently
  routing: 'intelligent',
  
  // Fallback preferences (no specific providers)
  preferences: {
    speed: 0.7,
    cost: 0.8,
    quality: 0.9
  },
  
  // Budget constraints (provider-agnostic)
  budget: {
    dailyLimit: 100,
    requestLimit: 0.50
  }
};

// usage.ts
import { ai } from 'cost-katana';
import { aiConfig } from './config/ai.config';

const response = await ai({
  ...aiConfig.preferences,
  prompt: 'Generate report'
});
```

### Python SDK

```python
# config/ai_config.py
AI_CONFIG = {
    "routing": "intelligent",
    "preferences": {
        "speed": 0.7,
        "cost": 0.8,
        "quality": 0.9
    },
    "budget": {
        "daily_limit": 100,
        "request_limit": 0.50
    }
}

# usage.py
from costkatana import ai
from config.ai_config import AI_CONFIG

response = ai(
    prompt="Generate report",
    **AI_CONFIG["preferences"]
)
```

### CLI

```bash
# Never specify providers in commands
cost-katana request \
  --capability "code-generation" \
  --prompt "Write a function" \
  --max-cost 0.10

# Use characteristics instead
cost-katana request \
  --fast \
  --cheap \
  --prompt "Quick summary please"
```

## Gateway Configuration

### Provider-Agnostic Headers

```http
POST https://gateway.costkatana.com/v1/completions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "capability": "conversation",
  "messages": [{"role": "user", "content": "Hello"}],
  "preferences": {
    "speed": "fast",
    "cost": "cheap"
  }
}
```

### Legacy Provider Endpoints (Discouraged)

If you must use provider-specific endpoints for compatibility:

```http
POST https://gateway.costkatana.com/v1/openai/chat/completions
```

**Note**: This is transparently routed to the best available provider, not necessarily OpenAI!

## Migration Guide

### From OpenAI

```typescript
// Before
import OpenAI from 'openai';
const openai = new OpenAI();
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
});

// After
import { ai } from 'cost-katana';
const response = await ai('conversation', 'Hello');
```

### From Anthropic

```typescript
// Before
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic();
const response = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }]
});

// After
import { ai } from 'cost-katana';
const response = await ai({ quality: 'best' }, 'Hello');
```

### From Google

```typescript
// Before
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const result = await model.generateContent('Hello');

// After
import { ai } from 'cost-katana';
const response = await ai({ speed: 'fastest', cost: 'cheapest' }, 'Hello');
```

## Testing Provider-Agnostic Code

```typescript
import { ai, setTestMode } from 'cost-katana';

describe('AI Features', () => {
  beforeAll(() => {
    setTestMode({
      mockProvider: true,
      defaultResponse: 'Mocked response'
    });
  });

  it('should work with any provider', async () => {
    const response = await ai('conversation', 'Test prompt');
    expect(response.text).toBeDefined();
    expect(response.cost).toBeDefined();
    // Note: No provider-specific assertions!
  });
});
```

## Benefits of Provider-Agnostic Code

1. **Cost Optimization**: Automatically routes to cheapest provider
2. **Reliability**: Automatic failover if one provider is down
3. **Future-Proof**: New providers added without code changes
4. **A/B Testing**: Easy to compare providers without refactoring
5. **Compliance**: Switch providers for regional requirements
6. **Avoid Lock-In**: Not dependent on any single vendor

## Anti-Patterns to Avoid

### ❌ Provider-Specific Error Handling

```typescript
// Bad
try {
  const response = await openai.chat.completions.create(...);
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    // OpenAI-specific handling
  }
}

// Good
try {
  const response = await ai('conversation', prompt);
} catch (error) {
  if (error.code === 'RATE_LIMIT') {
    // Provider-agnostic error handling
  }
}
```

### ❌ Provider-Specific Feature Detection

```typescript
// Bad
if (model.startsWith('gpt')) {
  // Use OpenAI-specific features
} else if (model.startsWith('claude')) {
  // Use Anthropic-specific features
}

// Good
import { getModelCapabilities } from 'cost-katana';

const capabilities = await getModelCapabilities();
if (capabilities.includes('function-calling')) {
  // Use function calling (works across all supporting providers)
}
```

### ❌ Hardcoded Model Names in Documentation

```markdown
<!-- Bad -->
# Use GPT-4 for best results
const response = await ai('gpt-4', prompt);

<!-- Good -->
# Use high-quality model for best results
const response = await ai({ quality: 'best' }, prompt);
```

## Real-World Examples

### Example 1: Multi-Step Workflow

```typescript
import { ai } from 'cost-katana';

async function generateAndReview(topic: string) {
  // Use fast/cheap model for draft
  const draft = await ai({ 
    speed: 'fast', 
    cost: 'cheap' 
  }, `Write a draft about ${topic}`);
  
  // Use quality model for review
  const review = await ai({ 
    quality: 'best' 
  }, `Review this draft: ${draft.text}`);
  
  // Use fast model for final format
  const final = await ai({ 
    speed: 'fastest' 
  }, `Format this: ${review.text}`);
  
  return final.text;
}
```

### Example 2: Content Moderation

```typescript
import { ai } from 'cost-katana';

async function moderateContent(content: string) {
  // Use fastest model for quick moderation
  const result = await ai({ 
    speed: 'fastest',
    capability: 'classification'
  }, `Classify content safety: ${content}`);
  
  if (result.text.includes('unsafe')) {
    // Use quality model for detailed analysis
    const analysis = await ai({ 
      quality: 'best' 
    }, `Detailed safety analysis: ${content}`);
    
    return { safe: false, details: analysis.text };
  }
  
  return { safe: true };
}
```

## Conclusion

By following provider-agnostic patterns, your code becomes:
- More maintainable
- More cost-effective
- More reliable
- More future-proof

Remember: **Abstract the provider, optimize the outcome.**

