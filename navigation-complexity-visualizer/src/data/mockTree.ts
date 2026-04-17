import { TreeNode } from "../types/tree";

export const mockTree: TreeNode = {
  name: "src",
  path: "src",
  type: "directory",
  children: [
    {
      name: "app",
      path: "src/app",
      type: "directory",
      children: [
        {
          name: "page.tsx",
          path: "src/app/page.tsx",
          type: "file",
        },
        {
          name: "layout.tsx",
          path: "src/app/layout.tsx",
          type: "file",
        },
      ],
    },
    {
      name: "entities",
      path: "src/entities",
      type: "directory",
      children: [
        {
          name: "post",
          path: "src/entities/post",
          type: "directory",
          children: [
            {
              name: "model.ts",
              path: "src/entities/post/model.ts",
              type: "file",
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
          name: "create-post",
          path: "src/features/create-post",
          type: "directory",
          children: [
            {
              name: "api",
              path: "src/features/create-post/api",
              type: "directory",
              children: [
                {
                  name: "createPost.ts",
                  path: "src/features/create-post/api/createPost.ts",
                  type: "file",
                },
              ],
            },
            {
              name: "ui",
              path: "src/features/create-post/ui",
              type: "directory",
              children: [
                {
                  name: "CreatePostForm.tsx",
                  path: "src/features/create-post/ui/CreatePostForm.tsx",
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
      name: "widgets",
      path: "src/widgets",
      type: "directory",
      children: [
        {
          name: "post-feed",
          path: "src/widgets/post-feed",
          type: "directory",
          children: [
            {
              name: "ui",
              path: "src/widgets/post-feed/ui",
              type: "directory",
              children: [
                {
                  name: "PostFeed.tsx",
                  path: "src/widgets/post-feed/ui/PostFeed.tsx",
                  type: "file",
                },
                {
                  name: "FeedControlsBar.tsx",
                  path: "src/widgets/post-feed/ui/FeedControlsBar.tsx",
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
          ],
        },
      ],
    },
  ],
};
