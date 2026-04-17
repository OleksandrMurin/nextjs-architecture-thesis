import { mockTree } from "../data/mockTree";
import { buildTreeIndex } from "../lib/tree/buildTreeIndex";
import { computeAccessPaths } from "../lib/tree/computeAccessPaths";
import { computeVisibleNodes } from "../lib/tree/computeVisibleNodes";

export default function Home() {
  const requiredPaths = new Set<string>([
    "src/features/create-post/ui/CreatePostForm.tsx",
    "src/features/create-post/api/createPost.ts",
    "src/shared/api/axiosInstance.ts",
  ]);

  const treeIndex = buildTreeIndex(mockTree);
  const accessPaths = computeAccessPaths(requiredPaths, treeIndex);
  const visiblePaths = computeVisibleNodes(accessPaths, treeIndex);

  console.log("===== REQUIRED PATHS =====");
  console.log([...requiredPaths].sort());

  console.log("===== ACCESS PATHS (GREEN) =====");
  console.log([...accessPaths].sort());

  console.log("===== VISIBLE PATHS (YELLOW) =====");
  console.log([...visiblePaths].sort());

  console.log("===== SINGLE CHECKS =====");
  console.log(
    "Parent of CreatePostForm.tsx:",
    treeIndex.parentByPath.get(
      "src/features/create-post/ui/CreatePostForm.tsx",
    ),
  );
  console.log(
    "Parent of createPost.ts:",
    treeIndex.parentByPath.get("src/features/create-post/api/createPost.ts"),
  );
  console.log(
    "Parent of axiosInstance.ts:",
    treeIndex.parentByPath.get("src/shared/api/axiosInstance.ts"),
  );
  console.log("Parent of src:", treeIndex.parentByPath.get("src"));

  return <div>Test page</div>;
}
