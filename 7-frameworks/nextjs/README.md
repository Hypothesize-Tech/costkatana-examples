# Next.js + Cost Katana

Full-stack React application with Cost Katana API routes.

## Setup

```bash
npx create-next-app@latest my-app
cd my-app
npm install cost-katana
```

## Example API Route

```typescript
// app/api/chat/route.ts
import { ai } from 'cost-katana';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  const response = await ai('gpt-4', message, {
    cortex: true,
    cache: true
  });
  
  return NextResponse.json({
    text: response.text,
    cost: response.cost,
    tokens: response.tokens
  });
}
```

## Client Component

```typescript
// components/ChatInterface.tsx
'use client';

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  
  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    setResponse(data.text);
  };
  
  return (/* UI */);
}
```

## Features

- ✅ Server-side API routes with Cost Katana
- ✅ Client-side React components
- ✅ Real-time cost display
- ✅ Streaming responses
- ✅ SSR/SSG optimization
