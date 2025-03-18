import axios from 'axios';

// Create Axios instance with base URL
const instance = axios.create({
  baseURL: '/api', // Proxied to http://localhost:5050/api via package.json proxy
});

// Add token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
});

export default instance; // Export Axios instance