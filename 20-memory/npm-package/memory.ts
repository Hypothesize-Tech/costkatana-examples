import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function storeMemory(agentId: string, key: string, value: any) {
  const res = await axios.post(`${API}/memory`, {agentId, key, value},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Memory stored');
  return res.data.data;
}

export async function getMemory(agentId: string, key: string) {
  const res = await axios.get(`${API}/memory/${agentId}/${key}`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📖 Memory:', res.data.data);
  return res.data.data;
}
