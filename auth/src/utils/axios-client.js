import axios from "axios";
import { BASE_URL } from "./base_url";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
  },
});

export default axiosClient;
