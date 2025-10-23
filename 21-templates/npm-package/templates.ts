import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createTemplate(name: string, template: string) {
  const res = await axios.post(`${API}/prompt-templates`, {name, template},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Template created:', res.data.data.id);
  return res.data.data;
}
