import axios from "axios";
import { refreshToken } from "../redux/actions/userActions";

// Axios interceptor
const API = axios.create({ baseURL: import.meta.env.VITE_APP_BASE_URL });
API.defaults.withCredentials = true;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export default API;
