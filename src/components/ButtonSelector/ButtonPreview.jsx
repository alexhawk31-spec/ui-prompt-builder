export default function ButtonPreview({ style, fineTune, accent, p }) {
  /* ── Size map ── */
  const sizeMap = {
    small:  { padding: "5px 12px", fontSize: 10 },
    medium: { padding: "7px 16px", fontSize: 11 },
    large:  { padding: "9px 22px", fontSize: 13 },
  };
  const sz = sizeMap[fineTune.size] || sizeMap.medium;

  /* ── Corners ── */
  const cornerMap = { sharp: 0, slight: 3, rounded: 6, soft: 10, pill: 9999 };
  const br =
    style.id === "slab"    ? 0 :
    style.id === "capsule" ? 9999 :
    (cornerMap[fineTune.corners] ?? 6);

  /* ── Label weight ── */
  const weightMap = { regular: 400, semibold: 600, bold: 700, heavy: 800 };
  const fw = weightMap[fineTune.labelWeight] || 600;

  /* ── Shadow ── */
  const shadowMap = {
    none:       "none",
    subtle:     "0 1px 3px rgba(0,0,0,0.15)",
    accentGlow: `0 2px 10px ${accent}40`,
    hardOffset: "2px 2px 0 rgba(0,0,0,0.6)",
  };
  const shadow = shadowMap[fineTune.shadow] || "none";

  /* ── Icon helper ── */
  const iconPos = fineTune.icon; // none | left | right | iconOnly
  const arrow = "\u2192";

  function renderLabel(text) {
    if (iconPos === "iconOnly") return arrow;
    if (iconPos === "left")  return <>{arrow} {text}</>;
    if (iconPos === "right") return <>{text} {arrow}</>;
    return text;
  }

  /* ── Hue-shift helper for ombre ── */
  function lightenAccent(hex) {
    // Blend hex toward white by ~35% for the gradient second stop
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const mix = (c) => Math.min(255, Math.round(c + (255 - c) * 0.35));
    return `#${mix(r).toString(16).padStart(2, "0")}${mix(g).toString(16).padStart(2, "0")}${mix(b).toString(16).padStart(2, "0")}`;
  }

  /* ── Shared base for every button ── */
  function base(extra = {}) {
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      border: "none",
      cursor: "default",
      fontFamily: "'DM Sans', sans-serif",
      lineHeight: 1,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...sz,
      borderRadius: br,
      fontWeight: fw,
      boxShadow: shadow,
      ...extra,
    };
  }

  /* ── Style-specific tiers ── */
  function tierStyles(tier) {
    const id = style.id;
    const isSlab = id === "slab";
    const slabExtra = isSlab
      ? { textTransform: "uppercase", letterSpacing: "0.05em" }
      : {};

    /* --- STAMP --- */
    if (id === "stamp") {
      if (tier === "primary")   return base({ background: accent, color: "#0d1018", ...slabExtra });
      if (tier === "secondary") return base({ background: "transparent", border: `1px solid ${accent}`, color: accent, boxShadow: "none", ...slabExtra });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none", ...slabExtra });
    }

    /* --- TRACED --- */
    if (id === "traced") {
      if (tier === "primary")   return base({ background: "transparent", border: `1.5px solid ${accent}`, color: accent });
      if (tier === "secondary") return base({ background: "transparent", border: `1px solid ${accent}66`, color: "rgba(255,255,255,0.45)", boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    /* --- WASH --- */
    if (id === "wash") {
      if (tier === "primary")   return base({ background: `${accent}1F`, color: accent }); // 12%
      if (tier === "secondary") return base({ background: `${accent}0F`, color: "rgba(255,255,255,0.45)", boxShadow: "none" }); // 6%
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    /* --- OMBRE --- */
    if (id === "ombre") {
      const grad = `linear-gradient(135deg, ${accent}, ${lightenAccent(accent)})`;
      if (tier === "primary")   return base({ background: grad, color: "#ffffff" });
      if (tier === "secondary") return base({ background: `${accent}1A`, color: accent, boxShadow: "none" }); // 10%
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    /* --- NEON --- */
    if (id === "neon") {
      if (tier === "primary")   return base({ background: "transparent", border: `1px solid ${accent}`, color: accent, boxShadow: `0 0 12px ${accent}4D` });
      if (tier === "secondary") return base({ background: "transparent", border: `1px solid ${accent}4D`, color: "rgba(255,255,255,0.4)", boxShadow: `0 0 6px ${accent}26` });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    /* --- SLAB --- */
    if (id === "slab") {
      if (tier === "primary")   return base({ background: accent, color: "#0d1018", border: "2px solid rgba(0,0,0,0.6)", boxShadow: "3px 3px 0 rgba(0,0,0,0.6)", borderRadius: 0, ...slabExtra });
      if (tier === "secondary") return base({ background: "transparent", border: `2px solid ${accent}`, color: accent, boxShadow: "2px 2px 0 rgba(0,0,0,0.4)", borderRadius: 0, ...slabExtra });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none", borderRadius: 0, fontWeight: 800, ...slabExtra });
    }

    /* --- CAPSULE --- */
    if (id === "capsule") {
      if (tier === "primary")   return base({ background: accent, color: "#0d1018", borderRadius: 9999 });
      if (tier === "secondary") return base({ background: `${accent}1A`, color: accent, borderRadius: 9999, boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: accent, borderRadius: 9999, boxShadow: "none" });
    }

    /* --- FROST --- */
    if (id === "frost") {
      if (tier === "primary")   return base({ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff", backdropFilter: "blur(12px)" });
      if (tier === "secondary") return base({ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    /* --- INK --- */
    if (id === "ink") {
      if (tier === "primary")   return base({ background: "transparent", border: "none", color: accent, padding: "4px 0", textDecoration: "underline", textUnderlineOffset: 3, textDecorationThickness: 1.5, boxShadow: "none" });
      if (tier === "secondary") return base({ background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", padding: "4px 0", textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "rgba(255,255,255,0.25)", boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", padding: "4px 0", boxShadow: "none" });
    }

    /* --- BRICK --- */
    if (id === "brick") {
      const depth = fineTune.depth === "deep" ? 5 : 3;
      if (tier === "primary")   return base({ background: accent, color: "#0d1018", borderBottom: `${depth}px solid ${accent}`, filter: "brightness(1)", position: "relative", boxShadow: "none" });
      if (tier === "secondary") return base({ background: `${accent}1A`, color: accent, borderBottom: `${depth}px solid ${accent}55`, boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: accent, borderBottom: `${depth - 1}px solid ${accent}44`, boxShadow: "none" });
    }

    /* --- DUO --- (split buttons handled in render) */
    if (id === "duo") {
      // Returns label zone style only; icon zone rendered separately
      if (tier === "primary")   return base({ background: accent, color: "#0d1018" });
      if (tier === "secondary") return base({ background: "transparent", border: `1px solid ${accent}55`, color: accent, boxShadow: "none" });
      return base({ background: "transparent", border: "none", color: accent, boxShadow: "none" });
    }

    // fallback (should not reach)
    return base({ background: accent, color: "#0d1018" });
  }

  /* ── Row label style ── */
  const rowLabel = {
    width: 60,
    fontSize: 8,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  };

  const btnGroup = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  };

  /* ═══════════════ TOGGLE STYLE ═══════════════ */
  if (style.id === "toggle") {
    const segCount = fineTune.segmentCount === "three" ? 3 : 2;
    const fill = fineTune.activeFill || "solid";

    const containerStyle = {
      display: "inline-flex",
      borderRadius: br,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    };

    function segStyle(active) {
      const s = {
        ...sz,
        fontWeight: fw,
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1,
        cursor: "default",
        border: "none",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      };
      if (active) {
        if (fill === "solid")   return { ...s, background: accent, color: "#0d1018" };
        if (fill === "tinted")  return { ...s, background: `${accent}26`, color: accent }; // 15%
        if (fill === "outline") return { ...s, background: "transparent", border: `1px solid ${accent}`, color: accent };
        return { ...s, background: accent, color: "#0d1018" };
      }
      return { ...s, background: "transparent", color: "rgba(255,255,255,0.35)" };
    }

    const twoLabels   = ["Monthly", "Yearly"];
    const threeLabels = ["Day", "Week", "Month"];

    return (
      <div style={{ background: "#0d1018", padding: 16, borderRadius: 10 }}>
        {/* 2-segment toggle */}
        <div style={rowStyle}>
          <div style={rowLabel}>Toggle (2)</div>
          <div style={containerStyle}>
            {twoLabels.map((lbl, i) => (
              <div key={lbl} style={segStyle(i === 0)}>{lbl}</div>
            ))}
          </div>
        </div>

        {/* 3-segment toggle */}
        <div style={{ ...rowStyle, marginBottom: 0 }}>
          <div style={rowLabel}>Toggle (3)</div>
          <div style={containerStyle}>
            {threeLabels.map((lbl, i) => (
              <div key={lbl} style={segStyle(i === 1)}>{lbl}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ DUO STYLE ═══════════════ */
  if (style.id === "duo") {
    const arrow = "\u2192";
    function duoBtn(tier, text) {
      const labelStyle = tierStyles(tier);
      const isPrimary = tier === "primary";
      const isSecondary = tier === "secondary";
      return (
        <div style={{ display: "inline-flex", borderRadius: br, overflow: "hidden", border: isSecondary ? `1px solid ${accent}55` : "none" }}>
          <div style={{
            padding: `${sz.padding.split(" ")[0]} 8px`,
            fontSize: sz.fontSize,
            fontWeight: fw,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1,
            background: isPrimary ? accent : isSecondary ? `${accent}20` : "transparent",
            color: isPrimary ? "#0d1018" : accent,
            filter: isPrimary ? "brightness(0.75)" : "none",
            display: "flex",
            alignItems: "center",
            borderRight: tier === "tertiary" ? "none" : `1px solid ${isPrimary ? "rgba(0,0,0,0.15)" : `${accent}33`}`,
          }}>{arrow}</div>
          <div style={{
            ...labelStyle,
            borderRadius: 0,
            border: "none",
          }}>{text}</div>
        </div>
      );
    }

    return (
      <div style={{ background: "#0d1018", padding: 16, borderRadius: 10 }}>
        <div style={rowStyle}>
          <div style={rowLabel}>Primary</div>
          <div style={btnGroup}>
            {duoBtn("primary", "Get Started")}
            {duoBtn("primary", "Save")}
          </div>
        </div>
        <div style={rowStyle}>
          <div style={rowLabel}>Secondary</div>
          <div style={btnGroup}>
            {duoBtn("secondary", "Learn More")}
            {duoBtn("secondary", "Cancel")}
          </div>
        </div>
        <div style={rowStyle}>
          <div style={rowLabel}>Tertiary</div>
          <div style={btnGroup}>
            <div style={tierStyles("tertiary")}>
              <span style={{ opacity: 0.5 }}>{arrow}</span> Skip
            </div>
          </div>
        </div>
        <div style={{ ...rowStyle, marginBottom: 0 }}>
          <div style={rowLabel}>Together</div>
          <div style={btnGroup}>
            {duoBtn("primary", "Get Started")}
            {duoBtn("secondary", "Learn More")}
            <div style={tierStyles("tertiary")}>Skip</div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ STANDARD BUTTON STYLES ═══════════════ */
  return (
    <div style={{ background: "#0d1018", padding: 16, borderRadius: 10 }}>
      {/* Primary row */}
      <div style={rowStyle}>
        <div style={rowLabel}>Primary</div>
        <div style={btnGroup}>
          <div style={tierStyles("primary")}>{renderLabel("Get Started")}</div>
          <div style={tierStyles("primary")}>{renderLabel("Save Changes")}</div>
        </div>
      </div>

      {/* Secondary row */}
      <div style={rowStyle}>
        <div style={rowLabel}>Secondary</div>
        <div style={btnGroup}>
          <div style={tierStyles("secondary")}>{renderLabel("Learn More")}</div>
          <div style={tierStyles("secondary")}>{renderLabel("Cancel")}</div>
        </div>
      </div>

      {/* Tertiary row */}
      <div style={rowStyle}>
        <div style={rowLabel}>Tertiary</div>
        <div style={btnGroup}>
          <div style={tierStyles("tertiary")}>{renderLabel("Skip")}</div>
          <div style={tierStyles("tertiary")}>{renderLabel("Dismiss")}</div>
        </div>
      </div>

      {/* Together row */}
      <div style={{ ...rowStyle, marginBottom: 0 }}>
        <div style={rowLabel}>Together</div>
        <div style={btnGroup}>
          <div style={tierStyles("primary")}>{renderLabel("Get Started")}</div>
          <div style={tierStyles("secondary")}>{renderLabel("Learn More")}</div>
          <div style={tierStyles("tertiary")}>{renderLabel("Skip")}</div>
        </div>
      </div>
    </div>
  );
}
