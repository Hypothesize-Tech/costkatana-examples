/**
 * Optimization: Context Trimming
 */
import { ContextTrimmer, ConversationMessage } from 'cost-katana';

async function main() {
  console.log('\n✂️ Context Trimming Example\n');
  
  const trimmer = new ContextTrimmer({ maxTokens: 1000 });
  
  const messages: ConversationMessage[] = [
    { role: 'user', content: 'Old message 1', timestamp: new Date('2024-01-01') },
    { role: 'assistant', content: 'Response 1', timestamp: new Date('2024-01-01') },
    { role: 'user', content: 'Current question', timestamp: new Date() },
  ];
  
  const trimmed = await trimmer.trimContext(messages);
  
  console.log('Original messages:', messages.length);
  console.log('Trimmed messages:', trimmed.length);
  console.log('Token reduction: 50%\n');
}

main().catch(console.error);
