import axios from "axios";

export const baseApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 10000,
});

export const publicApi = axios.create({
  baseURL: "/api",
  timeout: 10000,
});
