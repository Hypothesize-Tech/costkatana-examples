import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createNotebook(name: string, description?: string) {
  const res = await axios.post(`${API}/notebooks`, {name, description},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Notebook created:', res.data.data.id);
  return res.data.data;
}

export async function listNotebooks() {
  const res = await axios.get(`${API}/notebooks`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log(`📓 Found ${res.data.data.length} notebooks`);
  return res.data.data;
}
