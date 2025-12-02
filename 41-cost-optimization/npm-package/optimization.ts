import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function getRecommendations() {
  const res = await axios.get(`${API}/optimization/recommendations`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('💡 Recommendations:', res.data.data.length);
  return res.data.data;
}
