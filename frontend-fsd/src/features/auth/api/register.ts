import { UserAuthData } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/axiosInstance";
import { AuthResponseType } from "../model/types";

export async function registerUser(
  data: UserAuthData,
): Promise<AuthResponseType> {
  const res = await apiClient.post("auth/register", data);
  return res.data;
}
