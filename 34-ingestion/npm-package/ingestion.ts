import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function ingestData(source: string, data: any[]) {
  const res = await axios.post(`${API}/ingestion`, {source, data},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Data ingested:', res.data.data.count);
  return res.data.data;
}
