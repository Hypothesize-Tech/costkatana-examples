import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createExperiment(name: string, variants: any[]) {
  const res = await axios.post(`${API}/experimentation`, {name, variants},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Experiment created:', res.data.data.id);
  return res.data.data;
}
