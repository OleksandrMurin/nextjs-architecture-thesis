import { FeatureKey } from "../data/scenarios";

type ControlPanelProps = {
  architecture: string;
  feature: string;
  direction: "TB" | "LR";
  visibilityMode: "full" | "active-only" | "access-only";
  showNavigationCost: boolean;
  onArchitectureChange?: (value: string) => void;
  onFeatureChange?: (value: string) => void;
  onDirectionChange?: (value: "TB" | "LR") => void;
  onVisibilityModeChange?: (
    value: "full" | "active-only" | "access-only",
  ) => void;
  onShowNavigationCostChange?: (value: boolean) => void;
};

export default function ControlPanel({
  architecture,
  feature,
  direction,
  visibilityMode,
  showNavigationCost,
  onArchitectureChange,
  onFeatureChange,
  onDirectionChange,
  onVisibilityModeChange,
  onShowNavigationCostChange,
}: ControlPanelProps) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto 20px",
        padding: 18,
        borderRadius: 18,
        background: "#eef2ff",
        border: "1px solid #c7d2fe",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        Visualization Controls
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Architecture</span>
          <select
            value={architecture}
            onChange={(e) => onArchitectureChange?.(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: 14,
            }}
          >
            <option value="monolith">Monolith</option>
            <option value="modular">Modular</option>
            <option value="fsd">FSD</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Feature</span>
          <select
            value={feature}
            onChange={(e) => onFeatureChange?.(e.target.value as FeatureKey)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: 14,
            }}
          >
            <option value="post-feed">Post Feed</option>
            <option value="user-post-feed">User post feed</option>
            <option value="registration">Registration</option>
            <option value="authorization">Authorization</option>
            <option value="create-post">Create post</option>
            <option value="update-post">Update post</option>
            <option value="delete-post">Delete post</option>
            <option value="add-comment">Add comment</option>
            <option value="toggle-like">Toggle like</option>
            <option value="search-filter-sort">Search filter sort</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Orientation</span>
          <select
            value={direction}
            onChange={(e) => onDirectionChange?.(e.target.value as "TB" | "LR")}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: 14,
            }}
          >
            <option value="TB">Top → Bottom</option>
            <option value="LR">Left → Right</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Tree mode</span>
          <select
            value={visibilityMode}
            onChange={(e) =>
              onVisibilityModeChange?.(
                e.target.value as "full" | "active-only" | "access-only",
              )
            }
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: 14,
            }}
          >
            <option value="full">Full tree</option>
            <option value="active-only">Active only</option>
            <option value="access-only">Access path only</option>
          </select>
        </label>
      </div>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <input
            type="checkbox"
            checked={showNavigationCost}
            onChange={(e) => onShowNavigationCostChange?.(e.target.checked)}
          />
          Show navigation cost on nodes
        </label>
      </div>
    </div>
  );
}
