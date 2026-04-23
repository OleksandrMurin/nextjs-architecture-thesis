import { Icon } from "@iconify/react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type TreeGraphNodeData = {
  label: string;
  path: string;
  kind: "file" | "directory";
  isRequired: boolean;
  isAccess: boolean;
  isVisible: boolean;
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
      style={{
        width: 260,
        minHeight: 110,
        padding: "14px 14px 12px",
        borderRadius: 16,
        border: `2px solid ${borderColor}`,
        background: backgroundColor,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon icon={icon} width={32} height={32} />
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.15,
            wordBreak: "break-word",
            flex: 1,
            display: "flex",
            alignItems: "center",
            minHeight: 32,
          }}
        >
          {data.label}
        </div>
      </div>

      <div
        style={{
          fontSize: 11,
          opacity: 0.72,
          lineHeight: 1.35,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          wordBreak: "break-all",
        }}
        title={data.path}
      >
        {data.path}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
