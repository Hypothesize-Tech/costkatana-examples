/**
 * Cost Katana OpenTelemetry: Metrics Collection
 * 
 * Collect and export OpenTelemetry metrics for monitoring.
 * 
 * Run: npx ts-node 11-observability/npm-package/metrics-collection.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.costkatana.com/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

async function collectMetrics() {
  console.log('🥷 Cost Katana Metrics Collection\n');

  try {
    // 1. Get Prometheus metrics
    console.log('1️⃣ Fetching Prometheus metrics...');
    const metricsResponse = await axios.get(`${API_BASE}/metrics`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    
    console.log('✅ Prometheus metrics available:');
    const lines = metricsResponse.data.split('\n').slice(0, 10);
    lines.forEach((line: string) => {
      if (line && !line.startsWith('#')) {
        console.log(`   ${line}`);
      }
    });

    // 2. Get telemetry summary
    console.log('\n2️⃣ Fetching telemetry summary...');
    const telemetryResponse = await axios.get(`${API_BASE}/telemetry`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    
    console.log('✅ Current metrics:');
    console.log(`   Requests/min: ${telemetryResponse.data.metrics?.requests_per_minute || 0}`);
    console.log(`   Avg Latency: ${telemetryResponse.data.metrics?.average_latency_ms || 0}ms`);
    console.log(`   Error Rate: ${(telemetryResponse.data.metrics?.error_rate || 0) * 100}%`);
    console.log(`   Cost/hour: $${telemetryResponse.data.metrics?.cost_per_hour || 0}`);

  } catch (error: any) {
    console.error('❌ Failed:', error.response?.data || error.message);
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ COST_KATANA_API_KEY required');
    process.exit(1);
  }

  await collectMetrics();
}

if (require.main === module) {
  main();
}

export { collectMetrics };
