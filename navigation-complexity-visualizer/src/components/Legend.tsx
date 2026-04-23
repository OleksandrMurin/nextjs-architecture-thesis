export default function Legend() {
  const items = [
    { label: "Required file", color: "#86efac", border: "#16a34a" },
    { label: "Access path", color: "#bbf7d0", border: "#22c55e" },
    { label: "Visible scope", color: "#fde68a", border: "#eab308" },
    { label: "Inactive node", color: "#e5e7eb", border: "#9ca3af" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: 220,
        padding: 16,
        borderRadius: 16,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        Legend
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: item.color,
                border: `1.5px solid ${item.border}`,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
