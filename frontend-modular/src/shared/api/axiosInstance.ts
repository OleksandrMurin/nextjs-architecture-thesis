import { getCSRCookie } from "@/shared/lib/cookies";
import axios from "axios";
import { userSlice } from "../../store/slices/userSlice";
import { getStore } from "../../store/storeRef";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getCSRCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;
    if (status == 401 || status == 403) {
      const store = getStore();
      store.dispatch(userSlice.actions.logout());
    }
    return Promise.reject(error);
  },
);
