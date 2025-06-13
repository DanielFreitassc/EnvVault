import axios from "axios";
import { redirect } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "",
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

    if (res.response.status === 403) {
      destroyCookie(null, "token");
      redirect("/login");
    }

    return Promise.reject(res);
  }
);
