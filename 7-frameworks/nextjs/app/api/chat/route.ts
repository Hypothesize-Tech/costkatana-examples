/**
 * Next.js API Route: Chat with AI
 * 
 * POST /api/chat
 * 
 * Demonstrates Cost Katana integration in Next.js API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { ai, AICostTracker, AIProvider } from 'cost-katana';

// Initialize tracker (in production, do this once at app startup)
let tracker: AICostTracker | null = null;

async function getTracker() {
  if (!tracker) {
    tracker = await AICostTracker.create({
      providers: [
        { provider: AIProvider.OpenAI, apiKey: process.env.OPENAI_API_KEY || '' },
        { provider: AIProvider.Anthropic, apiKey: process.env.ANTHROPIC_API_KEY || '' },
      ],
      tracking: { enableAutoTracking: true },
      optimization: { enablePromptOptimization: true },
      projectId: process.env.COST_KATANA_PROJECT_ID || '',
    });
  }
  return tracker;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model = 'gpt-4', options = {} } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Get tracker instance
    const tracker = await getTracker();
    
    // Make AI request with automatic cost tracking
    const response = await tracker.makeRequest({
      model,
      messages: [
        { role: 'user' as const, content: message }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
    });
    
    return NextResponse.json({
      response: response.choices[0].message.content,
      metadata: {
        cost: response.usage?.estimatedCost || 0,
        tokens: response.usage?.total_tokens || 0,
        model: response.model,
        provider: 'OpenAI'
      }
    });
    
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API endpoint. Use POST with { message, model?, options? }',
    example: {
      message: 'Explain quantum computing',
      model: 'gpt-4',
      options: { temperature: 0.7, maxTokens: 500 }
    }
  });
}

