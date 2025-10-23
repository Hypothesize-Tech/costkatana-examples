/**
 * Next.js API Route: Optimize Prompt
 * 
 * POST /api/optimize
 * 
 * Demonstrates prompt optimization in Next.js
 */

import { NextRequest, NextResponse } from 'next/server';
import { AICostTracker, AIProvider } from 'cost-katana';

let tracker: AICostTracker | null = null;

async function getTracker() {
  if (!tracker) {
    tracker = await AICostTracker.create({
      providers: [{ provider: AIProvider.OpenAI, apiKey: process.env.OPENAI_API_KEY || '' }],
      optimization: { enablePromptOptimization: true },
      projectId: process.env.COST_KATANA_PROJECT_ID || '',
    });
  }
  return tracker;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = 'gpt-4', targetReduction = 30 } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    const tracker = await getTracker();
    
    const optimizations = await tracker.optimizePrompt(prompt, model, AIProvider.OpenAI);
    
    return NextResponse.json({
      original: prompt,
      optimized: optimizations[0]?.optimizedPrompt || prompt,
      metrics: {
        tokenReduction: optimizations[0]?.tokenReduction || 0,
        costSaved: optimizations[0]?.costSaved || 0,
      },
      alternatives: optimizations.slice(1, 4).map(opt => ({
        prompt: opt.optimizedPrompt,
        reduction: opt.tokenReduction,
        savings: opt.costSaved
      }))
    });
    
  } catch (error: any) {
    console.error('Optimize API error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize', message: error.message },
      { status: 500 }
    );
  }
}

