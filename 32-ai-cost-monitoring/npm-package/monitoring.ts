import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getCostTrends() {
  const res = await axios.get(`${API}/monitoring/cost-trends`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📈 Cost trends:', res.data.data);
  return res.data.data;
}
