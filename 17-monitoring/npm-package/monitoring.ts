import axios from 'axios';
const API_BASE = 'https://api.costkatana.com/api'\;
const API_KEY = process.env.COST_KATANA_API_KEY;

async function getMetrics() {
  const response = await axios.get(
    `${API_BASE}/monitoring/metrics`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log('Metrics:', response.data);
  return response.data;
}

async function getHealth() {
  const response = await axios.get(
    `${API_BASE}/monitoring/health`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  console.log('Health:', response.data);
  return response.data;
}

export { getMetrics, getHealth };
