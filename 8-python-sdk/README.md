# Cost Katana Python SDK Examples (`costkatana`)

**AI that just works. With automatic cost tracking.**

Zero-config AI calls with built-in cost tracking, caching, and 70-95% optimization.

## Installation

```bash
pip install costkatana
```

## Quick Start

```python
import cost_katana as ck

# One line to call any AI model
response = ck.ai('gpt-4', 'Explain quantum computing')
print(f"Cost: ${response.cost}")
```

## Examples by Feature

### 1. Basic Usage
- [Simple AI Calls](./basic/simple-ai.py) - Get started in 30 seconds
- [Chat Sessions](./basic/chat-session.py) - Multi-turn conversations
- [Model Comparison](./basic/model-comparison.py) - Compare costs across models
- [Multi-Provider](./basic/providers.py) - Use any AI provider

### 2. Gateway Features
- [Smart Caching](./gateway/caching.py) - 100% savings on repeated requests
- [Auto-Failover](./gateway/failover.py) - 99.99% availability
- [Automatic Retry](./gateway/retry.py) - Handle rate limits

### 3. Optimization
- [Cost Optimization](./optimization/cost-optimization.py) - Choose the right model

### 4. Cortex
- [Basic Cortex](./cortex/basic.py) - 70-95% cost reduction
- [Long-Form Content](./cortex/long-form.py) - Massive savings on blog posts
- [Semantic Cache](./cortex/semantic-cache.py) - Cache optimized structures

### 5. Analytics
- [Usage Tracking](./analytics/usage-tracking.py) - Monitor costs in real-time
- [Dashboard Integration](./analytics/dashboard.py) - View full analytics

## Features

### Zero-Config AI Calls
```python
import cost_katana as ck

# Just works - no complex setup
response = ck.ai('gpt-4', 'Hello!')
```

### Chat Conversations
```python
chat = ck.chat('gpt-4')
chat.send('What is Docker?')
chat.send('How do I use it?')
print(f"Total cost: ${chat.total_cost}")
```

### Automatic Cost Tracking
Every request is tracked with:
- Total cost in dollars
- Token usage (input + output)
- Model and provider
- Timestamp
- Request metadata

### Model Comparison
```python
models = ['gpt-4', 'gpt-3.5-turbo', 'claude-3-5-sonnet-20241022']
for model in models:
    r = ck.ai(model, 'Explain AI')
    print(f"{model}: ${r.cost:.6f}")
```

### Smart Caching
```python
# First call - pays cost
r1 = ck.ai('gpt-4', 'What is Python?', cache=True)

# Second call - FREE from cache!
r2 = ck.ai('gpt-4', 'What is Python?', cache=True)
```

### Cortex Optimization
```python
# 70-95% cost savings on long content
response = ck.ai('gpt-4', long_prompt, cortex=True)
print(f"Saved: ${response.saved_amount}")
```

### Auto-Failover
```python
ck.configure(
    failover=True,
    providers=['openai', 'anthropic', 'google']
)

# If OpenAI fails, automatically tries others
response = ck.ai('gpt-4', 'Test failover')
```

## Configuration

### Environment Variables
```bash
# Required
export COST_KATANA_API_KEY="dak_your_api_key"

# Optional
export COST_KATANA_MODEL="gpt-4"
export COST_KATANA_CACHE_ENABLED="true"
export COST_KATANA_CORTEX_ENABLED="true"
```

### Programmatic Config
```python
import cost_katana as ck

ck.configure(
    api_key='dak_your_key',
    default_model='gpt-4',
    cache=True,
    cortex=True,
    failover=True,
    max_retries=3
)
```

## Advanced Options

### Request Options
```python
response = ck.ai(
    model='gpt-4',
    prompt='Your prompt here',
    
    # Optimization
    cortex=True,           # 70-95% savings
    cache=True,            # 100% on cache hits
    
    # Reliability
    retry=True,            # Auto-retry on failure
    max_retries=3,         # Retry attempts
    failover=True,         # Switch providers
    
    # Control
    temperature=0.7,       # Creativity
    max_tokens=2000,       # Response length
    
    # Tracking
    project='my-app',      # Group by project
    user_id='user-123',    # Track by user
    tags=['production']    # Custom tags
)
```

### Chat Options
```python
chat = ck.chat(
    model='gpt-4',
    system_message='You are a helpful assistant',
    temperature=0.7,
    max_tokens=2000,
    cortex=True,
    cache=True
)
```

## Multi-Provider Support

All providers work with the same API:

```python
# OpenAI
ck.ai('gpt-4', 'Hello')
ck.ai('gpt-3.5-turbo', 'Hello')

# Anthropic
ck.ai('claude-3-5-sonnet-20241022', 'Hello')
ck.ai('claude-3-haiku-20240307', 'Hello')

# Google
ck.ai('gemini-pro', 'Hello')
ck.ai('gemini-1.5-flash', 'Hello')

# AWS Bedrock
ck.ai('nova-pro', 'Hello')
ck.ai('anthropic.claude-3-sonnet-20240229-v1:0', 'Hello')
```

## Framework Integrations

