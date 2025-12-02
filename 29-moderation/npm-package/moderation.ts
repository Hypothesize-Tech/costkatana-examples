import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function moderateContent(text: string) {
  const res = await axios.post(`${API}/moderation/check`, {text},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Moderation result:', res.data.data.flagged ? '�� Flagged' : '✅ Safe');
  return res.data.data;
}
