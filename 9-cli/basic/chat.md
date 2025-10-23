# CLI Example: Interactive Chat

## Basic Chat

```bash
cost-katana chat
```

**Output:**
```
🥷 Cost Katana Chat
Model: gpt-4 | Type 'help' for commands

You: Hello!
AI: Hi! How can I help you today?
💰 Cost: $0.0001

You: What is Docker?
AI: Docker is a platform for containerization...
💰 Session: $0.0023

You: quit
✅ Session ended. Total cost: $0.0023
```

## With Specific Model

```bash
cost-katana chat --model claude-3-sonnet
```

## With System Prompt

```bash
cost-katana chat --system "You are a Python expert. Be concise."
```

## With Cortex Optimization

```bash
cost-katana chat --cortex
```

Saves 70-95% on long responses!
