export default function NavIndicator({ navStyle, p }) {
  if (!navStyle) return null;

  const id = navStyle.patternId;
  if (id === "spotlight" || id === "drawer") return null;

  const accent = p.accent;
  const bg = p.surface;
  const border = `1px solid ${p.border}`;
  const dim = p.dim;

  switch (id) {
    case "rail":
      return (
        <div style={{ width: 30, background: bg, borderRight: border, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 8, flexShrink: 0 }}>
          {[accent, dim, dim, dim].map((c, i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: i === 0 ? `${accent}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: c, opacity: i === 0 ? 1 : 0.35 }} />
            </div>
          ))}
        </div>
      );

    case "shelf":
      return (
        <div style={{ width: 58, background: bg, borderRight: border, padding: "10px 5px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
          {["Home", "Feed", "Data", "Settings"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 5px", borderRadius: 5, background: i === 0 ? `${accent}15` : "transparent" }}>
              <div style={{ width: 5, height: 5, borderRadius: 2, background: i === 0 ? accent : dim, opacity: i === 0 ? 1 : 0.35 }} />
              <span style={{ fontSize: 6, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? accent : dim }}>{label}</span>
            </div>
          ))}
        </div>
      );

    case "ribbon":
      return (
        <div style={{ height: 22, background: bg, borderBottom: border, display: "flex", alignItems: "center", padding: "0 10px", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: 3, background: accent }} />
          {["Home", "Explore", "Create", "Profile"].map((label, i) => (
            <span key={label} style={{ fontSize: 7, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? accent : dim }}>{label}</span>
          ))}
        </div>
      );

    case "tabs":
      return (
        <div style={{ height: 22, background: bg, borderBottom: border, display: "flex", alignItems: "flex-end", padding: "0 8px", gap: 2, flexShrink: 0 }}>
          {["Overview", "Details", "Settings"].map((label, i) => (
            <div key={label} style={{ padding: "4px 8px", fontSize: 7, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? accent : dim, borderBottom: i === 0 ? `2px solid ${accent}` : "2px solid transparent", marginBottom: -1 }}>{label}</div>
          ))}
        </div>
      );

    case "capsules":
      return (
        <div style={{ height: 26, display: "flex", alignItems: "center", padding: "0 10px", gap: 4, flexShrink: 0 }}>
          {["All", "Popular", "New", "Saved"].map((label, i) => (
            <div key={label} style={{ padding: "3px 8px", borderRadius: 10, fontSize: 7, fontWeight: 600, background: i === 0 ? accent : `${dim}15`, color: i === 0 ? "#fff" : dim }}>{label}</div>
          ))}
        </div>
      );

    case "breadcrumb":
      return (
        <div style={{ height: 20, display: "flex", alignItems: "center", padding: "0 10px", gap: 3, flexShrink: 0 }}>
          {["Home", "Dashboard", "Analytics"].map((label, i, arr) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 7, fontWeight: i === arr.length - 1 ? 700 : 500, color: i === arr.length - 1 ? p.text : dim }}>{label}</span>
              {i < arr.length - 1 && <span style={{ fontSize: 7, color: dim }}>/</span>}
            </span>
          ))}
        </div>
      );

    default:
      return null;
  }
}
