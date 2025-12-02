# Cost Katana Workflows Examples

**Orchestrate complex multi-step AI operations with automatic dependency management, retries, and error handling.**

Workflows allow you to chain multiple AI operations together, execute steps in parallel, implement conditional logic, and build resilient AI pipelines that automatically handle failures and retries.

## Quick Start

### 1. Create a Workflow Template

```bash
curl -X POST https://api.costkatana.com/api/workflows/templates \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Document Analysis",
    "steps": [
      {
        "id": "extract",
        "type": "ai",
        "model": "gpt-4",
        "prompt": "Extract text from: {{document}}",
        "output": "text"
      },
      {
        "id": "summarize",
        "type": "ai",
        "model": "gpt-3.5-turbo",
        "prompt": "Summarize: {{text}}",
        "dependsOn": ["extract"],
        "output": "summary"
      }
    ],
    "variables": [{"name": "document", "type": "string", "required": true}]
  }'
```

### 2. Execute Workflow

```bash
curl -X POST https://api.costkatana.com/api/workflows/templates/{templateId}/execute \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"variables": {"document": "Your document content..."}}'
```

### 3. Monitor Execution

```bash
curl https://api.costkatana.com/api/workflows/executions/{executionId} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Examples by Integration Method

### HTTP Headers (.http files)

Direct REST API workflow management:

- **[create-workflow.http](./http-headers/create-workflow.http)** - Create, execute, and monitor workflows
- **[parallel-workflows.http](./http-headers/parallel-workflows.http)** - Parallel step execution
- **[conditional-workflows.http](./http-headers/conditional-workflows.http)** - Conditional branching logic
- **[error-handling.http](./http-headers/error-handling.http)** - Retries and error recovery

### NPM/TypeScript Examples

Production-ready workflow implementations:

- **[create-workflow.ts](./npm-package/create-workflow.ts)** - Complete workflow setup
- **[parallel-execution.ts](./npm-package/parallel-execution.ts)** - 3x faster with parallel steps
- **[workflow-monitoring.ts](./npm-package/workflow-monitoring.ts)** - Monitor and analyze workflows
- **[workflow-control.ts](./npm-package/workflow-control.ts)** - Pause/resume/cancel operations

### Python SDK Examples

Python workflow implementations:

- **[create_workflow.py](./python-sdk/create_workflow.py)** - Create and execute workflows
- **[workflow_monitoring.py](./python-sdk/workflow_monitoring.py)** - Monitor workflow executions
- **[workflow_control.py](./python-sdk/workflow_control.py)** - Control workflow execution

### Framework Integrations

Framework-specific workflow implementations:

- **[express-workflow.ts](./frameworks/express-workflow.ts)** - Express.js REST API
- **[nextjs-workflow.ts](./frameworks/nextjs-workflow.ts)** - Next.js API routes
- **[fastapi-workflow.py](./frameworks/fastapi-workflow.py)** - FastAPI endpoints

## Core Concepts

### Workflow Steps

A workflow consists of multiple steps that can be chained together:

```json
{
  "id": "step_1",
  "name": "extract_text",
  "type": "ai",
  "model": "gpt-4",
  "prompt": "Extract text from: {{document}}",
  "output": "extracted_text"
}
```

**Step Types:**
- `ai`: AI model inference
- `function`: Custom function execution
- `condition`: Conditional branching

### Dependencies

Steps can depend on previous steps:

```json
{
  "id": "step_2",
  "dependsOn": ["step_1"],
  "prompt": "Analyze: {{extracted_text}}"
}
```

The workflow engine automatically ensures steps execute in the correct order.

### Variable Substitution

Use `{{variable}}` syntax to reference:
- Input variables
- Outputs from previous steps

```json
{
  "prompt": "Entities: {{step_1.entities}}, Summary: {{step_2.summary}}"
}
```

### Parallel Execution

Execute multiple steps simultaneously for faster workflows:

```json
{
  "id": "step_2a",
  "dependsOn": ["step_1"],
  "parallel": true,
  "output": "entities"
},
{
  "id": "step_2b",
  "dependsOn": ["step_1"],
  "parallel": true,
  "output": "sentiment"
}
```

**Performance Improvement:**
- Sequential: 5.8 seconds
- Parallel: 3.6 seconds
- **38% faster!**

### Conditional Branching

Execute steps based on conditions:

```json
{
  "id": "process_invoice",
  "condition": {
    "variable": "doc_type",
    "operator": "equals",
    "value": "invoice"
  },
  "prompt": "Process invoice..."
}
```

**Operators:**
- `equals`: Exact match
- `contains`: Substring match
- `in`: Value in array
- `not_in`: Value not in array
- `greater_than`: Numeric comparison
- `less_than`: Numeric comparison

## Real-World Use Cases

### 1. Document Processing Pipeline

```typescript
const template = {
  name: 'Document Processing',
  steps: [
    {
      id: 'extract',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Extract text from: {{document}}',
      output: 'text'
    },
    {
      id: 'entities',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Extract entities from: {{text}}',
      dependsOn: ['extract'],
      parallel: true,
      output: 'entities'
    },
    {
      id: 'sentiment',
      type: 'ai',
      model: 'gpt-3.5-turbo',
      prompt: 'Analyze sentiment: {{text}}',
      dependsOn: ['extract'],
      parallel: true,
      output: 'sentiment'
    },
    {
      id: 'report',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Generate report from {{entities}} and {{sentiment}}',
      dependsOn: ['entities', 'sentiment'],
      output: 'report'
    }
  ]
};
```

**Benefits:**
- Parallel entity and sentiment analysis
- 40% faster than sequential execution
- Automatic dependency management
- Full cost tracking

### 2. Content Generation Workflow

```typescript
const template = {
  name: 'Content Generator',
  steps: [
    {
      id: 'research',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Research topic: {{topic}}',
      output: 'research'
    },
    {
      id: 'outline',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Create outline based on: {{research}}',
      dependsOn: ['research'],
      output: 'outline'
    },
    {
      id: 'draft',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Write article following: {{outline}}',
      dependsOn: ['outline'],
      output: 'draft'
    },
    {
      id: 'edit',
      type: 'ai',
      model: 'gpt-3.5-turbo',
      prompt: 'Edit and improve: {{draft}}',
      dependsOn: ['draft'],
      output: 'final_article'
    }
  ]
};
```

### 3. Multi-Language Translation

```typescript
const template = {
  name: 'Multi-Language Translation',
  steps: [
    {
      id: 'translate_es',
      type: 'ai',
      model: 'gpt-3.5-turbo',
      prompt: 'Translate to Spanish: {{text}}',
      parallel: true,
      output: 'spanish'
    },
    {
      id: 'translate_fr',
      type: 'ai',
      model: 'gpt-3.5-turbo',
      prompt: 'Translate to French: {{text}}',
      parallel: true,
      output: 'french'
    },
    {
      id: 'translate_de',
      type: 'ai',
      model: 'gpt-3.5-turbo',
      prompt: 'Translate to German: {{text}}',
      parallel: true,
      output: 'german'
    }
  ]
};
```

**Results:**
- 3 translations in parallel
- 3x faster than sequential
- Same cost, better performance

### 4. Smart Document Routing

```typescript
const template = {
  name: 'Document Router',
  steps: [
    {
      id: 'classify',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Classify document type: {{document}}',
      output: 'doc_type'
    },
    {
      id: 'process_invoice',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Extract invoice data: {{document}}',
      condition: {
        variable: 'doc_type',
        operator: 'contains',
        value: 'invoice'
      },
      dependsOn: ['classify'],
      output: 'invoice_data'
    },
    {
      id: 'process_contract',
      type: 'ai',
      model: 'gpt-4',
      prompt: 'Extract contract terms: {{document}}',
      condition: {
        variable: 'doc_type',
        operator: 'contains',
        value: 'contract'
      },
      dependsOn: ['classify'],
      output: 'contract_data'
    }
  ]
};
```

**Smart Features:**
- Automatic document classification
- Conditional processing paths
- Optimized for document type
- Cost-effective routing

## Error Handling & Retries

### Automatic Retries

```json
{
  "config": {
    "maxRetries": 3,
    "retryDelay": 1000,
    "backoffMultiplier": 2
  }
}
```

**Retry Schedule:**
- Attempt 1: Immediate
- Attempt 2: 1 second delay
- Attempt 3: 2 seconds delay
- Attempt 4: 4 seconds delay

### Fallback Steps

```json
{
  "id": "primary",
  "errorHandling": {
    "fallbackStep": "secondary"
  }
},
{
  "id": "secondary",
  "model": "gpt-3.5-turbo",
  "condition": {
    "variable": "primary.status",
    "operator": "equals",
    "value": "failed"
  }
}
```

**Graceful Degradation:**
- Try expensive model first
- Fall back to cheaper model on failure
- Maintain service availability
- Optimize cost vs quality

### Failure Handling Strategies

```json
{
  "config": {
    "failureHandling": "continue"
  }
}
```

**Options:**
- `stop`: Stop workflow on any error
- `continue`: Skip failed step and continue
- `rollback`: Undo previous steps

## Workflow Control

### Pause Execution

```bash
POST /api/workflows/executions/{executionId}/pause
```

- Pauses after current step completes
- State is preserved
- Can be resumed later

### Resume Execution

```bash
POST /api/workflows/executions/{executionId}/resume
```

- Continues from paused state
- All context preserved
- No data loss

### Cancel Execution

```bash
POST /api/workflows/executions/{executionId}/cancel
```

- Stops execution immediately
- Partial results saved
- Cannot be resumed

## Monitoring & Analytics

### Execution Status

```bash
GET /api/workflows/executions/{executionId}
```

**Response includes:**
- Overall status (running, completed, failed)
- Step-by-step results
- Duration and cost per step
- Output values
- Error messages

### Workflow Analytics

```bash
GET /api/workflows/analytics
```

**Metrics:**
- Total executions
- Success/failure rates
- Average duration
- Total cost
- Top workflows
- Performance trends

### Workflow Trace

```bash
GET /api/workflows/executions/{executionId}/trace
```

**Includes:**
- Trace IDs for each step
- Token usage breakdown
- Request/response times
- Cost attribution
- Full observability

## Dashboard Integration

All workflows are visible in the Cost Katana dashboard:

- 📊 Visual workflow builder
- 🔍 Execution timeline view
- 📈 Performance analytics
- 💰 Cost tracking per workflow
- ⚠️ Error alerts
- 🌐 Dependency graphs

Visit: [costkatana.com/dashboard/workflows](https://costkatana.com/dashboard/workflows)

## Best Practices

### 1. Design for Parallelism ✅

Identify independent steps and mark them as parallel:

```json
{
  "dependsOn": ["step_1"],
  "parallel": true
}
```

### 2. Use Appropriate Models ✅

- Heavy lifting: GPT-4
- Simple tasks: GPT-3.5-turbo
- Balance cost and quality

### 3. Implement Error Handling ✅

Always configure retries and fallbacks:

```json
{
  "maxRetries": 3,
  "fallbackStep": "backup_step"
}
```

### 4. Monitor Costs ✅

Track costs per workflow and optimize:

```bash
GET /api/workflows/{workflowId}/metrics
```

### 5. Use Meaningful Names ✅

```json
{
  "id": "extract_entities_from_document",
  "name": "Entity Extraction"
}
```

## Cost

✅ **Workflows are FREE!**

- No additional orchestration costs
- Only pay for AI model usage
- Automatic cost tracking
- Helps optimize overall costs

## Support

- **Documentation**: [docs.costkatana.com/workflows](https://docs.costkatana.com/workflows)
- **Dashboard**: [costkatana.com/dashboard/workflows](https://costkatana.com/dashboard/workflows)
- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/D8nDArmKbY)

---

**🥷 Orchestrate complex AI workflows effortlessly!**

Build multi-step AI pipelines with automatic dependency management, parallel execution, error handling, and full observability.
