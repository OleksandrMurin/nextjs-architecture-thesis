import { UserInfo } from "../auth/types";

export type Post = {
  id: number;
  imageUrl: string;
  description: string;
  createdAt: string;
  user: UserInfo;
  category: CategoryType;
  commentCount: number;
  likesCount: number;
  likedByMe: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
};
