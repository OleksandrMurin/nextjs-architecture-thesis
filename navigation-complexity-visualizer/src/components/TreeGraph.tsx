"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NavigationNodeCost } from "../lib/computeNavigationScore";
import { layoutTree } from "../lib/tree/layoutTree";
import { treeToFlow } from "../lib/tree/treeToFlow";
import { TreeNode } from "../types/tree";
import TreeGraphNode, { TreeGraphFlowNode } from "./TreeGraphNode";

const nodeTypes: NodeTypes = {
  treeNode: TreeGraphNode,
};

type LayoutDirection = "TB" | "LR";

type TreeGraphProps = {
  tree: TreeNode;
  requiredPaths: Set<string>;
  accessPaths: Set<string>;
  visiblePaths: Set<string>;
  direction?: LayoutDirection;
  costByPath: Map<string, NavigationNodeCost>;
  showNavigationCost: boolean;
};

export default function TreeGraph({
  tree,
  requiredPaths,
  accessPaths,
  visiblePaths,
  direction = "TB",
  costByPath,
  showNavigationCost,
}: TreeGraphProps) {
  const flowData = treeToFlow({
    tree,
    requiredPaths,
    accessPaths,
    visiblePaths,
    costByPath,
    showNavigationCost,
  });

  const { nodes, edges } = layoutTree(
    flowData.nodes,
    flowData.edges,
    direction,
  );

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <ReactFlow<TreeGraphFlowNode>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.05}
        maxZoom={2}
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.05,
          maxZoom: 1.2,
        }}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
