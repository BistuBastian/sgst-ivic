import axios from "axios";

const api = axios.create({
  // Prioriza la URL de Render, si no existe usa localhost para desarrollo
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR CRÍTICO: Agrega el token a cada petición para que el backend sepa quién eres
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const loginRequest = async (credentials) => {
  const response = await api.post('api/auth/login', credentials);
  return response.data;
};
