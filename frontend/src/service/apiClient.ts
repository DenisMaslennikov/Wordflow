import axios from "axios";
import { ACCESS_KEY } from "../utils/constants.ts";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const access = localStorage.getItem(ACCESS_KEY);
  if (access !== null) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

export default apiClient;
