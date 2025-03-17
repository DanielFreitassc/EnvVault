import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();

    if (cookies["token"]) {
      config.headers.Authorization = `Bearer ${cookies["token"]}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (res) => {
    toast.error(res.response.data.message);

    return Promise.reject(res);
  }
);
