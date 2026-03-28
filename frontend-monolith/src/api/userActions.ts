import { AuthResponseType } from "@/types/apiTypes";
import type { UserAuthData } from "../types/userTypes";
import { apiClient } from "./axiosInstance";

export async function registerUser(
  data: UserAuthData,
): Promise<AuthResponseType> {
  const res = await apiClient.post("auth/register", data);
  return res.data;
}

export async function loginUser(data: UserAuthData): Promise<AuthResponseType> {
  const res = await apiClient.post("auth/login", data);
  return res.data;
}
