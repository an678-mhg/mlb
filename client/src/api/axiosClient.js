import axios from "axios";
import { base_url } from "../utils/contans";

const axiosClient = axios.create({
  baseURL: base_url,
});

export default axiosClient;
