import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getFailoverConfig() {
  const res = await axios.get(`${API}/failover/config`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('🔄 Failover config:', res.data.data);
  return res.data.data;
}

export async function updateFailoverConfig(enabled: boolean, providers: string[]) {
  const res = await axios.put(`${API}/failover/config`, {enabled, providers},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Failover config updated');
  return res.data.data;
}
