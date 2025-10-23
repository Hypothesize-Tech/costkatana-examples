/**
 * Cost Katana OpenTelemetry: Custom Spans
 * 
 * Create custom spans to track specific business operations
 * and add rich contextual metadata to your traces.
 * 
 * Run: npx ts-node 11-observability/npm-package/custom-spans.ts
 */

import CostKatana from 'cost-katana';
import { v4 as uuidv4 } from 'uuid';

const client = new CostKatana({
  apiKey: process.env.COST_KATANA_API_KEY!
});

async function documentProcessingPipeline() {
  const sessionId = `doc_pipeline_${uuidv4()}`;
  
  console.log('🥷 Document Processing Pipeline with Custom Spans\n');

  try {
    // Span 1: Document extraction
    console.log('1️⃣ Extracting text from document...');
    const extraction = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Extract key information from document...' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Span-Name': 'document_extraction',
        'X-Span-Attributes': JSON.stringify({
          document_type: 'pdf',
          page_count: 25,
          file_size_mb: 3.2,
          language: 'en'
        })
      }
    });
    console.log(`   ✅ Extraction complete (${extraction.headers?.['x-request-duration']})`);

    // Span 2: Entity recognition
    console.log('2️⃣ Recognizing entities...');
    const entities = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Identify all entities...' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Parent-Trace-Id': extraction.headers?.['x-trace-id'],
        'X-Span-Name': 'entity_recognition',
        'X-Span-Attributes': JSON.stringify({
          entity_types: ['person', 'organization', 'location'],
          confidence_threshold: 0.85
        })
      }
    });
    console.log(`   ✅ Entities found (${entities.headers?.['x-request-duration']})`);

    // Span 3: Summarization
    console.log('3️⃣ Generating summary...');
    const summary = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Summarize the document...' }]
    }, {
      headers: {
        'X-Session-Id': sessionId,
        'X-Parent-Trace-Id': entities.headers?.['x-trace-id'],
        'X-Span-Name': 'summarization',
        'X-Span-Attributes': JSON.stringify({
          summary_type: 'executive',
          max_words: 200
        })
      }
    });
    console.log(`   ✅ Summary generated (${summary.headers?.['x-request-duration']})`);

    console.log('\n✅ Pipeline complete!');
    console.log(`   Session ID: ${sessionId}`);

  } catch (error) {
    console.error('❌ Pipeline failed:', error);
  }
}

async function main() {
  if (!process.env.COST_KATANA_API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await documentProcessingPipeline();
}

if (require.main === module) {
  main();
}

export { documentProcessingPipeline };