### FastAPI
```python
from fastapi import FastAPI
import cost_katana as ck

app = FastAPI()

@app.post("/chat")
async def chat(prompt: str):
    response = ck.ai('gpt-4', prompt, cache=True)
    return {
        "answer": response.text,
        "cost": response.cost,
        "cached": response.cached
    }
```

### Flask
```python
from flask import Flask, request
import cost_katana as ck

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    prompt = request.json['prompt']
    response = ck.ai('gpt-4', prompt, cortex=True)
    return {
        "answer": response.text,
        "cost": response.cost,
        "optimized": response.optimized
    }
```

### Django
```python
from django.http import JsonResponse
import cost_katana as ck

def chat_view(request):
    prompt = request.POST.get('prompt')
    response = ck.ai('gpt-4', prompt, cache=True, cortex=True)
    
    return JsonResponse({
        'answer': response.text,
        'cost': response.cost,
        'cached': response.cached,
        'optimized': response.optimized
    })
```

## CLI Included

The SDK also includes a CLI:

```bash
# Interactive chat
cost-katana chat

# Quick questions
cost-katana ask "What is Docker?"

# View analytics
cost-katana analyze
```

## Error Handling

```python
try:
    response = ck.ai('gpt-4', 'Hello')
    print(response.text)
except ck.RateLimitError:
    print("Rate limit hit - retry automatically enabled")
except ck.InvalidModelError:
    print("Model not available")
except ck.AuthenticationError:
    print("Check your API key")
except ck.CostKatanaError as e:
    print(f"Error: {e}")
```

## Response Object

```python
response = ck.ai('gpt-4', 'Hello')

# Available properties
response.text           # AI response text
response.cost           # Total cost ($)
response.tokens         # Total tokens used
response.input_tokens   # Input tokens
response.output_tokens  # Output tokens
response.model          # Model used
response.provider       # Provider used
response.cached         # Was cached?
response.optimized      # Was optimized?
response.saved_amount   # $ saved with optimization
response.latency        # Response time (ms)
response.timestamp      # Request timestamp
```

## Cost Optimization Tips

### 1. Choose the Right Model
```python
# Simple tasks - 10x cheaper
ck.ai('gpt-3.5-turbo', 'What is 2+2?')

# Complex tasks - better quality
ck.ai('gpt-4', 'Design a microservices architecture')
```

### 2. Enable Cortex for Long Content
```python
# 70-95% savings on long-form content
ck.ai('gpt-4', long_prompt, cortex=True)
```

### 3. Use Caching
```python
# Free repeated requests
ck.ai('gpt-4', prompt, cache=True)
```

### 4. Combine Everything
```python
# Maximum savings!
response = ck.ai(
    'gpt-4',
    long_prompt,
    cortex=True,    # 70-95% savings
    cache=True,     # 100% on cache hits
    failover=True   # High availability
)
```

## Monitoring & Analytics

All usage is automatically tracked at [costkatana.com/dashboard](https://costkatana.com/dashboard):

- Real-time cost tracking
- Usage by model & provider
- Daily/weekly/monthly reports
- Budget alerts
- Team analytics
- Optimization recommendations

## Migration Guides

### From OpenAI SDK
```python
# Before
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}]
)

# After - simpler + automatic tracking
import cost_katana as ck
response = ck.ai('gpt-4', 'Hello')
```

### From Anthropic SDK
```python
# Before
from anthropic import Anthropic
client = Anthropic()
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    messages=[{"role": "user", "content": "Hello"}]
)

# After
import cost_katana as ck
response = ck.ai('claude-3-5-sonnet-20241022', 'Hello')
```

## Real-World Example

```python
import cost_katana as ck

def generate_blog_post(topic: str) -> dict:
    """Generate a blog post with cost tracking"""
    
    # Configure for optimal performance
    ck.configure(
        cortex=True,    # 70-95% savings
        cache=True,     # Cache repeated requests
        failover=True   # High availability
    )
    
    # Generate content
    response = ck.ai(
        'gpt-4',
        f"Write a comprehensive blog post about {topic}",
        project='blog-generator',
        tags=['content', 'blog']
    )
    
    return {
        'content': response.text,
        'cost': response.cost,
        'saved': response.saved_amount,
        'words': len(response.text.split())
    }

# Use it
result = generate_blog_post('AI in Healthcare')
print(f"Generated {result['words']} words for ${result['cost']:.4f}")
print(f"Saved ${result['saved']:.4f} with Cortex!")
```

## Support

- **Docs**: [docs.costkatana.com/python](https://docs.costkatana.com/python)
- **PyPI**: [pypi.org/project/costkatana](https://pypi.org/project/costkatana)
- **GitHub**: [github.com/Hypothesize-Tech/costkatana-python](https://github.com/Hypothesize-Tech/costkatana-python)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**Get started in 30 seconds:**

```bash
pip install costkatana
```

```python
import cost_katana as ck
response = ck.ai('gpt-4', 'Hello!')
print(f"Cost: ${response.cost}")
```

**That's it!** All usage tracked automatically at [costkatana.com/dashboard](https://costkatana.com/dashboard) 🥷
