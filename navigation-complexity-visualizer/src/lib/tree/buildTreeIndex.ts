import { TreeIndex, TreeNode } from "@/src/types/tree";

export function buildTreeIndex(tree: TreeNode) {
  const treeIndex: TreeIndex = {
    nodeByPath: new Map(),
    parentByPath: new Map(),
  };
  function fillTreeIndex(node: TreeNode, parentPath: string | null) {
    treeIndex.nodeByPath.set(node.path, node);
    treeIndex.parentByPath.set(node.path, parentPath);
    node.children?.forEach((x) => fillTreeIndex(x, node.path));
  }
  fillTreeIndex(tree, null);
  return treeIndex;
}
