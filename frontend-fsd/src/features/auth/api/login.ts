import { UserAuthData } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/axiosInstance";
import { AuthResponseType } from "../model/types";

export async function loginUser(data: UserAuthData): Promise<AuthResponseType> {
  const res = await apiClient.post("auth/login", data);
  return res.data;
}
