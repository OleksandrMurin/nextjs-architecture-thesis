import { CommentAuthor } from "@/entities/user/@x/comment";

export type Comment = {
  id: number;
  text: string;
  createdAt: Date;
  user: CommentAuthor;
};
