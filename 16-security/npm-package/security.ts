import axios from 'axios';
const API_BASE = 'https://cost-katana-backend.store/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function securityScan(type: string, data: any) {
  const response = await axios.post(
    `${API_BASE}/security/scan`,
    { type, data },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log('Security scan:', response.data);
  return response.data;
}

export { securityScan };
