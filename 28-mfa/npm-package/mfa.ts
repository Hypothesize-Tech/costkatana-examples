import axios from 'axios';
const API = 'https://api.costkatana.com/api'\;
const KEY = process.env.COST_KATANA_API_KEY;

export async function enableMFA() {
  const res = await axios.post(`${API}/auth/mfa/enable`, {},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ MFA enabled. QR Code:', res.data.data.qrCode);
  return res.data.data;
}

export async function verifyMFA(code: string) {
  const res = await axios.post(`${API}/auth/mfa/verify`, {code},
    {headers: {'Authorization': `Bearer ${KEY}`}});
  console.log('✅ MFA verified');
  return res.data.data;
}
