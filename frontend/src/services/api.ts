// frontend/src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",   // ← Changed to 8000
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
