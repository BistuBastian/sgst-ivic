import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const loginRequest = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};