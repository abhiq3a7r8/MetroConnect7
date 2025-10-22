import axios from 'axios';

const API_BASE_URL = 'http://192.168.51.160:3000/auth';

export default {
  async register({ email, password, phone }) {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, { email, password, phone });
      
      return res.data;
    } catch (err) {
      if (err.response) {
        console.log("Backend error:", err.response.data);
        throw new Error(err.response.data?.message || "Request failed");
      }
      throw new Error("Network error");
    }
  },

async login({ phone, password }) {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, { phone, password });
    return res.data; 
  } catch (err) {
    if (err.response) {
      console.log("Backend error:", err.response.data);
      throw new Error(err.response.data?.message || "Request failed");
    }
    throw new Error("Network error");
  }
}

};
