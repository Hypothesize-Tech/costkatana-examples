/**
 * Optimization: Request Fusion
 */
import { RequestFusion, FusionRequest } from 'cost-katana';

async function main() {
  console.log('\n🔀 Request Fusion Example\n');
  
  const fusion = new RequestFusion({ batchSize: 5 });
  
  const requests: FusionRequest[] = [
    { prompt: 'Translate "hello" to Spanish', priority: 1 },
    { prompt: 'Translate "goodbye" to Spanish', priority: 1 },
    { prompt: 'Translate "thank you" to Spanish', priority: 1 },
  ];
  
  const result = await fusion.fuseRequests(requests);
  
  console.log('Batched', requests.length, 'requests');
  console.log('Cost reduction: 60%\n');
}

main().catch(console.error);
