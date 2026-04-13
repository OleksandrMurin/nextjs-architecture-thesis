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

//Here should`ve been some changes in this iteration, but I`ve already done them. Nevertheless i still need to trek changes, so I add this comment
