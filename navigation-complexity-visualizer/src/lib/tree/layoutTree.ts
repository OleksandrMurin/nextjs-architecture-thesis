import { TreeGraphFlowNode } from "@/src/components/TreeGraphNode";
import type { Edge } from "@xyflow/react";
import dagre from "dagre";

const NODE_WIDTH = 260;
const NODE_HEIGHT = 120;

type LayoutDirection = "TB" | "LR";

export function layoutTree(
  nodes: TreeGraphFlowNode[],
  edges: Edge[],
  direction: LayoutDirection = "TB",
): { nodes: TreeGraphFlowNode[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 70,
    ranksep: 110,
    marginx: 30,
    marginy: 30,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const positionedNode = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: positionedNode.x - NODE_WIDTH / 2,
        y: positionedNode.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
