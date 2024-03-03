import axios from "axios";

// Axios interceptor
const API = axios.create({ baseURL: import.meta.env.VITE_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export default API;
