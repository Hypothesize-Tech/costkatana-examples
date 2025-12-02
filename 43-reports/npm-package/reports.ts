import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function generateReport(type: string, format: string) {
  const res = await axios.post(`${API}/reports/generate`, {type, format},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Report generated:', res.data.data.id);
  return res.data.data;
}
