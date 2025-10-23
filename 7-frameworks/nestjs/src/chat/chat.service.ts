/**
 * NestJS Service: Chat Service with Cost Katana
 * 
 * Demonstrates service-based architecture with dependency injection
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { AICostTracker, AIProvider } from 'cost-katana';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService implements OnModuleInit {
  private tracker: AICostTracker | null = null;
  
  constructor(private configService: ConfigService) {}
  
  async onModuleInit() {
    // Initialize tracker when module starts
    this.tracker = await AICostTracker.create({
      providers: [
        {
          provider: AIProvider.OpenAI,
          apiKey: this.configService.get<string>('OPENAI_API_KEY') || ''
        },
        {
          provider: AIProvider.Anthropic,
          apiKey: this.configService.get<string>('ANTHROPIC_API_KEY') || ''
        }
      ],
      tracking: { enableAutoTracking: true },
      optimization: { enablePromptOptimization: true },
      projectId: this.configService.get<string>('COST_KATANA_PROJECT_ID') || '',
    });
  }
  
  async chat(message: string, model: string = 'gpt-4', options: any = {}) {
    if (!this.tracker) {
      throw new Error('Cost Katana tracker not initialized');
    }
    
    const startTime = Date.now();
    
    const response = await this.tracker.makeRequest({
      model,
      messages: [{ role: 'user' as const, content: message }],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
    });
    
    const processingTime = Date.now() - startTime;
    
    return {
      response: response.choices[0].message.content,
      metadata: {
        cost: response.usage?.estimatedCost || 0,
        tokens: response.usage?.total_tokens || 0,
        model: response.model,
        processingTime: `${processingTime}ms`,
        provider: 'OpenAI'
      }
    };
  }
  
  async optimizePrompt(prompt: string, model: string = 'gpt-4') {
    if (!this.tracker) {
      throw new Error('Cost Katana tracker not initialized');
    }
    
    const optimizations = await this.tracker.optimizePrompt(prompt, model, AIProvider.OpenAI);
    
    return {
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
    };
  }
  
  async getAnalytics() {
    if (!this.tracker) {
      throw new Error('Cost Katana tracker not initialized');
    }
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const analytics = await this.tracker.getAnalytics(startDate, endDate);
    
    return {
      period: '30-days',
      summary: {
        totalRequests: analytics.totalRequests || 0,
        totalCost: analytics.totalCost || 0,
        avgCostPerRequest: analytics.avgCostPerRequest || 0,
        totalTokens: analytics.totalTokens || 0,
        cacheHitRate: `${((analytics.cacheHitRate || 0) * 100).toFixed(1)}%`,
      },
      savings: {
        fromOptimization: analytics.savingsFromOptimization || 0,
        fromCaching: analytics.savingsFromCaching || 0,
        total: analytics.totalSavings || 0,
      }
    };
  }
}

