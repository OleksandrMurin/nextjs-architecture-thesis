export type TreeNode = {
  path: string;
  name: string;
  type: "file" | "directory";
  children?: TreeNode[];
};

export type TreeIndex = {
  nodeByPath: Map<string, TreeNode>;
  parentByPath: Map<string, string | null>;
};

export type ComputedTreeState = {
  requiredPaths: Set<string>;
  accessTreePaths: Set<string>;
  visibleScopePaths: Set<string>;
};
