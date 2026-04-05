import { PostAuthor } from "@/entities/user/@x/post";

export type Post = {
  id: number;
  imageUrl: string;
  description: string;
  createdAt: string;
  user: PostAuthor;
  category: Category;
  commentCount: number;
  likesCount: number;
  likedByMe: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type GetPostsParams = {
  search?: string;
  sortBy?: "createdAt";
  order?: "ASC" | "DESC";
  category?: string;
};
