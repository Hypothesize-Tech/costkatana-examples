import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function uploadTrainingData(prompts: any[]) {
  const res = await axios.post(`${API}/cortex/training`, {prompts},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Training data uploaded:', res.data.data.count);
  return res.data.data;
}
