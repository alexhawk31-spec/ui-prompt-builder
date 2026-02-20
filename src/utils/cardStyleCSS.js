import { resolveAccent } from "./accentUtils";

/**
 * Converts a cardStyle selection into concrete CSS properties
 * that can be applied to card elements in the preview.
 *
 * Returns null if no card style is selected.
 * Returns an object of CSS properties when a style is active.
 */
export function getCardStyleCSS(cardStyle, p) {
  if (!cardStyle) return null;

  const ft = cardStyle.fineTune || {};
  const accent = resolveAccent(p.accent, ft.accent);

  switch (cardStyle.styleId) {
    case "frosted": {
      const blur = { breath: 6, morning: 16, snowstorm: 28, glacier: 40 }[ft.frostDepth] || 16;
      const opacity = { breath: 0.04, morning: 0.06, snowstorm: 0.1, glacier: 0.16 }[ft.frostDepth] || 0.06;

      const tintMap = { clear: "255,255,255", cool: "200,220,255", warm: "255,230,200", iridescent: "230,220,255" };
      const tint = tintMap[ft.frostTint] || "255,255,255";

      const borderMap = {
        seamless: "1px solid transparent",
        etched: "1px solid rgba(255,255,255,0.12)",
        beveled: "1px solid rgba(255,255,255,0.18)",
        framed: "1px solid rgba(255,255,255,0.25)",
      };

      const lightMap = {
        ambient: "none",
        toplit: "inset 0 1px 0 rgba(255,255,255,0.08)",
        rimlit: "inset 0 1px 0 rgba(255,255,255,0.12), inset 1px 0 0 rgba(255,255,255,0.06)",
        prismatic: "inset 0 1px 0 rgba(255,255,255,0.1)",
      };

      return {
        background: `rgba(${tint},${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: borderMap[ft.frostEdge] || borderMap.etched,
        borderRadius: 12,
        boxShadow: lightMap[ft.frostLight] || "none",
      };
    }

    case "blueprint": {
      const borderColor = `${accent}35`;
      const gridBg = `${accent}06`;
      return {
        background: gridBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        boxShadow: "none",
        extra: {
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 7px, ${accent}08 7px, ${accent}08 8px), repeating-linear-gradient(90deg, transparent, transparent 7px, ${accent}08 7px, ${accent}08 8px)`,
        },
      };
    }

    case "float": {
      const altitude = { hovering: 4, floating: 12, soaring: 24, orbital: 40 }[ft.floatAltitude] || 12;
      const spread = Math.round(altitude * 1.5);
      const surfaceMap = { matte: 0, satin: 0.03, glossy: 0.06, mirror: 0.1 };
      const highlightOpacity = surfaceMap[ft.floatSurface] || 0;

      return {
        background: p.card,
        border: `1px solid ${p.border}`,
        borderRadius: 12,
        boxShadow: `0 ${altitude}px ${spread}px rgba(0,0,0,0.15), 0 ${Math.round(altitude / 3)}px ${Math.round(altitude / 2)}px rgba(0,0,0,0.1)`,
        extra: highlightOpacity > 0
          ? { backgroundImage: `linear-gradient(180deg, rgba(255,255,255,${highlightOpacity}) 0%, transparent 40%)` }
          : undefined,
      };
    }

    case "wireframe": {
      const strokeMap = { whisper: "0.5px", standard: "1px", bold: "2px", heavy: "3px" };
      const fillMap = { empty: "transparent", hint: "rgba(128,128,128,0.02)", hatched: `${accent}04`, dotgrid: `${accent}08` };
      const styleMap = { geometric: "solid", rounded: "solid", sketched: "solid", dashed: "dashed" };
      const radiusMap = { geometric: 0, rounded: 10, sketched: 2, dashed: 4 };

      return {
        background: fillMap[ft.wireFill] || "transparent",
        border: `${strokeMap[ft.wireStroke] || "1px"} ${styleMap[ft.wireStyle] || "solid"} ${p.muted}50`,
        borderRadius: radiusMap[ft.wireStyle] ?? 4,
        boxShadow: "none",
      };
    }

    case "neon": {
      const glowSize = { ember: 4, lit: 10, overdriven: 20, plasma: 35 }[ft.neonGlow] || 10;
      const atmOpacity = { clean: 0, hazy: 0.04, smoky: 0.08, electric: 0.15 }[ft.neonAtmosphere] || 0;

      return {
        background: atmOpacity > 0 ? `rgba(0,0,0,${0.3 + atmOpacity})` : p.card,
        border: `1px solid ${accent}`,
        borderRadius: 8,
        boxShadow: `0 0 ${glowSize}px ${accent}50, 0 0 ${Math.round(glowSize / 3)}px ${accent}80, inset 0 0 ${Math.round(glowSize / 2)}px ${accent}08`,
      };
    }

    case "soft-clay": {
      const depth = { shallow: 0.6, medium: 1, deep: 1.5, extreme: 2.2 }[ft.clayDepth] || 1;
      const d = Math.round(4 * depth);
      const bl = Math.round(8 * depth);

      return {
        background: p.surface,
        border: "none",
        borderRadius: 16,
        boxShadow: `${d}px ${d}px ${bl}px rgba(0,0,0,0.12), -${Math.round(d * 0.75)}px -${Math.round(d * 0.75)}px ${Math.round(bl * 0.75)}px rgba(255,255,255,0.04)`,
      };
    }

    case "raw": {
      const aggression = { restrained: 1, assertive: 2, brutal: 3, hostile: 4 }[ft.rawAggression] || 2;
      const offsetMap = { tight: "2px 2px 0", standard: "4px 4px 0", wide: "8px 8px 0", massive: "12px 12px 0" };

      return {
        background: p.card,
        border: `${aggression}px solid ${p.text}`,
        borderRadius: 0,
        boxShadow: `${offsetMap[ft.rawOffset] || "4px 4px 0"} ${accent}`,
      };
    }

    case "watercolor": {
      const sat = { tint: 0.08, wash: 0.15, saturated: 0.25, vivid: 0.4 }[ft.waterSaturation] || 0.15;
      const spreadMap = { contained: "40%", bleed: "60%", flow: "80%", splash: "100%" };
      const spread = spreadMap[ft.waterSpread] || "60%";

      return {
        background: `linear-gradient(135deg, ${accent}${Math.round(sat * 255).toString(16).padStart(2, "0")} 0%, ${accent}08 ${spread}, ${p.card} 100%)`,
        border: `1px solid ${accent}15`,
        borderRadius: 12,
        boxShadow: "none",
        extra: {
          borderTop: `3px solid ${accent}40`,
        },
      };
    }

    default:
      return null;
  }
}
