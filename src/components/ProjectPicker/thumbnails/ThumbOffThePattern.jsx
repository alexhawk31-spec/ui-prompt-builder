import Icon from "../../shared/Icon";

export default function ThumbOffThePattern({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: p.bg }}>
      <div style={{ width: "100%", flex: 1, borderRadius: 5, border: `1.5px dashed ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, border: `1px dashed ${p.dim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="wind" size={10} color={p.dim} />
        </div>
        <div style={{ width: "45%", height: 2, borderRadius: 1, background: p.borderLight }} />
      </div>
    </div>
  );
}
