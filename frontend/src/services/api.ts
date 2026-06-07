import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://erms-fastapi-1.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
