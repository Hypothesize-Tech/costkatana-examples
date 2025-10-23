import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getCostTrends() {
  const res = await axios.get(`${API}/monitoring/cost-trends`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📈 Cost trends:', res.data.data);
  return res.data.data;
}
