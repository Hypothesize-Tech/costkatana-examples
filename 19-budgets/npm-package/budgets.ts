import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createBudget(name: string, limit: number, period: string) {
  const res = await axios.post(`${API}/budget`, {name, limit, period},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Budget created:', res.data.data.id);
  return res.data.data;
}

export async function listBudgets() {
  const res = await axios.get(`${API}/budget`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log(`💰 Found ${res.data.data.length} budgets`);
  return res.data.data;
}
