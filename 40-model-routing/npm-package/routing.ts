import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getRoutingConfig() {
  const res = await axios.get(`${API}/model-routing/config`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('🎯 Routing config:', res.data.data);
  return res.data.data;
}
