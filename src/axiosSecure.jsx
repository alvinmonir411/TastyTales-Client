// src/hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "./Firebase.init";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await getIdToken(user);
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
