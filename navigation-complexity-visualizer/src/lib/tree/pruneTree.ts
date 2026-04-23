import { TreeNode } from "@/src/types/tree";

export function pruneTreeByVisiblePaths(
  node: TreeNode,
  allowedPaths: Set<string>,
): TreeNode | null {
  if (node.type === "file") {
    return allowedPaths.has(node.path) ? node : null;
  }

  const prunedChildren =
    node.children
      ?.map((child) => pruneTreeByVisiblePaths(child, allowedPaths))
      .filter((child): child is TreeNode => child !== null) ?? [];

  const shouldKeepDirectory =
    allowedPaths.has(node.path) || prunedChildren.length > 0;

  if (!shouldKeepDirectory) {
    return null;
  }

  return {
    ...node,
    children: prunedChildren,
  };
}
