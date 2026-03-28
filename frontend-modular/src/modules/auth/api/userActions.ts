import { apiClient } from "../../../shared/api/axiosInstance";
import { AuthResponseType, UserAuthData } from "../types";

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
