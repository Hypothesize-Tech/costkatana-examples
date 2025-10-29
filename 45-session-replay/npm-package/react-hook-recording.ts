/**
 * React Hook for Automatic Session Recording
 * Drop-in hook for recording AI interactions in React applications
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { SessionReplayClient } from 'cost-katana/trace';
import type { AIInteraction, AppFeature } from 'cost-katana/trace/types';

interface UseSessionRecordingOptions {
  userId: string;
  feature: AppFeature;
  label?: string;
  autoStart?: boolean;
  metadata?: Record<string, any>;
}

interface UseSessionRecordingReturn {
  sessionId: string | null;
  isRecording: boolean;
  startRecording: () => Promise<void>;
  endRecording: () => Promise<void>;
  recordInteraction: (interaction: Omit<AIInteraction, 'timestamp'>) => Promise<void>;
  recordAction: (action: string, metadata?: any) => Promise<void>;
  recordContext: (context: { file?: string; snippet?: string; language?: string }) => Promise<void>;
  getStats: () => Promise<any>;
}

/**
 * React hook for automatic session recording
 */
export function useSessionRecording(
  options: UseSessionRecordingOptions
): UseSessionRecordingReturn {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const clientRef = useRef<SessionReplayClient | null>(null);

  // Initialize client
  useEffect(() => {
    clientRef.current = new SessionReplayClient({
      apiKey: process.env.REACT_APP_COST_KATANA_API_KEY || process.env.NEXT_PUBLIC_COST_KATANA_API_KEY!,
      baseURL: 'https://cost-katana-backend.store'
    });
  }, []);

  // Auto-start if enabled
  useEffect(() => {
    if (options.autoStart && !sessionId && clientRef.current) {
      startRecording();
    }

    // Cleanup on unmount
    return () => {
      if (sessionId && clientRef.current) {
        endRecording();
      }
    };
  }, [options.autoStart]);

  /**
   * Start recording a new session
   */
  const startRecording = useCallback(async () => {
    if (!clientRef.current || isRecording) return;

    try {
      const result = await clientRef.current.startRecording({
        userId: options.userId,
        feature: options.feature,
        label: options.label || `${options.feature} - ${new Date().toLocaleString()}`,
        metadata: {
          ...options.metadata,
          platform: 'react',
          userAgent: navigator.userAgent,
          url: window.location.href
        }
      });

      setSessionId(result.sessionId);
      setIsRecording(true);
      console.log('✅ Recording started:', result.sessionId);
    } catch (error) {
      console.error('❌ Failed to start recording:', error);
      throw error;
    }
  }, [options, isRecording]);

  /**
   * End the current recording
   */
  const endRecording = useCallback(async () => {
    if (!clientRef.current || !sessionId) return;

    try {
      await clientRef.current.endRecording(sessionId);
      console.log('✅ Recording ended:', sessionId);
      setSessionId(null);
      setIsRecording(false);
    } catch (error) {
      console.error('❌ Failed to end recording:', error);
    }
  }, [sessionId]);

  /**
   * Record an AI interaction
   */
  const recordInteraction = useCallback(async (
    interaction: Omit<AIInteraction, 'timestamp'>
  ) => {
    if (!clientRef.current || !sessionId) {
      console.warn('Cannot record interaction: session not started');
      return;
    }

    try {
      await clientRef.current.recordInteraction({
        sessionId,
        interaction: {
          ...interaction,
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('❌ Failed to record interaction:', error);
    }
  }, [sessionId]);

  /**
   * Record a user action
   */
  const recordAction = useCallback(async (action: string, metadata?: any) => {
    if (!clientRef.current || !sessionId) return;

    try {
      await clientRef.current.recordUserAction({
        sessionId,
        action: {
          timestamp: new Date(),
          action,
          target: metadata?.target,
          metadata
        }
      });
    } catch (error) {
      console.error('❌ Failed to record action:', error);
    }
  }, [sessionId]);

  /**
   * Record code context
   */
  const recordContext = useCallback(async (context: {
    file?: string;
    snippet?: string;
    language?: string;
  }) => {
    if (!clientRef.current || !sessionId) return;

    try {
      await clientRef.current.recordCodeContext({
        sessionId,
        context: {
          timestamp: new Date(),
          file: context.file,
          snippet: context.snippet,
          language: context.language
        }
      });
    } catch (error) {
      console.error('❌ Failed to record context:', error);
    }
  }, [sessionId]);

  /**
   * Get session statistics
   */
  const getStats = useCallback(async () => {
    if (!clientRef.current || !sessionId) return null;

    try {
      const replay = await clientRef.current.getSessionReplay(sessionId);
      return {
        sessionId: replay.sessionId,
        duration: replay.duration,
        interactionCount: replay.replayData.aiInteractions.length,
        actionCount: replay.replayData.userActions.length,
        totalCost: replay.summary.totalCost,
        totalTokens: replay.summary.totalTokens.input + replay.summary.totalTokens.output,
        errorCount: replay.errorCount
      };
    } catch (error) {
      console.error('❌ Failed to get stats:', error);
      return null;
    }
  }, [sessionId]);

  return {
    sessionId,
    isRecording,
    startRecording,
    endRecording,
    recordInteraction,
    recordAction,
    recordContext,
    getStats
  };
}

// Example React Component using the hook
export function ChatComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);

  const {
    sessionId,
    isRecording,
    startRecording,
    endRecording,
    recordInteraction,
    recordAction,
    getStats
  } = useSessionRecording({
    userId: 'user_12345',
    feature: 'chat',
    label: 'React Chat Component',
    autoStart: true
  });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Record button click
    await recordAction('send_message', { messageLength: message.length });

    // Simulate AI call
    const startTime = Date.now();
    const response = await callAI(message); // Your AI SDK call
    const latency = Date.now() - startTime;

    // Add to message list
    setMessages(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: response.text }
    ]);

    // Record the interaction
    await recordInteraction({
      model: 'gpt-4',
      prompt: message,
      response: response.text,
      tokens: response.tokens,
      cost: response.cost,
      latency,
      provider: 'openai',
      parameters: {
        temperature: 0.7
      }
    });

    setMessage('');
  };

  const handleEndChat = async () => {
    const stats = await getStats();
    console.log('Session Stats:', stats);
    await endRecording();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chat</h2>
        {isRecording && (
          <span className="recording-indicator">
            🔴 Recording {sessionId?.substring(0, 8)}...
          </span>
        )}
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleEndChat}>End Chat</button>
      </div>
    </div>
  );
}

// Mock AI call function
async function callAI(prompt: string): Promise<{
  text: string;
  tokens: { input: number; output: number };
  cost: number;
}> {
  // Replace with actual AI SDK call
  const inputTokens = Math.ceil(prompt.length / 4);
  const outputTokens = Math.floor(Math.random() * 100) + 50;

  return {
    text: `Response to: ${prompt}`,
    tokens: { input: inputTokens, output: outputTokens },
    cost: inputTokens * 0.00003 + outputTokens * 0.00006
  };
}

