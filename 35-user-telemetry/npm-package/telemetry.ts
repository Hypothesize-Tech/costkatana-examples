import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getTelemetryConfig() {
  const res = await axios.get(`${API}/user-telemetry-config`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📊 Telemetry config:', res.data.data);
  return res.data.data;
}

export async function updateTelemetryConfig(enabled: boolean, sampling: number) {
  const res = await axios.put(`${API}/user-telemetry-config`, {enabled, sampling},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Telemetry config updated');
  return res.data.data;
}
