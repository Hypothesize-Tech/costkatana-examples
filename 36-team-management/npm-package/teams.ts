import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createTeam(name: string) {
  const res = await axios.post(`${API}/teams`, {name},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Team created:', res.data.data.id);
  return res.data.data;
}

export async function addMember(teamId: string, email: string, role: string) {
  const res = await axios.post(`${API}/teams/${teamId}/members`, {email, role},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Member added:', email);
  return res.data.data;
}
