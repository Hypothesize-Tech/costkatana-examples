import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function executeQuery(query: string) {
  const res = await axios.post(`${API}/ckql/query`, {query},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Query executed:', res.data.data.length, 'rows');
  return res.data.data;
}

export async function getSchema() {
  const res = await axios.get(`${API}/ckql/schema`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📊 Schema:', Object.keys(res.data.data).join(', '));
  return res.data.data;
}
