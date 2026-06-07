import axios from "axios";

const api = axios.create({
  // Change this to your actual backend URL after deploying backend
  baseURL: "http://localhost:8000",   // For local testing
  // baseURL: "https://your-actual-backend.onrender.com",  // For production
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
