import { User } from "@/entities/user/model/types";

export type AuthResponseType = {
  accessToken: string;
  user: User;
};
