import { UserInfo } from "../auth/types";

export type CommentInfo = {
  id: number;
  text: string;
  createdAt: Date;
  user: UserInfo;
};
