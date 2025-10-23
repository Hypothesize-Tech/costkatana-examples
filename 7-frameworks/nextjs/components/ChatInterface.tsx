/**
 * Next.js Client Component: Chat Interface
 * 
 * Demonstrates client-side integration with Cost Katana API routes
 */

'use client';

import { useState } from 'react';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [cost, setCost] = useState<number>(0);
    const [tokens, setTokens] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        setLoading(true);
        setResponse('');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    model: 'gpt-4',
                    options: { temperature: 0.7, maxTokens: 500 }
                })
            });

            if (!res.ok) {
                throw new Error('Failed to get response');
            }

            const data = await res.json();
            setResponse(data.response);
            setCost(data.metadata.cost);
            setTokens(data.metadata.tokens);

        } catch (error: any) {
            setResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Cost Katana Chat</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Your Message
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        rows={4}
                        placeholder="Ask anything..."
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Send'}
                </button>
            </form>

            {response && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Response:</h2>
                    <p className="whitespace-pre-wrap mb-4">{response}</p>

                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>💰 Cost: ${cost.toFixed(6)}</span>
                        <span>🎯 Tokens: {tokens}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

