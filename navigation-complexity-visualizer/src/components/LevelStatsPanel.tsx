import { LevelStat } from "../lib/computeLevelStats";

type LevelStatsPanelProps = {
  stats: LevelStat[];
};

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export default function LevelStatsPanel({ stats }: LevelStatsPanelProps) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 20,
        padding: 18,
        borderRadius: 18,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 14,
        }}
      >
        Level analysis
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.level}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              fontSize: 14,
              lineHeight: 1.45,
            }}
          >
            <strong>Level {stat.level}</strong>
            {" — "}
            Coverage: <strong>{formatPercent(stat.coverage)}</strong> (
            {stat.reviewed}/{stat.total}){", "}
            Precision: <strong>{formatPercent(stat.precision)}</strong> (
            {stat.access}/{stat.reviewed})
          </div>
        ))}
      </div>
    </div>
  );
}
