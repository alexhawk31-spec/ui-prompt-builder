import Icon from "../../shared/Icon";

export default function ThumbFreestyle({ c, p }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: p.bg }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px dashed ${p.dim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="wind" size={10} color={p.dim} />
      </div>
    </div>
  );
}
