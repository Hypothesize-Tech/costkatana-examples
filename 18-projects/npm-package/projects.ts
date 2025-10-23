import axios from 'axios';
const API = 'https://cost-katana-backend.store/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function createProject(name: string, description?: string) {
  const res = await axios.post(`${API}/projects`, {name, description}, 
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ Project created:', res.data.data.id);
  return res.data.data;
}

export async function listProjects() {
  const res = await axios.get(`${API}/projects`,
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log(`📋 Found ${res.data.data.length} projects`);
  return res.data.data;
}

if (require.main === module) {
  (async () => {
    await createProject('Test Project', 'Description');
    await listProjects();
  })();
}
