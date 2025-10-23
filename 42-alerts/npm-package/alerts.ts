import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createAlert(name: string, threshold: number, type: string) {
  const res = await axios.post(`${API}/alerts`, {name, threshold, type},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Alert created:', res.data.data.id);
  return res.data.data;
}
