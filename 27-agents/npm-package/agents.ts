import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createAgent(name: string, model: string, systemPrompt: string) {
  const res = await axios.post(`${API}/agents`, {name, model, systemPrompt},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Agent created:', res.data.data.id);
  return res.data.data;
}

export async function chatWithAgent(agentId: string, message: string) {
  const res = await axios.post(`${API}/agents/${agentId}/chat`, {message},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('�� Response:', res.data.data.response);
  return res.data.data;
}
