/**
 * Chat Session Recording Example
 * Demonstrates recording AI chat conversations with full context
 */

import { SessionReplayClient } from 'cost-katana/trace';
import type { AIInteraction } from 'cost-katana/trace/types';

// Initialize the session replay client
const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY!,
  baseURL: 'https://cost-katana-backend.store'
});

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  tokens?: { input: number; output: number };
  cost?: number;
}

class ChatSession {
  private sessionId: string | null = null;
  private userId: string;
  private messages: ChatMessage[] = [];

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Start a new chat session
   */
  async start(label?: string): Promise<void> {
    try {
      const { sessionId } = await replayClient.startRecording({
        userId: this.userId,
        feature: 'chat',
        label: label || `Chat - ${new Date().toLocaleString()}`,
        metadata: {
          platform: 'web',
          userAgent: navigator?.userAgent || 'unknown'
        }
      });

      this.sessionId = sessionId;
      console.log('✅ Chat session started:', sessionId);

      // Record initial user action
      await this.recordUserAction('session_started');
    } catch (error) {
      console.error('❌ Failed to start chat session:', error);
      throw error;
    }
  }

  /**
   * Send a message and record the AI interaction
   */
  async sendMessage(message: string, model: string = 'gpt-4'): Promise<string> {
    if (!this.sessionId) {
      throw new Error('Chat session not started. Call start() first.');
    }

    // Record user sending message
    await this.recordUserAction('send_message', { message });

    // Simulate AI call (replace with actual AI SDK call)
    const startTime = Date.now();
    const response = await this.callAI(model, message);
    const latency = Date.now() - startTime;

    // Add to message history
    this.messages.push(
      { role: 'user', content: message },
      { 
        role: 'assistant', 
        content: response.text,
        model,
        tokens: response.tokens,
        cost: response.cost
      }
    );

    // Record the AI interaction
    await replayClient.recordInteraction({
      sessionId: this.sessionId,
      interaction: {
        timestamp: new Date(),
        model,
        prompt: message,
        response: response.text,
        tokens: response.tokens,
        cost: response.cost,
        latency,
        provider: 'openai',
        parameters: {
          temperature: 0.7,
          max_tokens: 500
        },
        requestMetadata: {
          messageCount: this.messages.length,
          context_length: this.getContextLength()
        },
        responseMetadata: {
          finish_reason: response.finishReason
        }
      }
    });

    console.log(`💬 Message recorded - Cost: $${response.cost.toFixed(4)}, Tokens: ${response.tokens.input + response.tokens.output}`);

    return response.text;
  }

  /**
   * Record a user action
   */
  private async recordUserAction(action: string, metadata?: any): Promise<void> {
    if (!this.sessionId) return;

    await replayClient.recordUserAction({
      sessionId: this.sessionId,
      action: {
        timestamp: new Date(),
        action,
        metadata
      }
    });
  }

  /**
   * Get total context length
   */
  private getContextLength(): number {
    return this.messages.reduce((sum, msg) => sum + msg.content.length, 0);
  }

  /**
   * Simulate AI call (replace with actual implementation)
   */
  private async callAI(model: string, prompt: string): Promise<{
    text: string;
    tokens: { input: number; output: number };
    cost: number;
    finishReason: string;
  }> {
    // This is a mock - replace with actual AI SDK call
    // Example: OpenAI, Anthropic, etc.
    
    const inputTokens = Math.ceil(prompt.length / 4);
    const outputTokens = Math.ceil(Math.random() * 100) + 50;

    return {
      text: `This is a mock response to: ${prompt.substring(0, 50)}...`,
      tokens: {
        input: inputTokens,
        output: outputTokens
      },
      cost: (inputTokens * 0.00003 + outputTokens * 0.00006),
      finishReason: 'stop'
    };
  }

  /**
   * End the chat session
   */
  async end(): Promise<void> {
    if (!this.sessionId) return;

    await this.recordUserAction('session_ended');
    await replayClient.endRecording(this.sessionId);

    console.log(`✅ Chat session ended: ${this.sessionId}`);
    console.log(`   Messages: ${this.messages.length}`);
    console.log(`   Total cost: $${this.getTotalCost().toFixed(4)}`);

    this.sessionId = null;
  }

  /**
   * Get total cost of the session
   */
  private getTotalCost(): number {
    return this.messages.reduce((sum, msg) => sum + (msg.cost || 0), 0);
  }

  /**
   * Get session statistics
   */
  async getStats(): Promise<any> {
    if (!this.sessionId) return null;

    const replay = await replayClient.getSessionReplay(this.sessionId);
    return {
      sessionId: replay.sessionId,
      duration: replay.duration,
      messageCount: replay.replayData.aiInteractions.length,
      totalCost: replay.summary.totalCost,
      totalTokens: replay.summary.totalTokens.input + replay.summary.totalTokens.output,
      errorCount: replay.errorCount
    };
  }
}

// Example usage
async function main() {
  const chat = new ChatSession('user_12345');

  try {
    // Start recording
    await chat.start('Customer Support - Billing Question');

    // Send messages
    await chat.sendMessage('Hello! I have a question about my bill.');
    await chat.sendMessage('Can you explain the charges for last month?');
    await chat.sendMessage('Thank you for the help!');

    // Get statistics
    const stats = await chat.getStats();
    console.log('📊 Session Stats:', stats);

    // End recording
    await chat.end();
  } catch (error) {
    console.error('Error in chat session:', error);
  }
}

// Run example
if (require.main === module) {
  main().catch(console.error);
}

export { ChatSession };

