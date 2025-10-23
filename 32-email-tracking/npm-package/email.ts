import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function sendReport(recipient: string, reportType: string) {
  const res = await axios.post(`${API}/email/report`, {recipient, reportType},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Report sent to:', recipient);
  return res.data.data;
}
