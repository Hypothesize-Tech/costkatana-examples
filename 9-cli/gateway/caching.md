# CLI Example: Caching

## Enable Caching

```bash
cost-katana chat --cache
```

## Example Session

```bash
$ cost-katana chat --cache

You: What is Kubernetes?
AI: Kubernetes is a container orchestration platform...
💰 Cost: $0.0023
💾 Cached

You: What is Kubernetes?
AI: Kubernetes is a container orchestration platform...
💰 Cost: $0.0000 (FREE - from cache!)
⚡ Instant response
```

## Cache Behavior

- Semantic matching (similar questions hit cache)
- Automatic expiration (configurable)
- 100% cost savings on hits
- Instant response time

## Clear Cache

```bash
cost-katana cache clear
```
