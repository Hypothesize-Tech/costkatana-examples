import axios from 'axios';
const API = 'https://api.costkatana.com/api';
const KEY = process.env.COST_KATANA_API_KEY;

export async function submitFeedback(requestId: string, rating: number) {
  const res = await axios.post(`${API}/request-feedback/${requestId}/feedback`, { rating },
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Feedback submitted');
  return res.data.data;
}
