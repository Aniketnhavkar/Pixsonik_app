// src/api/apiHelper.js
import axios from "axios";
import store from "../redux/store";

const api = axios.create({
  baseURL: "https://management.pixsonik.com/api/",
  timeout: 10000,
});

// Attach token automatically
api.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getData = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

export const postData = async (endpoint, body = {}) => {
  const response = await api.post(endpoint, body);
  return response.data;
};
