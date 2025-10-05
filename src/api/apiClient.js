// src/api/apiClient.js
import axios from "axios";
import store from "../redux/store";

const apiClient = axios.create({
  baseURL: "https://management.pixsonik.com/api/",
  timeout: 10000,
});

// Add token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
