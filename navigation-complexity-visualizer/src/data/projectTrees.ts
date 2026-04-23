import { TreeNode } from "../types/tree";

export const fsdTree: TreeNode = {
  name: "src",
  path: "src",
  type: "directory",
  children: [
    {
      name: "proxy.ts",
      path: "src/proxy.ts",
      type: "file",
    },
    {
      name: "app",
      path: "src/app",
      type: "directory",
      children: [
        { name: "favicon.ico", path: "src/app/favicon.ico", type: "file" },
        { name: "globals.css", path: "src/app/globals.css", type: "file" },
        { name: "layout.tsx", path: "src/app/layout.tsx", type: "file" },
        { name: "providers.tsx", path: "src/app/providers.tsx", type: "file" },
        {
          name: "(auth)",
          path: "src/app/(auth)",
          type: "directory",
          children: [
            {
              name: "login",
              path: "src/app/(auth)/login",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/login/page.tsx",
                  type: "file",
                },
              ],
            },
            {
              name: "register",
              path: "src/app/(auth)/register",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/register/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "(main)",
          path: "src/app/(main)",
          type: "directory",
          children: [
            {
              name: "layout.tsx",
              path: "src/app/(main)/layout.tsx",
              type: "file",
            },
            { name: "page.tsx", path: "src/app/(main)/page.tsx", type: "file" },
            {
              name: "my-posts",
              path: "src/app/(main)/my-posts",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/my-posts/page.tsx",
                  type: "file",
                },
                {
                  name: "[id]",
                  path: "src/app/(main)/my-posts/[id]",
                  type: "directory",
                  children: [
                    {
                      name: "edit",
                      path: "src/app/(main)/my-posts/[id]/edit",
                      type: "directory",
                      children: [
                        {
                          name: "page.tsx",
                          path: "src/app/(main)/my-posts/[id]/edit/page.tsx",
                          type: "file",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "new-post",
              path: "src/app/(main)/new-post",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/new-post/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "entities",
      path: "src/entities",
      type: "directory",
      children: [
        {
          name: "comment",
          path: "src/entities/comment",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/entities/comment/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/entities/comment/api",
              type: "directory",
              children: [
                {
                  name: "getComments.ts",
                  path: "src/entities/comment/api/getComments.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "model",
              path: "src/entities/comment/model",
              type: "directory",
              children: [
                {
                  name: "types.ts",
                  path: "src/entities/comment/model/types.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/entities/comment/ui",
              type: "directory",
              children: [
                {
                  name: "CommentItem.tsx",
                  path: "src/entities/comment/ui/CommentItem.tsx",
                  type: "file",
                },
                {
                  name: "CommentsList.tsx",
                  path: "src/entities/comment/ui/CommentsList.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "post",
          path: "src/entities/post",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/entities/post/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/entities/post/api",
              type: "directory",
              children: [
                {
                  name: "getAllPosts.ts",
                  path: "src/entities/post/api/getAllPosts.ts",
                  type: "file",
                },
                {
                  name: "getMyPosts.ts",
                  path: "src/entities/post/api/getMyPosts.ts",
                  type: "file",
                },
                {
                  name: "getPostById.ts",
                  path: "src/entities/post/api/getPostById.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "model",
              path: "src/entities/post/model",
              type: "directory",
              children: [
                {
                  name: "postQueryBuilder.ts",
                  path: "src/entities/post/model/postQueryBuilder.ts",
                  type: "file",
                },
                {
                  name: "types.ts",
                  path: "src/entities/post/model/types.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/entities/post/ui",
              type: "directory",
              children: [
                {
                  name: "PostCard.tsx",
                  path: "src/entities/post/ui/PostCard.tsx",
                  type: "file",
                },
                {
                  name: "PostForm.tsx",
                  path: "src/entities/post/ui/PostForm.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "user",
          path: "src/entities/user",
          type: "directory",
          children: [
            {
              name: "@x",
              path: "src/entities/user/@x",
              type: "directory",
              children: [
                {
                  name: "comment.ts",
                  path: "src/entities/user/@x/comment.ts",
                  type: "file",
                },
                {
                  name: "post.ts",
                  path: "src/entities/user/@x/post.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "model",
              path: "src/entities/user/model",
              type: "directory",
              children: [
                {
                  name: "types.ts",
                  path: "src/entities/user/model/types.ts",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "features",
      path: "src/features",
      type: "directory",
      children: [
        {
          name: "add-comment",
          path: "src/features/add-comment",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/features/add-comment/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/features/add-comment/api",
              type: "directory",
              children: [
                {
                  name: "add-comment.ts",
                  path: "src/features/add-comment/api/add-comment.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/add-comment/ui",
              type: "directory",
              children: [
                {
                  name: "AddCommentForm.tsx",
                  path: "src/features/add-comment/ui/AddCommentForm.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "auth",
          path: "src/features/auth",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/features/auth/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/features/auth/api",
              type: "directory",
              children: [
                {
                  name: "login.ts",
                  path: "src/features/auth/api/login.ts",
                  type: "file",
                },
                {
                  name: "register.ts",
                  path: "src/features/auth/api/register.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "model",
              path: "src/features/auth/model",
              type: "directory",
              children: [
                {
                  name: "types.ts",
                  path: "src/features/auth/model/types.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/auth/ui",
              type: "directory",
              children: [
                {
                  name: "LoginForm.tsx",
                  path: "src/features/auth/ui/LoginForm.tsx",
                  type: "file",
                },
                {
                  name: "RegisterForm.tsx",
                  path: "src/features/auth/ui/RegisterForm.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "create-post",
          path: "src/features/create-post",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/features/create-post/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/features/create-post/api",
              type: "directory",
              children: [
                {
                  name: "create-post.ts",
                  path: "src/features/create-post/api/create-post.ts",
                  type: "file",
                },
                {
                  name: "get-categories-by-id.ts",
                  path: "src/features/create-post/api/get-categories-by-id.ts",
                  type: "file",
                },
                {
                  name: "get-categories.ts",
                  path: "src/features/create-post/api/get-categories.ts",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "delete-comment",
          path: "src/features/delete-comment",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/features/delete-comment/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/features/delete-comment/api",
              type: "directory",
              children: [
                {
                  name: "delete-comment.ts",
                  path: "src/features/delete-comment/api/delete-comment.ts",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "delete-post",
          path: "src/features/delete-post",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/features/delete-post/index.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/features/delete-post/api",
              type: "directory",
              children: [
                {
                  name: "delete-post.ts",
                  path: "src/features/delete-post/api/delete-post.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/delete-post/ui",
              type: "directory",
              children: [
                {
                  name: "DeletePostButton.tsx",
                  path: "src/features/delete-post/ui/DeletePostButton.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "post-feed-controls",
          path: "src/features/post-feed-controls",
          type: "directory",
          children: [
            {
              name: "model",
              path: "src/features/post-feed-controls/model",
              type: "directory",
              children: [
                {
                  name: "use-post-feed-controls.ts",
                  path: "src/features/post-feed-controls/model/use-post-feed-controls.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/post-feed-controls/ui",
              type: "directory",
              children: [
                {
                  name: "FeedControlsBar.tsx",
                  path: "src/features/post-feed-controls/ui/FeedControlsBar.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "toggle-post-like",
          path: "src/features/toggle-post-like",
          type: "directory",
          children: [
            {
              name: "api",
              path: "src/features/toggle-post-like/api",
              type: "directory",
              children: [
                {
                  name: "togglePostLike.ts",
                  path: "src/features/toggle-post-like/api/togglePostLike.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/toggle-post-like/ui",
              type: "directory",
              children: [
                {
                  name: "PostLikeButton.tsx",
                  path: "src/features/toggle-post-like/ui/PostLikeButton.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "update-post",
          path: "src/features/update-post",
          type: "directory",
          children: [
            {
              name: "api",
              path: "src/features/update-post/api",
              type: "directory",
              children: [
                {
                  name: "updatePost.ts",
                  path: "src/features/update-post/api/updatePost.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/update-post/ui",
              type: "directory",
              children: [
                {
                  name: "EditPostButton.tsx",
                  path: "src/features/update-post/ui/EditPostButton.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "hooks",
      path: "src/hooks",
      type: "directory",
      children: [
        {
          name: "reduxHooks.ts",
          path: "src/hooks/reduxHooks.ts",
          type: "file",
        },
      ],
    },
    {
      name: "shared",
      path: "src/shared",
      type: "directory",
      children: [
        {
          name: "api",
          path: "src/shared/api",
          type: "directory",
          children: [
            {
              name: "axiosInstance.ts",
              path: "src/shared/api/axiosInstance.ts",
              type: "file",
            },
          ],
        },
        {
          name: "lib",
          path: "src/shared/lib",
          type: "directory",
          children: [
            {
              name: "cookies.ts",
              path: "src/shared/lib/cookies.ts",
              type: "file",
            },
            {
              name: "time-ago.ts",
              path: "src/shared/lib/time-ago.ts",
              type: "file",
            },
          ],
        },
        {
          name: "ui",
          path: "src/shared/ui",
          type: "directory",
          children: [],
        },
      ],
    },
    {
      name: "store",
      path: "src/store",
      type: "directory",
      children: [
        { name: "store.ts", path: "src/store/store.ts", type: "file" },
        { name: "storeRef.ts", path: "src/store/storeRef.ts", type: "file" },
        {
          name: "slices",
          path: "src/store/slices",
          type: "directory",
          children: [
            {
              name: "userSlice.ts",
              path: "src/store/slices/userSlice.ts",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "widgets",
      path: "src/widgets",
      type: "directory",
      children: [
        {
          name: "header",
          path: "src/widgets/header",
          type: "directory",
          children: [
            {
              name: "Header.tsx",
              path: "src/widgets/header/Header.tsx",
              type: "file",
            },
          ],
        },
        {
          name: "post-feed",
          path: "src/widgets/post-feed",
          type: "directory",
          children: [
            {
              name: "index.ts",
              path: "src/widgets/post-feed/index.ts",
              type: "file",
            },
            {
              name: "ui",
              path: "src/widgets/post-feed/ui",
              type: "directory",
              children: [
                {
                  name: "PostCardActions.tsx",
                  path: "src/widgets/post-feed/ui/PostCardActions.tsx",
                  type: "file",
                },
                {
                  name: "PostCommentsSection.tsx",
                  path: "src/widgets/post-feed/ui/PostCommentsSection.tsx",
                  type: "file",
                },
                {
                  name: "PostFeed.tsx",
                  path: "src/widgets/post-feed/ui/PostFeed.tsx",
                  type: "file",
                },
                {
                  name: "PostFeedItem.tsx",
                  path: "src/widgets/post-feed/ui/PostFeedItem.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const modularTree: TreeNode = {
  name: "src",
  path: "src",
  type: "directory",
  children: [
    { name: "proxy.ts", path: "src/proxy.ts", type: "file" },
    {
      name: "app",
      path: "src/app",
      type: "directory",
      children: [
        { name: "favicon.ico", path: "src/app/favicon.ico", type: "file" },
        { name: "globals.css", path: "src/app/globals.css", type: "file" },
        { name: "layout.tsx", path: "src/app/layout.tsx", type: "file" },
        { name: "providers.tsx", path: "src/app/providers.tsx", type: "file" },
        {
          name: "(auth)",
          path: "src/app/(auth)",
          type: "directory",
          children: [
            {
              name: "login",
              path: "src/app/(auth)/login",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/login/page.tsx",
                  type: "file",
                },
              ],
            },
            {
              name: "register",
              path: "src/app/(auth)/register",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/register/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "(main)",
          path: "src/app/(main)",
          type: "directory",
          children: [
            {
              name: "layout.tsx",
              path: "src/app/(main)/layout.tsx",
              type: "file",
            },
            { name: "page.tsx", path: "src/app/(main)/page.tsx", type: "file" },
            {
              name: "my-posts",
              path: "src/app/(main)/my-posts",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/my-posts/page.tsx",
                  type: "file",
                },
                {
                  name: "[id]",
                  path: "src/app/(main)/my-posts/[id]",
                  type: "directory",
                  children: [
                    {
                      name: "edit",
                      path: "src/app/(main)/my-posts/[id]/edit",
                      type: "directory",
                      children: [
                        {
                          name: "page.tsx",
                          path: "src/app/(main)/my-posts/[id]/edit/page.tsx",
                          type: "file",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "new-post",
              path: "src/app/(main)/new-post",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/new-post/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "hooks",
      path: "src/hooks",
      type: "directory",
      children: [
        {
          name: "reduxHooks.ts",
          path: "src/hooks/reduxHooks.ts",
          type: "file",
        },
      ],
    },
    {
      name: "modules",
      path: "src/modules",
      type: "directory",
      children: [
        {
          name: "auth",
          path: "src/modules/auth",
          type: "directory",
          children: [
            {
              name: "types.ts",
              path: "src/modules/auth/types.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/modules/auth/api",
              type: "directory",
              children: [
                {
                  name: "userActions.ts",
                  path: "src/modules/auth/api/userActions.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "components",
              path: "src/modules/auth/components",
              type: "directory",
              children: [
                {
                  name: "LoginForm.tsx",
                  path: "src/modules/auth/components/LoginForm.tsx",
                  type: "file",
                },
                {
                  name: "RegisterForm.tsx",
                  path: "src/modules/auth/components/RegisterForm.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "comment",
          path: "src/modules/comment",
          type: "directory",
          children: [
            {
              name: "types.ts",
              path: "src/modules/comment/types.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/modules/comment/api",
              type: "directory",
              children: [
                {
                  name: "commentActions.ts",
                  path: "src/modules/comment/api/commentActions.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "components",
              path: "src/modules/comment/components",
              type: "directory",
              children: [
                {
                  name: "AddCommentForm.tsx",
                  path: "src/modules/comment/components/AddCommentForm.tsx",
                  type: "file",
                },
                {
                  name: "CommentItem.tsx",
                  path: "src/modules/comment/components/CommentItem.tsx",
                  type: "file",
                },
                {
                  name: "CommentSection.tsx",
                  path: "src/modules/comment/components/CommentSection.tsx",
                  type: "file",
                },
                {
                  name: "CommentsList.tsx",
                  path: "src/modules/comment/components/CommentsList.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "post",
          path: "src/modules/post",
          type: "directory",
          children: [
            {
              name: "types.ts",
              path: "src/modules/post/types.ts",
              type: "file",
            },
            {
              name: "api",
              path: "src/modules/post/api",
              type: "directory",
              children: [
                {
                  name: "categoriesActions.ts",
                  path: "src/modules/post/api/categoriesActions.ts",
                  type: "file",
                },
                {
                  name: "postActions.ts",
                  path: "src/modules/post/api/postActions.ts",
                  type: "file",
                },
                {
                  name: "server",
                  path: "src/modules/post/api/server",
                  type: "directory",
                  children: [
                    {
                      name: "categoryServerApi.ts",
                      path: "src/modules/post/api/server/categoryServerApi.ts",
                      type: "file",
                    },
                    {
                      name: "postServerApi.ts",
                      path: "src/modules/post/api/server/postServerApi.ts",
                      type: "file",
                    },
                  ],
                },
              ],
            },
            {
              name: "components",
              path: "src/modules/post/components",
              type: "directory",
              children: [
                {
                  name: "CardsActionSection.tsx",
                  path: "src/modules/post/components/CardsActionSection.tsx",
                  type: "file",
                },
                {
                  name: "EditPostButton.tsx",
                  path: "src/modules/post/components/EditPostButton.tsx",
                  type: "file",
                },
                {
                  name: "FeedControlsBar.tsx",
                  path: "src/modules/post/components/FeedControlsBar.tsx",
                  type: "file",
                },
                {
                  name: "PostCard.tsx",
                  path: "src/modules/post/components/PostCard.tsx",
                  type: "file",
                },
                {
                  name: "PostForm.tsx",
                  path: "src/modules/post/components/PostForm.tsx",
                  type: "file",
                },
                {
                  name: "PostLikeButton.tsx",
                  path: "src/modules/post/components/PostLikeButton.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "shared",
      path: "src/shared",
      type: "directory",
      children: [
        {
          name: "api",
          path: "src/shared/api",
          type: "directory",
          children: [
            {
              name: "axiosInstance.ts",
              path: "src/shared/api/axiosInstance.ts",
              type: "file",
            },
          ],
        },
        {
          name: "lib",
          path: "src/shared/lib",
          type: "directory",
          children: [
            {
              name: "cookies.ts",
              path: "src/shared/lib/cookies.ts",
              type: "file",
            },
            {
              name: "postQueryBuilder.ts",
              path: "src/shared/lib/postQueryBuilder.ts",
              type: "file",
            },
          ],
        },
        {
          name: "ui",
          path: "src/shared/ui",
          type: "directory",
          children: [
            {
              name: "Header.tsx",
              path: "src/shared/ui/Header.tsx",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "store",
      path: "src/store",
      type: "directory",
      children: [
        { name: "store.ts", path: "src/store/store.ts", type: "file" },
        { name: "storeRef.ts", path: "src/store/storeRef.ts", type: "file" },
        {
          name: "slices",
          path: "src/store/slices",
          type: "directory",
          children: [
            {
              name: "userSlice.ts",
              path: "src/store/slices/userSlice.ts",
              type: "file",
            },
          ],
        },
      ],
    },
  ],
};

export const monolithTree: TreeNode = {
  name: "src",
  path: "src",
  type: "directory",
  children: [
    { name: "proxy.ts", path: "src/proxy.ts", type: "file" },
    {
      name: "api",
      path: "src/api",
      type: "directory",
      children: [
        {
          name: "axiosInstance.ts",
          path: "src/api/axiosInstance.ts",
          type: "file",
        },
        {
          name: "categoriesActions.ts",
          path: "src/api/categoriesActions.ts",
          type: "file",
        },
        {
          name: "commentActions.ts",
          path: "src/api/commentActions.ts",
          type: "file",
        },
        {
          name: "postActions.ts",
          path: "src/api/postActions.ts",
          type: "file",
        },
        {
          name: "userActions.ts",
          path: "src/api/userActions.ts",
          type: "file",
        },
        {
          name: "server",
          path: "src/api/server",
          type: "directory",
          children: [
            {
              name: "categoryServerApi.ts",
              path: "src/api/server/categoryServerApi.ts",
              type: "file",
            },
            {
              name: "postServerApi.ts",
              path: "src/api/server/postServerApi.ts",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "app",
      path: "src/app",
      type: "directory",
      children: [
        { name: "favicon.ico", path: "src/app/favicon.ico", type: "file" },
        { name: "globals.css", path: "src/app/globals.css", type: "file" },
        { name: "layout.tsx", path: "src/app/layout.tsx", type: "file" },
        {
          name: "page.module.css",
          path: "src/app/page.module.css",
          type: "file",
        },
        { name: "providers.tsx", path: "src/app/providers.tsx", type: "file" },
        {
          name: "(auth)",
          path: "src/app/(auth)",
          type: "directory",
          children: [
            {
              name: "login",
              path: "src/app/(auth)/login",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/login/page.tsx",
                  type: "file",
                },
              ],
            },
            {
              name: "register",
              path: "src/app/(auth)/register",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(auth)/register/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "(main)",
          path: "src/app/(main)",
          type: "directory",
          children: [
            {
              name: "layout.tsx",
              path: "src/app/(main)/layout.tsx",
              type: "file",
            },
            { name: "page.tsx", path: "src/app/(main)/page.tsx", type: "file" },
            {
              name: "my-posts",
              path: "src/app/(main)/my-posts",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/my-posts/page.tsx",
                  type: "file",
                },
                {
                  name: "[id]",
                  path: "src/app/(main)/my-posts/[id]",
                  type: "directory",
                  children: [
                    {
                      name: "edit",
                      path: "src/app/(main)/my-posts/[id]/edit",
                      type: "directory",
                      children: [
                        {
                          name: "page.tsx",
                          path: "src/app/(main)/my-posts/[id]/edit/page.tsx",
                          type: "file",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "new-post",
              path: "src/app/(main)/new-post",
              type: "directory",
              children: [
                {
                  name: "page.tsx",
                  path: "src/app/(main)/new-post/page.tsx",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "components",
      path: "src/components",
      type: "directory",
      children: [
        {
          name: "AddCommentForm.tsx",
          path: "src/components/AddCommentForm.tsx",
          type: "file",
        },
        {
          name: "CardsActionSection.tsx",
          path: "src/components/CardsActionSection.tsx",
          type: "file",
        },
        {
          name: "CommentItem.tsx",
          path: "src/components/CommentItem.tsx",
          type: "file",
        },
        {
          name: "CommentSection.tsx",
          path: "src/components/CommentSection.tsx",
          type: "file",
        },
        {
          name: "CommentsList.tsx",
          path: "src/components/CommentsList.tsx",
          type: "file",
        },
        {
          name: "EditPostButton.tsx",
          path: "src/components/EditPostButton.tsx",
          type: "file",
        },
        {
          name: "FeedControlsBar.tsx",
          path: "src/components/FeedControlsBar.tsx",
          type: "file",
        },
        { name: "Header.tsx", path: "src/components/Header.tsx", type: "file" },
        {
          name: "LoginForm.tsx",
          path: "src/components/LoginForm.tsx",
          type: "file",
        },
        {
          name: "PaginatedList.tsx",
          path: "src/components/PaginatedList.tsx",
          type: "file",
        },
        {
          name: "PostCard.tsx",
          path: "src/components/PostCard.tsx",
          type: "file",
        },
        {
          name: "PostForm.tsx",
          path: "src/components/PostForm.tsx",
          type: "file",
        },
        {
          name: "PostLikeButton.tsx",
          path: "src/components/PostLikeButton.tsx",
          type: "file",
        },
        {
          name: "RegisterForm.tsx",
          path: "src/components/RegisterForm.tsx",
          type: "file",
        },
      ],
    },
    {
      name: "hooks",
      path: "src/hooks",
      type: "directory",
      children: [
        {
          name: "reduxHooks.ts",
          path: "src/hooks/reduxHooks.ts",
          type: "file",
        },
      ],
    },
    {
      name: "store",
      path: "src/store",
      type: "directory",
      children: [
        { name: "store.ts", path: "src/store/store.ts", type: "file" },
        { name: "storeRef.ts", path: "src/store/storeRef.ts", type: "file" },
        {
          name: "slices",
          path: "src/store/slices",
          type: "directory",
          children: [
            {
              name: "userSlice.ts",
              path: "src/store/slices/userSlice.ts",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "types",
      path: "src/types",
      type: "directory",
      children: [
        { name: "apiTypes.ts", path: "src/types/apiTypes.ts", type: "file" },
        { name: "userTypes.ts", path: "src/types/userTypes.ts", type: "file" },
      ],
    },
    {
      name: "utils",
      path: "src/utils",
      type: "directory",
      children: [
        { name: "cookies.ts", path: "src/utils/cookies.ts", type: "file" },
        {
          name: "postQueryBuilder.ts",
          path: "src/utils/postQueryBuilder.ts",
          type: "file",
        },
      ],
    },
  ],
};

export const projectTrees = {
  monolith: monolithTree,
  modular: modularTree,
  fsd: fsdTree,
} as const;
