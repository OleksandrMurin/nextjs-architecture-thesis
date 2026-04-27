import { TreeGraphFlowNode } from "@/src/components/TreeGraphNode";
import { TreeNode } from "@/src/types/tree";
import type { Edge } from "@xyflow/react";
import { NavigationNodeCost } from "../computeNavigationScore";

type TreeToFlowParams = {
  tree: TreeNode;
  requiredPaths: Set<string>;
  accessPaths: Set<string>;
  visiblePaths: Set<string>;
  costByPath: Map<string, NavigationNodeCost>;
  showNavigationCost: boolean;
};

export function treeToFlow({
  tree,
  requiredPaths,
  accessPaths,
  visiblePaths,
  costByPath,
  showNavigationCost,
}: TreeToFlowParams): {
  nodes: TreeGraphFlowNode[];
  edges: Edge[];
} {
  const nodes: TreeGraphFlowNode[] = [];
  const edges: Edge[] = [];

  function walk(node: TreeNode, parentPath: string | null): void {
    const nodeCost = costByPath.get(node.path) ?? {
      baseCost: 0,
      extraCost: 0,
      totalCost: 0,
    };
    nodes.push({
      id: node.path,
      type: "treeNode",
      position: { x: 0, y: 0 },
      data: {
        label: node.name,
        path: node.path,
        kind: node.type,
        isRequired: requiredPaths.has(node.path),
        isAccess: accessPaths.has(node.path),
        isVisible: visiblePaths.has(node.path),
        navigationCost: nodeCost,
        showNavigationCost,
      },
    });

    if (parentPath) {
      const isAccessEdge =
        accessPaths.has(parentPath) && accessPaths.has(node.path);
      edges.push({
        id: `${parentPath}->${node.path}`,
        source: parentPath,
        target: node.path,
        type: "smoothstep",
        style: {
          stroke: isAccessEdge ? "#22c55e" : "#94a3b8",
          strokeWidth: isAccessEdge ? 3 : 1.5,
        },
      });
    }

    node.children?.forEach((child) => walk(child, node.path));
  }

  walk(tree, null);

  return { nodes, edges };
}
