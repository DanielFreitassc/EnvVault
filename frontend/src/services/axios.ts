import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (res) => res,
  (res) => {
    console.log(res);

    // toast.error()
  }
);
