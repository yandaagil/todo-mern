import axios from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
