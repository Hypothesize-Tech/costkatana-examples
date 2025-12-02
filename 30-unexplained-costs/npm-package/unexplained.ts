import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getUnexplainedCosts() {
  const res = await axios.get(`${API}/analytics/unexplained-costs`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('💰 Unexplained costs:', res.data.data.total);
  return res.data.data;
}

export async function getCostAnomalies() {
  const res = await axios.get(`${API}/analytics/cost-anomalies`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('⚠️ Anomalies found:', res.data.data.length);
  return res.data.data;
}
