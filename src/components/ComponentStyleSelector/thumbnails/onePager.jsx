// ── One-Pager Content Block Thumbnails ──

const B = "#0d1018";

export function ThumbKeyMetricsRow({ accent }) {
  const metrics = [
    { val: "$4.2M", lbl: "Revenue" },
    { val: "+24%", lbl: "Growth" },
    { val: "96%", lbl: "Retention" },
  ];
  const colors = [accent, "#a78bfa", "#22c55e"];
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 6, color: "#fff4", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "'JetBrains Mono', monospace" }}>Key Metrics</div>
      <div style={{ display: "flex", gap: 5, flex: 1 }}>
        {metrics.map((m, i) => (
          <div key={m.lbl} style={{ flex: 1, borderRadius: 6, background: "#ffffff06", border: "1px solid #ffffff0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: colors[i] }}>{m.val}</div>
            <div style={{ fontSize: 5.5, color: "#fff5" }}>{m.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbPullQuote({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "14px 12px", display: "flex", alignItems: "center" }}>
      <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 10, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: `${accent}30`, lineHeight: 0.8, fontFamily: "Georgia, serif" }}>&ldquo;</div>
        <div style={{ fontSize: 8.5, fontStyle: "italic", fontWeight: 600, color: "#fffc", lineHeight: 1.5 }}>
          The only way to do great work is to love what you do.
        </div>
        <div style={{ fontSize: 5.5, color: accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "'JetBrains Mono', monospace" }}>— Steve Jobs</div>
      </div>
    </div>
  );
}

export function ThumbCalloutBlock({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", alignItems: "center" }}>
      <div style={{ borderRadius: 8, background: `${accent}10`, border: `1px solid ${accent}25`, padding: "10px 12px", width: "100%", display: "flex", gap: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: "#fff", fontWeight: 800 }}>!</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: accent }}>Important Note</div>
          {[85, 70, 55].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, borderRadius: 1, background: "#fff3" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ThumbTwoColumnText({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: "#fffc" }}>Section Heading</div>
      <div style={{ display: "flex", gap: 10, flex: 1 }}>
        {[0, 1].map((col) => (
          <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {[90, 75, 85, 60, 80, 70].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 2, borderRadius: 1, background: "#fff2" }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbFeatureList({ accent }) {
  const features = ["Authentication", "Real-time Sync", "File Storage", "API Access", "Webhooks", "Analytics"];
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: "#fffc" }}>Features</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, flex: 1 }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
            <div style={{ fontSize: 6, color: "#fff8" }}>{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbTimeline({ accent }) {
  const steps = [
    { date: "Jan", label: "Kickoff" },
    { date: "Mar", label: "Beta launch" },
    { date: "Jun", label: "GA release" },
    { date: "Sep", label: "Scale phase", future: true },
  ];
  return (
    <div style={{ height: 110, background: B, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 7, fontWeight: 700, color: "#fffc" }}>Roadmap</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", paddingLeft: 14 }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: 4, top: 2, bottom: 2, width: 1, background: "#ffffff15" }} />
        {steps.map((s) => (
          <div key={s.date} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{
              position: "absolute", left: 1,
              width: 7, height: 7, borderRadius: "50%",
              background: s.future ? "transparent" : accent,
              border: s.future ? `1.5px solid ${accent}` : "none",
              zIndex: 1,
            }} />
            <div style={{ fontSize: 6, fontWeight: 700, color: accent, minWidth: 18 }}>{s.date}</div>
            <div style={{ fontSize: 5.5, color: s.future ? "#fff4" : "#fff7" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbComparisonTable({ accent }) {
  const rows = [
    ["", "Ours", "Theirs"],
    ["Speed", "2.1s", "4.8s"],
    ["Uptime", "99.9%", "98.5%"],
    ["Support", "24/7", "Email"],
  ];
  return (
    <div style={{ height: 110, background: B, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 1 }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{
              flex: ci === 0 ? 1.2 : 1,
              padding: "3px 5px",
              fontSize: ri === 0 ? 6 : 5.5,
              fontWeight: ri === 0 || ci === 0 ? 700 : 400,
              color: ri === 0 && ci === 1 ? "#fff" : ri === 0 ? "#fff6" : ci === 1 ? accent : "#fff5",
              background: ri === 0 && ci === 1 ? accent : ri === 0 ? "#ffffff06" : ci === 1 ? `${accent}08` : "#ffffff04",
              textAlign: ci === 0 ? "left" : "center",
              borderRadius: ri === 0 && ci === 0 ? "4px 0 0 0" : ri === 0 && ci === 2 ? "0 4px 0 0" : 0,
            }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ThumbIconFeatureGrid({ accent }) {
  const colors = [accent, "#a78bfa", "#22c55e"];
  const items = ["Speed", "Security", "Scale"];
  return (
    <div style={{ height: 110, background: B, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 7, fontWeight: 700, color: "#fffc" }}>Why Us</div>
      <div style={{ display: "flex", gap: 6, flex: 1 }}>
        {items.map((item, i) => (
          <div key={item} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: `${colors[i]}15`, border: `1px solid ${colors[i]}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: `${colors[i]}60` }} />
            </div>
            <div style={{ fontSize: 6, fontWeight: 700, color: "#fff9", textAlign: "center" }}>{item}</div>
            {[70, 50].map((w, j) => (
              <div key={j} style={{ width: `${w}%`, height: 1.5, borderRadius: 1, background: "#fff2" }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbCitationsBlock({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {[90, 75, 85, 60, 80].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 2, borderRadius: 1, background: "#fff2" }} />
        ))}
      </div>
      <div style={{ width: "30%", height: 1, background: "#fff1", marginTop: 4 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <div style={{ fontSize: 5, color: accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>1.</div>
          <div style={{ fontSize: 5, color: "#fff4" }}>Smith et al., 2024. Journal of Design Research.</div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <div style={{ fontSize: 5, color: accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>2.</div>
          <div style={{ fontSize: 5, color: "#fff4" }}>Annual Industry Report, Q4 2024.</div>
        </div>
      </div>
    </div>
  );
}

export function ThumbTestimonialCard({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ borderRadius: 8, background: "#ffffff06", border: "1px solid #ffffff0a", padding: "10px 12px", width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 7, fontStyle: "italic", color: "#fffc", lineHeight: 1.5 }}>
          &ldquo;This tool changed how our team ships.&rdquo;
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${accent}80)` }} />
          <div>
            <div style={{ fontSize: 6, fontWeight: 700, color: "#fff9" }}>Jane Cooper</div>
            <div style={{ fontSize: 5, color: "#fff5" }}>VP of Product, Acme</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThumbProgressBars({ accent }) {
  const bars = [
    { lbl: "Design", pct: 85 },
    { lbl: "Dev", pct: 62 },
    { lbl: "QA", pct: 38 },
  ];
  const colors = [accent, "#a78bfa", "#22c55e"];
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 7, fontWeight: 700, color: "#fffc" }}>Progress</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
        {bars.map((b, i) => (
          <div key={b.lbl}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <div style={{ fontSize: 5.5, color: "#fff7" }}>{b.lbl}</div>
              <div style={{ fontSize: 5.5, fontWeight: 700, color: colors[i] }}>{b.pct}%</div>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "#ffffff08" }}>
              <div style={{ width: `${b.pct}%`, height: "100%", borderRadius: 2, background: colors[i] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbCTABanner({ accent }) {
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", alignItems: "center" }}>
      <div style={{
        width: "100%", borderRadius: 8,
        background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
        border: `1px solid ${accent}30`,
        padding: "10px 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 8, fontWeight: 800, color: "#fffc" }}>Ready to get started?</div>
          <div style={{ fontSize: 5.5, color: "#fff5", marginTop: 2 }}>Join thousands of teams today</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 12, background: accent, fontSize: 6, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
          Get Started
        </div>
      </div>
    </div>
  );
}
