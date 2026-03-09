import axios from "axios";

const api = axios.create({
  baseURL: "https://dualmind-ai-xubm.onrender.com", // change if needed
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
