export type ArchitectureKey = "monolith" | "modular" | "fsd";
export type FeatureKey =
  | "post-feed"
  | "user-post-feed"
  | "registration"
  | "authorization"
  | "create-post"
  | "delete-post"
  | "update-post"
  | "add-comment"
  | "toggle-like"
  | "search-filter-sort";

export const scenarios: Record<
  ArchitectureKey,
  Record<FeatureKey, string[]>
> = {
  monolith: {
    "post-feed": [
      "src/app/(main)/page.tsx",
      "src/api/server/postServerApi.ts",
      "src/utils/postQueryBuilder.ts",
      "src/components/PostCard.tsx",
    ],
    "user-post-feed": [
      "src/app/(main)/my-posts/page.tsx",
      "src/api/server/postServerApi.ts",
      "src/components/PostCard.tsx",
    ],
    registration: [
      "src/app/(auth)/register/page.tsx",
      "src/components/RegisterForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/api/userActions.ts",
    ],
    authorization: [
      "src/app/(auth)/login/page.tsx",
      "src/components/LoginForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/api/userActions.ts",
    ],
    "create-post": [
      "src/app/(main)/new-post/page.tsx",
      "src/api/postActions.ts",
      "src/components/PostForm.tsx",
      "src/api/categoriesActions.ts",
    ],
    "delete-post": [
      "src/components/PostCard.tsx",
      "src/components/CardsActionSection.tsx",
      "src/api/postActions.ts",
    ],
    "update-post": [
      "src/app/(main)/my-posts/[id]/edit/page.tsx",
      "src/components/EditPostButton.tsx",
      "src/components/PostCard.tsx",
      "src/api/postActions.ts",
      "src/components/PostForm.tsx",
      "src/api/categoriesActions.ts",
    ],
    "add-comment": [
      "src/components/PostCard.tsx",
      "src/components/CardsActionSection.tsx",
      "src/components/CommentSection.tsx",
      "src/api/commentActions.ts",
      "src/components/AddCommentForm.tsx",
    ],
    "toggle-like": [
      "src/components/PostCard.tsx",
      "src/components/CardsActionSection.tsx",
      "src/components/PostLikeButton.tsx",
      "src/api/postActions.ts",
    ],
    "search-filter-sort": [
      "src/app/(main)/page.tsx",
      "src/components/FeedControlsBar.tsx",
      "src/api/server/postServerApi.ts",
      "src/utils/postQueryBuilder.ts",
    ],
  },

  modular: {
    "post-feed": [
      "src/app/(main)/page.tsx",
      "src/modules/post/api/server/postServerApi.ts",
      "src/shared/lib/postQueryBuilder.ts",
      "src/modules/post/components/PostCard.tsx",
    ],
    "user-post-feed": [
      "src/app/(main)/my-posts/page.tsx",
      "src/modules/post/api/server/postServerApi.ts",
      "src/modules/post/components/PostCard.tsx",
    ],
    registration: [
      "src/app/(auth)/register/page.tsx",
      "src/modules/auth/components/RegisterForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/modules/auth/api/userActions.ts",
    ],
    authorization: [
      "src/app/(auth)/login/page.tsx",
      "src/modules/auth/components/LoginForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/modules/auth/api/userActions.ts",
    ],
    "create-post": [
      "src/app/(main)/new-post/page.tsx",
      "src/modules/post/api/postActions.ts",
      "src/modules/post/components/PostForm.tsx",
      "src/modules/post/api/server/categoryServerApi.ts",
    ],
    "delete-post": [
      "src/modules/post/components/PostCard.tsx",
      "src/modules/post/components/CardsActionSection.tsx",
      "src/modules/post/api/postActions.ts",
    ],
    "update-post": [
      "src/app/(main)/my-posts/[id]/edit/page.tsx",
      "src/modules/post/components/EditPostButton.tsx",
      "src/modules/post/api/postActions.ts",
      "src/modules/post/components/PostForm.tsx",
      "src/modules/post/api/server/categoryServerApi.ts",
      "src/modules/post/components/PostCard.tsx",
    ],
    "add-comment": [
      "src/modules/post/components/PostCard.tsx",
      "src/modules/post/components/CardsActionSection.tsx",
      "src/modules/comment/components/CommentSection.tsx",
      "src/modules/comment/api/commentActions.ts",
      "src/modules/comment/components/AddCommentForm.tsx",
    ],
    "toggle-like": [
      "src/modules/post/components/PostCard.tsx",
      "src/modules/post/components/CardsActionSection.tsx",
      "src/modules/post/components/PostLikeButton.tsx",
      "src/modules/post/api/postActions.ts",
    ],
    "search-filter-sort": [
      "src/app/(main)/page.tsx",
      "src/modules/post/components/FeedControlsBar.tsx",
      "src/modules/post/api/server/postServerApi.ts",
      "src/shared/lib/postQueryBuilder.ts",
    ],
  },

  fsd: {
    "post-feed": [
      "src/app/(main)/page.tsx",
      "src/entities/post/api/getAllPosts.ts",
      "src/entities/post/model/postQueryBuilder.ts",
      "src/entities/post/ui/PostCard.tsx",
      "src/widgets/post-feed/ui/PostFeed.tsx",
      "src/widgets/post-feed/ui/PostFeedItem.tsx",
    ],
    "user-post-feed": [
      "src/app/(main)/my-posts/page.tsx",
      "src/entities/post/api/getMyPosts.ts",
      "src/widgets/post-feed/ui/PostFeed.tsx",
      "src/widgets/post-feed/ui/PostFeedItem.tsx",
      "src/entities/post/ui/PostCard.tsx",
    ],
    registration: [
      "src/app/(auth)/register/page.tsx",
      "src/features/auth/ui/RegisterForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/features/auth/api/register.ts",
    ],
    authorization: [
      "src/app/(auth)/login/page.tsx",
      "src/features/auth/ui/LoginForm.tsx",
      "src/store/slices/userSlice.ts",
      "src/features/auth/api/login.ts",
    ],
    "create-post": [
      "src/app/(main)/new-post/page.tsx",
      "src/features/create-post/api/create-post.ts",
      "src/entities/post/ui/PostForm.tsx",
      "src/features/create-post/api/get-categories.ts",
    ],
    "delete-post": [
      "src/features/delete-post/api/delete-post.ts",
      "src/features/delete-post/ui/DeletePostButton.tsx",
      "src/widgets/post-feed/ui/PostCardActions.tsx",
      "src/widgets/post-feed/ui/PostFeedItem.tsx",
    ],
    "update-post": [
      "src/app/(main)/my-posts/[id]/edit/page.tsx",
      "src/features/update-post/ui/EditPostButton.tsx",
      "src/features/update-post/api/updatePost.ts",
      "src/entities/post/api/getPostById.ts",
      "src/features/create-post/api/get-categories.ts",
      "src/entities/post/ui/PostForm.tsx",
      "src/entities/post/ui/PostCard.tsx",
    ],
    "add-comment": [
      "src/widgets/post-feed/ui/PostFeedItem.tsx",
      "src/widgets/post-feed/ui/PostCardActions.tsx",
      "src/widgets/post-feed/ui/PostCommentsSection.tsx",
      "src/features/add-comment/api/add-comment.ts",
      "src/features/add-comment/ui/AddCommentForm.tsx",
    ],
    "toggle-like": [
      "src/widgets/post-feed/ui/PostFeedItem.tsx",
      "src/widgets/post-feed/ui/PostCardActions.tsx",
      "src/features/toggle-post-like/ui/PostLikeButton.tsx",
      "src/features/toggle-post-like/api/togglePostLike.ts",
    ],
    "search-filter-sort": [
      "src/app/(main)/page.tsx",
      "src/features/post-feed-controls/ui/FeedControlsBar.tsx",
      "src/entities/post/api/getAllPosts.ts",
      "src/entities/post/model/postQueryBuilder.ts",
    ],
  },
};
