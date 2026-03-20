/**
 * Gateway: multi-turn chat + usage / dashboard expectations
 *
 * Demonstrates:
 * - Sending the full `messages` array each turn (model remembers prior turns).
 * - Building the next request from prior turns + a newly captured user line.
 *
 * costkatana-backend-nest records Usage as one turn per request (last user message for
 * prompt + estimated input tokens when 2+ chat messages). Core doc:
 * cost-katana/examples/GATEWAY_USAGE_AND_TRACKING.md
 */
import { AICostTracker, AIProvider } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult } from '../../shared/utils';

type ChatTurn = { role: 'user' | 'assistant'; content: string };

function getOpenAiAssistantText(data: unknown): string {
  if (!data || typeof data !== 'object') return '';
  const d = data as Record<string, unknown>;
  const choices = d.choices;
  if (!Array.isArray(choices) || choices.length === 0) return '';
  const first = choices[0] as Record<string, unknown>;
  const message = first.message as Record<string, unknown> | undefined;
  const content = message?.content;
  return typeof content === 'string' ? content : '';
}

async function main() {
  console.log('\n💬 Gateway multi-turn chat (usage-tracking friendly)\n');

  validateConfig(['costKatanaKey', 'projectId']);

  const tracker = await AICostTracker.create({
    providers: [{ provider: AIProvider.OpenAI, apiKey: config.openaiKey }],
    tracking: { enableAutoTracking: true },
    projectId: config.projectId,
  });

  const gateway = tracker.initializeGateway({
    baseUrl: config.gatewayUrl,
    enableCache: false,
    enableRetries: false,
  });

  const model = 'gpt-4o-mini';

  const history: ChatTurn[] = [];

  const firstUserText = 'Reply with exactly one short sentence defining "API gateway".';
  history.push({ role: 'user', content: firstUserText });

  const res1 = await gateway.openai({
    model,
    messages: [...history],
  });

  const answer1 = getOpenAiAssistantText(res1.data);
  history.push({ role: 'assistant', content: answer1 || '(no content)' });

  const secondUserText = 'Now in one sentence: how does that relate to AI providers?';
  history.push({ role: 'user', content: secondUserText });

  const res2 = await gateway.openai({
    model,
    messages: [...history],
  });

  const answer2 = getOpenAiAssistantText(res2.data);

  logResult('Turn 1 (first user message only in body)', {
    'User (captured)': firstUserText.slice(0, 80) + (firstUserText.length > 80 ? '…' : ''),
    'Assistant preview': (answer1 || '').slice(0, 120) + ((answer1 || '').length > 120 ? '…' : ''),
  });

  logResult('Turn 2 (full thread + new user line)', {
    'Latest user (this turn)': secondUserText,
    'Messages sent': String(history.length),
    'Assistant preview': (answer2 || '').slice(0, 120) + ((answer2 || '').length > 120 ? '…' : ''),
  });

  console.log(
    '\n✅ Each gateway call included the full conversation so turn 2 has context.\n' +
      '   Dashboard "Request" for each row should show that call’s **last user** line, not assistant text.\n',
  );
}

main().catch(console.error);
