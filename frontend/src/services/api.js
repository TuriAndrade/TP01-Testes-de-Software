import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PRIVATE_API_URL,
});

export default api;
