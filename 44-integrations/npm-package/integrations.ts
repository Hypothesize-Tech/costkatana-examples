import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function listIntegrations() {
  const res = await axios.get(`${API}/integrations`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('🔌 Integrations:', res.data.data.length);
  return res.data.data;
}

export async function connectIntegration(provider: string, credentials: any) {
  const res = await axios.post(`${API}/integrations/connect`, {provider, credentials},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Integration connected:', provider);
  return res.data.data;
}
