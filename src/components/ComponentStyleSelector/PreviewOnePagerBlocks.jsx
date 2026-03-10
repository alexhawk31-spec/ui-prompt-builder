import usePromptStore from "../../store/usePromptStore";

// ── Block renderers ──

function KeyMetricsRowBlock({ p, m }) {
  const metrics = [
    { val: "$4.2M", lbl: "Revenue" },
    { val: "+24%", lbl: "Growth" },
    { val: "96%", lbl: "Retention" },
  ];
  const colors = [p.accent, "#a78bfa", "#22c55e"];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: m.gap * 0.5 }}>Key Metrics</div>
      <div style={{ display: "flex", gap: m.gap }}>
        {metrics.map((s, i) => (
          <div key={s.lbl} style={{ flex: 1, borderRadius: 8, background: p.card, border: `1px solid ${p.border}`, padding: m.pad, textAlign: "center" }}>
            <div style={{ fontSize: m.fs(16), fontWeight: 900, color: colors[i] }}>{s.val}</div>
            <div style={{ fontSize: m.fs(7), color: p.muted, marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PullQuoteBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ borderLeft: `3px solid ${p.accent}`, paddingLeft: m.pad * 1.2, padding: `${m.pad}px ${m.pad * 1.2}px` }}>
        <div style={{ fontSize: m.fs(22), fontWeight: 900, color: `${p.accent}20`, lineHeight: 0.8, fontFamily: "Georgia, serif", marginBottom: 4 }}>&ldquo;</div>
        <div style={{ fontSize: m.fs(12), fontStyle: "italic", fontWeight: 600, color: p.text, lineHeight: 1.6 }}>
          The only way to do great work is to love what you do.
        </div>
        <div style={{ fontSize: m.fs(7), color: p.accent, fontWeight: 600, marginTop: m.gap, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: ".06em" }}>— Steve Jobs</div>
      </div>
    </div>
  );
}

function CalloutBlockBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ borderRadius: 10, background: `${p.accent}0a`, border: `1px solid ${p.accent}25`, padding: m.pad * 1.2, display: "flex", gap: m.gap }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: p.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ fontSize: m.fs(11), color: "#fff", fontWeight: 800 }}>!</div>
        </div>
        <div>
          <div style={{ fontSize: m.fs(9), fontWeight: 700, color: p.accent, marginBottom: 3 }}>Important Note</div>
          <div style={{ fontSize: m.fs(8), color: p.muted, lineHeight: 1.6 }}>This callout draws attention to key information that readers should not miss.</div>
        </div>
      </div>
    </div>
  );
}

function TwoColumnTextBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Market Overview</div>
      <div style={{ display: "flex", gap: m.pad }}>
        {[0, 1].map((col) => (
          <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {[92, 78, 85, 60, 80, 70, 88].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}20` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureListBlock({ p, m }) {
  const features = ["Authentication", "Real-time Sync", "File Storage", "API Access", "Webhooks", "Analytics"];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Features</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: m.gap }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: m.gap }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
            <div style={{ fontSize: m.fs(8), color: p.text }}>{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineBlock({ p, m }) {
  const steps = [
    { date: "Jan 2025", label: "Project kickoff and team assembly" },
    { date: "Mar 2025", label: "Beta launch to early adopters" },
    { date: "Jun 2025", label: "General availability release" },
    { date: "Sep 2025", label: "Enterprise scale phase", future: true },
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Roadmap</div>
      <div style={{ position: "relative", paddingLeft: m.pad * 1.5 }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: 5, top: 4, bottom: 4, width: 1, background: p.border }} />
        {steps.map((s) => (
          <div key={s.date} style={{ display: "flex", alignItems: "flex-start", gap: m.gap, marginBottom: m.gap * 1.2 }}>
            <div style={{
              position: "absolute", left: 2,
              width: 8, height: 8, borderRadius: "50%",
              background: s.future ? "transparent" : p.accent,
              border: s.future ? `2px solid ${p.accent}` : "none",
              marginTop: 2,
            }} />
            <div>
              <div style={{ fontSize: m.fs(8), fontWeight: 700, color: p.accent }}>{s.date}</div>
              <div style={{ fontSize: m.fs(7), color: s.future ? p.muted : p.text, marginTop: 1 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonTableBlock({ p, m }) {
  const rows = [
    ["", "Ours", "Theirs"],
    ["Speed", "2.1s", "4.8s"],
    ["Uptime", "99.9%", "98.5%"],
    ["Support", "24/7", "Email"],
    ["Price", "$49/mo", "$89/mo"],
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Comparison</div>
      <div style={{ borderRadius: m.cRad, overflow: "hidden", border: `1px solid ${p.border}` }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex" }}>
            {row.map((cell, ci) => (
              <div key={ci} style={{
                flex: ci === 0 ? 1.2 : 1,
                padding: `${m.pad * 0.5}px ${m.pad * 0.7}px`,
                fontSize: m.fs(8),
                fontWeight: ri === 0 || ci === 0 ? 700 : 400,
                color: ri === 0 && ci === 1 ? "#fff" : ri === 0 ? p.muted : ci === 1 ? p.accent : p.muted,
                background: ri === 0 && ci === 1 ? p.accent : ri === 0 ? `${p.accent}08` : ci === 1 ? `${p.accent}06` : p.card,
                textAlign: ci === 0 ? "left" : "center",
                borderBottom: ri < rows.length - 1 ? `1px solid ${p.border}` : "none",
              }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function IconFeatureGridBlock({ p, m }) {
  const colors = [p.accent, "#a78bfa", "#22c55e"];
  const items = [
    { name: "Lightning Fast", desc: "Sub-second response times" },
    { name: "Bank-Grade Security", desc: "SOC 2 and ISO 27001" },
    { name: "Infinite Scale", desc: "Auto-scaling infrastructure" },
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Why Choose Us</div>
      <div style={{ display: "flex", gap: m.gap }}>
        {items.map((item, i) => (
          <div key={item.name} style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap * 0.6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${colors[i]}15`, border: `1px solid ${colors[i]}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: `${colors[i]}60` }} />
            </div>
            <div style={{ fontSize: m.fs(8), fontWeight: 700, color: p.text }}>{item.name}</div>
            <div style={{ fontSize: m.fs(7), color: p.muted, lineHeight: 1.4 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CitationsBlockBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ width: "25%", height: 1, background: p.border, marginBottom: m.gap }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ fontSize: m.fs(6), color: p.muted }}>
          <span style={{ color: p.accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>1.</span> Smith et al., 2024. Journal of Design Research, Vol. 12.
        </div>
        <div style={{ fontSize: m.fs(6), color: p.muted }}>
          <span style={{ color: p.accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>2.</span> Annual Industry Report, Q4 2024. Gartner.
        </div>
      </div>
    </div>
  );
}

function TestimonialCardBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0`, display: "flex", justifyContent: "center" }}>
      <div style={{ borderRadius: 12, background: p.card, border: `1px solid ${p.border}`, padding: m.pad * 1.2, maxWidth: "85%" }}>
        <div style={{ fontSize: m.fs(10), fontStyle: "italic", color: p.text, lineHeight: 1.6, marginBottom: m.gap }}>
          &ldquo;This platform completely transformed how our team collaborates. We shipped twice as fast within the first quarter.&rdquo;
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: m.gap }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}80)` }} />
          <div>
            <div style={{ fontSize: m.fs(8), fontWeight: 700, color: p.text }}>Jane Cooper</div>
            <div style={{ fontSize: m.fs(7), color: p.muted }}>VP of Product, Acme Inc.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBarsBlock({ p, m }) {
  const bars = [
    { lbl: "Design", pct: 85 },
    { lbl: "Development", pct: 62 },
    { lbl: "QA Testing", pct: 38 },
    { lbl: "Deployment", pct: 91 },
  ];
  const colors = [p.accent, "#a78bfa", "#22c55e", "#f59e0b"];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text, marginBottom: m.gap }}>Progress</div>
      <div style={{ display: "flex", flexDirection: "column", gap: m.gap }}>
        {bars.map((b, i) => (
          <div key={b.lbl}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <div style={{ fontSize: m.fs(8), color: p.muted }}>{b.lbl}</div>
              <div style={{ fontSize: m.fs(8), fontWeight: 700, color: colors[i] }}>{b.pct}%</div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: `${p.muted}15` }}>
              <div style={{ width: `${b.pct}%`, height: "100%", borderRadius: 3, background: colors[i] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTABannerBlock({ p, m }) {
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{
        borderRadius: 12,
        background: `linear-gradient(135deg, ${p.accent}10, ${p.accent}05)`,
        border: `1px solid ${p.accent}30`,
        padding: m.pad * 1.2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: m.fs(11), fontWeight: 800, color: p.text }}>Ready to get started?</div>
          <div style={{ fontSize: m.fs(8), color: p.muted, marginTop: 2 }}>Join thousands of teams shipping faster today</div>
        </div>
        <div style={{ padding: `${m.fs(5)}px ${m.fs(12)}px`, borderRadius: 20, background: p.accent, fontSize: m.fs(8), fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
          Get Started
        </div>
      </div>
    </div>
  );
}

const BLOCK_RENDERERS = {
  "key-metrics-row": KeyMetricsRowBlock,
  "pull-quote": PullQuoteBlock,
  "callout-block": CalloutBlockBlock,
  "two-column-text": TwoColumnTextBlock,
  "feature-list": FeatureListBlock,
  "timeline": TimelineBlock,
  "comparison-table": ComparisonTableBlock,
  "icon-feature-grid": IconFeatureGridBlock,
  "citations-block": CitationsBlockBlock,
  "testimonial-card": TestimonialCardBlock,
  "progress-bars": ProgressBarsBlock,
  "cta-banner": CTABannerBlock,
};

const BLOCK_ORDER = [
  "key-metrics-row", "pull-quote", "callout-block", "two-column-text",
  "feature-list", "timeline", "comparison-table", "icon-feature-grid",
  "citations-block", "testimonial-card", "progress-bars", "cta-banner",
];

// ── Main Preview ──

export default function PreviewOnePagerBlocks({ p, mood }) {
  const m = mood || {};
  const cardStyleState = usePromptStore((s) => s.cardStyle);
  const selections = cardStyleState?.styleId?.split(",").filter(Boolean) || [];

  const scales = {
    pad: Math.round((m.padScale || 1) * 14),
    gap: Math.round((m.gapScale || 1) * 8),
    fs: (base) => Math.round((m.fontScale || 1) * base),
    cRad: m.cardRadius ?? 8,
    hWt: m.headWeight || 700,
    hFont: m.headFont || "'DM Sans',sans-serif",
    bFont: m.bodyFont || "'DM Sans',sans-serif",
  };

  // Show selected blocks in order, or first 3 as default
  const visibleIds = selections.length > 0
    ? BLOCK_ORDER.filter((id) => selections.includes(id))
    : BLOCK_ORDER.slice(0, 3);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: scales.bFont, overflow: "auto" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${scales.gap}px ${scales.pad}px`, borderBottom: `1px solid ${p.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: scales.fs(11), fontWeight: scales.hWt, fontFamily: scales.hFont, color: p.text }}>Acme Brief</div>
        <div style={{ fontSize: scales.fs(7), color: p.muted }}>{selections.length} block{selections.length !== 1 ? "s" : ""}</div>
      </div>

      {/* Document body */}
      <div style={{ flex: 1, padding: `${scales.pad}px ${scales.pad * 1.5}px`, display: "flex", flexDirection: "column" }}>
        {/* Title area */}
        <div style={{ marginBottom: scales.pad }}>
          <div style={{ fontSize: scales.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: scales.gap * 0.5 }}>Executive Summary</div>
          <div style={{ fontSize: scales.fs(16), fontWeight: 900, fontFamily: scales.hFont, color: p.text, lineHeight: 1.2, marginBottom: scales.gap }}>Q4 Performance Report</div>
          {/* Body text lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[92, 78, 85, 60].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}20` }} />
            ))}
          </div>
        </div>

        {/* Render selected content blocks */}
        {visibleIds.map((id) => {
          const Renderer = BLOCK_RENDERERS[id];
          return Renderer ? <Renderer key={id} p={p} m={scales} /> : null;
        })}
      </div>
    </div>
  );
}
