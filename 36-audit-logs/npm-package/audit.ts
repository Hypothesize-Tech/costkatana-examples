import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getAuditLogs() {
  const res = await axios.get(`${API}/audit-logs`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('📋 Found', res.data.data.length, 'audit logs');
  return res.data.data;
}

export async function searchLogs(action: string, from?: string) {
  const res = await axios.post(`${API}/audit-logs/search`, {action, from},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('🔍 Search results:', res.data.data.length);
  return res.data.data;
}
