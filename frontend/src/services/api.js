import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Job Related API Calls
export const getJobs = async (search = '', category = '', status = '') => {
  let query = '';
  if (search) query += `search=${search}&`;
  if (category) query += `category=${category}&`;
  if (status) query += `status=${status}&`;
  
  const response = await api.get(`/jobs?${query}`);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/jobs/${id}`, { status });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// Authentication API Calls
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export default api;