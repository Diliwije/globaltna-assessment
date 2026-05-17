// src/services/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch jobs with optional filters and search query
export const getJobs = async (category = '', status = '', search = '') => {
  let query = '';
  
  if (category) query += `category=${category}&`;
  if (status) query += `status=${status}&`;
  if (search) query += `search=${search}`;
  
  const response = await axios.get(`${API_URL}/jobs?${query}`);
  return response.data;
};

// Fetch a single job request by its ID
export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/jobs/${id}`);
  return response.data;
};

// Create a new job request
export const createJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData);
  return response.data;
};

// Update only the status of a job request
export const updateJobStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/jobs/${id}`, { status });
  return response.data;
};

// Delete a job request
export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/jobs/${id}`);
  return response.data;
};