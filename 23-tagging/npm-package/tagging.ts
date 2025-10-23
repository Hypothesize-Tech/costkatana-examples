import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function addTags(requestId: string, tags: string[]) {
  const res = await axios.post(`${API}/tags`, {requestId, tags},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Tags added');
  return res.data.data;
}
