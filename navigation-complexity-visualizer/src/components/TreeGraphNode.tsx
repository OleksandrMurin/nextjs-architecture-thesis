import { Icon } from "@iconify/react";
import Chip from "@mui/material/Chip";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type TreeGraphNodeData = {
  label: string;
  path: string;
  kind: "file" | "directory";
  isRequired: boolean;
  isAccess: boolean;
  isVisible: boolean;
  navigationCost: {
    baseCost: number;
    extraCost: number;
    totalCost: number;
  };
  showNavigationCost: boolean;
};

export type TreeGraphFlowNode = Node<TreeGraphNodeData, "treeNode">;

function getNodeIcon(label: string, kind: "file" | "directory") {
  if (kind === "directory") {
    switch (label) {
      case "app":
        return "vscode-icons:folder-type-app";
      case "components":
        return "vscode-icons:folder-type-component";
      case "lib":
        return "vscode-icons:folder-type-library";
      case "data":
        return "vscode-icons:folder-type-db";
      case "types":
        return "vscode-icons:folder-type-typescript";
      case "public":
        return "vscode-icons:folder-type-public";
      case "src":
        return "vscode-icons:default-root-folder";
      default:
        return "vscode-icons:default-folder";
    }
  }

  if (label.endsWith(".tsx")) {
    return "vscode-icons:file-type-reactts";
  }

  if (label.endsWith(".ts")) {
    return "vscode-icons:file-type-typescript";
  }

  return "vscode-icons:default-file";
}

export default function TreeGraphNode({ data }: NodeProps<TreeGraphFlowNode>) {
  const backgroundColor = data.isRequired
    ? "#86efac"
    : data.isAccess
      ? "#bbf7d0"
      : data.isVisible
        ? "#fde68a"
        : "#e5e7eb";

  const borderColor = data.isRequired
    ? "#16a34a"
    : data.isAccess
      ? "#22c55e"
      : data.isVisible
        ? "#eab308"
        : "#9ca3af";

  const icon = getNodeIcon(data.label, data.kind);

  return (
    <div
      title={data.path}
      style={{
        width: 260,
        minHeight: 100,
        padding: "14px 14px 12px",
        borderRadius: 16,
        border: `2px solid ${borderColor}`,
        background: backgroundColor,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          minHeight: 48,
        }}
      >
        <Icon icon={icon} width={32} height={32} />
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.2,
            wordBreak: "break-word",
            flex: 1,
          }}
        >
          {data.label}
        </div>
      </div>

      {data.showNavigationCost && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <div>
            {data.navigationCost.baseCost > 0 && (
              <Chip
                label={`base: ${data.navigationCost.baseCost.toFixed(1)}`}
                size="small"
                sx={{
                  backgroundColor: "#ffffff",
                  fontWeight: 600,
                  height: 24,
                }}
              />
            )}
          </div>

          <div>
            {data.navigationCost.extraCost > 0 && (
              <Chip
                label={`+ ${data.navigationCost.extraCost.toFixed(1)}`}
                size="small"
                sx={{
                  backgroundColor: "#fed7aa",
                  fontWeight: 600,
                  height: 24,
                }}
              />
            )}
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
