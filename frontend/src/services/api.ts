import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-url.onrender.com",   // ← Change this later
  // For now, you can leave it or use a temporary public test
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
