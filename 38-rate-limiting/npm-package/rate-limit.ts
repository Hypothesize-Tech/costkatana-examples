import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getRateLimits() {
  const res = await axios.get(`${API}/rate-limits`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('⚡ Rate limits:', res.data.data);
  return res.data.data;
}

export async function updateRateLimits(requestsPerMinute: number, requestsPerHour: number) {
  const res = await axios.put(`${API}/rate-limits`, {requestsPerMinute, requestsPerHour},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Rate limits updated');
  return res.data.data;
}
