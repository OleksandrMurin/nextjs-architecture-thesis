import { UserInfo } from "./userTypes";

export type CommentInfo = {
  id: number;
  text: string;
  createdAt: Date;
  user: UserInfo;
};

export type AuthResponseType = {
  accessToken: string;
  user: UserInfo;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  id: number;
  imageUrl: string;
  description: string;
  createdAt: string;
  user: UserInfo;
  category: Category;
  commentCount: number;
  likesCount: number;
  likedByMe: boolean;
};
