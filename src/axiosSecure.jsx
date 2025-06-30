import axios from "axios";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase.init";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

let token = null;

// Wait for user to be ready
onAuthStateChanged(auth, async (user) => {
  if (user) {
    token = await getIdToken(user);
  }
});

// Interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
