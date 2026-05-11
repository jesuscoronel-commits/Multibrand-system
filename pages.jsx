// Multi-Brand DS — Pages (sidebar navigation structure)
// Each DS_* function is one view rendered by the right sidebar nav.

// ─── Shared view wrapper ────────────────────────────────────────────────────
function PageView({ badge, title, desc, children }) {
  return (
    <div className="page-view">
      <div className="view-head">
        {badge && <div className="view-badge">{badge}</div>}
        <h1 className="view-title">{title}</h1>
        {desc && <p className="view-desc">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── DS_Overview ─────────────────────────────────────────────────────────────
function DS_Overview({ brand, brandKey }) {
  const t = window.GENESIS_TOKENS;
  const brandCount = Object.keys(t.brands).length;
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-eyebrow">Multi-Brand DS · v1.0 · {brand.name}</div>
          <h1 className="page-title" style={{ fontFamily: "var(--brand-font-display)" }}>
            Un sistema.<br/>Cuatro voces.
          </h1>
          <p className="page-subtitle">
            Tokens globales compartidos + un theme intercambiable por marca. Los componentes no se duplican — consumen variables CSS alias (<span className="code">--brand-*</span>). Cambia de pestaña y mira cómo el mismo botón, input o card adopta la identidad de cada marca.
          </p>
        </div>
        <dl className="page-meta">
          <dt>Marcas activas</dt><dd>{brandCount}</dd>
          <dt>Componentes</dt><dd>13 — reutilizables 100%</dd>
          <dt>Tokens globales</dt><dd>Spacing · Type scale · Radii · Elevation · Semantic</dd>
          <dt>Tokens por marca</dt><dd>Color · Font · Radius · Density</dd>
          <dt>Contrato</dt><dd>window.GENESIS_THEME_SCHEMA</dd>
        </dl>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-num">01</span>
          <h2 className="section-title">Mismo componente · 4 marcas</h2>
          <p className="section-desc">Un solo componente. Cero lógica por marca. El theme resuelve color, tipografía y radio.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${brandCount}, 1fr)`, gap: 16 }}>
          {Object.entries(t.brands).map(([key, b]) => (
            <BrandPreview key={key} brandKey={key} brand={b}>
              <GButton variant="primary" icon={Icon.arrow}>Comprar ahora</GButton>
              <GButton variant="secondary">Ver más</GButton>
              <GButton variant="outline" size="sm">Pequeño</GButton>
              <GTag type="primary" size="sm" label="Disponible" />
            </BrandPreview>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Arquitectura de tokens</h2>
          <p className="section-desc">Tres capas. Los componentes solo leen la tercera.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div className="card">
            <div className="mono" style={{ color: "var(--brand-text-muted)", marginBottom: 10 }}>01 · GLOBAL</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontFamily: "var(--brand-font-display)" }}>Tokens primitivos</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--brand-text-muted)", lineHeight: 1.55 }}>Valores crudos. No cambian entre marcas.</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.9, color: "var(--brand-text)" }}>
              <li>Escala neutra (N-0 → N-950)</li>
              <li>Escala tipográfica (11 pasos)</li>
              <li>Escala espacial (múltiplo de 4)</li>
              <li>Radios base · Elevación</li>
              <li>Semánticos (success/warning/danger/info)</li>
            </ul>
          </div>
          <div className="card" style={{ borderColor: "var(--brand-primary)", background: "var(--brand-primary-soft)" }}>
            <div className="mono" style={{ color: "var(--brand-primary)", marginBottom: 10 }}>02 · BRAND</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontFamily: "var(--brand-font-display)" }}>Theme · {brand.name}</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--brand-text-muted)", lineHeight: 1.55 }}>Sobreescribe los alias. Una clase CSS, un theme.</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.9, color: "var(--brand-text)" }}>
              <li>Primary + hover + pressed + soft</li>
              <li>Accent · text · bg · border</li>
              <li>Font family (display + body)</li>
              <li>Radios (sm/md/lg)</li>
              <li>Densidad</li>
            </ul>
          </div>
          <div className="card">
            <div className="mono" style={{ color: "var(--brand-text-muted)", marginBottom: 10 }}>03 · ALIAS (CSS vars)</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontFamily: "var(--brand-font-display)" }}>Lo que los componentes leen</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--brand-text-muted)", lineHeight: 1.55 }}>Nombres semánticos. Inmutables en el contrato.</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.9, color: "var(--brand-text)" }}>
              <li>--brand-primary</li>
              <li>--brand-on-primary</li>
              <li>--brand-text / --brand-bg</li>
              <li>--brand-font-display</li>
              <li>--radius-md / --density</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2 className="section-title">Las marcas</h2>
          <p className="section-desc">Cada una consume el mismo contrato de theme.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${brandCount}, 1fr)`, gap: 16 }}>
          {Object.entries(t.brands).map(([key, b]) => (
            <div key={key} style={{
              border: "1px solid var(--brand-border)", borderRadius: 12,
              padding: 24, background: "var(--brand-bg)",
              display: "flex", flexDirection: "column", gap: 16,
              position: "relative",
              outline: key === brandKey ? "2px solid var(--brand-primary)" : "none",
              outlineOffset: -2,
            }}>
              <div style={{
                height: 100, borderRadius: 8, background: b.primary,
                display: "flex", alignItems: "flex-end", padding: 16,
                fontFamily: b.fontDisplay, fontSize: 24, fontWeight: 700,
                color: b.onPrimary, letterSpacing: "-0.02em",
              }}>{b.name}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-text)", fontFamily: "var(--brand-font-display)" }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "var(--brand-text-muted)", marginTop: 4, lineHeight: 1.5 }}>{b.tagline}</div>
              </div>
              <dl style={{ margin: 0, fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: "var(--brand-text-muted)", lineHeight: 1.75 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt>primary</dt><dd style={{ margin: 0, color: "var(--brand-text)" }}>{b.primary}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt>font</dt><dd style={{ margin: 0, color: "var(--brand-text)" }}>{b.fontDisplay.split(",")[0].replace(/['"]/g,"")}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt>radius</dt><dd style={{ margin: 0, color: "var(--brand-text)" }}>{b.radiusMd}px</dd></div>
              </dl>
              {key === brandKey && (
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
                  padding: "2px 6px", background: "var(--brand-primary)",
                  color: "var(--brand-on-primary)", borderRadius: 4,
                }}>ACTIVA</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Agregar una marca nueva</h2>
          <p className="section-desc">3 pasos. Cero cambios a componentes.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { n: "01", t: "Define tu theme", d: "Implementa el contrato GENESIS_THEME_SCHEMA: primary, on-primary, font, radius, density. Todo lo demás se hereda del global." },
            { n: "02", t: "Declara el CSS", d: "Crea .brand-nueva { --brand-primary: ...; }. Una sola regla con los alias que cambian." },
            { n: "03", t: "Listo para usar", d: "Aplica className=\"brand-nueva\" al root. Todos los componentes adoptan tu identidad automáticamente." },
          ].map(step => (
            <div key={step.n} className="card">
              <div className="mono" style={{ color: "var(--brand-primary)", marginBottom: 12 }}>{step.n}</div>
              <h3 style={{ margin: "0 0 10px", fontSize: 17, fontFamily: "var(--brand-font-display)", fontWeight: 600 }}>{step.t}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "var(--brand-text-muted)", lineHeight: 1.6 }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DS_Colors ────────────────────────────────────────────────────────────────
function DS_Colors({ brand, brandKey }) {
  const t = window.GENESIS_TOKENS;

  // Luminance helper
  function isDark(hex) {
    if (!hex || hex.length < 7) return false;
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (r*299 + g*587 + b*114)/1000 < 160;
  }

  // ── Palette scale renderer ──────────────────────────────────────────────────
  function PaletteScale({ name, steps, accent }) {
    return (
      <div style={{ flex: "1 1 0", minWidth: 0 }}>
        {/* Column header */}
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
          color: "var(--brand-text-muted)", marginBottom: 10,
          paddingBottom: 6, borderBottom: "1px solid var(--brand-border)"
        }}>{name}</div>
        {/* Steps */}
        {Object.entries(steps).map(([step, hex]) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <div style={{
              width: 40, height: 32, borderRadius: "var(--radius-sm)", background: hex, flexShrink: 0,
              border: hex.toUpperCase() === "#FFFFFF" ? "1px solid var(--brand-border)" : "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }} />
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--brand-text)", lineHeight: "15px", whiteSpace: "nowrap" }}>
                {step}
              </div>
              <div style={{
                fontSize: 10, color: "var(--brand-text-muted)", lineHeight: "14px",
                fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap"
              }}>
                {hex.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Alias token row ─────────────────────────────────────────────────────────
  function AliasRow({ name, value, palRef, desc }) {
    const displayVal = value;
    return (
      <tr>
        <td style={{ padding: "8px 12px 8px 0", borderBottom: "1px solid var(--brand-border)" }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: "var(--brand-text)", background: "var(--brand-bg-elev)",
            padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap"
          }}>{name}</span>
        </td>
        <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--brand-border)", width: 52 }}>
          <div style={{
            width: 36, height: 24, borderRadius: "var(--radius-sm)", background: displayVal,
            border: displayVal && displayVal.toUpperCase() === "#FFFFFF" ? "1px solid var(--brand-border)" : "none",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }} />
        </td>
        <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--brand-border)" }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text-muted)"
          }}>{displayVal ? displayVal.toUpperCase() : "—"}</span>
        </td>
        <td style={{ padding: "8px 0 8px 12px", borderBottom: "1px solid var(--brand-border)" }}>
          {palRef && <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            color: "var(--brand-text-muted)", opacity: 0.7
          }}>{palRef}</span>}
        </td>
        <td style={{ padding: "8px 0 8px 12px", borderBottom: "1px solid var(--brand-border)", color: "var(--brand-text-muted)", fontSize: 13 }}>
          {desc}
        </td>
      </tr>
    );
  }

  // Alias groups data
  const aliasGroups = [
    {
      group: "Text",
      tokens: [
        { name: "text/primary",         value: "#17191F", palRef: "neutral/900", desc: "Main body text" },
        { name: "text/secondary",       value: "#65676B", palRef: "neutral/600", desc: "Helper, captions" },
        { name: "text/tertiary",        value: "#B6B7BA", palRef: "neutral/300", desc: "Disabled, placeholder" },
        { name: "text/primary-inverse", value: "#FFFFFF", palRef: "basic/white",  desc: "On dark surfaces" },
        { name: "text/warning",         value: "#E8B500", palRef: "yellow/600",  desc: "Warning labels" },
        { name: "text/error",           value: "#D30519", palRef: "red/600",     desc: "Error messages" },
        { name: "text/success",         value: "#178A00", palRef: "green/700",   desc: "Confirmations" },
        { name: "text/brand",           value: "#0B50C5", palRef: "blue/500",    desc: "Brand-colored text" },
      ],
    },
    {
      group: "Background",
      tokens: [
        { name: "background/primary",          value: "#FFFFFF", palRef: "basic/white",  desc: "Page background" },
        { name: "background/secondary",        value: "#F4F5F7", palRef: "neutral/50",   desc: "Cards, panels" },
        { name: "background/tertiary",         value: "#EAEBEE", palRef: "neutral/100",  desc: "Hover states" },
        { name: "background/primary-inverse",  value: "#17191F", palRef: "neutral/900",  desc: "Dark surfaces" },
        { name: "background/brand",            value: "#0B50C5", palRef: "blue/500",     desc: "Brand surface" },
        { name: "background/warning-light",    value: "#FFF9E6", palRef: "yellow/50",    desc: "Warning tinted" },
        { name: "background/error-light",      value: "#FDE6E8", palRef: "red/50",       desc: "Error tinted" },
        { name: "background/success-light",    value: "#E9F9E6", palRef: "green/50",     desc: "Success tinted" },
      ],
    },
    {
      group: "Border",
      tokens: [
        { name: "border/primary",   value: "#B6B7BA", palRef: "neutral/300", desc: "Default borders" },
        { name: "border/secondary", value: "#EAEBEE", palRef: "neutral/100", desc: "Subtle dividers" },
        { name: "border/brand",     value: "#0B50C5", palRef: "blue/500",    desc: "Focus / active" },
      ],
    },
    {
      group: "Link",
      tokens: [
        { name: "link/default", value: "#0B50C5", palRef: "blue/500", desc: "Default link" },
        { name: "link/hover",   value: "#3C73D1", palRef: "blue/400", desc: "Hovered link" },
        { name: "link/active",  value: "#0A49B3", palRef: "blue/600", desc: "Pressed link" },
      ],
    },
    {
      group: "Semantic",
      tokens: [
        { name: "--color-success", value: t.semantic.success, palRef: "green/700",  desc: "Positive outcomes" },
        { name: "--color-warning", value: t.semantic.warning, palRef: "yellow/600", desc: "Caution, attention" },
        { name: "--color-danger",  value: t.semantic.danger,  palRef: "red/600",    desc: "Errors, destructive" },
        { name: "--color-info",    value: t.semantic.info,    palRef: "blue/500",   desc: "Informational" },
      ],
    },
  ];

  // Dark mode token overrides (Zamna brand dark)
  const darkTokens = brand.dark ? [
    { name: "--brand-primary",    light: brand.primary,    dark: brand.dark.primary,    desc: "Primary action" },
    { name: "--brand-on-primary", light: brand.onPrimary,  dark: brand.dark.onPrimary,  desc: "Text on primary" },
    { name: "--brand-bg",         light: brand.bg,         dark: brand.dark.bg,         desc: "Background" },
    { name: "--brand-bg-elev",    light: brand.bgElev,     dark: brand.dark.bgElev,     desc: "Elevated surface" },
    { name: "--brand-text",       light: brand.text,       dark: brand.dark.text,       desc: "Text" },
    { name: "--brand-text-muted", light: brand.textMuted,  dark: brand.dark.textMuted,  desc: "Muted text" },
    { name: "--brand-border",     light: brand.border,     dark: brand.dark.border,     desc: "Border" },
  ] : null;

  const PALETTE_SCALES = [
    { name: "Neutral", steps: t.palette.neutral },
    { name: "Blue",    steps: t.palette.blue },
    { name: "Red",     steps: t.palette.red },
    { name: "Yellow",  steps: t.palette.yellow },
    { name: "Green",   steps: t.palette.green },
  ];

  return (
    <PageView badge="Foundations" title="Colors"
      desc="Three token layers: global primitives (palette scales), brand aliases (theme-specific), and semantic intent tokens shared across all brands.">

      {/* ── 1. Global palette ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Global palette · primitive tokens</h2>
          <p className="section-desc">Shared base scales consumed by all brands. Components never reference these directly — they use alias tokens instead.</p>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
          {PALETTE_SCALES.map(s => (
            <PaletteScale key={s.name} name={s.name} steps={s.steps} />
          ))}
          {/* Black / White mini column */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
              color: "var(--brand-text-muted)", marginBottom: 10,
              paddingBottom: 6, borderBottom: "1px solid var(--brand-border)"
            }}>Basic</div>
            {[["White","#FFFFFF"],["Black","#000000"]].map(([lbl, hex]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <div style={{
                  width: 40, height: 32, borderRadius: "var(--radius-sm)", background: hex, flexShrink: 0,
                  border: hex === "#FFFFFF" ? "1px solid var(--brand-border)" : "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--brand-text)", lineHeight: "15px" }}>{lbl}</div>
                  <div style={{ fontSize: 10, color: "var(--brand-text-muted)", lineHeight: "14px", fontFamily: "'IBM Plex Mono', monospace" }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Brand aliases ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Brand aliases · {brand.name}</h2>
          <p className="section-desc">These CSS custom properties change per brand theme. All components read these — never hardcoded colors. Switch brands in the top bar to see them update.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { n:"--brand-primary",         r:"Primary",          v:brand.primary },
            { n:"--brand-primary-hover",   r:"Primary · hover",  v:brand.primaryHover },
            { n:"--brand-primary-pressed", r:"Primary · pressed",v:brand.primaryPressed },
            { n:"--brand-primary-soft",    r:"Primary · soft",   v:brand.primarySoft },
            { n:"--brand-on-primary",      r:"On primary",       v:brand.onPrimary },
            { n:"--brand-accent",          r:"Accent",           v:brand.accent },
            { n:"--brand-text",            r:"Text",             v:brand.text },
            { n:"--brand-text-muted",      r:"Text muted",       v:brand.textMuted },
            { n:"--brand-bg",              r:"Background",       v:brand.bg },
            { n:"--brand-bg-elev",         r:"Surface elevated", v:brand.bgElev },
            { n:"--brand-border",          r:"Border",           v:brand.border },
          ].map(({ n, r, v }) => (
            <Swatch key={n} name={n} role={r} value={v} />
          ))}
        </div>

        {/* All 4 brands side by side */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-text-muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".06em" }}>All brands · primary color</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {Object.entries(t.brands).map(([key, b]) => (
              <div key={key} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                background: "var(--brand-bg-elev)", borderRadius: "var(--radius-md)",
                border: key === brandKey ? "2px solid var(--brand-primary)" : "1px solid var(--brand-border)",
                minWidth: 160,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "var(--radius-sm)", background: b.primary, flexShrink: 0,
                  border: b.primary === "#FFFFFF" || b.primary.toUpperCase() === "#FFFFFF" ? "1px solid var(--brand-border)" : "none",
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-text)" }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: "var(--brand-text-muted)", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {b.primary.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Alias / intent tokens ── */}
      <div className="section">
        <div className="section-head" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 className="section-title">Alias color tokens</h2>
            <p className="section-desc">Intent-based tokens that map global palette values to semantic roles. These don't change per brand — they describe function, not appearance.</p>
          </div>
        </div>

        {aliasGroups.map(({ group, tokens }) => (
          <div key={group} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em",
              color: "var(--brand-text-muted)", marginBottom: 8,
              paddingBottom: 6, borderBottom: "2px solid var(--brand-border)"
            }}>{group}</div>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "26%" }} />
                <col style={{ width: "44px" }} />
                <col style={{ width: "92px" }} />
                <col style={{ width: "120px" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  {["Token", "", "Value", "Reference", "Usage"].map(h => (
                    <th key={h} style={{
                      fontSize: 11, fontWeight: 600, color: "var(--brand-text-muted)",
                      padding: "0 12px 6px 0", textAlign: "left", borderBottom: "1px solid var(--brand-border)"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map(tok => <AliasRow key={tok.name} {...tok} />)}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ── 4. Dark mode ── */}
      {darkTokens && (
        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Dark mode · {brand.name}</h2>
            <p className="section-desc">The same alias tokens flip their values in dark mode — component code is unchanged. Only Zamna ships a first-class dark variant today.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 0, border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            {/* Header row */}
            <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--brand-bg-elev)", padding: "8px 16px", borderBottom: "1px solid var(--brand-border)" }}>
              {["Token", "Light", "Dark"].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 600, color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</div>
              ))}
            </div>
            {darkTokens.map(({ name, light, dark, desc }) => (
              <div key={name} style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 16px", borderBottom: "1px solid var(--brand-border)", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text)" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "var(--brand-text-muted)", marginTop: 2 }}>{desc}</div>
                </div>
                {/* Light swatch */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "var(--radius-sm)", background: light, flexShrink: 0,
                    border: light.toUpperCase() === "#FFFFFF" ? "1px solid var(--brand-border)" : "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{light.toUpperCase()}</span>
                </div>
                {/* Dark swatch */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#14161B", padding: "6px 10px", borderRadius: "var(--radius-sm)" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "var(--radius-sm)", background: dark, flexShrink: 0,
                    border: dark.toUpperCase() === "#0A0B0E" || dark.toUpperCase() === "#14161B" ? "1px solid rgba(255,255,255,0.1)" : "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#A7ABB3" }}>{dark.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Token architecture ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Token architecture</h2>
          <p className="section-desc">Three layers ensure the system scales across brands without breaking components.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            {
              step: "01", title: "Primitive tokens",
              desc: "Raw values in the global palette — Neutral, Blue, Red, Yellow, Green scales. Never used directly in components.",
              eg: "neutral/900 → #14161B\nblue/500 → #0B50C5",
            },
            {
              step: "02", title: "Brand alias tokens",
              desc: "CSS custom properties that map primitives to roles. Swapped per brand theme. Components read these.",
              eg: "--brand-primary\n--brand-text\n--brand-bg",
            },
            {
              step: "03", title: "Semantic tokens",
              desc: "Intent tokens for state colors — success, warning, danger, info. Shared by all brands, never overridden.",
              eg: "--color-success\n--color-danger\n--color-info",
            },
          ].map(({ step, title, desc, eg }) => (
            <div key={step} style={{
              padding: 20, background: "var(--brand-bg-elev)",
              borderRadius: "var(--radius-md)", border: "1px solid var(--brand-border)"
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 28, height: 28, borderRadius: "var(--radius-sm)",
                background: "var(--brand-primary)", color: "var(--brand-on-primary)",
                fontSize: 11, fontWeight: 700, marginBottom: 12,
              }}>{step}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-text)", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: "var(--brand-text-muted)", marginBottom: 12, lineHeight: "20px" }}>{desc}</div>
              <pre style={{
                background: "var(--brand-bg)", padding: "10px 12px",
                borderRadius: "var(--radius-sm)", border: "1px solid var(--brand-border)",
                fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
                color: "var(--brand-text-muted)", margin: 0, lineHeight: "18px",
                whiteSpace: "pre-wrap"
              }}>{eg}</pre>
            </div>
          ))}
        </div>
      </div>

    </PageView>
  );
}

// ─── DS_Typography ────────────────────────────────────────────────────────────
function DS_Typography({ brand }) {
  const t = window.GENESIS_TOKENS;
  const fontName = brand.fontDisplay.split(",")[0].replace(/['"]/g,"");
  return (
    <PageView badge="Foundations" title="Typography" desc={`La escala es global (11 pasos); la familia la define el theme. Actualmente: ${fontName}.`}>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">{fontName} · Specimen</h2>
          <p className="section-desc">Font display del theme activo.</p>
        </div>
        <div style={{ border: "1px solid var(--brand-border)", borderRadius: 10, padding: "48px 32px", marginBottom: 16, background: "var(--brand-bg-elev)" }}>
          <div className="mono" style={{ color: "var(--brand-text-muted)", fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {fontName} · Specimen
          </div>
          <div style={{ fontFamily: "var(--brand-font-display)", fontSize: 160, lineHeight: 0.88, letterSpacing: "-0.05em", fontWeight: 700, color: "var(--brand-text)", marginBottom: 32 }}>Aa</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, fontFamily: "var(--brand-font-display)" }}>
            {[{w:300,l:"Light"},{w:400,l:"Regular"},{w:500,l:"Medium"},{w:600,l:"SemiBold"},{w:700,l:"Bold"},{w:800,l:"ExtraBold"}].map(wt => (
              <div key={wt.w} style={{ borderTop: "1px solid var(--brand-border)", paddingTop: 12 }}>
                <div style={{ fontSize: 28, fontWeight: wt.w, color: "var(--brand-text)", letterSpacing: "-0.02em" }}>Ag</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--brand-text-muted)", marginTop: 4 }}>{wt.l} · {wt.w}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Type scale</h2>
          <p className="section-desc">11 pasos: display-1 (72px) → caption (12px).</p>
        </div>
        <div style={{ border: "1px solid var(--brand-border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px 80px 80px 80px 1fr", gap: 16, padding: "12px 20px", background: "var(--brand-bg-elev)", borderBottom: "1px solid var(--brand-border)", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <span>Token</span><span>Size</span><span>LH</span><span>Weight</span><span>Preview</span>
          </div>
          {t.typeScale.map((tk) => (
            <div key={tk.token} style={{ display: "grid", gridTemplateColumns: "160px 80px 80px 80px 1fr", gap: 16, padding: "14px 20px", borderBottom: "1px solid var(--brand-border)", alignItems: "center" }}>
              <span className="mono" style={{ color: "var(--brand-text)" }}>{tk.token}</span>
              <span className="mono" style={{ color: "var(--brand-text-muted)" }}>{tk.px}px</span>
              <span className="mono" style={{ color: "var(--brand-text-muted)" }}>{tk.lh}</span>
              <span className="mono" style={{ color: "var(--brand-text-muted)" }}>{tk.weight}</span>
              <span style={{ fontFamily: "var(--brand-font-display)", fontSize: Math.min(tk.px, 44), lineHeight: 1.15, fontWeight: tk.weight, color: "var(--brand-text)", letterSpacing: tk.letterSpacing }}>La tipografía es la voz del diseño</span>
            </div>
          ))}
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Spacing ───────────────────────────────────────────────────────────────
function DS_Spacing({ brand }) {
  const t = window.GENESIS_TOKENS;

  // ── Reusable alias table ────────────────────────────────────────────────────
  function AliasTable({ title, desc, tokens, renderPreview }) {
    return (
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </div>
        <div style={{ border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {/* header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" + (renderPreview ? " 1fr" : ""), background: "var(--brand-bg-elev)", borderBottom: "1px solid var(--brand-border)" }}>
            {["Name", "References" + (renderPreview ? "" : "")].concat(renderPreview ? ["Preview"] : []).map(h => (
              <div key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</div>
            ))}
          </div>
          {tokens.map(({ name, ref: refVal }) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" + (renderPreview ? " 1fr" : ""), borderBottom: "1px solid var(--brand-border)", alignItems: "center" }}>
              <div style={{ padding: "12px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "var(--brand-text)" }}>
                # {name}
              </div>
              <div style={{ padding: "12px 16px" }}>
                <span style={{
                  display: "inline-block", padding: "3px 10px",
                  border: "1px solid var(--brand-border)", borderRadius: 6,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
                  color: "var(--brand-text)", background: "var(--brand-bg)",
                }}>
                  # size-{refVal}
                </span>
              </div>
              {renderPreview && (
                <div style={{ padding: "12px 16px" }}>
                  {renderPreview(name, refVal)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const MAX_BAR = 200; // cap bar width for large values

  return (
    <PageView badge="Foundations" title="Tamaño & Espacio"
      desc="Los tokens globales son valores elementales aplicados a toda la lista de opciones disponibles en el sistema de diseño. Esta lista de tamaños es la base para planificar las reglas de uso de Padding, Radius y Gap.">

      {/* ── 1. Global Size ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Global Size</h2>
          <p className="section-desc">Primitive token scale. Referenced by all alias tokens — never used directly in components.</p>
        </div>
        <div style={{ border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {/* header */}
          <div style={{ display: "grid", gridTemplateColumns: "200px 80px 1fr", background: "var(--brand-bg-elev)", borderBottom: "1px solid var(--brand-border)" }}>
            {["Name", "Value", ""].map(h => (
              <div key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</div>
            ))}
          </div>
          {Object.entries(t.sizes).map(([px]) => {
            const n = Number(px);
            const barW = n === 9999 ? MAX_BAR : Math.min(n, MAX_BAR);
            return (
              <div key={px} style={{ display: "grid", gridTemplateColumns: "200px 80px 1fr", borderBottom: "1px solid var(--brand-border)", alignItems: "center" }}>
                <div style={{ padding: "10px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "var(--brand-text)" }}>
                  # size-{px}
                </div>
                <div style={{ padding: "10px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "var(--brand-text-muted)" }}>
                  {n === 9999 ? "∞" : n}
                </div>
                <div style={{ padding: "10px 16px" }}>
                  {n > 0 && n < 9999 && (
                    <div style={{ height: 8, width: barW, background: "var(--brand-primary)", borderRadius: 2, opacity: 0.7 }} />
                  )}
                  {n === 9999 && (
                    <span style={{ fontSize: 11, color: "var(--brand-text-muted)", fontFamily: "'IBM Plex Mono', monospace" }}>pill / full</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. Alias · Padding ── */}
      <AliasTable
        title="Alias Size · Padding"
        desc="Esta lista de tamaños le permite controlar los espaciados permitidos para mantener la coherencia del diseño."
        tokens={t.sizeAliases.padding}
        renderPreview={(name, ref) => (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{
              background: "var(--brand-primary-soft)", border: "1px dashed var(--brand-primary)",
              borderRadius: "var(--radius-sm)", display: "inline-block",
              padding: ref > 40 ? `${Math.min(ref, 32)}px` : `${ref}px`,
            }}>
              <div style={{ width: 8, height: 8, background: "var(--brand-primary)", borderRadius: 2, opacity: 0.6 }} />
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{ref}px</span>
          </div>
        )}
      />

      {/* ── 3. Alias · Radius ── */}
      <AliasTable
        title="Alias Size · Radius"
        desc="Esta lista de tamaños le permite controlar el radio permitido para mantener la coherencia del diseño."
        tokens={t.sizeAliases.radius}
        renderPreview={(name, ref) => (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 40, height: 40, background: "var(--brand-primary-soft)",
              border: "2px solid var(--brand-primary)",
              borderRadius: ref >= 9999 ? 9999 : Math.min(ref, 20),
              opacity: 0.85,
            }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>
              {ref >= 9999 ? "∞" : ref + "px"}
            </span>
          </div>
        )}
      />

      {/* ── 4. Alias · Gap ── */}
      <AliasTable
        title="Alias Size · Gap"
        desc="Esta lista de tamaños le permite controlar los espacios permitidos para mantener la coherencia del diseño."
        tokens={t.sizeAliases.gap}
        renderPreview={(name, ref) => (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            {[0,1,2].map(i => (
              <React.Fragment key={i}>
                <div style={{ width: 18, height: 18, background: "var(--brand-primary)", borderRadius: 3, opacity: 0.5 + i * 0.2 }} />
                {i < 2 && <div style={{ width: ref, flexShrink: 0 }} />}
              </React.Fragment>
            ))}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--brand-text-muted)", marginLeft: 6 }}>{ref}px</span>
          </div>
        )}
      />

    </PageView>
  );
}

// ─── DS_Radius ────────────────────────────────────────────────────────────────
function DS_Radius({ brand }) {
  return (
    <PageView badge="Foundations" title="Radius" desc="Cada marca define su curvatura. Los componentes leen --radius-sm/md/lg/pill. Cambia de marca para ver la diferencia.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Radius tokens · {brand.name}</h2>
          <p className="section-desc">sm / md / lg / pill.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { k: "--radius-sm",   v: brand.radiusSm },
            { k: "--radius-md",   v: brand.radiusMd },
            { k: "--radius-lg",   v: brand.radiusLg },
            { k: "--radius-pill", v: brand.radiusPill },
          ].map(r => (
            <div key={r.k} style={{ border: "1px solid var(--brand-border)", borderRadius: 10, padding: 20, textAlign: "center" }}>
              <div style={{ width: 80, height: 80, background: "var(--brand-primary)", borderRadius: r.v, margin: "0 auto 16px" }} />
              <div className="mono" style={{ color: "var(--brand-text)", fontSize: 11 }}>{r.k}</div>
              <div className="mono" style={{ color: "var(--brand-text-muted)", fontSize: 11 }}>{r.v}px</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--brand-text-muted)", marginBottom: 16, textTransform: "uppercase", letterSpacing: ".04em" }}>Comparativa entre marcas</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {Object.entries(window.GENESIS_TOKENS.brands).map(([key, b]) => (
              <div key={key} style={{ border: "1px solid var(--brand-border)", borderRadius: 10, padding: 16, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: b.primary, borderRadius: b.radiusMd, margin: "0 auto 12px" }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-text)" }}>{b.name}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--brand-text-muted)" }}>{b.radiusMd}px md</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Shadows ───────────────────────────────────────────────────────────────
function DS_Shadows() {
  const t = window.GENESIS_TOKENS;
  return (
    <PageView badge="Foundations" title="Shadows" desc="Escala de elevación global: 0 → 4. La sombra comunica jerarquía, no decoración.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Elevation scale</h2>
          <p className="section-desc">5 niveles. Global, sin variación por marca.</p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", padding: "32px 0" }}>
          {t.elevation.map((shadow, i) => (
            <div key={i} style={{ width: 140, height: 140, background: "var(--brand-bg)", border: "1px solid var(--brand-border)", borderRadius: 12, boxShadow: shadow, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--brand-text-muted)" }}>elevation-{i}</span>
              {i === 0 && <span style={{ fontSize: 10, color: "var(--brand-text-muted)" }}>none</span>}
            </div>
          ))}
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Borders ───────────────────────────────────────────────────────────────
function DS_Borders({ brand }) {
  return (
    <PageView badge="Foundations" title="Borders" desc="El color --brand-border define la separación visual. Cambia por marca; el grosor siempre es 1px.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Border · {brand.name}</h2>
          <p className="section-desc">--brand-border en uso con distintos radios.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "border (default)",     style: { border: "1px solid var(--brand-border)" } },
            { label: "border + radius-sm",   style: { border: "1px solid var(--brand-border)", borderRadius: "var(--radius-sm)" } },
            { label: "border + radius-md",   style: { border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)" } },
            { label: "border + radius-lg",   style: { border: "1px solid var(--brand-border)", borderRadius: "var(--radius-lg)" } },
            { label: "border + radius-pill", style: { border: "1px solid var(--brand-border)", borderRadius: "var(--radius-pill)" } },
            { label: "primary border 2px",   style: { border: "2px solid var(--brand-primary)", borderRadius: "var(--radius-md)" } },
          ].map(({ label, style }) => (
            <div key={label} style={{ ...style, height: 80, background: "var(--brand-bg-elev)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--brand-text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Grid ──────────────────────────────────────────────────────────────────
function DS_Grid({ brand }) {

  const GRIDS = [
    {
      id: "mobile", label: "Mobile", breakpoint: "> 360px",
      screen: 360, content: 320, columns: 4, gutter: 16, margin: 20, elastic: false,
      colW: 68,
      layouts: [
        [{ span: 4, label: "4 columns" }],
        [{ span: 3, label: "3 columns" }, { span: 1, label: "1" }],
        [{ span: 1, label: "1" }, { span: 3, label: "3 columns" }],
        [{ span: 1, label: "1" }, { span: 1, label: "1" }, { span: 2, label: "2" }],
        [{ span: 2, label: "2" }, { span: 1, label: "1" }, { span: 1, label: "1" }],
      ],
    },
    {
      id: "tablet", label: "Tablet", breakpoint: "> 768px",
      screen: 768, content: 680, columns: 8, gutter: 16, margin: 44, elastic: false,
      colW: 71,
      layouts: [
        [{ span: 8, label: "8 columns" }],
        [{ span: 7, label: "7 columns" }, { span: 1, label: "1" }],
        [{ span: 6, label: "6 columns" }, { span: 2, label: "2 columns" }],
        [{ span: 5, label: "5 columns" }, { span: 3, label: "3 columns" }],
        [{ span: 4, label: "4 columns" }, { span: 4, label: "4 columns" }],
        [{ span: 3, label: "3 columns" }, { span: 3, label: "3 columns" }, { span: 2, label: "2 columns" }],
        [{ span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }],
        [{ span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }],
      ],
    },
    {
      id: "desktop", label: "Desktop", breakpoint: "> 1440px",
      screen: 1440, content: 1080, columns: 12, gutter: 16, margin: 180, elastic: false,
      colW: 75,
      layouts: [
        [{ span: 12, label: "12 columns" }],
        [{ span: 11, label: "11 columns" }, { span: 1, label: "1" }],
        [{ span: 10, label: "10 columns" }, { span: 2, label: "2" }],
        [{ span: 9, label: "9 columns" }, { span: 3, label: "3" }],
        [{ span: 8, label: "8 columns" }, { span: 4, label: "4 columns" }],
        [{ span: 6, label: "6 columns" }, { span: 6, label: "6 columns" }],
        [{ span: 4, label: "4 columns" }, { span: 4, label: "4 columns" }, { span: 4, label: "4 columns" }],
        [{ span: 3, label: "3" }, { span: 3, label: "3" }, { span: 3, label: "3" }, { span: 3, label: "3" }],
        [{ span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }, { span: 2, label: "2" }],
        [{ span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }, { span: 1, label: "1" }],
      ],
    },
  ];

  const SPEC_ROWS = (g) => [
    { label: "Screen width",   value: `${g.screen}px` },
    { label: "Content width",  value: `${g.content}px` },
    { label: "Columns",        value: g.columns },
    { label: "Gutter width",   value: `${g.gutter}px` },
    { label: "Margin",         value: `${g.margin}px` },
    { label: "Elastic grid",   value: g.elastic ? "Yes" : "No" },
  ];

  // Visual column preview (scaled down)
  function GridPreview({ g, scale = 0.6 }) {
    const totalW = g.content * scale;
    const colW = g.colW * scale;
    const gutW = g.gutter * scale;
    const cols = [];
    for (let i = 0; i < g.columns; i++) {
      cols.push(
        <div key={i} style={{
          width: colW, flexShrink: 0,
          background: "rgba(234,33,46,0.15)",
          borderLeft: "1px solid rgba(234,33,46,0.35)",
          borderRight: "1px solid rgba(234,33,46,0.35)",
        }} />
      );
      if (i < g.columns - 1) {
        cols.push(<div key={`g${i}`} style={{ width: gutW, flexShrink: 0 }} />);
      }
    }
    const marginW = g.margin * scale;
    return (
      <div style={{
        background: "var(--brand-bg-elev)", border: "1px solid var(--brand-border)",
        borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative",
        height: 160,
      }}>
        {/* Screen label */}
        <div style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          fontSize: 10, color: "var(--brand-text-muted)", fontFamily: "'IBM Plex Mono', monospace",
          background: "var(--brand-bg-elev)", padding: "0 6px", zIndex: 2, whiteSpace: "nowrap",
        }}>
          {g.label === "Desktop" ? `Regular screen = ${g.screen}` : `${g.label === "Mobile" ? "Small" : "Medium"} screen = ${g.screen}`}
        </div>
        {/* Margin indicators */}
        <div style={{
          position: "absolute", top: 24, left: 0, width: "100%", height: "calc(100% - 24px)",
          display: "flex",
        }}>
          {/* Left margin */}
          <div style={{
            width: marginW, flexShrink: 0, height: "100%",
            background: "repeating-linear-gradient(-45deg, rgba(234,33,46,0.06), rgba(234,33,46,0.06) 3px, transparent 3px, transparent 8px)",
            borderRight: "1px dashed rgba(234,33,46,0.3)",
            display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4,
          }}>
            <span style={{ fontSize: 8, color: "rgba(234,33,46,0.6)", fontFamily: "'IBM Plex Mono', monospace", writingMode: "vertical-rl" }}>{g.margin}px</span>
          </div>
          {/* Columns */}
          <div style={{ flex: 1, height: "100%", display: "flex", overflow: "hidden" }}>
            {cols}
          </div>
          {/* Right margin */}
          <div style={{
            width: marginW, flexShrink: 0, height: "100%",
            background: "repeating-linear-gradient(-45deg, rgba(234,33,46,0.06), rgba(234,33,46,0.06) 3px, transparent 3px, transparent 8px)",
            borderLeft: "1px dashed rgba(234,33,46,0.3)",
          }} />
        </div>
        {/* Gutter annotations */}
        <div style={{
          position: "absolute", top: 28, left: marginW + colW,
          fontSize: 8, color: "var(--brand-text-muted)", fontFamily: "'IBM Plex Mono', monospace",
          transform: "translateX(-50%)",
        }}>{g.gutter}px</div>
      </div>
    );
  }

  // Layout combination previews
  function LayoutOptions({ g }) {
    const totalCols = g.columns;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {g.layouts.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 2, height: 26 }}>
            {row.map((cell, ci) => (
              <div key={ci} style={{
                flex: cell.span,
                background: ci % 2 === 0 ? "var(--brand-primary-soft)" : "var(--brand-bg-elev)",
                border: `1px solid ${ci % 2 === 0 ? "var(--brand-primary)" : "var(--brand-border)"}`,
                borderRadius: "var(--radius-sm)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                <span style={{
                  fontSize: 9, fontFamily: "'IBM Plex Mono', monospace",
                  color: ci % 2 === 0 ? "var(--brand-primary)" : "var(--brand-text-muted)",
                  whiteSpace: "nowrap",
                }}>
                  {cell.span > 1 ? cell.span : ""}
                </span>
              </div>
            ))}
          </div>
        ))}
        {/* Column numbers */}
        <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
          {Array.from({ length: totalCols }).map((_, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              fontSize: 9, color: "var(--brand-text-muted)",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>{i + 1}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageView badge="Foundations" title="Grid"
      desc="Tres puntos de interrupción: Mobile, Tablet, Desktop. La cuadrícula proporciona un sistema de columnas flexible que ayuda a distribuir y alinear el contenido en cada resolución.">

      {/* ── Intro: 4-point grid system ── */}
      <div className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>4-point grid system</h2>
            <p style={{ fontSize: 14, color: "var(--brand-text-muted)", lineHeight: "22px", marginBottom: 16 }}>
              El sistema de cuadrícula de 4 puntos es un marco que le ayuda a colocar y organizar
              elementos en su diseño con precisión. La premisa es que cada espacio entre elementos
              debe ser divisible por cuatro (4, 8, 12, 16…).
            </p>
            <p style={{ fontSize: 14, color: "var(--brand-text-muted)", lineHeight: "22px" }}>
              El DS Génesis proporciona diseños adaptables en los puntos de interrupción 4 y 12
              columnas. La utilidad de la cuadrícula le ofrece la mayor flexibilidad posible para
              construir y controlar el tamaño de los elementos.
            </p>
          </div>
          <div style={{
            background: "var(--brand-bg-elev)", border: "1px solid var(--brand-border)",
            borderRadius: "var(--radius-md)", padding: 24,
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>Mostrar / ocultar cuadrícula</p>
            <p style={{ fontSize: 13, color: "var(--brand-text-muted)" }}>Panel de la derecha o combinación de teclas:</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["Ctrl", "+", "G"].map((k, i) => (
                <div key={k} style={{
                  padding: "6px 14px",
                  border: i !== 1 ? "1px solid var(--brand-border)" : "none",
                  borderRadius: i !== 1 ? 8 : 0,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 600,
                  color: "var(--brand-text)",
                  background: i !== 1 ? "var(--brand-bg)" : "transparent",
                  boxShadow: i !== 1 ? "0 2px 0 var(--brand-border)" : "none",
                }}>{k}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Breakpoint sections ── */}
      {GRIDS.map(g => (
        <div key={g.id} className="section">
          <div className="section-head">
            <h2 className="section-title">{g.label} <span style={{ fontSize: 14, fontWeight: 400, color: "var(--brand-text-muted)", marginLeft: 8, fontFamily: "'IBM Plex Mono', monospace" }}>{g.breakpoint}</span></h2>
            <p className="section-desc">Dimensiones de diseño recomendadas para {g.columns} columnas.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 280px", gap: 24, alignItems: "start" }}>

            {/* ── Spec table ── */}
            <div style={{
              border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)", overflow: "hidden",
            }}>
              {SPEC_ROWS(g).map(({ label, value }, i) => (
                <div key={label} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  borderBottom: i < SPEC_ROWS(g).length - 1 ? "1px solid var(--brand-border)" : "none",
                  background: i === 0 ? "var(--brand-bg-elev)" : "transparent",
                }}>
                  <div style={{ padding: "9px 12px", fontSize: 12, color: "var(--brand-text-muted)", borderRight: "1px solid var(--brand-border)" }}>
                    {label}
                  </div>
                  <div style={{ padding: "9px 12px", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: "var(--brand-text)", fontWeight: i === 0 ? 600 : 400 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Grid preview ── */}
            <GridPreview g={g} scale={g.id === "mobile" ? 1.0 : g.id === "tablet" ? 0.56 : 0.38} />

            {/* ── Layout options ── */}
            <div style={{
              border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)",
              padding: 16, background: "var(--brand-bg-elev)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>
                Layout options
              </p>
              <LayoutOptions g={g} />
            </div>
          </div>
        </div>
      ))}

    </PageView>
  );
}

// ─── DS_Icons ─────────────────────────────────────────────────────────────────
function DS_Icons() {
  const [activeSize, setActiveSize] = React.useState(24);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [copied, setCopied] = React.useState("");

  // ── Icon SVG library (24×24 viewBox, 1.5px stroke, round caps) ──────────
  const ICON_PATHS = {
    // ── Basic ──────────────────────────────────────────────────────────────
    "Home":        { d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" },
    "Search":      { d:"M11 19A8 8 0 1011 3a8 8 0 010 16zM21 21l-4.35-4.35", fill:false },
    "Settings":    { d:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
    "Bell":        { d:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" },
    "Star":        { d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" },
    "Heart":       { d:"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
    "Eye":         { d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" },
    "Lock":        { d:"M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" },
    "Bookmark":    { d:"M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" },
    "Calendar":    { d:"M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" },
    "Pin":         { d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z" },
    "Archive":     { d:"M21 8H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V10a2 2 0 00-2-2zM1 4h22v4H1zM10 16h4" },
    "Bin":         { d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" },
    "Copy":        { d:"M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2zM5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" },
    "Share":       { d:"M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" },
    "Download":    { d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" },
    "Upload":      { d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" },
    "Attachment":  { d:"M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" },
    "Bluetooth":   { d:"M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" },
    "Wifi":        { d:"M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" },
    // ── User ───────────────────────────────────────────────────────────────
    "User":        { d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" },
    "UserAdd":     { d:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6" },
    "UserCheck":   { d:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM17 11l2 2 4-4" },
    "UserCircle":  { d:"M20 21v-1a7 7 0 00-7-7h0a7 7 0 00-7 7v1M12 12a4 4 0 100-8 4 4 0 000 8zM3 21a9 9 0 1018 0" },
    "UserRemove":  { d:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM23 11h-6" },
    "Users":       { d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
    "UserSquare":  { d:"M20 21v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1M12 11a4 4 0 100-8 4 4 0 000 8zM3 3h18v18H3z" },
    "UserCardID":  { d:"M14 22H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v9M8 10h3M8 14h2M16 17l2 2 4-4" },
    // ── Arrow ──────────────────────────────────────────────────────────────
    "ArrowUp":     { d:"M12 19V5M5 12l7-7 7 7" },
    "ArrowDown":   { d:"M12 5v14M19 12l-7 7-7-7" },
    "ArrowLeft":   { d:"M19 12H5M12 19l-7-7 7-7" },
    "ArrowRight":  { d:"M5 12h14M12 5l7 7-7 7" },
    "ArrowUpRight":{ d:"M7 17L17 7M7 7h10v10" },
    "ArrowUpLeft": { d:"M17 17L7 7M7 17V7h10" },
    "ArrowCircleUp":   { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM8 12l4-4 4 4M12 16V8" },
    "ArrowCircleDown": { d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM16 12l-4 4-4-4M12 8v8" },
    "ArrowCircleLeft": { d:"M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM12 8l-4 4 4 4M8 12h8" },
    "ArrowCircleRight":{ d:"M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 12zM12 16l4-4-4-4M16 12H8" },
    "ArrowExpand": { d:"M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" },
    "ArrowShrink": { d:"M4 14h6v6M14 4h6v6M3 21l7-7M21 3l-7 7" },
    "Refresh":     { d:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" },
    // ── Warning ────────────────────────────────────────────────────────────
    "CircleInfo":      { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01" },
    "CircleCheck":     { d:"M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" },
    "CircleWarning":   { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 8v4M12 16h.01", fill:false },
    "CircleStop":      { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM15 9l-6 6M9 9l6 6" },
    "CircleQuestion":  { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" },
    "Triangle":        { d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" },
    "Octagon":         { d:"M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM12 8v4M12 16h.01" },
    "OctagonCheck":    { d:"M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM9 12l2 2 4-4" },
    // ── Media ──────────────────────────────────────────────────────────────
    "Play":        { d:"M5 3l14 9-14 9z" },
    "Pause":       { d:"M6 4h4v16H6zM14 4h4v16h-4z" },
    "Stop":        { d:"M4 4h16v16H4z" },
    "Camera":      { d:"M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z" },
    "Film":        { d:"M19.82 2H4.18A2.18 2.18 0 002 4.18v15.64A2.18 2.18 0 004.18 22h15.64A2.18 2.18 0 0022 19.82V4.18A2.18 2.18 0 0019.82 2zM7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" },
    "Volume":      { d:"M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" },
    "VolumeOff":   { d:"M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" },
    "Headphones":  { d:"M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3zM21 18a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" },
    "Microphone":  { d:"M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" },
    "Album":       { d:"M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z" },
    "Airplay":     { d:"M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2M12 15l5 6H7l5-6z" },
    "Forward":     { d:"M5 4l10 8-10 8zM19 5v14" },
    "Rewind":      { d:"M19 20L9 12l10-8zM5 19V5" },
    // ── File ───────────────────────────────────────────────────────────────
    "Cloud":       { d:"M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" },
    "CloudDownload":{ d:"M8 17l4 4 4-4M12 12v9M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" },
    "CloudUpload": { d:"M16 16l-4-4-4 4M12 12v9M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" },
    "Folder":      { d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" },
    "FolderOpen":  { d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2zM2 10h20" },
    "Document":    { d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" },
    "DocumentAdd": { d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M12 18v-6M9 15h6" },
    // ── Communication ──────────────────────────────────────────────────────
    "Chat":        { d:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
    "ChatAdd":     { d:"M14 2H5a2 2 0 00-2 2v12a2 2 0 002 2h4l3 3 3-3h4a2 2 0 002-2V8M19 1v6M16 4h6" },
    "Mail":        { d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
    "Phone":       { d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
    "BellRing":    { d:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0M2 8c0-3.31 1.34-6.31 3.51-8.49M20.49-.49A14.24 14.24 0 0124 8" },
    "BellOff":     { d:"M13.73 21a2 2 0 01-3.46 0M18.63 13A17.89 17.89 0 0118 8a6 6 0 00-9.33-5M10.34 6A6 6 0 0118 12c0 1.27.17 2.52.49 3.73M4 4l16 16M6 8A6.18 6.18 0 006 8c0 7-3 9-3 9h14" },
    // ── Store ──────────────────────────────────────────────────────────────
    "ShoppingBag": { d:"M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" },
    "ShoppingCart":{ d:"M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" },
    "CreditCard":  { d:"M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22" },
    "Award":       { d:"M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" },
    "Discount":    { d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" },
    "Delivery":    { d:"M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
    // ── System ─────────────────────────────────────────────────────────────
    "Smartphone":  { d:"M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" },
    "Monitor":     { d:"M23 3H1v13h22zM8 21h8M12 17v4" },
    "Battery":     { d:"M23 7h-1a2 2 0 00-2 2v6a2 2 0 002 2h1M1 7a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2H1zM6 11h4" },
    "Aperture":    { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" },
    "Wifi2":       { d:"M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" },
    "Briefcase":   { d:"M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4" },
    "Globe":       { d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" },
    "Book":        { d:"M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5z" },
    "Printer":     { d:"M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" },
    // ── Editor ─────────────────────────────────────────────────────────────
    "AlignLeft":   { d:"M17 10H3M21 6H3M21 14H3M17 18H3" },
    "AlignCenter": { d:"M18 10H6M21 6H3M21 14H3M18 18H6" },
    "AlignRight":  { d:"M21 10H7M21 6H3M21 14H3M21 18H7" },
    "AlignJustify":{ d:"M21 10H3M21 6H3M21 14H3M21 18H3" },
    "Bold":        { d:"M6 4h8a4 4 0 010 8H6V4zM6 12h9a4 4 0 010 8H6z" },
    "Italic":      { d:"M19 4h-9M14 20H5M15 4L9 20" },
    "Underline":   { d:"M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" },
    "Code":        { d:"M16 18l6-6-6-6M8 6l-6 6 6 6" },
    "Crop":        { d:"M6.13 1L6 16a2 2 0 002 2h15M1 6.13L16 6a2 2 0 012 2v15" },
    "Scissors":    { d:"M6 9A3 3 0 113 6a3 3 0 013 3zM6 15a3 3 0 103 3 3 3 0 00-3-3zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" },
    "Columns":     { d:"M12 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8zM12 3h8a1 1 0 011 1v16a1 1 0 01-1 1h-8zM12 3v18" },
    // ── Maths ──────────────────────────────────────────────────────────────
    "ChartBar":    { d:"M18 20V10M12 20V4M6 20v-6" },
    "ChartLine":   { d:"M3 3v18h18M18.7 8l-5.1 5-2.8-2.7L7 14.3" },
    "ChartPie":    { d:"M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" },
    "Equal":       { d:"M5 9h14M5 15h14" },
    "Percent":     { d:"M19 5L5 19M6.5 7.5a1 1 0 100-2 1 1 0 000 2zM17.5 18.5a1 1 0 100-2 1 1 0 000 2z", fill:false },
    "Minus":       { d:"M5 12h14" },
    "Plus":        { d:"M12 5v14M5 12h14" },
    "Hash":        { d:"M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" },
    // ── Weather ────────────────────────────────────────────────────────────
    "Sun":         { d:"M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" },
    "Moon":        { d:"M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" },
    "CloudRain":   { d:"M16 13H3a5 5 0 01-.16-10 6 6 0 0111.39 1.27A4.5 4.5 0 0121 9a4 4 0 01-1 7.87M8 19v3M8 22v1M12 19v3M12 22v1M16 19v3" },
    "CloudSnow":   { d:"M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01" },
    "Rainbow":     { d:"M22 17a10 10 0 00-20 0M6 17a6 6 0 0112 0M2 17h2M20 17h2" },
    "Wind":        { d:"M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" },
    // ── Social ─────────────────────────────────────────────────────────────
    "Instagram":   { d:"M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" },
    "Facebook":    { d:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
    "Twitter":     { d:"M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    "Linkedin":    { d:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
    "Figma":       { d:"M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12zM12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 01-7 0zM5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" },
    "Slack":       { d:"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zM20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5zM3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14zM14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5zM15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5zM8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" },
    "Google":      { d:"M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" },
    // ── Edit / Menu ────────────────────────────────────────────────────────
    "Edit":        { d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" },
    "Layers":      { d:"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
    "ListOrdered": { d:"M10 6H21M10 12H21M10 18H21M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" },
    "Hamburger":   { d:"M3 12h18M3 6h18M3 18h18" },
    "Hamburger2":  { d:"M3 6h18M3 12h12M3 18h18" },
  };

  // ── Category registry ────────────────────────────────────────────────────
  const CATEGORIES = {
    "Basic":         ["Home","Search","Settings","Bell","Star","Heart","Eye","Lock","Bookmark","Calendar","Pin","Archive","Bin","Copy","Share","Download","Upload","Attachment","Bluetooth","Wifi"],
    "User":          ["User","UserAdd","UserCheck","UserCircle","UserRemove","Users","UserSquare","UserCardID"],
    "Arrow":         ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ArrowUpRight","ArrowUpLeft","ArrowCircleUp","ArrowCircleDown","ArrowCircleLeft","ArrowCircleRight","ArrowExpand","ArrowShrink","Refresh"],
    "Warning":       ["CircleInfo","CircleCheck","CircleWarning","CircleStop","CircleQuestion","Triangle","Octagon","OctagonCheck"],
    "Media":         ["Play","Pause","Stop","Camera","Film","Volume","VolumeOff","Headphones","Microphone","Album","Airplay","Forward","Rewind"],
    "File":          ["Cloud","CloudDownload","CloudUpload","Folder","FolderOpen","Document","DocumentAdd"],
    "Communication": ["Chat","ChatAdd","Mail","Phone","BellRing","BellOff"],
    "Store":         ["ShoppingBag","ShoppingCart","CreditCard","Award","Discount","Delivery"],
    "System":        ["Smartphone","Monitor","Battery","Aperture","Wifi2","Briefcase","Globe","Book","Printer"],
    "Editor":        ["AlignLeft","AlignCenter","AlignRight","AlignJustify","Bold","Italic","Underline","Code","Crop","Scissors","Columns"],
    "Maths":         ["ChartBar","ChartLine","ChartPie","Equal","Percent","Minus","Plus","Hash"],
    "Weather":       ["Sun","Moon","CloudRain","CloudSnow","Rainbow","Wind"],
    "Social":        ["Instagram","Facebook","Twitter","Linkedin","Figma","Slack","Google"],
    "Edit":          ["Edit","Layers","ListOrdered","Hamburger","Hamburger2"],
  };

  // ── Filter logic ─────────────────────────────────────────────────────────
  const allIcons = Object.entries(CATEGORIES).flatMap(([cat, icons]) =>
    icons.map(name => ({ cat, name }))
  );
  const filtered = allIcons.filter(({ cat, name }) => {
    const matchCat = activeCategory === "All" || cat === activeCategory;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── Grouped for display ───────────────────────────────────────────────────
  const grouped = {};
  filtered.forEach(({ cat, name }) => {
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(name);
  });

  // ── Copy handler ─────────────────────────────────────────────────────────
  function handleCopy(name) {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(""), 1500);
  }

  // ── Render single icon ────────────────────────────────────────────────────
  function Icon({ name, size }) {
    const data = ICON_PATHS[name];
    if (!data) return null;
    const sw = size <= 16 ? 1.5 : size <= 24 ? 1.5 : 1.75;
    return (
      <svg
        width={size} height={size} viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      >
        <path d={data.d} />
      </svg>
    );
  }

  const SIZES = [16, 24, 32];
  const categories = ["All", ...Object.keys(CATEGORIES)];

  return (
    <PageView badge="Foundations" title="Icons"
      desc="Aquí hay un conjunto de iconos básicos. Los tamaños preestablecidos permiten controlar los iconos utilizados en el proyecto. Cada tamaño tiene su propio ancho de línea para compensación visual.">

      {/* ── Size demo ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Tamaños de icono</h2>
          <p className="section-desc">Todos los iconos se publican en tres tamaños. El trazo es siempre de <strong>1.5px</strong> para una correcta compensación visual.</p>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {SIZES.map(sz => (
            <div key={sz} style={{
              flex:"1 1 200px", background:"var(--brand-bg-elev)",
              border:"1px solid var(--brand-border)", borderRadius:8, padding:"24px 28px",
              display:"flex", flexDirection:"column", gap:16,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, fontWeight:700, fontFamily:"var(--brand-font-display)", color:"var(--brand-text)" }}>
                  Icón {sz}px
                </span>
                <span style={{
                  background:"var(--brand-bg)", border:"1px solid var(--brand-border)",
                  fontSize:11, padding:"2px 8px", borderRadius:4,
                  fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-text-muted)",
                }}>
                  Line: 1.5px
                </span>
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
                {["Home","Search","Bell","Star","User","Settings","Bookmark","Download"].map(name => (
                  <div key={name} style={{ color:"var(--brand-text)", display:"flex" }}>
                    <Icon name={name} size={sz} />
                  </div>
                ))}
              </div>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:11, color:"var(--brand-text-muted)", fontFamily:"'IBM Plex Mono',monospace",
              }}>
                <div style={{ width:sz, height:sz, border:"1px dashed var(--brand-border)", borderRadius:2, flexShrink:0 }} />
                {sz} × {sz}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Controls ── */}
      <div style={{
        position:"sticky", top:0, zIndex:10,
        background:"var(--brand-bg)", borderBottom:"1px solid var(--brand-border)",
        padding:"12px 0", marginBottom:24,
        display:"flex", gap:12, alignItems:"center", flexWrap:"wrap",
      }}>
        {/* Search */}
        <div style={{ position:"relative", flex:"1 1 200px", maxWidth:280 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-text-muted)" strokeWidth="1.5" strokeLinecap="round"
            style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar icono…"
            style={{
              width:"100%", padding:"7px 12px 7px 32px",
              border:"1px solid var(--brand-border)", borderRadius:"var(--radius-md)",
              fontSize:13, fontFamily:"var(--brand-font-body)", color:"var(--brand-text)",
              background:"var(--brand-bg)", outline:"none", boxSizing:"border-box",
            }}
          />
        </div>
        {/* Size toggle */}
        <div style={{ display:"flex", gap:4, background:"var(--brand-bg-elev)", padding:4, borderRadius:8 }}>
          {SIZES.map(sz => (
            <button key={sz} onClick={() => setActiveSize(sz)} style={{
              padding:"5px 14px", border:"none", borderRadius:6, cursor:"pointer",
              fontSize:12, fontWeight:600, fontFamily:"var(--brand-font-body)",
              background: activeSize === sz ? "var(--brand-primary)" : "transparent",
              color: activeSize === sz ? "var(--brand-on-primary)" : "var(--brand-text-muted)",
              transition:"all 0.15s",
            }}>
              {sz}px
            </button>
          ))}
        </div>
        {/* Count */}
        <span style={{ fontSize:12, color:"var(--brand-text-muted)", marginLeft:"auto", fontFamily:"'IBM Plex Mono',monospace" }}>
          {filtered.length} iconos
        </span>
      </div>

      {/* ── Category tabs ── */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:32 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding:"5px 14px", border:"1px solid",
            borderColor: activeCategory === cat ? "var(--brand-primary)" : "var(--brand-border)",
            borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:500,
            background: activeCategory === cat ? "var(--brand-primary-soft)" : "transparent",
            color: activeCategory === cat ? "var(--brand-primary)" : "var(--brand-text-muted)",
            transition:"all 0.12s",
          }}>
            {cat}
            {cat !== "All" && (
              <span style={{ marginLeft:5, opacity:0.6 }}>{CATEGORIES[cat]?.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Icon grid by category ── */}
      {Object.entries(grouped).length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"var(--brand-text-muted)", fontSize:14 }}>
          No se encontraron iconos para "{search}"
        </div>
      ) : (
        Object.entries(grouped).map(([cat, icons]) => (
          <div key={cat} className="section" style={{ marginBottom:40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <span style={{
                fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
                color:"var(--brand-text-muted)", fontFamily:"var(--brand-font-display)",
              }}>{cat}</span>
              <span style={{
                fontSize:11, color:"var(--brand-text-muted)", fontFamily:"'IBM Plex Mono',monospace",
                background:"var(--brand-bg-elev)", padding:"1px 8px", borderRadius:4,
              }}>{icons.length}</span>
              <div style={{ flex:1, height:1, background:"var(--brand-border)" }} />
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {icons.map(name => (
                <button
                  key={name}
                  title={name}
                  onClick={() => handleCopy(name)}
                  style={{
                    width: activeSize + 32, minHeight: activeSize + 32,
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                    gap:4, border:"1px solid",
                    borderColor: copied === name ? "var(--brand-primary)" : "var(--brand-border)",
                    borderRadius:8, cursor:"pointer", padding:"8px 4px",
                    background: copied === name ? "var(--brand-primary-soft)" : "var(--brand-bg)",
                    color: copied === name ? "var(--brand-primary)" : "var(--brand-text)",
                    transition:"all 0.12s",
                    position:"relative",
                  }}
                >
                  <Icon name={name} size={activeSize} />
                  {copied === name && (
                    <span style={{ fontSize:9, color:"var(--brand-primary)", fontFamily:"'IBM Plex Mono',monospace", position:"absolute", bottom:3 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

    </PageView>
  );
}

// ─── DS_Versions ──────────────────────────────────────────────────────────────
function DS_Versions() {

  const imgMedia = "http://localhost:3845/assets/0228f5cf0d5423d1522490d442b2b90ecf39205e.png";

  // ── Shared section layout: left text | right demo ─────────────────────
  function InfoSection({ title, children, demo }) {
    return (
      <div className="section">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          {/* Left */}
          <div>
            <h2 style={{
              fontSize:32, fontWeight:400, margin:"0 0 24px 0", lineHeight:1.2,
              fontFamily:"var(--brand-font-display)",
            }}>{title}</h2>
            <div style={{ fontSize:15, lineHeight:1.7, color:"var(--brand-text)" }}>
              {children}
            </div>
          </div>
          {/* Right demo */}
          {demo && (
            <div style={{
              background:"#F4F4F4", borderRadius:8, padding:40,
              minHeight:240, display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {demo}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── SemVer diagram ────────────────────────────────────────────────────
  function SemVerDiagram() {
    const keyStyle = {
      display:"inline-flex", alignItems:"flex-end", justifyContent:"center",
      width:96, height:48, padding:"8px 16px",
      border:"1.5px solid var(--brand-text)", borderRadius:12,
      fontSize:22, fontWeight:400, fontFamily:"var(--brand-font-display)",
      color:"var(--brand-text)",
    };
    const dotStyle = {
      display:"inline-flex", alignItems:"flex-end", justifyContent:"center",
      height:48, padding:"0 4px",
      fontSize:40, lineHeight:1, color:"var(--brand-text)",
    };
    const labelStyle = {
      display:"inline-flex", alignItems:"flex-end", justifyContent:"center",
      width:96, height:48, padding:"8px 16px",
      border:"1.5px solid var(--brand-text)", borderRadius:12,
      fontSize:13, fontWeight:400, fontFamily:"var(--brand-font-display)",
      color:"var(--brand-text-muted)",
    };
    const arrow = (
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:32 }}>
        <svg width="12" height="32" viewBox="0 0 12 32" fill="none">
          <line x1="6" y1="0" x2="6" y2="26" stroke="var(--brand-text)" strokeWidth="1.5"/>
          <path d="M2 22l4 8 4-8" stroke="var(--brand-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
    const segments = ["1", "2", "0"];
    const labels = ["major", "minor", "patch"];
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, width:"100%" }}>
        {/* Numbers row */}
        <div style={{ display:"flex", alignItems:"flex-end" }}>
          {segments.map((n, i) => (
            <React.Fragment key={i}>
              <div style={keyStyle}>{n}</div>
              {i < 2 && <div style={dotStyle}>.</div>}
            </React.Fragment>
          ))}
        </div>
        {/* Arrows */}
        <div style={{ display:"flex", alignItems:"center" }}>
          {[0,1,2].map(i => (
            <React.Fragment key={i}>
              <div style={{ width:96, display:"flex", justifyContent:"center" }}>{arrow}</div>
              {i < 2 && <div style={{ width:16 }} />}
            </React.Fragment>
          ))}
        </div>
        {/* Labels row */}
        <div style={{ display:"flex", alignItems:"flex-end" }}>
          {labels.map((l, i) => (
            <React.Fragment key={i}>
              <div style={labelStyle}>{l}</div>
              {i < 2 && <div style={dotStyle}>.</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ── Component version badge + preview ────────────────────────────────
  function ComponentPreview() {
    return (
      <div style={{ width:"100%", position:"relative" }}>
        <div style={{
          display:"inline-flex", alignItems:"center",
          border:"1px solid #D0D0D0", borderRadius:12, background:"#fff",
          padding:"8px 20px", marginBottom:16,
          fontSize:20, fontFamily:"var(--brand-font-display)", color:"var(--brand-text)",
          boxShadow:"0 1px 3px rgba(0,0,0,0.06)",
        }}>
          Button v1.1.0
        </div>
        <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid #E6E8EC" }}>
          <img
            src={imgMedia}
            alt="Button component preview"
            style={{ width:"100%", display:"block", objectFit:"cover" }}
          />
        </div>
      </div>
    );
  }

  // ── Changelog table ──────────────────────────────────────────────────
  function ChangelogTable() {
    const rows = [
      { version:"v1.2.0", changes:"Minor",  date:"28.03.2025", desc:"Some info about changes" },
      { version:"v1.1.0", changes:"Minor",  date:"11.03.2025", desc:"Some info about changes" },
      { version:"v1.0.0", changes:"—",      date:"07.01.2025", desc:"Some info about changes" },
    ];
    const thStyle = {
      padding:"12px 16px", textAlign:"left", fontWeight:700, fontSize:13,
      color:"var(--brand-text)", background:"var(--brand-bg)",
      borderBottom:"1px solid var(--brand-border)", letterSpacing:"0.02em",
      fontFamily:"var(--brand-font-display)",
    };
    const tdStyle = {
      padding:"12px 16px", fontSize:13, color:"var(--brand-text)",
      borderBottom:"1px solid var(--brand-border)",
      fontFamily:"var(--brand-font-body)",
    };
    return (
      <div style={{ width:"100%", overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", background:"#fff", border:"1px solid var(--brand-border)", borderRadius:8, overflow:"hidden" }}>
          <thead>
            <tr>
              <th style={thStyle}>Version ↑</th>
              <th style={thStyle}>Changes</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
                <td style={{ ...tdStyle, fontFamily:"'IBM Plex Mono', monospace", fontWeight:600, color:"var(--brand-primary)" }}>{r.version}</td>
                <td style={tdStyle}>
                  <span style={{
                    background: r.changes === "Minor" ? "var(--brand-primary-soft)" : "#F1F3F5",
                    color: r.changes === "Minor" ? "var(--brand-primary)" : "var(--brand-text-muted)",
                    padding:"2px 10px", borderRadius:20, fontSize:12, fontWeight:600,
                  }}>{r.changes}</span>
                </td>
                <td style={{ ...tdStyle, color:"var(--brand-text-muted)", fontFamily:"'IBM Plex Mono', monospace", fontSize:12 }}>{r.date}</td>
                <td style={{ ...tdStyle, color:"var(--brand-text-muted)" }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const divider = <div style={{ height:1, background:"var(--brand-border)", margin:"0 0 40px 0" }} />;

  return (
    <PageView badge="Foundations" title="Versions"
      desc="Versionado semántico (SemVer) — cómo los componentes del sistema de diseño se versionan, documentan y distribuyen.">

      {/* ── Intro ── */}
      <div style={{
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        borderRadius:8, padding:"20px 28px", marginBottom:40,
        fontSize:15, lineHeight:1.7, color:"var(--brand-text)",
      }}>
        El versionado semántico (SemVer) es el estándar más común para el versionado de componentes.
      </div>

      {/* ── Ejemplo ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Ejemplo</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
          {[
            { comp:"Button", ver:"v2.3.1", major:2, minor:3, patch:1 },
            { comp:"Input",  ver:"v1.1.0", major:1, minor:1, patch:0 },
            { comp:"Modal",  ver:"v1.0.0", major:1, minor:0, patch:0 },
          ].map(c => (
            <div key={c.comp} style={{
              border:"1px solid var(--brand-border)", borderRadius:8,
              padding:"20px 24px", background:"var(--brand-bg)",
            }}>
              <div style={{ fontSize:12, color:"var(--brand-text-muted)", marginBottom:8, fontFamily:"'IBM Plex Mono',monospace", letterSpacing:"0.04em" }}>COMPONENT</div>
              <div style={{ fontSize:18, fontWeight:700, fontFamily:"var(--brand-font-display)", marginBottom:12, color:"var(--brand-text)" }}>{c.comp}</div>
              <div style={{ display:"flex", gap:4, alignItems:"flex-end" }}>
                {["major","minor","patch"].map((p,i) => (
                  <React.Fragment key={p}>
                    <div style={{
                      display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    }}>
                      <span style={{
                        fontSize:11, color:"var(--brand-text-muted)", fontFamily:"'IBM Plex Mono',monospace",
                        letterSpacing:"0.03em",
                      }}>{p}</span>
                      <span style={{
                        width:36, height:36, border:"1.5px solid var(--brand-border)",
                        borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:16, fontWeight:700, color:"var(--brand-primary)",
                        fontFamily:"var(--brand-font-display)",
                      }}>
                        {[c.major,c.minor,c.patch][i]}
                      </span>
                    </div>
                    {i < 2 && <span style={{ fontSize:20, color:"var(--brand-text-muted)", marginBottom:4, lineHeight:1 }}>.</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          background:"var(--brand-bg-elev)", borderRadius:8, padding:"20px 24px",
          fontSize:14, lineHeight:1.7, color:"var(--brand-text-muted)",
          border:"1px solid var(--brand-border)",
        }}>
          <p style={{ margin:"0 0 8px 0" }}>Cuando se agrega nueva funcionalidad al componente <strong style={{ color:"var(--brand-text)" }}>Input</strong> sin romper compatibilidad, su versión pasa a <code style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-primary)" }}>v1.2.0</code>.</p>
          <p style={{ margin:0 }}>Si se realizan cambios que rompen compatibilidad en <strong style={{ color:"var(--brand-text)" }}>Modal</strong>, su versión aumenta a <code style={{ fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-primary)" }}>v2.0.0</code>.</p>
        </div>
      </div>

      {/* ═══ 1 · Versionado Semántico ═══ */}
      <div className="section">
        {divider}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:600, margin:"0 0 20px 0", fontFamily:"var(--brand-font-display)" }}>Versionado Semántico</h2>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              El versionado semántico (SemVer) es un enfoque estándar para la gestión de versiones ampliamente utilizado en programación y desarrollo de sistemas de diseño. Una versión consta de tres números: <strong>MAJOR.MINOR.PATCH</strong>.
            </p>
            <ul style={{ margin:0, padding:"0 0 0 20px", fontSize:14, lineHeight:1.8, color:"var(--brand-text)" }}>
              <li style={{ marginBottom:8 }}><strong>MAJOR:</strong> Se incrementa cuando los cambios rompen la compatibilidad con versiones anteriores.</li>
              <li style={{ marginBottom:8 }}><strong>MINOR:</strong> Se incrementa cuando se añade nueva funcionalidad sin romper la compatibilidad.</li>
              <li><strong>PATCH:</strong> Se incrementa cuando se realizan correcciones de errores sin romper la compatibilidad.</li>
            </ul>
          </div>
          <div style={{ background:"#F4F4F4", borderRadius:8, padding:40, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <SemVerDiagram />
          </div>
        </div>
      </div>

      {/* ═══ 2 · Versiones Individuales ═══ */}
      <div className="section">
        {divider}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:600, margin:"0 0 20px 0", fontFamily:"var(--brand-font-display)" }}>Versiones Individuales para Cada Componente</h2>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              Cada componente del sistema de diseño puede tener su propia versión. Esto permite que los componentes se actualicen independientemente unos de otros.
            </p>
            <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              Por ejemplo, si el componente Botón obtiene una nueva funcionalidad, su versión puede aumentar de 1.2.0 a 1.3.0, mientras que otros componentes permanecen sin cambios.
            </p>
          </div>
          <div style={{ background:"#F4F4F4", borderRadius:8, padding:32 }}>
            <ComponentPreview />
          </div>
        </div>
      </div>

      {/* ═══ 3 · Gestión de dependencias ═══ */}
      <div className="section">
        {divider}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:600, margin:"0 0 20px 0", fontFamily:"var(--brand-font-display)" }}>Gestión de dependencias</h2>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              El uso de administradores de paquetes como npm o yarn ayuda a gestionar las dependencias y versiones de los componentes. Esto facilita la actualización de los componentes y el seguimiento de las versiones que se utilizan en el proyecto.
            </p>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              El soporte de la compatibilidad con versiones anteriores — o la indicación explícita de incompatibilidades — ayuda a los usuarios del sistema de diseño a realizar una transición fluida a las nuevas versiones.
            </p>
            <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              En algunos casos, puede ser beneficioso proporcionar una política para mantener varias versiones activas.
            </p>
          </div>
          {/* Right: package manager concept */}
          <div style={{ background:"#F4F4F4", borderRadius:8, padding:32, display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { cmd:"npm install @genesis-ds/button@1.3.0", type:"install" },
              { cmd:"npm install @genesis-ds/input@1.2.0",  type:"install" },
              { cmd:"npm install @genesis-ds/modal@2.0.0",  type:"install" },
            ].map((c,i) => (
              <div key={i} style={{
                background:"#1A1A1A", borderRadius:6, padding:"10px 16px",
                fontFamily:"'IBM Plex Mono', monospace", fontSize:12,
                color:"#A8D08D", display:"flex", alignItems:"center", gap:8,
              }}>
                <span style={{ color:"#7CB8FF", userSelect:"none" }}>$</span>
                <span>{c.cmd}</span>
              </div>
            ))}
            <div style={{ marginTop:8, fontSize:12, color:"var(--brand-text-muted)", lineHeight:1.6 }}>
              Instala versiones específicas de cada componente de forma independiente.
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 4 · Changelog ═══ */}
      <div className="section">
        {divider}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:600, margin:"0 0 20px 0", fontFamily:"var(--brand-font-display)" }}>Documento de Cambios.<br/>Registro de Cambios</h2>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              Cada cambio en los componentes debe documentarse en un registro de cambios.
            </p>
            <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              Esto permite a los usuarios del sistema de diseño rastrear fácilmente qué cambios se realizaron en cada versión y cuáles pueden afectar sus proyectos.
            </p>
          </div>
          <div style={{ background:"#F4F4F4", borderRadius:8, padding:32 }}>
            <ChangelogTable />
          </div>
        </div>
      </div>

      {/* ═══ 5 · Pruebas & Lanzamientos ═══ */}
      <div className="section">
        {divider}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:600, margin:"0 0 20px 0", fontFamily:"var(--brand-font-display)" }}>Pruebas Automatizadas.<br/>Gestión de Lanzamientos</h2>
            <p style={{ margin:"0 0 16px 0", fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              La implementación de pruebas automatizadas garantiza que las actualizaciones de los componentes no interrumpan la funcionalidad existente. Esto es especialmente importante al lanzar nuevas versiones principales.
            </p>
            <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:"var(--brand-text)" }}>
              El enfoque de gestión de lanzamientos puede incluir estrategias como lanzamientos canary o pruebas A/B para minimizar los riesgos al lanzar nuevas versiones de componentes.
            </p>
          </div>
          {/* Right: release strategy cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { icon:"🐤", label:"Canary Release", desc:"Lanza a un subconjunto pequeño de usuarios antes del despliegue general." },
              { icon:"🧪", label:"A/B Testing",    desc:"Dos versiones en paralelo; mide impacto antes de consolidar." },
              { icon:"🔄", label:"Rolling Update", desc:"Actualización gradual componente a componente sin downtime." },
              { icon:"🔖", label:"Semver Tags",    desc:"Tags git alineados con la versión publicada en el registry." },
            ].map(s => (
              <div key={s.label} style={{
                background:"var(--brand-bg)", border:"1px solid var(--brand-border)",
                borderRadius:8, padding:"16px 20px",
              }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--brand-text)", marginBottom:4 }}>{s.label}</div>
                <div style={{ fontSize:12, color:"var(--brand-text-muted)", lineHeight:1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </PageView>
  );
}

// ─── DS_Accessibility ─────────────────────────────────────────────────────────
function DS_Accessibility({ brand }) {

  // ── Inner: Pass/Fail badge pair ──────────────────────────────────────────
  function BadgePair({ pass, contrastLabel }) {
    return (
      <div style={{ display:"flex", gap:4, alignItems:"center", marginBottom:16 }}>
        <span style={{
          background: pass ? "#1EB100" : "#D30519",
          color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
          padding:"2px 8px", borderRadius:4, textTransform:"uppercase",
          fontFamily:"'IBM Plex Sans', sans-serif",
        }}>
          {pass ? "PASS" : "FAIL"}
        </span>
        <span style={{
          background:"#fff", border:"1px solid #E6E8EC",
          fontSize:11, padding:"2px 8px", borderRadius:4,
          fontFamily:"'IBM Plex Sans', sans-serif", color:"#3E4148",
          whiteSpace:"nowrap",
        }}>
          <strong style={{ textTransform:"uppercase", letterSpacing:"0.04em" }}>Contrast</strong>
          {" "}{contrastLabel}
        </span>
      </div>
    );
  }

  // ── Inner: text demo row ─────────────────────────────────────────────────
  function TextRow({ px, label, weight, color }) {
    return (
      <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:6 }}>
        <span style={{
          fontFamily:"'IBM Plex Mono', monospace", fontSize:11, letterSpacing:"0.04em",
          color:"#5A5E66", width:36, flexShrink:0,
        }}>
          {px}PX
        </span>
        <span style={{
          fontSize:px, fontWeight: weight || 400, color: color || "var(--brand-text)",
          fontFamily:"'IBM Plex Sans', sans-serif", lineHeight:1.4,
        }}>
          {label}
        </span>
      </div>
    );
  }

  // ── Inner: button demo rows ──────────────────────────────────────────────
  function ButtonDemo({ pass }) {
    const btns = [
      { px: "16", bg: pass ? "#14161B" : "#c8c8c8", text: pass ? "#fff" : "#f0f0f0", label:"Button" },
      { px: "14", bg: pass ? "#2D2D2D" : "#d4d4d4", text: pass ? "#fff" : "#f2f2f2", label:"Button" },
      { px: "13", color: pass ? "#14161B" : "#c0bdbd", label:"Button" },
    ];
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {btns.map((b, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{
              fontFamily:"'IBM Plex Mono', monospace", fontSize:11, letterSpacing:"0.04em",
              color:"#5A5E66", width:36, flexShrink:0,
            }}>
              {b.px}PX
            </span>
            {b.bg ? (
              <div style={{
                background: b.bg, padding:"8px 16px", borderRadius:4,
                fontSize: parseInt(b.px), fontWeight:600,
                color: b.text, fontFamily:"'IBM Plex Sans', sans-serif",
              }}>
                {b.label}
              </div>
            ) : (
              <span style={{
                fontSize: parseInt(b.px), fontWeight:400, color: b.color,
                fontFamily:"'IBM Plex Sans', sans-serif",
              }}>
                {b.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ── Inner: icon row ──────────────────────────────────────────────────────
  function IconRow({ pass }) {
    const col = pass ? "#14161B" : "#c0bdbd";
    return (
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {[
          // user
          <svg key="user" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke={col} strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={col} strokeWidth="1.5" strokeLinecap="round"/></svg>,
          // trash
          <svg key="trash" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M8 5V3h4v2M5 5l1 12h8l1-12" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          // settings
          <svg key="settings" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2.5" stroke={col} strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke={col} strokeWidth="1.5" strokeLinecap="round"/></svg>,
          // search
          <svg key="search" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5" stroke={col} strokeWidth="1.5"/><path d="M16 16l-3.5-3.5" stroke={col} strokeWidth="1.5" strokeLinecap="round"/></svg>,
          // arrow
          <svg key="arrow" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          // volume
          <svg key="vol" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 7H2v6h2l5 4V3L4 7z" fill={col}/><path d="M14 7c1.1.9 1.8 2.3 1.8 3.9S15.1 14 14 15" stroke={col} strokeWidth="1.5" strokeLinecap="round"/></svg>,
          // filter
          <svg key="filter" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M6 10h8M9 15h2" stroke={col} strokeWidth="1.5" strokeLinecap="round"/></svg>,
        ]}
      </div>
    );
  }

  // ── Inner: checkbox + radio demo ─────────────────────────────────────────
  function CheckRadioDemo({ pass }) {
    const bord = pass ? "#3E4148" : "#c0bdbd";
    const chkBg = pass ? "#14161B" : "#c0bdbd";
    const txtCol = pass ? "#14161B" : "#c0bdbd";
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:18, height:18, border:`2px solid ${bord}`,
            background: chkBg, borderRadius:2, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize:14, color:txtCol, fontFamily:"'IBM Plex Sans', sans-serif" }}>Checkbox</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:18, height:18, border:`2px solid ${bord}`,
            borderRadius:"50%", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background: chkBg }} />
          </div>
          <span style={{ fontSize:14, color:txtCol, fontFamily:"'IBM Plex Sans', sans-serif" }}>Radiobutton</span>
        </div>
      </div>
    );
  }

  // ── Inner: input demo ────────────────────────────────────────────────────
  function InputDemo({ pass }) {
    const bord = pass ? "#3E4148" : "#c0bdbd";
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{
          border:`1.5px solid ${bord}`, borderRadius:4, padding:"6px 10px",
          fontSize:14, color: pass ? "#14161B" : "#c0bdbd",
          fontFamily:"'IBM Plex Sans', sans-serif", background:"#fff",
        }}>
          Label
        </div>
        <div style={{
          border:`1.5px solid ${bord}`, borderRadius:4, padding:"6px 10px",
          fontSize:14, color: pass ? "#14161B" : "#c0bdbd",
          fontFamily:"'IBM Plex Sans', sans-serif", background:"#fff",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke={pass ? "#3E4148" : "#c0bdbd"} strokeWidth="1.5"/>
            <path d="M13 13l-3-3" stroke={pass ? "#3E4148" : "#c0bdbd"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ color: pass ? "#A7ABB3" : "#d8d8d8" }}>Search…</span>
        </div>
      </div>
    );
  }

  // ── Inner: full contrast demo block ─────────────────────────────────────
  function ContrastDemo({ level }) {
    const isAA  = level === "AA";
    const isAAA = level === "AAA";
    const passLargeLabel  = isAA  ? "≥ 3.0 : 1" : "≥ 4.5 : 1";
    const failLargeLabel  = isAA  ? "< 3.0 : 1" : "< 4.5 : 1";
    const passNormalLabel = isAA  ? "≥ 4.5 : 1" : "≥ 7.0 : 1";
    const failNormalLabel = isAA  ? "< 4.5 : 1" : "< 7.0 : 1";
    const PASS_COL = "#14161B";
    const FAIL_COL = "#c0bdbd";

    const colStyle = {
      flex: "0 0 calc(50% - 8px)", display:"flex", flexDirection:"column", gap:24,
    };

    return (
      <div style={{ background:"#F4F4F4", borderRadius:6, padding:32, display:"flex", gap:16 }}>
        {/* PASS column */}
        <div style={colStyle}>
          {/* Large text */}
          <div>
            <BadgePair pass={true} contrastLabel={passLargeLabel} />
            <TextRow px={24} label="Large Text" color={PASS_COL} />
            <TextRow px={19} label="Large Text" weight={700} color={PASS_COL} />
          </div>
          {/* Normal text */}
          <div>
            <BadgePair pass={true} contrastLabel={passNormalLabel} />
            <TextRow px={16} label="Normal Text" color={PASS_COL} />
            <TextRow px={14} label="Normal Text" color={PASS_COL} />
          </div>
          {/* Buttons */}
          <div>
            <BadgePair pass={true} contrastLabel={passNormalLabel} />
            <ButtonDemo pass={true} />
          </div>
        </div>

        {/* FAIL column */}
        <div style={colStyle}>
          {/* Large text */}
          <div>
            <BadgePair pass={false} contrastLabel={failLargeLabel} />
            <TextRow px={24} label="Large Text" color={FAIL_COL} />
            <TextRow px={19} label="Large Text" weight={700} color={FAIL_COL} />
          </div>
          {/* Normal text */}
          <div>
            <BadgePair pass={false} contrastLabel={failNormalLabel} />
            <TextRow px={16} label="Normal Text" color={FAIL_COL} />
            <TextRow px={14} label="Normal Text" color={FAIL_COL} />
          </div>
          {/* Buttons */}
          <div>
            <BadgePair pass={false} contrastLabel={failNormalLabel} />
            <ButtonDemo pass={false} />
          </div>
        </div>
      </div>
    );
  }

  // ── Inner: non-text contrast demo ───────────────────────────────────────
  function NonTextDemo() {
    const colStyle = {
      flex: "0 0 calc(50% - 8px)", display:"flex", flexDirection:"column", gap:24,
    };
    const PASS_LABEL = "≥ 3.0 : 1";
    const FAIL_LABEL = "< 3.0 : 1";
    return (
      <div style={{ background:"#F4F4F4", borderRadius:6, padding:32, display:"flex", gap:16 }}>
        {/* PASS */}
        <div style={colStyle}>
          <div>
            <BadgePair pass={true} contrastLabel={PASS_LABEL} />
            <IconRow pass={true} />
          </div>
          <div>
            <BadgePair pass={true} contrastLabel={PASS_LABEL} />
            <CheckRadioDemo pass={true} />
          </div>
          <div>
            <BadgePair pass={true} contrastLabel={PASS_LABEL} />
            <InputDemo pass={true} />
          </div>
        </div>
        {/* FAIL */}
        <div style={colStyle}>
          <div>
            <BadgePair pass={false} contrastLabel={FAIL_LABEL} />
            <IconRow pass={false} />
          </div>
          <div>
            <BadgePair pass={false} contrastLabel={FAIL_LABEL} />
            <CheckRadioDemo pass={false} />
          </div>
          <div>
            <BadgePair pass={false} contrastLabel={FAIL_LABEL} />
            <InputDemo pass={false} />
          </div>
        </div>
      </div>
    );
  }

  // ── Shared section wrapper ───────────────────────────────────────────────
  const divider = (
    <div style={{ height:1, background:"var(--brand-border)", margin:"0 0 40px 0" }} />
  );
  const sectionHead = (title, bold) => (
    <h2 style={{
      fontSize:32, fontWeight:400, margin:"0 0 20px 0", lineHeight:1.2,
      fontFamily:"var(--brand-font-display)",
    }}>
      {title}{bold && <strong style={{ fontWeight:700 }}>{bold}</strong>}
    </h2>
  );

  // ── Subscription bar ─────────────────────────────────────────────────────
  const subscriptionBar = (
    <div style={{
      background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
      borderRadius:8, padding:"24px 32px", marginBottom:40, lineHeight:1.6, fontSize:15,
      color:"var(--brand-text)",
    }}>
      <p style={{ margin:0 }}>El cumplimiento de los requisitos de la WCAG garantiza que el texto sea legible y que los controles (y los gráficos) sean distinguibles para todos, incluidas las personas con discapacidad visual. La relación de contraste se calcula entre el primer plano y el fondo del elemento.</p>
      <p style={{ margin:"12px 0 0 0" }}>Todas las combinaciones de colores del proyecto cumplen los requisitos de contraste AA.</p>
    </div>
  );

  return (
    <PageView badge="Foundations" title="Accessibility"
      desc="Pautas de Accesibilidad al Contenido Web (WCAG) — contraste de color, texto y elementos no-texto.">

      {/* ── WCAG intro ── */}
      {subscriptionBar}

      {/* ── About WCAG ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">¿Qué es WCAG?</h2>
          <p className="section-desc">
            Las Pautas de Accesibilidad al Contenido Web (WCAG) son recomendaciones internacionales para mejorar la accesibilidad de servicios digitales para todos, incluyendo personas con discapacidades en la visión, audición, movilidad y cognición.
          </p>
        </div>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:16,
        }}>
          {[
            { version:"WCAG 2.0", date:"11 dic 2008", href:"https://www.w3.org/TR/WCAG20/", desc:"Publicación original. Base de todos los estándares posteriores." },
            { version:"WCAG 2.1", date:"5 jun 2018",  href:"https://www.w3.org/TR/WCAG21/", desc:"Incluye todos los criterios de 2.0 + 17 criterios adicionales." },
            { version:"WCAG 2.2", date:"Draft 2023",  href:"https://www.w3.org/TR/WCAG22/", desc:"Proporciona 9 criterios de éxito adicionales sobre 2.1." },
            null,
          ].filter(Boolean).map(item => (
            <a key={item.version} href={item.href} target="_blank" rel="noreferrer" style={{
              display:"block", padding:"20px 24px",
              border:"1px solid var(--brand-border)", borderRadius:8,
              background:"var(--brand-bg)", textDecoration:"none",
              transition:"border-color 0.15s",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{
                  fontSize:15, fontWeight:700, color:"var(--brand-primary)",
                  fontFamily:"var(--brand-font-display)",
                }}>{item.version}</span>
                <span style={{ fontSize:11, color:"var(--brand-text-muted)", fontFamily:"'IBM Plex Mono',monospace" }}>{item.date}</span>
              </div>
              <p style={{ margin:0, fontSize:13, color:"var(--brand-text-muted)", lineHeight:1.5 }}>{item.desc}</p>
            </a>
          ))}
        </div>
        {/* Disability categories */}
        <div style={{ marginTop:24, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { icon:"👁", label:"Visión", desc:"Ceguera, baja visión, daltonismo" },
            { icon:"👂", label:"Audición", desc:"Sordera, problemas de audición" },
            { icon:"🖐", label:"Movilidad", desc:"Dificultad con mouse o teclado" },
            { icon:"🧠", label:"Cognitivo", desc:"Dislexia, autismo, aprendizaje" },
          ].map(c => (
            <div key={c.label} style={{
              background:"var(--brand-bg-elev)", borderRadius:8,
              padding:"16px 20px", border:"1px solid var(--brand-border)",
            }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
              <div style={{ fontSize:13, fontWeight:600, color:"var(--brand-text)", marginBottom:4 }}>{c.label}</div>
              <div style={{ fontSize:12, color:"var(--brand-text-muted)", lineHeight:1.4 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Text Contrast AA ═══════════════════════════════════════════════ */}
      <div className="section">
        {divider}
        <div className="section-head">
          {sectionHead("Text Contrast ", "AA")}
          <div className="section-desc" style={{ marginBottom:16 }}>
            <p style={{ margin:"0 0 8px 0" }}>El texto grande debe tener un contraste mínimo de <strong>3.0:1</strong>. Se define como texto de 18pt (24px) o más; 14pt (19px) en negrita o más.</p>
            <p style={{ margin:"0 0 8px 0" }}>El texto normal debe tener un contraste mínimo de <strong>4.5:1</strong>. Se define como texto de menos de 18pt (24px).</p>
            <p style={{ margin:"0 0 12px 0" }}>Estos requisitos también aplican cuando el texto se superpone a una imagen o vídeo.</p>
            <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
               target="_blank" rel="noreferrer"
               style={{ color:"var(--brand-primary)", fontSize:14, fontWeight:600, textDecoration:"none" }}>
              🔗 Criterio de éxito 1.4.3
            </a>
          </div>
        </div>

        <ContrastDemo level="AA" />

        {/* Puntos vs pixels card */}
        <div style={{
          marginTop:24, border:"1px solid var(--brand-border)", borderRadius:8, overflow:"hidden",
        }}>
          <div style={{ padding:"24px 32px", background:"var(--brand-bg-elev)" }}>
            <h3 style={{ margin:"0 0 12px 0", fontSize:18, fontWeight:600, fontFamily:"var(--brand-font-display)" }}>Puntos vs píxeles</h3>
            <p style={{ margin:"0 0 16px 0", fontSize:14, color:"var(--brand-text-muted)", lineHeight:1.6 }}>
              Los puntos y los píxeles son unidades absolutas en CSS. Al usar herramientas como Figma, use el siguiente método para convertir puntos a píxeles.
            </p>
            <div style={{ borderTop:"1px solid var(--brand-border)", paddingTop:16 }}>
              <p style={{ margin:"0 0 4px 0", fontSize:14, fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-text)" }}>
                1pt ≈ 1.333px &nbsp;(o bien, 1px = 0.75pt)
              </p>
              <p style={{ margin:"0 0 4px 0", fontSize:14, fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-text)" }}>
                18pt × 1.333 ≈ 24px
              </p>
              <p style={{ margin:0, fontSize:14, fontFamily:"'IBM Plex Mono',monospace", color:"var(--brand-text)" }}>
                14pt × 1.333 ≈ 19px
              </p>
            </div>
          </div>
          <div style={{ padding:"16px 32px", background:"#EBEBEB", display:"flex", gap:8 }}>
            <span style={{ fontSize:14, flexShrink:0, color:"#5A5E66" }}>*</span>
            <p style={{ margin:0, fontSize:13, color:"#5A5E66", lineHeight:1.6 }}>
              1pt = 1/72 of 1in &nbsp;and&nbsp; 1px = 1/96 of 1in &nbsp;→&nbsp; 1pt = (96/72)px = 1.333px
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Text Contrast AAA ══════════════════════════════════════════════ */}
      <div className="section">
        {divider}
        <div className="section-head">
          {sectionHead("Text Contrast ", "AAA")}
          <div className="section-desc" style={{ marginBottom:16 }}>
            <p style={{ margin:"0 0 8px 0" }}>El texto grande debe tener un contraste mínimo de <strong>4.5:1</strong>. Se define como texto de 18pt (24px) o más; 14pt (19px) en negrita o más.</p>
            <p style={{ margin:"0 0 8px 0" }}>El texto normal debe tener un contraste mínimo de <strong>7.0:1</strong>. Se define como texto de menos de 18pt (24px).</p>
            <p style={{ margin:"0 0 12px 0" }}>Estos requisitos también aplican cuando el texto se superpone a una imagen o vídeo.</p>
            <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html"
               target="_blank" rel="noreferrer"
               style={{ color:"var(--brand-primary)", fontSize:14, fontWeight:600, textDecoration:"none" }}>
              🔗 Criterio de éxito 1.4.6
            </a>
          </div>
        </div>
        <ContrastDemo level="AAA" />
      </div>

      {/* ═══ Non-text contrast ══════════════════════════════════════════════ */}
      <div className="section">
        {divider}
        <div className="section-head">
          {sectionHead("Non-text contrast")}
          <div className="section-desc" style={{ marginBottom:16 }}>
            <p style={{ margin:"0 0 12px 0" }}>Los iconos y los bordes de los elementos de entrada (texto, checkboxes, radio, etc.) deben tener un contraste mínimo de <strong>3.0:1</strong>.</p>
            <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
               target="_blank" rel="noreferrer"
               style={{ color:"var(--brand-primary)", fontSize:14, fontWeight:600, textDecoration:"none" }}>
              🔗 Criterios de éxito 1.4.11
            </a>
          </div>
        </div>

        <NonTextDemo />

        {/* Note card */}
        <div style={{
          marginTop:24, background:"var(--brand-bg-elev)",
          border:"1px solid var(--brand-border)", borderRadius:8,
          padding:"24px 32px",
        }}>
          <h3 style={{ margin:"0 0 12px 0", fontSize:18, fontWeight:600, fontFamily:"var(--brand-font-display)" }}>Note</h3>
          <p style={{ margin:0, fontSize:14, color:"var(--brand-text-muted)", lineHeight:1.7 }}>
            WCAG no exige que los controles tengan un límite visual que indique el área de impacto, pero si el indicador visual del control es la única forma de identificarlo, entonces ese indicador debe tener suficiente contraste.
          </p>
        </div>
      </div>

    </PageView>
  );
}

// ─── DS_Buttons ───────────────────────────────────────────────────────────────
function DS_Buttons({ brand, brandKey }) {
  const t = window.GENESIS_TOKENS;
  return (
    <PageView badge="Component" title="Buttons" desc="6 variantes × 3 tamaños × 4 estados. Square y Circle icon variants. Padding vertical escalado por --density.">

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Variants · {brand.name}</h2>
          <p className="section-desc">Primary · Secondary · Tertiary · Outline · Inverse · Transparent.</p>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <Demo title="Button / Variants · size=md · state=default">
            {["primary","secondary","tertiary","outline","inverse","transparent"].map(v => (
              <GButton key={v} variant={v}>{v[0].toUpperCase()+v.slice(1)}</GButton>
            ))}
          </Demo>
          <Demo title="Button / States · variant=primary · all sizes">
            {["lg","md","sm"].map(sz => (
              <div key={sz} style={{ display:"flex", gap:8, alignItems:"center" }}>
                {["default","hover","pressed","disabled"].map(st => (
                  <div key={st} style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                    <GButton variant="primary" size={sz} state={st}>{st}</GButton>
                    <span className="mono" style={{ color:"var(--brand-text-muted)", fontSize:10 }}>{sz}</span>
                  </div>
                ))}
              </div>
            ))}
          </Demo>
          <Demo title="Button / Con ícono · todas las variantes">
            {["primary","secondary","tertiary","outline","inverse","transparent"].map(v => (
              <GButton key={v} variant={v} icon={Icon.arrow}>{v[0].toUpperCase()+v.slice(1)}</GButton>
            ))}
          </Demo>
          <Demo title="ButtonSquare · tipos · size=md">
            {["primary","secondary","tertiary","outline","inverse","transparent"].map(type => (
              <div key={type} style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                <GButtonSquare type={type} size="md">{Icon.plus}</GButtonSquare>
                <span className="mono" style={{ color:"var(--brand-text-muted)", fontSize:10 }}>{type}</span>
              </div>
            ))}
          </Demo>
          <Demo title="ButtonSquare · tamaños · type=primary">
            {["lg","md","sm"].map(sz => (
              <div key={sz} style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                <GButtonSquare type="primary" size={sz}>{Icon.plus}</GButtonSquare>
                <span className="mono" style={{ color:"var(--brand-text-muted)", fontSize:10 }}>{sz}</span>
              </div>
            ))}
          </Demo>
          <Demo title="ButtonCircle · tipos · size=md">
            {["primary","secondary","tertiary","outline","inverse","transparent"].map(type => (
              <div key={type} style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                <GButtonCircle type={type} size="md">{Icon.plus}</GButtonCircle>
                <span className="mono" style={{ color:"var(--brand-text-muted)", fontSize:10 }}>{type}</span>
              </div>
            ))}
          </Demo>
          <Demo title="ButtonCircle · tamaños · type=primary">
            {["lg","md","sm"].map(sz => (
              <div key={sz} style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                <GButtonCircle type="primary" size={sz}>{Icon.plus}</GButtonCircle>
                <span className="mono" style={{ color:"var(--brand-text-muted)", fontSize:10 }}>{sz}</span>
              </div>
            ))}
          </Demo>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">El mismo Button · 4 marcas</h2>
          <p className="section-desc">Cero cambios al componente. Solo cambia el theme.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {Object.entries(t.brands).map(([key, b]) => (
            <BrandPreview key={key} brandKey={key} brand={b}>
              <GButton variant="primary" icon={Icon.arrow}>Comprar ahora</GButton>
              <GButton variant="outline">Ver detalles</GButton>
              <GInput label="Email" placeholder="tu@correo.com" size="sm" />
            </BrandPreview>
          ))}
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Inputs ────────────────────────────────────────────────────────────────
function DS_Inputs() {
  return (
    <PageView badge="Component" title="Inputs" desc="Focus hereda --brand-primary. Error usa --color-danger (global). 3 tamaños × 4 estados.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States</h2>
          <p className="section-desc">Default · Focus · Error · Disabled.</p>
        </div>
        <Demo title="Input / States" pad={32}>
          <GInput label="Nombre"   placeholder="Mariana"      state="default"  hint="Como aparece en tu ID." />
          <GInput label="Correo"   value="mariana@"           state="focus"    hint="Falta el dominio." />
          <GInput label="Teléfono" value="+52 99"             state="error"    hint="Formato inválido." />
          <GInput label="RFC"      placeholder="Autogenerado" state="disabled" hint="No editable." />
        </Demo>
      </div>
    </PageView>
  );
}

// ─── DS_Badges ────────────────────────────────────────────────────────────────
function DS_Badges() {
  return (
    <PageView badge="Component" title="Badges" desc="Indicador numérico. Brand usa token del theme. Semantic son globales. Circle y Square. 3 tamaños.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types × shapes</h2>
        </div>
        <Demo title="Types · size=lg · circle / square">
          {["brand","none","warning","error","success"].map(type => (
            <div key={type} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <GBadge type={type} size="lg" shape="circle">28</GBadge>
              <GBadge type={type} size="lg" shape="square">28</GBadge>
            </div>
          ))}
        </Demo>
        <Demo title="Sizes · type=brand · single / multi · circle + square">
          {["lg","md","sm"].map(size => (
            <div key={size} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <GBadge type="brand" size={size} shape="circle">7</GBadge>
              <GBadge type="brand" size={size} shape="circle">28</GBadge>
              <GBadge type="brand" size={size} shape="square">7</GBadge>
              <GBadge type="brand" size={size} shape="square">28</GBadge>
            </div>
          ))}
        </Demo>
        <Demo title="Warning · dark text · sm / md / lg">
          <GBadge type="warning" size="sm" shape="circle">3</GBadge>
          <GBadge type="warning" size="sm" shape="circle">28</GBadge>
          <GBadge type="warning" size="md" shape="circle">3</GBadge>
          <GBadge type="warning" size="md" shape="circle">28</GBadge>
          <GBadge type="warning" size="lg" shape="circle">3</GBadge>
          <GBadge type="warning" size="lg" shape="circle">28</GBadge>
        </Demo>
      </div>
    </PageView>
  );
}

// ─── DS_Tags ──────────────────────────────────────────────────────────────────
function DS_Tags() {
  const Row = ({ label, children }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <p style={{ margin:0, fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", color:"var(--brand-text-muted)" }}>{label}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center" }}>{children}</div>
    </div>
  );

  // ── Interactive group state ──
  const INIT_TAGS = [
    { label:"Design System", type:"primary",   icon:true,  count:12, onRemove: true },
    { label:"Typography",    type:"secondary",  icon:false, count:null, onRemove: true },
    { label:"Dark mode",     type:"tertiary",   icon:false, count:null, onRemove: true },
    { label:"Open source",   type:"outline",    icon:true,  count:null, onRemove: true },
    { label:"Tokens",        type:"inverse",    icon:false, count:3,  onRemove: true },
  ];
  const [activeTags, setActiveTags] = useState(
    INIT_TAGS.map((t, i) => ({ ...t, id: i, visible: true }))
  );
  const removeTag = (id) => setActiveTags(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
  const resetTags = () => setActiveTags(INIT_TAGS.map((t, i) => ({ ...t, id: i, visible: true })));

  const TYPES = ["primary","secondary","tertiary","outline","inverse"];
  const STATES = ["default","hover","active","focus","disabled"];
  const SIZES  = ["lg","md","sm"];

  return (
    <PageView badge="Component" title="Tags" desc="Pill component for labelling, filtering and categorising content. 5 types × 3 sizes × 5 states. Optional icon slot, count badge, and removable action.">

      {/* ── Types ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types</h2>
          <p className="section-desc">5 semantic variants mapped to brand tokens.</p>
        </div>
        <Demo title="Tag · All types (size=md, default)">
          {TYPES.map(t => (
            <GTag key={t} type={t} size="md" label={t.charAt(0).toUpperCase() + t.slice(1)} />
          ))}
        </Demo>
        <Demo title="Tag · All types with icon + count + removable">
          {TYPES.map(t => (
            <GTag key={t} type={t} size="md" label={t.charAt(0).toUpperCase() + t.slice(1)} icon count={24} onRemove={() => {}} />
          ))}
        </Demo>
      </div>

      {/* ── Sizes ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sizes</h2>
          <p className="section-desc">lg · md · sm — height 40 / 36 / 28 px.</p>
        </div>
        <Demo title="Tag · Sizes (type=primary)">
          {SIZES.map(s => (
            <GTag key={s} type="primary" size={s} label={`Size ${s}`} count={s === "lg" ? 40 : s === "md" ? 36 : 28} />
          ))}
        </Demo>
        <Demo title="Tag · Sizes with icon + close">
          {SIZES.map(s => (
            <GTag key={s} type="secondary" size={s} label={`${s.toUpperCase()} Tag`} icon onRemove={() => {}} />
          ))}
        </Demo>
      </div>

      {/* ── States ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States</h2>
          <p className="section-desc">Static display of all interaction states (type=primary, size=md).</p>
        </div>
        <Demo title="Tag · States (static)">
          {STATES.map(s => (
            <GTag key={s} type="primary" size="md" state={s} label={s.charAt(0).toUpperCase() + s.slice(1)} count={8} />
          ))}
        </Demo>
      </div>

      {/* ── Slot combinations ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Slot combinations</h2>
          <p className="section-desc">Label only · Icon + Label · Label + Count · Label + Remove · All slots.</p>
        </div>
        <Demo title="Tag · Slot matrix (size=md)">
          <Row label="Label only">
            {TYPES.map(t => <GTag key={t} type={t} size="md" label="Label" />)}
          </Row>
          <Row label="Icon + Label">
            {TYPES.map(t => <GTag key={t} type={t} size="md" label="Label" icon />)}
          </Row>
          <Row label="Label + Count">
            {TYPES.map(t => <GTag key={t} type={t} size="md" label="Label" count={17} />)}
          </Row>
          <Row label="Label + Remove">
            {TYPES.map(t => <GTag key={t} type={t} size="md" label="Label" onRemove={() => {}} />)}
          </Row>
          <Row label="All slots">
            {TYPES.map(t => <GTag key={t} type={t} size="md" label="Label" icon count={5} onRemove={() => {}} />)}
          </Row>
        </Demo>
      </div>

      {/* ── Interactive Tag Group ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Tag Group — interactive</h2>
          <p className="section-desc">Click × to remove a tag. Reset to restore.</p>
        </div>
        <Demo title="Tag Group · mixed types · padding=true">
          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, padding:"12px 0", alignItems:"center" }}>
              {activeTags.filter(t => t.visible).map(t => (
                <GTag
                  key={t.id}
                  type={t.type}
                  size="md"
                  label={t.label}
                  icon={t.icon}
                  count={t.count || null}
                  onRemove={() => removeTag(t.id)}
                />
              ))}
              {activeTags.every(t => !t.visible) && (
                <span style={{ fontSize:13, color:"var(--brand-text-muted)", fontStyle:"italic" }}>All tags removed</span>
              )}
            </div>
            <div>
              <button
                onClick={resetTags}
                style={{
                  padding:"6px 14px", fontSize:12, borderRadius:"var(--radius-sm)",
                  background:"var(--brand-bg-elev)", color:"var(--brand-text)",
                  border:"1px solid var(--brand-border)", cursor:"pointer",
                }}
              >
                ↺ Reset tags
              </button>
            </div>
          </div>
        </Demo>

        <Demo title="GTagGroup · padding variants">
          <div style={{ display:"flex", flexDirection:"column", gap:0, width:"100%" }}>
            <div style={{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", color:"var(--brand-text-muted)", marginBottom:4 }}>padding=true</div>
            <div style={{ background:"var(--brand-bg-elev)", borderRadius:"var(--radius-md)", overflow:"hidden" }}>
              <GTagGroup padding={true} tags={[
                { type:"primary",   label:"Design",    count:8  },
                { type:"secondary", label:"Research",  count:3  },
                { type:"tertiary",  label:"Dev",       icon:true },
                { type:"outline",   label:"Backlog"              },
                { type:"inverse",   label:"Done",      count:21 },
              ]} style={{ paddingLeft:12, paddingRight:12 }} />
            </div>
            <div style={{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", color:"var(--brand-text-muted)", margin:"16px 0 4px" }}>padding=false</div>
            <div style={{ background:"var(--brand-bg-elev)", borderRadius:"var(--radius-md)", overflow:"hidden" }}>
              <GTagGroup padding={false} tags={[
                { type:"primary",   label:"Design",    count:8  },
                { type:"secondary", label:"Research",  count:3  },
                { type:"tertiary",  label:"Dev",       icon:true },
                { type:"outline",   label:"Backlog"              },
                { type:"inverse",   label:"Done",      count:21 },
              ]} style={{ paddingLeft:12, paddingRight:12 }} />
            </div>
          </div>
        </Demo>
      </div>

      {/* ── Props table ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Props</h2>
        </div>
        <Demo title="GTag">
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:"var(--brand-font-mono,'IBM Plex Mono',monospace)" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--brand-border)" }}>
                {["Prop","Type","Default","Description"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 12px", color:"var(--brand-text-muted)", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["type",    '"primary"|"secondary"|"tertiary"|"outline"|"inverse"', '"primary"',  "Visual semantic variant"],
                ["size",    '"lg"|"md"|"sm"',                                       '"md"',        "Height: 40 / 36 / 28 px"],
                ["state",   '"default"|"hover"|"active"|"focus"|"disabled"',        '"default"',   "Static interaction state"],
                ["label",   "string",                                                '"Tag name"',  "Tag label text"],
                ["icon",    "boolean",                                               "false",       "Show left icon slot"],
                ["count",   "number | null",                                         "null",        "Count shown right of label"],
                ["onRemove","function | null",                                       "null",        "Callback — shows × button"],
                ["onClick", "function | null",                                       "null",        "Click handler (adds pointer cursor)"],
                ["style",   "object",                                                "—",           "Inline style override"],
              ].map(([p, t, d, desc]) => (
                <tr key={p} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                  <td style={{ padding:"6px 12px", color:"var(--brand-primary)", fontWeight:600 }}>{p}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text-muted)" }}>{t}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)" }}>{d}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)", fontFamily:"var(--brand-font-body)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Demo>
        <Demo title="GTagGroup">
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:"var(--brand-font-mono,'IBM Plex Mono',monospace)" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--brand-border)" }}>
                {["Prop","Type","Default","Description"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 12px", color:"var(--brand-text-muted)", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["tags",    "GTag props[]",  "[]",     "Array of GTag prop objects"],
                ["padding", "boolean",       "true",   "Adds 12px vertical padding"],
                ["gap",     "number",        "8",      "Gap between tags (px)"],
                ["style",   "object",        "—",      "Inline style override on wrapper"],
              ].map(([p, t, d, desc]) => (
                <tr key={p} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                  <td style={{ padding:"6px 12px", color:"var(--brand-primary)", fontWeight:600 }}>{p}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text-muted)" }}>{t}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)" }}>{d}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)", fontFamily:"var(--brand-font-body)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Demo>
      </div>

    </PageView>
  );
}

// ─── DS_Cards ─────────────────────────────────────────────────────────────────
function DS_Cards({ brand }) {
  return (
    <PageView badge="Component" title="Cards" desc="Composible con cualquier componente. Eyebrow · Title · Body · Footer · Image. Width 300, border-radius: --radius-lg.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Composiciones</h2>
        </div>
        <Demo title="Card / Con imagen, footer y tags" pad={32}>
          <GCard
            eyebrow={brand.name}
            title="Acelera tu equipo"
            body="Analítica en tiempo real, integraciones y soporte 24/7."
            footer={<GButton variant="primary" size="sm" icon={Icon.arrow}>Empezar</GButton>}
            image={`linear-gradient(135deg, ${brand.primary}, ${brand.primaryHover})`}
          />
          <GCard
            eyebrow="Nuevo"
            title="App móvil rediseñada"
            body="Más rápida, más limpia, y siempre disponible offline."
            footer={<div style={{ display:"flex", gap:6 }}><GTag type="primary" size="sm" label="iOS" /><GTag type="primary" size="sm" label="Android" /></div>}
          />
          <GCard
            eyebrow="Team"
            title="Mariana Rivera"
            body="Senior Product Designer. Lidera el sistema desde 2024."
            footer={<GTag type="primary" size="sm" label="En línea" />}
          />
        </Demo>
      </div>
    </PageView>
  );
}

// ─── DS_Alerts ────────────────────────────────────────────────────────────────
function DS_Alerts() {
  return (
    <PageView badge="Component" title="Alerts" desc="Banner de notificación. 5 tipos × light/dark. Cierre opcional.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types × modes</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="GAlert · dark (light=false)" pad={0}>
            <div style={{ display:"flex", flexDirection:"column", width:"100%", gap:2 }}>
              <GAlert type="brand">Información importante sobre tu cuenta en Genesis DS.</GAlert>
              <GAlert type="primary">Notificación del sistema. Modo primario oscuro.</GAlert>
              <GAlert type="success">Los cambios se guardaron correctamente.</GAlert>
              <GAlert type="warning">Revisa los datos antes de continuar.</GAlert>
              <GAlert type="error">Ocurrió un error al procesar la solicitud.</GAlert>
            </div>
          </Demo>
          <Demo title="GAlert · light (light=true)" pad={0}>
            <div style={{ display:"flex", flexDirection:"column", width:"100%", gap:2 }}>
              <GAlert type="brand" light>Tu sesión expira en 15 minutos.</GAlert>
              <GAlert type="primary" light>Modo de solo lectura activo.</GAlert>
              <GAlert type="success" light>Pago verificado. Tu pedido está en camino.</GAlert>
              <GAlert type="warning" light>Tienes cambios sin guardar.</GAlert>
              <GAlert type="error" light>El campo correo electrónico es obligatorio.</GAlert>
            </div>
          </Demo>
          <Demo title="GAlert · con cierre (onClose)" pad={0}>
            <div style={{ display:"flex", flexDirection:"column", width:"100%", gap:2 }}>
              <GAlert type="brand" onClose={() => {}}>Bienvenido al sistema. Haz clic en × para cerrar.</GAlert>
              <GAlert type="success" onClose={() => {}}>Archivo subido correctamente.</GAlert>
              <GAlert type="error" light onClose={() => {}}>No se pudo conectar con el servidor.</GAlert>
              <GAlert type="warning" light onClose={() => {}}>Tu contraseña expira en 3 días.</GAlert>
            </div>
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Avatars ───────────────────────────────────────────────────────────────
function DS_Avatars() {
  return (
    <PageView badge="Component" title="Avatars" desc="Circle · Square · Group. 8 tamaños × 5 tipos. Overlap y counter automático.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types × shapes × sizes</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="GAvatar Circle · tipos · size=lg & xl" pad={24}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:24, alignItems:"flex-end" }}>
              {[["lg","MR",3],["xl","DS",7]].map(([sz,init,img]) => (
                <div key={sz} style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"center" }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    {["icon","text","image","error","checkbox"].map(tp => (
                      <GAvatar key={tp} shape="circle" type={tp} size={sz}
                        initials={tp==="text"?init:undefined}
                        src={tp==="image"?`https://i.pravatar.cc/80?img=${img}`:undefined} />
                    ))}
                  </div>
                  <span className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)" }}>{sz}</span>
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="GAvatar Circle · escala de tamaños · type=icon" pad={24}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:12, flexWrap:"wrap" }}>
              {["xs","sm","md","lg","xl","2xl","3xl","4xl"].map(s => (
                <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <GAvatar shape="circle" type="icon" size={s} />
                  <span className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)" }}>{s}</span>
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="GAvatar Square · tipos · size=xl" pad={24}>
            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              {["icon","text","image","error","checkbox"].map(tp => (
                <GAvatar key={tp} shape="square" type={tp} size="xl"
                  initials={tp==="text"?"AB":undefined}
                  src={tp==="image"?"https://i.pravatar.cc/80?img=5":undefined} />
              ))}
            </div>
          </Demo>
          <Demo title="GAvatarGroup · quantity 1→11 · size=xl · max=4" pad={24}>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {[
                { avatars:[{src:"https://i.pravatar.cc/80?img=1"}], label:"quantity=1" },
                { avatars:[{src:"https://i.pravatar.cc/80?img=1"},{src:"https://i.pravatar.cc/80?img=2"}], label:"quantity=2" },
                { avatars:[{src:"https://i.pravatar.cc/80?img=1"},{src:"https://i.pravatar.cc/80?img=2"},{src:"https://i.pravatar.cc/80?img=3"}], label:"quantity=3" },
                { avatars:Array.from({length:11},(_,n)=>({src:`https://i.pravatar.cc/80?img=${n+1}`})), label:"quantity=11 (max=4, +7)" },
              ].map(({ avatars, label }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:20 }}>
                  <GAvatarGroup avatars={avatars} size="xl" max={4} />
                  <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)" }}>{label}</span>
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="GAvatarGroup · sizes md / lg / xl · 5 avatares" pad={24}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:32, flexWrap:"wrap" }}>
              {["md","lg","xl"].map(sz => {
                const imgs = [1,2,3,4,5,6,7].map(n=>({src:`https://i.pravatar.cc/144?img=${n}`}));
                return (
                  <div key={sz} style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:8 }}>
                    <GAvatarGroup avatars={imgs} size={sz} max={4} />
                    <span className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)" }}>{sz}</span>
                  </div>
                );
              })}
            </div>
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Accordion ─────────────────────────────────────────────────────────────
function DS_Accordion() {
  return (
    <PageView badge="Component" title="Accordion" desc="2 tipos · 2 tamaños · 2 posiciones de chevron · 5 estados. GAccordionGroup para listas.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States × types</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="Primary vs Transparent · size=lg · chevron=right · todos los estados" pad={24}>
            <div style={{ display:"flex", gap:24, width:"100%", flexWrap:"wrap" }}>
              {[["primary","Primary"],["transparent","Transparent"]].map(([type, label]) => (
                <div key={type} style={{ flex:"1 1 280px", display:"flex", flexDirection:"column", gap:4 }}>
                  <span className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:6, textTransform:"uppercase", letterSpacing:".04em" }}>{label}</span>
                  <GAccordion type={type} size="lg" chevron="right" label="Accordion" slotRight="28">Panel de contenido expandido.</GAccordion>
                  <GAccordion type={type} size="lg" chevron="right" label="Accordion" slotRight="28" state="hover" />
                  <GAccordion type={type} size="lg" chevron="right" label="Accordion" slotRight="28" state="focus" />
                  <GAccordion type={type} size="lg" chevron="right" label="Accordion" slotRight="28" state="active" defaultOpen>Panel en estado active — abierto.</GAccordion>
                  <GAccordion type={type} size="lg" chevron="right" label="Accordion" slotRight="28" state="loading" />
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="Primary vs Transparent · size=md · chevron=left" pad={24}>
            <div style={{ display:"flex", gap:24, width:"100%", flexWrap:"wrap" }}>
              {[["primary","Primary"],["transparent","Transparent"]].map(([type, label]) => (
                <div key={type} style={{ flex:"1 1 280px", display:"flex", flexDirection:"column", gap:4 }}>
                  <span className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:6, textTransform:"uppercase", letterSpacing:".04em" }}>{label}</span>
                  <GAccordion type={type} size="md" chevron="left" label="Accordion" slotRight="28" />
                  <GAccordion type={type} size="md" chevron="left" label="Accordion" slotRight="28" state="hover" />
                  <GAccordion type={type} size="md" chevron="left" label="Accordion" slotRight="28" state="active" defaultOpen>Contenido expandido en size md.</GAccordion>
                  <GAccordion type={type} size="md" chevron="left" label="Accordion" slotRight="28" state="loading" />
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="Accordion Group · size=lg · chevron=right" pad={24}>
            <div style={{ display:"flex", gap:24, width:"100%", flexWrap:"wrap", alignItems:"flex-start" }}>
              <div style={{ flex:"1 1 300px" }}>
                <GAccordionGroup size="lg" chevron="right" items={[
                  { label:"Token Layer 1", slotRight:"3",  content:"Valores primitivos compartidos por todas las marcas.", defaultOpen:true },
                  { label:"Token Layer 2", slotRight:"7",  content:"Theme por marca. Implementa GENESIS_THEME_SCHEMA." },
                  { label:"Token Layer 3", slotRight:"12", content:"Variables CSS alias. Lo que los componentes leen." },
                  { label:"Componentes",   slotRight:"5",  content:"Nunca hardcodean valores. Solo leen --brand-* vars." },
                  { label:"Multi-marca",   slotRight:"1",  content:"Cero duplicación de código entre themes." },
                ]} />
              </div>
              <div style={{ flex:"1 1 300px" }}>
                <GAccordionGroup size="md" chevron="left" items={[
                  { label:"¿Qué es Genesis DS?",       content:"Sistema de diseño multi-marca escalable con 4 themes." },
                  { label:"¿Cómo agrego una marca?",   content:"3 pasos: tokens, CSS vars, aplicar clase brand-slug.", defaultOpen:true },
                  { label:"¿Soporta dark mode?",       content:"Sí — cada brand theme puede tener variante .dark." },
                  { label:"¿Qué componentes incluye?", content:"Button, Input, Badge, Tag, Card, Alert, Avatar, Accordion y más." },
                ]} />
              </div>
            </div>
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Breadcrumb ────────────────────────────────────────────────────────────
function DS_Breadcrumb() {
  return (
    <PageView badge="Component" title="Breadcrumb" desc="Navegación jerárquica. Separator icon (chevron) o slash. Último item siempre muted.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Separators × profundidad</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="Separator=icon (chevron) · 2–5 items">
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <GBreadcrumb separator="icon" items={[{label:"Home"},{label:"Página actual"}]} />
              <GBreadcrumb separator="icon" items={[{label:"Home"},{label:"Sección"},{label:"Página actual"}]} />
              <GBreadcrumb separator="icon" items={[{label:"Home"},{label:"Sección"},{label:"Sub-sección"},{label:"Página actual"}]} />
              <GBreadcrumb separator="icon" items={[{label:"Home"},{label:"Sección"},{label:"Sub-sección"},{label:"Detalle"},{label:"Página actual"}]} />
            </div>
          </Demo>
          <Demo title="Separator=slash · 2–4 items">
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <GBreadcrumb separator="slash" items={[{label:"Home"},{label:"Página actual"}]} />
              <GBreadcrumb separator="slash" items={[{label:"Home"},{label:"Sección"},{label:"Página actual"}]} />
              <GBreadcrumb separator="slash" items={[{label:"Home"},{label:"Sección"},{label:"Sub-sección"},{label:"Página actual"}]} />
            </div>
          </Demo>
          <Demo title="Con ícono Home como primer item">
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <GBreadcrumb separator="icon"  items={[{icon:true},{label:"Sección"},{label:"Página actual"}]} />
              <GBreadcrumb separator="slash" items={[{icon:true},{label:"Sección"},{label:"Sub-sección"},{label:"Página actual"}]} />
            </div>
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Calendar ─────────────────────────────────────────────────────────────
function DS_Calendar() {
  return (
    <PageView badge="Component" title="Calendar" desc="Selección de fecha. Single o double (rango). Navega meses. Hoy resaltado con --brand-primary.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Single · Double</h2>
          <p className="section-desc">Interactivo. Haz clic para seleccionar.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="Single · selección de fecha">
            <GCalendar type="single" />
          </Demo>
          <Demo title="Double · selección de rango (click inicio, click fin)">
            <GCalendar type="double" />
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Checkbox ─────────────────────────────────────────────────────────────
function DS_Checkbox() {
  return (
    <PageView badge="Component" title="Checkbox" desc="Plain (inline) y Section (card). Sizes lg/md. Posición left/right. Estados: default, hover, focus, error, disabled.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States × variants</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Demo title="Plain · todos los estados (md)">
            {(() => {
              const [vals, setVals] = React.useState({ unc:false, chk:true, err:false });
              return (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <GCheckbox size="md" label="Unchecked default"  checked={vals.unc} onChange={v => setVals(p=>({...p,unc:v}))} />
                  <GCheckbox size="md" label="Checked default"    checked={vals.chk} onChange={v => setVals(p=>({...p,chk:v}))} />
                  <GCheckbox size="md" label="Error state"        checked={vals.err} error onChange={v => setVals(p=>({...p,err:v}))} />
                  <GCheckbox size="md" label="Disabled unchecked" checked={false} disabled />
                  <GCheckbox size="md" label="Disabled checked"   checked={true}  disabled />
                </div>
              );
            })()}
          </Demo>
          <Demo title="Plain · size lg">
            {(() => {
              const [chk, setChk] = React.useState(false);
              return (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <GCheckbox size="lg" label="Opción grande unchecked" checked={chk}  onChange={setChk} />
                  <GCheckbox size="lg" label="Opción grande checked"   checked={!chk} onChange={() => setChk(p=>!p)} />
                </div>
              );
            })()}
          </Demo>
          <Demo title="Section · md y lg — interactivo">
            {(() => {
              const [v, setV] = React.useState({ a:false, b:true, c:false, d:true });
              return (
                <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                  <GCheckbox variant="section" size="md" label="Opción A"         checked={v.a} onChange={val => setV(p=>({...p,a:val}))} />
                  <GCheckbox variant="section" size="md" label="Opción B checked" checked={v.b} onChange={val => setV(p=>({...p,b:val}))} />
                  <GCheckbox variant="section" size="lg" label="Opción C lg"      checked={v.c} onChange={val => setV(p=>({...p,c:val}))} />
                  <GCheckbox variant="section" size="lg" label="Opción D lg ✓"    checked={v.d} onChange={val => setV(p=>({...p,d:val}))} />
                </div>
              );
            })()}
          </Demo>
          <Demo title="Section · error y disabled">
            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <GCheckbox variant="section" size="md" label="Error unchecked" checked={false} error />
              <GCheckbox variant="section" size="md" label="Error checked"   checked={true}  error />
              <GCheckbox variant="section" size="md" label="Disabled unc"    checked={false} disabled />
              <GCheckbox variant="section" size="md" label="Disabled chk"    checked={true}  disabled />
            </div>
          </Demo>
          <Demo title="Checkbox Group · vertical y horizontal">
            {(() => {
              const [items, setItems] = React.useState([
                { value:"one",   label:"Opción uno",    checked:true  },
                { value:"two",   label:"Opción dos",    checked:false },
                { value:"three", label:"Opción tres",   checked:true  },
                { value:"four",  label:"Deshabilitada", checked:false, disabled:true },
              ]);
              return (
                <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
                  <GCheckboxGroup items={items} direction="vertical"
                    onChange={(val, chk) => setItems(prev => prev.map(i => i.value===val ? {...i, checked:chk} : i))} />
                  <GCheckboxGroup
                    items={[{value:"a",label:"Alpha",checked:true},{value:"b",label:"Beta",checked:false},{value:"c",label:"Gamma",checked:true}]}
                    direction="horizontal" />
                </div>
              );
            })()}
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Divider ───────────────────────────────────────────────────────────────
function DS_Divider() {
  return (
    <PageView badge="Component" title="Divider" desc="Separador horizontal. 7 tamaños (2xs→2xl) × sólido/dashed. Color siempre --brand-border.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sizes × styles</h2>
        </div>
        <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
          {[false, true].map(dash => (
            <div key={String(dash)}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>{dash ? "Dashed" : "Solid"}</div>
              <div style={{ width:320, display:"flex", flexDirection:"column" }}>
                {["2xs","xs","sm","md","lg","xl","2xl"].map(s => (
                  <div key={s} style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <span style={{ width:28, fontFamily:"var(--brand-font-mono,monospace)", fontSize:11, color:"var(--brand-text-muted)", flexShrink:0 }}>{s}</span>
                    <div style={{ flex:1 }}><GDivider size={s} dash={dash} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:32 }}>
          <Demo title="En contexto · separando contenido">
            <div style={{ width:360, fontFamily:"var(--brand-font-body)" }}>
              <p style={{ margin:0, fontSize:14, color:"var(--brand-text)" }}>Sección A — contenido superior</p>
              <GDivider size="lg" />
              <p style={{ margin:0, fontSize:14, color:"var(--brand-text)" }}>Sección B — contenido inferior</p>
              <GDivider size="xl" dash />
              <p style={{ margin:0, fontSize:14, color:"var(--brand-text-muted)" }}>Nota al pie con divider dashed xl</p>
            </div>
          </Demo>
        </div>
      </div>
    </PageView>
  );
}

// ─── DS_Dropdowns ─────────────────────────────────────────────────────────────
function DS_Dropdowns() {
  const ChevronSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const GridSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  );
  const StarSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 4H14l-3.5 2.5 1.5 4L8 10l-4 2.5 1.5-4L2 6h4.5L8 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
    </svg>
  );
  const CheckSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <PageView badge="Component" title="Dropdown" desc="Menú contextual con ítems primarios, búsqueda y divisores. Sizes md (240 px) y lg (320 px). Tokens exclusivos: --brand-primary-soft, --brand-border, --brand-primary.">

      {/* ── Size comparison ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sizes</h2>
        </div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap", alignItems:"flex-start" }}>
          <div>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:12, textTransform:"uppercase", letterSpacing:".04em" }}>md · 240 px</div>
            <GDropdown size="md">
              <GDropdownItem type="search" size="md" label="Search" />
              <GDropdownItem size="md" label="Dashboard" iconLeft={<GridSVG />} divider />
              <GDropdownItem size="md" label="Favorites" iconLeft={<StarSVG />} />
              <GDropdownItem size="md" label="Selected" iconLeft={<CheckSVG />} state="active" />
              <GDropdownItem size="md" label="Disabled option" state="disabled" />
            </GDropdown>
          </div>
          <div>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:12, textTransform:"uppercase", letterSpacing:".04em" }}>lg · 320 px</div>
            <GDropdown size="lg">
              <GDropdownItem type="search" size="lg" label="Search" />
              <GDropdownItem size="lg" label="Dashboard" description="Overview of all your metrics" iconLeft={<GridSVG />} divider />
              <GDropdownItem size="lg" label="Favorites" description="Your starred items" iconLeft={<StarSVG />} />
              <GDropdownItem size="lg" label="Selected option" iconLeft={<CheckSVG />} state="active" />
              <GDropdownItem size="lg" label="Disabled option" state="disabled" />
            </GDropdown>
          </div>
        </div>
      </div>

      {/* ── States ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Item states · md</h2>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {["default","hover","active","disabled"].map(state => (
            <div key={state}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>{state}</div>
              <GDropdown size="md" style={{ width:200 }}>
                <GDropdownItem size="md" label="Option label" iconLeft={<GridSVG />} state={state} />
              </GDropdown>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search variant ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Search item</h2>
        </div>
        <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-start" }}>
          {["md","lg"].map(size => (
            <div key={size}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>size={size}</div>
              <GDropdown size={size}>
                <GDropdownItem type="search" size={size} label="Search" />
                <GDropdownItem size={size} label="Option A" />
                <GDropdownItem size={size} label="Option B" />
              </GDropdown>
            </div>
          ))}
        </div>
      </div>

      {/* ── With icons + descriptions ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">With icons and descriptions</h2>
        </div>
        <GDropdown size="lg">
          <GDropdownItem size="lg" label="Grid view" description="Arrange items in a responsive grid" iconLeft={<GridSVG />} iconRight={<ChevronSVG />} divider />
          <GDropdownItem size="lg" label="Starred" description="Items you've marked as favorites" iconLeft={<StarSVG />} />
          <GDropdownItem size="lg" label="Mark as done" description="Confirm and close this action" iconLeft={<CheckSVG />} />
        </GDropdown>
      </div>

    </PageView>
  );
}

// ─── DS_Media ─────────────────────────────────────────────────────────────────
function DS_Media() {
  // Sample images via Unsplash (public)
  const IMG_A = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";
  const IMG_B = "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80";
  const IMG_C = "https://images.unsplash.com/photo-1682685797406-97f364419b4a?w=600&q=80";

  return (
    <PageView badge="Component" title="Media · Photo"
      desc="Visor de imágenes con soporte para 1 ó 2 fotos en viewports desktop y mobile. Thumbnails en 4 tamaños. Radius y proporciones adaptadas al brand token.">

      {/* ── Single image · desktop ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">quantity=1 · viewport=desktop</h2>
        </div>
        <GMediaPhoto quantity={1} viewport="desktop" src={IMG_A} alt="Mountain landscape" />
      </div>

      {/* ── Two images · desktop ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">quantity=2 · viewport=desktop</h2>
        </div>
        <GMediaPhoto quantity={2} viewport="desktop" src={IMG_B} src2={IMG_A} />
      </div>

      {/* ── Mobile viewports ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">viewport=mobile</h2>
        </div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap", alignItems:"flex-start" }}>
          <div style={{ width:320 }}>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>quantity=1</div>
            <GMediaPhoto quantity={1} viewport="mobile" src={IMG_C} />
          </div>
          <div style={{ width:320 }}>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>quantity=2</div>
            <GMediaPhoto quantity={2} viewport="mobile" src={IMG_A} src2={IMG_B} />
          </div>
        </div>
      </div>

      {/* ── Placeholder (sin src) ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sin imagen · placeholder</h2>
        </div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap", alignItems:"flex-start" }}>
          <div style={{ flex:"1 1 360px" }}>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>q=1</div>
            <GMediaPhoto quantity={1} viewport="desktop" />
          </div>
          <div style={{ flex:"1 1 360px" }}>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>q=2</div>
            <GMediaPhoto quantity={2} viewport="desktop" />
          </div>
        </div>
      </div>

      {/* ── Thumbnails ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Thumbnails · 4 tamaños</h2>
        </div>
        <div style={{ display:"flex", gap:32, alignItems:"center", flexWrap:"wrap" }}>
          {[16, 24, 32, 48].map(sz => (
            <div key={sz} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:".04em" }}>{sz}px</div>
              <GThumbnail size={sz} src={IMG_C} />
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:32, alignItems:"center", flexWrap:"wrap", marginTop:24 }}>
          {[16, 24, 32, 48].map(sz => (
            <div key={sz} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:".04em" }}>{sz}px · sin src</div>
              <GThumbnail size={sz} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Con caption ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Con caption</h2>
        </div>
        <GMediaPhoto quantity={1} viewport="desktop" src={IMG_A}
          caption="Vista panorámica de los Alpes suizos al atardecer. Foto: Unsplash." />
      </div>

    </PageView>
  );
}

// ─── DS_Link ──────────────────────────────────────────────────────────────────
function DS_Link() {
  const STATES = ["default","hover","focus","active","visited"];

  const ArrowRightSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ExternalSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9M9 2h5m0 0v5m0-5L7.5 8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <PageView badge="Component" title="Link"
      desc="Enlace de texto con label subrayado. 5 estados interactivos · slots de ícono izquierdo/derecho. Color siempre mapeado a --brand-primary.">

      {/* ── States ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States</h2>
        </div>
        <div style={{ display:"flex", gap:40, flexWrap:"wrap", alignItems:"center" }}>
          {STATES.map(st => (
            <div key={st} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:".04em" }}>
                {st}
              </div>
              <GLink label="Text link" state={st} />
            </div>
          ))}
        </div>
      </div>

      {/* ── With icons ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Con íconos</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)", width:110 }}>Solo texto</span>
            <GLink label="Ir al dashboard" />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)", width:110 }}>slotRight</span>
            <GLink label="Ver más" slotRight iconRight={<ArrowRightSVG />} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)", width:110 }}>slotLeft</span>
            <GLink label="Agregar nuevo" slotLeft />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)", width:110 }}>Ambos slots</span>
            <GLink label="Explorar" slotLeft slotRight iconRight={<ArrowRightSVG />} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="mono" style={{ fontSize:11, color:"var(--brand-text-muted)", width:110 }}>Externo</span>
            <GLink label="hokuestudio.com" slotRight iconRight={<ExternalSVG />} external href="https://hokuestudio.com" />
          </div>
        </div>
      </div>

      {/* ── En contexto ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">En contexto · inline con texto</h2>
        </div>
        <Demo title="Párrafo con links">
          <p style={{ fontSize:16, lineHeight:"1.7", color:"var(--brand-text)", fontFamily:"var(--brand-font-body)", maxWidth:500, margin:0 }}>
            El Multi-Brand Design System permite crear interfaces coherentes.{" "}
            <GLink label="Lee la documentación" />{" "}
            para entender la arquitectura de tokens, o{" "}
            <GLink label="explora los componentes" state="visited" />{" "}
            directamente en el sidebar.
          </p>
        </Demo>
      </div>

      {/* ── Todas las marcas ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Multi-brand · color adaptado</h2>
        </div>
        <div style={{ display:"flex", gap:32, flexWrap:"wrap", alignItems:"center" }}>
          {["zamna","uxc","circulo","datacentral"].map((_, i) => {
            const labels = ["Zamna link","UXC link","Círculo link","DC link"];
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <GLink label={labels[i]} slotRight iconRight={<ArrowRightSVG />} />
              </div>
            );
          })}
        </div>
        <p style={{ fontSize:13, color:"var(--brand-text-muted)", marginTop:8, fontFamily:"var(--brand-font-body)" }}>
          El color se adapta a <code style={{ fontFamily:"var(--brand-font-mono,monospace)", fontSize:12 }}>--brand-primary</code> de cada marca. Cambia de pestaña para verlo.
        </p>
      </div>

    </PageView>
  );
}

// ─── DS_Form ──────────────────────────────────────────────────────────────────
function DS_Form() {
  const STATES = ["default","hover","focus","filled","error","warning","success","disabled"];
  const TYPES  = ["input","password","select","datepicker","textarea"];

  const captions = {
    default: undefined,
    hover:   undefined,
    focus:   undefined,
    filled:  undefined,
    error:   "El formato ingresado no es válido",
    warning: "Este campo requiere revisión",
    success: "¡Campo verificado correctamente!",
    disabled:undefined,
  };
  const values = {
    filled: "usuario@ejemplo.com",
  };

  return (
    <PageView badge="Component" title="Form"
      desc="Campo de formulario con label flotante interno. Types: input, password, select, datepicker, textarea. 8 estados · sizes lg / md / sm. Tokens: --brand-border, --brand-primary, --color-danger/warning/success.">

      {/* ── All states (lg, input) ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States · size=lg · type=input</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
          {STATES.map(st => (
            <div key={st}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>
                state={st}
              </div>
              <GFormField size="lg" state={st} label="Correo electrónico" placeholder="usuario@ejemplo.com"
                value={values[st]} caption={captions[st]} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Types ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types · size=lg · state=default</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:400 }}>
          {TYPES.map(tp => (
            <div key={tp}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>
                type={tp}
              </div>
              <GFormField size="lg" type={tp} label={tp === "textarea" ? "Descripción" : "Campo"} placeholder={tp === "textarea" ? "Escribe aquí..." : "Placeholder"} rows={3} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Sizes ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sizes</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:400 }}>
          {["lg","md","sm"].map(sz => (
            <div key={sz}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>
                size={sz}
              </div>
              <GFormField size={sz} label="Nombre" placeholder="Tu nombre completo" />
            </div>
          ))}
        </div>
      </div>

      {/* ── With slot left + required ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Slot left · required · caption</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:400 }}>
          <GFormField size="lg" label="Usuario" placeholder="Nombre de usuario" slotLeft required />
          <GFormField size="lg" state="error" label="Contraseña" type="password" placeholder="••••••••"
            caption="Mínimo 8 caracteres con mayúsculas y números" required />
          <GFormField size="lg" state="success" label="Correo" placeholder="correo@empresa.com"
            value="admin@empresa.com" caption="¡Correo verificado!" />
        </div>
      </div>

      {/* ── Form example ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Ejemplo · formulario completo</h2>
        </div>
        <Demo title="Registro de cuenta">
          <div style={{ display:"flex", flexDirection:"column", gap:16, width:360 }}>
            <GFormField size="lg" label="Nombre completo" placeholder="Juan García" slotLeft />
            <GFormField size="lg" label="Correo electrónico" placeholder="correo@ejemplo.com" />
            <GFormField size="lg" label="Contraseña" type="password" placeholder="••••••••" required
              caption="Mínimo 8 caracteres" />
            <GFormField size="lg" label="Fecha de nacimiento" type="datepicker" placeholder="DD / MM / AAAA" />
            <GFormField size="lg" label="País" type="select" placeholder="Seleccionar país" />
            <GFormField size="lg" label="Comentarios" type="textarea" placeholder="Escribe tu mensaje…" rows={3} />
          </div>
        </Demo>
      </div>

    </PageView>
  );
}

// ─── DS_Dropzone ──────────────────────────────────────────────────────────────
function DS_Dropzone() {
  const STATES_LG = ["default","hover","progress","error","disabled"];
  const STATES_MD = ["default","hover","progress","error","disabled"];

  return (
    <PageView badge="Component" title="Dropzone"
      desc="Área de carga de archivos. Drag-and-drop con botón de selección. Sizes lg y md · 5 estados · tokens --brand-border, --brand-primary, --color-danger.">

      {/* ── LG States ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States · lg</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {STATES_LG.map(st => (
            <div key={st}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>
                state={st}
              </div>
              <GDropzone size="lg" state={st} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MD States ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">States · md</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {STATES_MD.map(st => (
            <div key={st}>
              <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>
                state={st}
              </div>
              <GDropzone size="md" state={st} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Variants ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sin descripción · sin acción</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>showDescription=false</div>
            <GDropzone size="lg" showDescription={false} />
          </div>
          <div>
            <div className="mono" style={{ fontSize:10, color:"var(--brand-text-muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:".04em" }}>showAction=false</div>
            <GDropzone size="lg" showAction={false} />
          </div>
        </div>
      </div>

    </PageView>
  );
}

// ─── Pattern placeholders ─────────────────────────────────────────────────────
function DS_PatternPlaceholder({ name, desc }) {
  return (
    <PageView badge="Pattern" title={name} desc={desc}>
      <div style={{
        height: 320,
        border: "2px dashed var(--brand-border)",
        borderRadius: "var(--radius-lg)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12,
        color: "var(--brand-text-muted)",
        marginTop: 8,
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="1" y="1" width="38" height="38" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
          <path d="M20 13v14M13 20h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:12 }}>Pattern en construcción</span>
        <span style={{ fontSize:13, opacity:.7 }}>Próximamente en el DS</span>
      </div>
    </PageView>
  );
}

// ─── DS_Pagination ────────────────────────────────────────────────────────────
function DS_Pagination({ brand }) {
  const [page,  setPage]  = useState(1);
  const [total, setTotal] = useState(28);

  const TOTAL_OPTIONS = [7, 10, 15, 28, 50];

  // Which truncation mode are we in?
  const getTrunc = (cur, tot) => {
    if (tot <= 7) return "none";
    const left = Math.max(2, cur - 1), right = Math.min(tot - 1, cur + 1);
    const dotL = left > 2, dotR = right < tot - 1;
    if (!dotL &&  dotR) return "end";
    if ( dotL && !dotR) return "start";
    if ( dotL &&  dotR) return "double";
    return "none";
  };
  const trunc = getTrunc(page, total);
  const truncLabel = { none:"none (all pages visible)", end:"end (truncate tail)", start:"start (truncate head)", double:"double (truncate both ends)" };

  return (
    <PageView badge="Component" title="Pagination" desc="Navigation control for paged content. Two types: primary (text prev/next) and secondary (icon first/prev/next/last). Auto-truncates with ellipsis when total pages exceed 7.">

      {/* ── Live demo ── */}
      <div style={{
        padding:32, borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        display:"flex", flexDirection:"column", gap:32, marginBottom:40,
      }}>
        {/* status */}
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text-muted)" }}>Total pages:</span>
            {TOTAL_OPTIONS.map(n => (
              <button key={n} onClick={() => { setTotal(n); setPage(1); }} style={{
                padding:"4px 12px", borderRadius:"var(--radius-md)",
                border:"1px solid var(--brand-border)",
                background: total === n ? "var(--brand-primary)" : "transparent",
                color: total === n ? "var(--brand-on-primary)" : "var(--brand-text)",
                fontFamily:"var(--brand-font-body)", fontSize:13, cursor:"pointer",
              }}>{n}</button>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>
              page <strong style={{ color:"var(--brand-primary)", fontFamily:"'IBM Plex Mono',monospace" }}>{page}</strong> / {total}
            </span>
            <span style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
              padding:"3px 8px", borderRadius:4,
              background:"var(--brand-primary-soft)", color:"var(--brand-primary)",
            }}>truncation={trunc}</span>
          </div>
        </div>

        {/* primary */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>Primary</span>
          <GPagination type="primary" currentPage={page} totalPages={total} onChange={setPage} />
        </div>

        {/* secondary */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>Secondary</span>
          <GPagination type="secondary" currentPage={page} totalPages={total} onChange={setPage} />
        </div>
      </div>

      {/* ── Truncation showcase ── */}
      <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:15, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Truncation modes</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:48 }}>
        {[
          { label:"none",   cur:1,  tot:7,  desc:"≤ 7 pages — all items shown, no ellipsis" },
          { label:"end",    cur:3,  tot:28, desc:"Active page near start — truncate tail: 1 2 3 4 5 … last" },
          { label:"start",  cur:26, tot:28, desc:"Active page near end — truncate head: 1 … last-4 last-3 last-2 last-1 last" },
          { label:"double", cur:14, tot:28, desc:"Active page in middle — truncate both: 1 … prev active next … last" },
        ].map(({ label, cur, tot, desc }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
            <div style={{ minWidth:280 }}>
              <GPagination type="primary" currentPage={cur} totalPages={tot} onChange={() => {}} />
            </div>
            <div>
              <code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, background:"var(--brand-primary-soft)", padding:"2px 7px", borderRadius:4, color:"var(--brand-primary)", marginRight:8 }}>{label}</code>
              <span style={{ fontSize:13, color:"var(--brand-text-muted)", fontFamily:"var(--brand-font-body)" }}>{desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Spec table ── */}
      <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:15, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Anatomy & tokens</h3>
      <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
        <thead>
          <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
            {["Element","Token / value","Notes"].map(h => (
              <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:"var(--brand-text-muted)", fontWeight:500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Item size",         "32 × 32 px",                          "width & height"],
            ["Item padding",      "6px vertical · 4px horizontal",       ""],
            ["Item radius",       "--radius-md",                          "follows brand"],
            ["Item default",      "transparent bg, --brand-text",        ""],
            ["Item hover",        "--brand-bg-elev",                      ""],
            ["Item active",       "--brand-primary-soft bg, --brand-primary text","current page"],
            ["Item ellipsis",     "non-interactive, --brand-text",       ""],
            ["Gap (top-level)",   "8px",                                 "between all groups"],
            ["Text btn height",   "32px",                                 "Atrás / Siguiente"],
            ["Text btn padding",  "prev: 4px 8px 4px 2px · next: reverse","chevron + text"],
            ["Icon btn size",     "32 × 32 px, padding 4px",             "square nav buttons"],
            ["Disabled opacity",  "0.38",                                 "nav buttons only"],
            ["Truncation window", "1 sibling each side of active page",  "max 7 items shown"],
          ].map(([el, val, note]) => (
            <tr key={el} style={{ borderBottom:"1px solid var(--brand-border)" }}>
              <td style={{ padding:"8px 12px", fontWeight:500, color:"var(--brand-text)" }}>{el}</td>
              <td style={{ padding:"8px 12px" }}><code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, background:"var(--brand-bg-elev)", padding:"2px 6px", borderRadius:4, color:"var(--brand-text)" }}>{val}</code></td>
              <td style={{ padding:"8px 12px", color:"var(--brand-text-muted)" }}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageView>
  );
}

// ─── DS_Notification ──────────────────────────────────────────────────────────
function DS_Notification({ brand }) {
  const [dismissed, setDismissed] = useState({});
  const [showAction, setShowAction] = useState(true);
  const [showIcon, setShowIcon]     = useState(true);
  const [closable, setClosable]     = useState(true);
  const dismiss = (key) => setDismissed(d => ({ ...d, [key]: true }));
  const reset   = () => setDismissed({});

  const TYPES = [
    { type:"primary", label:"Primary",  desc:"Default style. White background with border. Used for neutral or brand-level messages." },
    { type:"info",    label:"Info",      desc:"Warm amber tint. Draws attention to tips, updates, or non-critical notices." },
    { type:"success", label:"Success",   desc:"Green tint. Confirms a completed action, successful operation, or positive outcome." },
    { type:"error",   label:"Error",     desc:"Red tint. Signals a failure, blocking error, or action that needs immediate attention." },
  ];

  const CONTENT_VARIANTS = [
    { title:"Título de notificación", description:"Una nueva versión de la aplicación está disponible. ¡Actualice ahora para obtener las últimas funciones y mejoras!", label:"Title + Description" },
    { title:"Título de notificación", description:null,  label:"Title only" },
    { title:null, description:"Una nueva versión de la aplicación está disponible. ¡Actualice ahora!", label:"Description only" },
  ];

  return (
    <PageView badge="Component" title="Notification" desc="An inline message strip that communicates system feedback to the user. Four semantic types, optional icon, action buttons, and close control.">

      {/* ── Controls ── */}
      <div style={{ display:"flex", gap:12, marginBottom:32, flexWrap:"wrap", alignItems:"center" }}>
        {[
          ["Show icon",    showIcon,    setShowIcon],
          ["Action buttons", showAction, setShowAction],
          ["Closable",     closable,    setClosable],
        ].map(([label, val, setter]) => (
          <button key={label} onClick={() => setter(!val)} style={{
            padding:"6px 14px", borderRadius:"var(--radius-md)",
            border:"1px solid var(--brand-border)",
            background: val ? "var(--brand-primary)" : "transparent",
            color: val ? "var(--brand-on-primary)" : "var(--brand-text)",
            fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:500, cursor:"pointer",
            transition:"background .15s, color .15s",
          }}>{label}</button>
        ))}
        {Object.keys(dismissed).length > 0 && (
          <button onClick={reset} style={{
            padding:"6px 14px", borderRadius:"var(--radius-md)",
            border:"1px solid var(--brand-border)",
            background:"transparent", color:"var(--brand-text-muted)",
            fontFamily:"var(--brand-font-body)", fontSize:13, cursor:"pointer",
          }}>↺ Reset dismissed</button>
        )}
      </div>

      {/* ── All 4 types ── */}
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:48 }}>
        {TYPES.map(({ type, label, desc }) => (
          <div key={type} style={{ display:"flex", alignItems:"flex-start", gap:24, flexWrap:"wrap" }}>
            {!dismissed[type] ? (
              <GNotification
                type={type}
                showIcon={showIcon}
                closable={closable}
                action={showAction}
                onClose={() => dismiss(type)}
                onPrimary={() => {}}
                onSecondary={() => {}}
              />
            ) : (
              <div style={{
                width:344, height:52,
                border:"1px dashed var(--brand-border)", borderRadius:12,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"var(--brand-text-muted)", fontSize:13,
                fontFamily:"var(--brand-font-body)",
              }}>dismissed</div>
            )}
            <div style={{ flex:1, minWidth:160, paddingTop:4 }}>
              <p style={{ margin:"0 0 4px", fontWeight:600, fontSize:14, fontFamily:"var(--brand-font-display)", color:"var(--brand-text)" }}>{label}</p>
              <p style={{ margin:0, fontSize:13, color:"var(--brand-text-muted)", fontFamily:"var(--brand-font-body)", lineHeight:"1.5" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Content variants ── */}
      <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:15, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Content variants</h3>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:48 }}>
        {CONTENT_VARIANTS.map(({ title, description, label }) => (
          <div key={label} style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <GNotification
              type="primary"
              title={title || undefined}
              description={description || undefined}
              showIcon action={false} closable
              onClose={() => {}}
            />
            <span style={{ fontSize:12, color:"var(--brand-text-muted)", fontFamily:"var(--brand-font-body)", textAlign:"center" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Spec table ── */}
      <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:15, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Anatomy & tokens</h3>
      <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
        <thead>
          <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
            {["Slot / token","Value","Notes"].map(h => (
              <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:"var(--brand-text-muted)", fontWeight:500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Width",               "344px",                              "Fixed per Figma spec"],
            ["Padding",             "16px",                               "All sides"],
            ["Border-radius",       "12px",                               "—"],
            ["primary · bg",        "--brand-bg + 1px --brand-border",    "White + border"],
            ["info · bg",           "#fff9e6",                            "Amber light"],
            ["success · bg",        "#e9f9e6",                            "Green light"],
            ["error · bg",          "#fde6e8",                            "Red light"],
            ["Icon size",           "24 × 24 px",                         "pr=8px from content"],
            ["primary icon color",  "--brand-primary",                    "Adapts per brand"],
            ["info icon color",     "--color-warning (#C47A00)",           "Semantic"],
            ["success icon color",  "--color-success (#0E8A3E)",           "Semantic"],
            ["error icon color",    "--color-danger (#D6213D)",            "Semantic"],
            ["Title",               "16px / 600 / --brand-font-display",  "line-height: 20px"],
            ["Description",         "14px / 400 / --brand-font-body",     "line-height: 20px"],
            ["Content gap",         "4px title↔desc · 16px content↔btns",""],
            ["Action btn height",   "~30px (padding 5+1px)",              "radius: 8px"],
            ["Close btn",           "24×24 px, radius: 50%",              "ml=4px from content"],
          ].map(([slot, val, note]) => (
            <tr key={slot} style={{ borderBottom:"1px solid var(--brand-border)" }}>
              <td style={{ padding:"8px 12px", fontWeight:500, color:"var(--brand-text)" }}>{slot}</td>
              <td style={{ padding:"8px 12px" }}><code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, background:"var(--brand-bg-elev)", padding:"2px 6px", borderRadius:4, color:"var(--brand-text)" }}>{val}</code></td>
              <td style={{ padding:"8px 12px", color:"var(--brand-text-muted)" }}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageView>
  );
}

// ─── DS_Modal ─────────────────────────────────────────────────────────────────
function DS_Modal({ brand }) {
  const SIZES = ["sm", "md", "lg"];
  const WIDTH_MAP = { sm: 480, md: 640, lg: 800 };
  const VARIANTS = [
    {
      title: "Informational modal",
      description: "This is the default modal body. Use it to deliver focused information or request a simple action from the user.",
      confirmLabel: "Confirmar",
    },
    {
      title: "Destructive action",
      description: "Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.",
      confirmLabel: "Eliminar",
    },
    {
      title: "With custom content",
      custom: true,
      confirmLabel: "Guardar",
    },
  ];

  const [openKey, setOpenKey] = useState(null);
  const [size, setSize] = useState("md");

  return (
    <PageView badge="Component" title="Modal" desc="A dialog overlay that focuses the user's attention on a specific action or message. Includes header, body, and footer slots. Supports custom content and three sizes.">

      {/* Size selector */}
      <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
        {SIZES.map(s => (
          <button key={s} onClick={() => setSize(s)} style={{
            padding:"6px 16px", borderRadius:"var(--radius-md)", border:"1px solid var(--brand-border)",
            background: size === s ? "var(--brand-primary)" : "transparent",
            color: size === s ? "var(--brand-on-primary)" : "var(--brand-text)",
            fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:500, cursor:"pointer",
            transition:"background .15s, color .15s",
          }}>
            {s.toUpperCase()} · {WIDTH_MAP[s]}px
          </button>
        ))}
      </div>

      {/* Variant triggers */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {VARIANTS.map((v, i) => {
          const key = `${size}-${i}`;
          const isOpen = openKey === key;
          return (
            <React.Fragment key={i}>
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"20px 24px",
                background:"var(--brand-bg-elev)",
                border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-md)",
                gap: 16,
              }}>
                <div>
                  <p style={{ margin:0, fontFamily:"var(--brand-font-display)", fontWeight:600, fontSize:15, color:"var(--brand-text)" }}>{v.title}</p>
                  <p style={{ margin:"4px 0 0", fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text-muted)" }}>
                    {v.custom ? "Custom children slot — form fields, images, any content" : "Standard text description"}
                  </p>
                </div>
                <button onClick={() => setOpenKey(isOpen ? null : key)} style={{
                  flexShrink:0, height:36, padding:"0 16px",
                  background:"var(--brand-primary)", color:"var(--brand-on-primary)",
                  border:"none", borderRadius:"var(--radius-md)",
                  fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:500, cursor:"pointer",
                }}>
                  Open modal
                </button>
              </div>

              <GModal
                open={isOpen}
                onClose={() => setOpenKey(null)}
                size={size}
                title={v.title}
                description={v.description}
                cancelLabel="Cancelar"
                confirmLabel={v.confirmLabel}
                onCancel={() => setOpenKey(null)}
                onConfirm={() => setOpenKey(null)}
              >
                {v.custom ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <GFormField label="Nombre" size="md" state="default" type="input" placeholder="Ej. Mi plataforma" />
                    <GFormField label="Descripción" size="md" state="default" type="textarea" placeholder="Describe tu plataforma…" />
                  </div>
                ) : undefined}
              </GModal>
            </React.Fragment>
          );
        })}
      </div>

      {/* Spec table */}
      <div style={{ marginTop:48 }}>
        <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:16, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Component anatomy</h3>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Slot","Token / value","Notes"].map(h => (
                <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:"var(--brand-text-muted)", fontWeight:500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Container width",   "480 | 640 | 800 px",        "sm / md / lg"],
              ["Background",        "--brand-bg",                 ""],
              ["Border",            "1px solid --brand-border",   ""],
              ["Border-radius",     "--radius-lg",                ""],
              ["Shadow",            "0 10px 15px -3px rgba(0,0,0,.12) …","shadow-md"],
              ["Header padding",    "40px 48px 8px",              "top / sides / bottom"],
              ["Title",             "24px semibold, --brand-font-display",""],
              ["Close button",      "32×32 circle, --brand-border","hover: --brand-bg-elev"],
              ["Body padding",      "24px 48px",                  ""],
              ["Body text",         "16px regular, --brand-text", ""],
              ["Footer padding",    "16px 48px 48px",             "top / sides / bottom"],
              ["Cancel",            "outline, 1px --brand-border","hover: --brand-bg-elev"],
              ["Confirm",           "--brand-primary bg, --brand-on-primary","hover: --brand-primary-hover"],
              ["Button height",     "40px",                       "both actions"],
              ["Button gap",        "12px",                       ""],
              ["Backdrop",          "rgba(10,11,14,.5) + blur(2px)","click to close"],
            ].map(([slot, token, note]) => (
              <tr key={slot} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"8px 12px", color:"var(--brand-text)", fontWeight:500 }}>{slot}</td>
                <td style={{ padding:"8px 12px" }}><code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, background:"var(--brand-bg-elev)", padding:"2px 6px", borderRadius:4, color:"var(--brand-text)" }}>{token}</code></td>
                <td style={{ padding:"8px 12px", color:"var(--brand-text-muted)" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_ModalPromo ────────────────────────────────────────────────────────────
function DS_ModalPromo({ brand }) {
  const [openKey, setOpenKey] = useState(null);
  const [viewport, setViewport] = useState("desktop");
  const close = () => setOpenKey(null);

  const PRESETS = [
    {
      id: "experiences",
      label: "Social promo",
      desc: "Media header with avatar + social proof section and article cards",
      vp: "desktop",
    },
    {
      id: "form",
      label: "Profile wizard",
      desc: "Bottom-sheet form wizard with back/next navigation",
      vp: "mobile",
    },
    {
      id: "contest",
      label: "Contest promo",
      desc: "Illustrative card header with subtitle+title and single CTA",
      vp: "desktop",
    },
  ];

  return (
    <PageView badge="Component" title="Modal Promo" desc="A slot-based promotional & wizard modal. Compose with GPromoHeader, GPromoText, GPromoDivider, GPromoMedia, GPromoForm, and GPromoFooter to build any layout — social proof, forms, announcements, and more.">

      {/* Viewport selector */}
      <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
        {["desktop","mobile"].map(v => (
          <button key={v} onClick={() => setViewport(v)} style={{
            padding:"6px 16px", borderRadius:"var(--radius-md)", border:"1px solid var(--brand-border)",
            background: viewport === v ? "var(--brand-primary)" : "transparent",
            color: viewport === v ? "var(--brand-on-primary)" : "var(--brand-text)",
            fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:500, cursor:"pointer",
            transition:"background .15s, color .15s",
          }}>
            {v === "desktop" ? "⬜ Desktop · 640px" : "📱 Mobile · 360px"}
          </button>
        ))}
      </div>

      {/* Preset rows */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {PRESETS.map((p) => {
          const key = `${viewport}-${p.id}`;
          return (
            <div key={p.id} style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"20px 24px",
              background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
              borderRadius:"var(--radius-md)", gap:16,
            }}>
              <div>
                <p style={{ margin:0, fontFamily:"var(--brand-font-display)", fontWeight:600, fontSize:15, color:"var(--brand-text)" }}>{p.label}</p>
                <p style={{ margin:"4px 0 0", fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text-muted)" }}>{p.desc}</p>
              </div>
              <button onClick={() => setOpenKey(key)} style={{
                flexShrink:0, height:36, padding:"0 16px",
                background:"var(--brand-primary)", color:"var(--brand-on-primary)",
                border:"none", borderRadius:"var(--radius-md)",
                fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:500, cursor:"pointer",
              }}>
                Open
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Modal: Social promo ── */}
      <GModalPromo open={openKey !== null && openKey.endsWith("experiences")} onClose={close} viewport={viewport}>
        <GPromoHeader type="media" subtitle="Aquí están tus experiencias, Jesús" onClose={close} viewport={viewport} />
        <GPromoDivider type="spacing" spacing={12} />
        <GPromoText type="title-lg" title="Últimas actualizaciones" viewport={viewport} />
        <div style={{
          padding:`8px ${viewport === "desktop" ? 48 : 20}px`,
          textAlign:"center", fontFamily:"var(--brand-font-body)", fontSize:16, lineHeight:"20px",
          color:"var(--brand-text)",
        }}>
          <span style={{ fontWeight:700, color:"var(--brand-primary)" }}>123 personas</span>
          {" han elegido tu misma experiencia:"}
        </div>
        <GPromoMedia type="avatars" viewport={viewport} />
        <GPromoDivider type="line" spacing={12} viewport={viewport} />
        <GPromoText type="title-md" title="Experiencias similares" viewport={viewport} />
        <GPromoMedia type="articles" viewport={viewport} />
        <GPromoFooter type="button" primaryLabel="Ver todas" showArrow={false} onPrimary={close} viewport={viewport} />
      </GModalPromo>

      {/* ── Modal: Profile wizard ── */}
      <GModalPromo open={openKey !== null && openKey.endsWith("form")} onClose={close} viewport={viewport}>
        <GPromoHeader type="empty" onClose={close} viewport={viewport} />
        <GPromoDivider type="spacing" spacing={viewport === "desktop" ? 20 : 28} />
        <GPromoText type="title-lg" title="Edita tu perfil" viewport={viewport} />
        <GPromoText type="text" content="Actualiza tus datos para confirmar tus derechos" viewport={viewport} />
        <GPromoDivider type="spacing" spacing={8} />
        <GPromoForm
          fields={[
            { label:"Nombre", type:"input" },
            { label:"Correo", type:"input" },
            { label:"País", type:"select" },
            { label:"Ciudad", type:"select" },
          ]}
          viewport={viewport}
        />
        <GPromoDivider type="spacing" spacing={12} />
        <GPromoFooter type="2-buttons" primaryLabel="Siguiente" onPrimary={close} onBack={close} viewport={viewport} />
      </GModalPromo>

      {/* ── Modal: Contest promo ── */}
      <GModalPromo open={openKey !== null && openKey.endsWith("contest")} onClose={close} viewport={viewport}>
        <GPromoHeader type="media-card" onClose={close} viewport={viewport} />
        <GPromoText type="subtitle+title" subtitle="Concurso del mes" title="Gana hasta $10,000 MXN" viewport={viewport} />
        <GPromoDivider type="spacing" spacing={4} />
        <GPromoText type="text" content="Revisa los detalles y participa para ganar hasta $10,000 pesos en productos de belleza." viewport={viewport} />
        <GPromoDivider type="spacing" spacing={8} />
        <GPromoFooter type="button" primaryLabel="Participar" showArrow={false} onPrimary={close} viewport={viewport} />
      </GModalPromo>

      {/* Slot reference */}
      <div style={{ marginTop:48 }}>
        <h3 style={{ fontFamily:"var(--brand-font-display)", fontSize:16, fontWeight:600, color:"var(--brand-text)", marginBottom:16 }}>Slot components</h3>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Component","Key props","Notes"].map(h => (
                <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:"var(--brand-text-muted)", fontWeight:500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["GModalPromo","open, onClose, viewport","Container + backdrop"],
              ["GPromoHeader","type: title|media|media-card|empty","Gradient bg, avatar, or plain title"],
              ["GPromoText","type: title-lg|title-md|subtitle+title|text","Typography sections"],
              ["GPromoDivider","type: line|spacing, spacing: px","Horizontal rule or vertical gap"],
              ["GPromoMedia","type: avatars|articles, items: []","Social proof or content cards"],
              ["GPromoForm","fields: [{label, type}]","Stacked GFormField inputs"],
              ["GPromoFooter","type: button|2-buttons|2-equal|button+text","CTA & navigation buttons"],
            ].map(([comp, props, note]) => (
              <tr key={comp} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"8px 12px" }}><code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, background:"var(--brand-bg-elev)", padding:"2px 6px", borderRadius:4, color:"var(--brand-primary)", fontWeight:600 }}>{comp}</code></td>
                <td style={{ padding:"8px 12px" }}><code style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{props}</code></td>
                <td style={{ padding:"8px 12px", color:"var(--brand-text-muted)" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

function DS_PatternLogin()          { return <DS_PatternPlaceholder name="Login"           desc="Flujo de autenticación. Email + password. Social login. Multi-factor." />; }
function DS_PatternDashboard()      { return <DS_PatternPlaceholder name="Dashboard"       desc="Vista principal con métricas, gráficas y acciones rápidas." />; }
function DS_PatternCreatePlatform() { return <DS_PatternPlaceholder name="Create platform" desc="Wizard de onboarding para crear una nueva plataforma." />; }
function DS_PatternBrandSetup()     { return <DS_PatternPlaceholder name="Brand setup"     desc="Configuración de identidad de marca: colores, tipografía, logo." />; }
function DS_PatternUserProfile()    { return <DS_PatternPlaceholder name="User profile"    desc="Perfil de usuario: datos personales, avatar, preferencias." />; }

// ─── DS_Progress ─────────────────────────────────────────────────────────────
function DS_Progress({ brand }) {
  const [value, setValue] = useState(35);

  const SIZES = ["lg", "md", "sm"];

  const SECTION_SAMPLES = [
    { type:"circle", size:"lg", label:"Revenue",        labelBar:"" },
    { type:"bar",    size:"lg", label:"",               labelBar:"Revenue this quarter" },
    { type:"circle", size:"md", label:"Users",          labelBar:"" },
    { type:"bar",    size:"md", label:"",               labelBar:"Active users" },
    { type:"circle", size:"sm", label:"Tasks",          labelBar:"" },
    { type:"bar",    size:"sm", label:"",               labelBar:"Tasks completed" },
  ];

  const sectionHead = (label) => (
    <div style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:20 }}>
      {label}
    </div>
  );

  const mono = { fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" };

  return (
    <PageView badge="Component" title="Progressbar"
      desc="Two display types — bar (horizontal track + fill) and circle (SVG radial arc). Three sizes each. GProgressSection composes either type with a label and percentage into a ready-to-use data-display unit.">

      {/* ── Live demo ── */}
      <div style={{
        padding:32, borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Live demo")}

        {/* Slider */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:40 }}>
          <span style={{ ...mono }}>0%</span>
          <input
            type="range" min={0} max={100} value={value}
            onChange={e => setValue(Number(e.target.value))}
            style={{ flex:1, accentColor:"var(--brand-primary)", cursor:"pointer" }}
          />
          <span style={{ ...mono }}>100%</span>
          <span style={{
            fontFamily:"var(--brand-font-display)", fontSize:20, lineHeight:"28px", fontWeight:700,
            color:"var(--brand-primary)", minWidth:52, textAlign:"right",
          }}>{value}%</span>
        </div>

        {/* Bar sizes */}
        <div style={{ marginBottom:32 }}>
          <div style={{ ...mono, marginBottom:16 }}>PROGRESS BAR</div>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {SIZES.map(s => (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span style={{ ...mono, width:20 }}>{s}</span>
                <GProgressBar value={value} size={s} style={{ flex:1 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Circle sizes */}
        <div>
          <div style={{ ...mono, marginBottom:16 }}>PROGRESS CIRCLE</div>
          <div style={{ display:"flex", gap:40, alignItems:"flex-end" }}>
            {SIZES.map(s => (
              <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                <GProgressCircle value={value} size={s} showValue={s !== "sm"} />
                <span style={{ ...mono }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress Section composites ── */}
      <div style={{
        padding:"28px 32px", borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Progress Section — all variants")}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"40px 24px" }}>
          {SECTION_SAMPLES.map(({ type, size, label, labelBar }, i) => (
            <div key={i}>
              <div style={{ ...mono, marginBottom:12 }}>{type} · {size}</div>
              <GProgressSection
                type={type} size={size} value={value}
                label={label || "Label"}
                labelBar={labelBar || "Long name for data"}
                style={type === "bar" ? { maxWidth: 360 } : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bar at fixed steps ── */}
      <div style={{
        padding:"28px 32px", borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Bar — size & value reference")}
        <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
          {SIZES.map(s => (
            <div key={s}>
              <div style={{ ...mono, marginBottom:14 }}>{s.toUpperCase()} · h={({ lg:12, md:8, sm:4 })[s]}px</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[0, 25, 50, 75, 100].map(v => (
                  <div key={v} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ ...mono, width:32, textAlign:"right" }}>{v}%</span>
                    <GProgressBar value={v} size={s} style={{ flex:1 }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Circle at fixed steps ── */}
      <div style={{
        padding:"28px 32px", borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Circle — size & value reference")}
        <div style={{ display:"flex", flexDirection:"column", gap:40 }}>
          {SIZES.map(s => (
            <div key={s}>
              <div style={{ ...mono, marginBottom:16 }}>{s.toUpperCase()} · {({ lg:96, md:64, sm:24 })[s]}px</div>
              <div style={{ display:"flex", gap:32, alignItems:"flex-end", flexWrap:"wrap" }}>
                {[0, 10, 25, 50, 75, 90, 100].map(v => (
                  <div key={v} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                    <GProgressCircle value={v} size={s} showValue={s !== "sm"} />
                    <span style={{ ...mono }}>{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Props tables ── */}
      {[
        {
          title: "GProgressBar",
          rows: [
            ["value",   "number",             "0",    "Fill amount 0–100"],
            ["size",    '"lg"|"md"|"sm"',      '"md"', "Track height: lg=12px · md=8px · sm=4px"],
            ["style",   "CSSProperties",       "—",    "Inline overrides on the root element"],
          ],
        },
        {
          title: "GProgressCircle",
          rows: [
            ["value",     "number",            "0",     "Fill amount 0–100"],
            ["size",      '"lg"|"md"|"sm"',     '"md"',  "Diameter: lg=96px · md=64px · sm=24px"],
            ["showValue", "boolean",            "false", "Render percentage text centered inside (lg/md only)"],
            ["style",     "CSSProperties",      "—",     "Inline overrides on the root element"],
          ],
        },
        {
          title: "GProgressSection",
          rows: [
            ["type",     '"circle"|"bar"',    '"circle"',          "Which indicator to render"],
            ["size",     '"lg"|"md"|"sm"',    '"lg"',              "Size variant (affects indicator + typography)"],
            ["value",    "number",            "20",                "Progress 0–100"],
            ["label",    "string",            '"Label"',           "Label text shown below the circle"],
            ["labelBar", "string",            '"Long name for data"',"Label text shown left of the bar percentage"],
            ["style",    "CSSProperties",     "—",                 "Inline overrides on the root element"],
          ],
        },
      ].map(({ title, rows }) => (
        <div key={title} style={{ marginBottom:40 }}>
          <div style={{ fontFamily:"var(--brand-font-display)", fontSize:16, fontWeight:600, color:"var(--brand-text)", marginBottom:12 }}>{title}</div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
                  {["Prop","Type","Default","Description"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600, color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                    <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                    <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                    <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                    <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </PageView>
  );
}

// ─── DS_Popover ───────────────────────────────────────────────────────────────
function DS_Popover({ brand }) {
  const PLACEMENTS = [
    "top","top-start","top-end",
    "bottom","bottom-start","bottom-end",
    "left","left-start","left-end",
    "right","right-start","right-end",
  ];

  // Live demo state
  const [placement, setPlacement] = useState("top");
  const [open, setOpen] = useState(true);
  const [withTitle, setWithTitle] = useState(true);
  const [withDesc,  setWithDesc]  = useState(true);
  const [closable,  setClosable]  = useState(true);
  const [showTip,   setShowTip]   = useState(true);

  // Position the popover relative to a trigger button
  const OFFSET = {
    "top":          { bottom:"calc(100% + 10px)", left:"50%",  transform:"translateX(-50%)" },
    "top-start":    { bottom:"calc(100% + 10px)", left:0 },
    "top-end":      { bottom:"calc(100% + 10px)", right:0 },
    "bottom":       { top:"calc(100% + 10px)",    left:"50%",  transform:"translateX(-50%)" },
    "bottom-start": { top:"calc(100% + 10px)",    left:0 },
    "bottom-end":   { top:"calc(100% + 10px)",    right:0 },
    "left":         { right:"calc(100% + 10px)",  top:"50%",   transform:"translateY(-50%)" },
    "left-start":   { right:"calc(100% + 10px)",  top:0 },
    "left-end":     { right:"calc(100% + 10px)",  bottom:0 },
    "right":        { left:"calc(100% + 10px)",   top:"50%",   transform:"translateY(-50%)" },
    "right-start":  { left:"calc(100% + 10px)",   top:0 },
    "right-end":    { left:"calc(100% + 10px)",   bottom:0 },
  };

  const chip = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding:"4px 12px", borderRadius:999,
      border:"1px solid var(--brand-border)",
      background: active ? "var(--brand-primary)" : "transparent",
      color: active ? "var(--brand-on-primary)" : "var(--brand-text-muted)",
      fontFamily:"var(--brand-font-body)", fontSize:12, cursor:"pointer",
      fontWeight: active ? 600 : 400,
    }}>{label}</button>
  );

  const toggle = (label, value, onToggle) => (
    <label style={{
      display:"inline-flex", alignItems:"center", gap:8,
      fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text)",
      cursor:"pointer",
    }}>
      <div
        onClick={onToggle}
        style={{
          width:32, height:18, borderRadius:999,
          background: value ? "var(--brand-primary)" : "var(--brand-border)",
          position:"relative", cursor:"pointer", transition:"background .15s",
        }}
      >
        <div style={{
          position:"absolute", top:2,
          left: value ? 16 : 2,
          width:14, height:14, borderRadius:999,
          background:"#fff",
          transition:"left .15s",
        }} />
      </div>
      {label}
    </label>
  );

  const sectionHead = (label) => (
    <div style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:20 }}>
      {label}
    </div>
  );

  return (
    <PageView badge="Component" title="Popover"
      desc="Floating contextual bubble anchored to a trigger element. Supports 12 placement variants (top/bottom/left/right × center/start/end), optional directional arrow, close button, and flexible content (title, description, or custom children).">

      {/* ── Live demo ── */}
      <div style={{
        padding:32, borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Live demo")}

        {/* Controls */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:24, marginBottom:40, alignItems:"flex-start" }}>
          <div>
            <div style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", marginBottom:8 }}>Placement</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {PLACEMENTS.map(p => chip(p, placement===p, () => { setPlacement(p); setOpen(true); }))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {toggle("Title", withTitle, () => setWithTitle(v => !v))}
            {toggle("Description", withDesc,  () => setWithDesc(v => !v))}
            {toggle("Closable",    closable,  () => setClosable(v => !v))}
            {toggle("Arrow tip",   showTip,   () => setShowTip(v => !v))}
          </div>
        </div>

        {/* Demo stage */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          minHeight:280, padding:"80px 160px",
          background:"var(--brand-bg)", borderRadius:"var(--radius-md)",
          border:"1px solid var(--brand-border)",
          position:"relative", overflow:"visible",
        }}>
          <div style={{ position:"relative", display:"inline-flex" }}>
            <button
              onClick={() => setOpen(v => !v)}
              style={{
                padding:"8px 20px",
                background:"var(--brand-primary)",
                color:"var(--brand-on-primary)",
                border:"none", borderRadius:"var(--radius-md)",
                fontFamily:"var(--brand-font-body)", fontSize:14, fontWeight:600,
                cursor:"pointer",
              }}
            >
              {open ? "Cerrar" : "Abrir popover"}
            </button>

            {open && (
              <div style={{ position:"absolute", zIndex:50, ...OFFSET[placement] }}>
                <GPopover
                  placement={placement}
                  title={withTitle ? "Título del popover" : undefined}
                  description={withDesc ? "Descripción del popover. Aquí hay mucha descripción, como un ejemplo." : undefined}
                  closable={closable}
                  showTip={showTip}
                  onClose={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── All placements ── */}
      <div style={{
        padding:"28px 32px", borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("All placements")}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:40 }}>
          {["top","bottom","left","right"].map(side => (
            <div key={side}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:16, textTransform:"uppercase" }}>
                {side}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
                {["","-start","-end"].map(suffix => {
                  const p = side + suffix;
                  return (
                    <div key={p}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--brand-text-muted)", marginBottom:8 }}>
                        {p}
                      </div>
                      <GPopover
                        placement={p}
                        title="Título"
                        description="Descripción del popover."
                        closable
                        showTip
                        style={{ width:"100%", boxSizing:"border-box" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content variants ── */}
      <div style={{
        padding:"28px 32px", borderRadius:"var(--radius-md)",
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        marginBottom:40,
      }}>
        {sectionHead("Content variants")}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }}>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>title + description</div>
            <GPopover placement="top" title="Título" description="Descripción del popover. Aquí hay mucha descripción, como un ejemplo." closable showTip />
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>title only</div>
            <GPopover placement="top" title="Título" closable showTip />
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>description only</div>
            <GPopover placement="top" description="Descripción del popover. Aquí hay mucha descripción, como un ejemplo." closable showTip />
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>closable=false</div>
            <GPopover placement="top" title="Título" description="No tiene botón de cierre." closable={false} showTip />
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>showTip=false</div>
            <GPopover placement="top" title="Título" description="Sin flecha de dirección." closable showTip={false} />
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:12 }}>custom children</div>
            <GPopover placement="top" showTip closable>
              <p style={{ margin:0, fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text)" }}>
                Contenido <strong>personalizado</strong> con markup libre.
              </p>
              <GButton size="sm" style={{ marginTop:8 }}>Acción</GButton>
            </GPopover>
          </div>
        </div>
      </div>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600, color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["placement", '"top"|"top-start"|"top-end"|"bottom"|"bottom-start"|"bottom-end"|"left"|"left-start"|"left-end"|"right"|"right-start"|"right-end"', '"top"', "Arrow anchor and popover position relative to the trigger"],
              ["title",       "string",    "—",      "Bold header line"],
              ["description", "string",    "—",      "Regular body text below title"],
              ["closable",    "boolean",   "true",   "Show × close button"],
              ["showTip",     "boolean",   "true",   "Show the directional arrow"],
              ["onClose",     "() => void","—",      "Callback when close button is clicked"],
              ["children",    "ReactNode", "—",      "Custom content (replaces/extends title+description)"],
              ["style",       "CSSProperties","—",   "Inline style overrides on the root element"],
            ].map(([prop, type, def, desc]) => (
              <tr key={prop} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_Paragraph ─────────────────────────────────────────────────────────────
function DS_Paragraph({ brand }) {
  const [vp, setVp] = useState("desktop");

  const HEADING_SIZES = ["5xl","4xl","3xl","2xl","xl"];
  const BODY_SIZES    = [
    { size:"lg",       label:"LG — 18/24 Regular" },
    { size:"md",       label:"MD — 16/20 Regular" },
    { size:"md-upper", label:"MD Uppercase — 16/20 Regular" },
    { size:"sm",       label:"SM — 14/20 Regular" },
    { size:"sm-upper", label:"SM Uppercase — 14/20 Regular" },
  ];

  const HEADING_SPECS = {
    "5xl-desktop": "56px / 64px · Semibold 600", "5xl-mobile": "40px / 48px · Bold 700",
    "4xl-desktop": "48px / 56px · Semibold 600", "4xl-mobile": "32px / 40px · Semibold 600",
    "3xl-desktop": "40px / 48px · Semibold 600", "3xl-mobile": "24px / 32px · Semibold 600",
    "2xl-desktop": "24px / 32px · Semibold 600", "2xl-mobile": "20px / 28px · Semibold 600",
    "xl-desktop":  "20px / 28px · Semibold 600", "xl-mobile":  "18px / 24px · Semibold 600",
  };

  const pill = (active, label, onClick) => (
    <button onClick={onClick} style={{
      padding:"4px 14px", borderRadius:999,
      border:"1px solid var(--brand-border)",
      background: active ? "var(--brand-primary)" : "transparent",
      color: active ? "var(--brand-on-primary)" : "var(--brand-text-muted)",
      fontFamily:"var(--brand-font-body)", fontSize:12, cursor:"pointer",
      fontWeight: active ? 600 : 400, transition:"background .15s, color .15s",
    }}>{label}</button>
  );

  const spec = (key) => (
    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginLeft:12 }}>
      {HEADING_SPECS[key]}
    </span>
  );

  const rowStyle = {
    display:"flex", alignItems:"baseline", gap:0,
    padding:"20px 0", borderBottom:"1px solid var(--brand-border)",
  };

  return (
    <PageView badge="Component" title="Paragraph" desc="Typography scale — heading sizes (5xl→xl) respond to a viewport toggle; body and utility sizes are universal. The highlight variant uses a brand-primary left border.">

      {/* ── Heading scale ── */}
      <div style={{
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        borderRadius:"var(--radius-md)", padding:"28px 32px", marginBottom:40,
      }}>
        {/* viewport toggle */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Heading scale
          </span>
          <div style={{ display:"flex", gap:6 }}>
            {pill(vp==="desktop","Desktop",()=>setVp("desktop"))}
            {pill(vp==="mobile","Mobile",()=>setVp("mobile"))}
          </div>
        </div>

        {HEADING_SIZES.map(s => (
          <div key={s} style={rowStyle}>
            <div style={{ width:56, flex:"none", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", paddingTop:4 }}>
              {s.toUpperCase()}
            </div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <GParagraph size={s} viewport={vp}>
                The quick brown fox jumps over the lazy dog.
              </GParagraph>
              {spec(`${s}-${vp}`)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Body / utility scale ── */}
      <div style={{
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        borderRadius:"var(--radius-md)", padding:"28px 32px", marginBottom:40,
      }}>
        <div style={{ marginBottom:28 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Body & utility
          </span>
        </div>

        {BODY_SIZES.map(({ size, label }) => (
          <div key={size} style={rowStyle}>
            <div style={{ width:56, flex:"none", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", paddingTop:3 }}>
              {size.replace("-upper","").toUpperCase()}
            </div>
            <div style={{ flex:1 }}>
              <GParagraph size={size}>
                The quick brown fox jumps over the lazy dog.
              </GParagraph>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", display:"block", marginTop:2 }}>
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Icon variants ── */}
      <div style={{
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        borderRadius:"var(--radius-md)", padding:"28px 32px", marginBottom:40,
      }}>
        <div style={{ marginBottom:28 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Icon + text
          </span>
        </div>

        {["icon-md","icon-sm"].map(size => (
          <div key={size} style={rowStyle}>
            <div style={{ width:56, flex:"none", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", paddingTop:3 }}>
              {size.replace("icon-","").toUpperCase()}
            </div>
            <div style={{ flex:1 }}>
              <GParagraph size={size}>
                {size === "icon-md" ? "Información adicional disponible" : "Tooltip informativo del sistema"}
              </GParagraph>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", display:"block", marginTop:4 }}>
                {size === "icon-md" ? "16px / 20px + 16px icon · Regular" : "14px / 20px + 16px icon · Regular"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Highlight variant ── */}
      <div style={{
        background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
        borderRadius:"var(--radius-md)", padding:"28px 32px", marginBottom:40,
      }}>
        <div style={{ marginBottom:28 }}>
          <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Highlight
          </span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:16 }}>DESKTOP</div>
            <GParagraph size="highlight" viewport="desktop"
              title="¿Eres nuevo en la plataforma?"
              body="Puedes encontrar toda la documentación en"
              href="docs.genesis.dev"
            />
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", display:"block", marginTop:12 }}>
              Title 20/28 · Semibold · Body 16/20 · Regular
            </span>
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", marginBottom:16 }}>MOBILE</div>
            <GParagraph size="highlight" viewport="mobile"
              title="¿Eres nuevo en la plataforma?"
              body="Puedes encontrar toda la documentación en"
              href="docs.genesis.dev"
            />
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", display:"block", marginTop:12 }}>
              Title 18/24 · Semibold · Body 14/20 · Regular
            </span>
          </div>
        </div>
      </div>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600, color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["size", '"5xl"|"4xl"|"3xl"|"2xl"|"xl"|"lg"|"md"|"md-upper"|"sm"|"sm-upper"|"icon-md"|"icon-sm"|"highlight"', '"md"', "Typography scale variant"],
              ["viewport", '"desktop"|"mobile"', '"desktop"', "Breakpoint — applies to 5xl → xl heading sizes"],
              ["children", "string", "—", "Text content (all sizes except highlight)"],
              ["title", "string", "—", "Bold first line (highlight only)"],
              ["body", "string", "—", "Muted second line (highlight only)"],
              ["href", "string", "—", "Link appended to body text (highlight only)"],
              ["color", '"primary"|"muted"', '"primary"', "Text colour token override"],
              ["tag", "string", "—", "Override rendered HTML element"],
            ].map(([prop, type, def, desc]) => (
              <tr key={prop} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_Stepper ───────────────────────────────────────────────────────────────
function DS_Stepper({ brand }) {
  const [activeH, setActiveH] = useState(1); // 0-based index of current step
  const [activeV, setActiveV] = useState(2);

  const STATES = ["incomplete","active","complete","disabled","warning","error"];

  const makeSteps = (count, active) =>
    Array.from({ length: count }, (_, i) => ({
      label: `Step ${i + 1}`,
      state: i < active ? "complete" : i === active ? "active" : "incomplete",
    }));

  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
        color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
        margin:"0 0 16px" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <PageView title="Stepper" subtitle="Step-by-step progress indicator. Supports horizontal and vertical orientations with 6 step states.">

      {/* ── Pin states ── */}
      <Row label="Pin states">
        <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-end" }}>
          {STATES.map(st => (
            <div key={st} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <GStepperPin state={st} number={STATES.indexOf(st) + 1} />
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--brand-text-muted)" }}>{st}</span>
            </div>
          ))}
        </div>
      </Row>

      {/* ── Horizontal — quantity variants ── */}
      <Row label="Horizontal — 2 to 5 steps">
        <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
          {[2, 3, 4, 5].map(n => (
            <div key={n} style={{ maxWidth: n * 120 }}>
              <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>{n} steps</p>
              <GStepper steps={makeSteps(n, 1)} orientation="horizontal" />
            </div>
          ))}
        </div>
      </Row>

      {/* ── Horizontal interactive ── */}
      <Row label="Horizontal — interactive">
        <div style={{ maxWidth: 480 }}>
          <GStepper
            steps={makeSteps(4, activeH)}
            orientation="horizontal"
          />
          <div style={{ display:"flex", gap:8, marginTop:16 }}>
            <button
              onClick={() => setActiveH(Math.max(0, activeH - 1))}
              disabled={activeH === 0}
              style={{
                padding:"8px 16px", borderRadius:"var(--radius-md)",
                border:"1px solid var(--brand-border)", background:"var(--brand-bg)",
                fontFamily:"var(--brand-font-body)", fontSize:13, cursor:"pointer",
                color: activeH === 0 ? "var(--brand-text-muted)" : "var(--brand-text)",
              }}
            >← Back</button>
            <button
              onClick={() => setActiveH(Math.min(3, activeH + 1))}
              disabled={activeH === 3}
              style={{
                padding:"8px 16px", borderRadius:"var(--radius-md)",
                background:"var(--brand-primary)", border:"none",
                fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600,
                color:"white", cursor:"pointer",
                opacity: activeH === 3 ? 0.4 : 1,
              }}
            >Next →</button>
          </div>
        </div>
      </Row>

      {/* ── All states in one horizontal stepper ── */}
      <Row label="Horizontal — all states showcase">
        <div style={{ maxWidth: 700 }}>
          <GStepper
            orientation="horizontal"
            steps={[
              { label: "Complete",   state: "complete"   },
              { label: "Active",     state: "active"     },
              { label: "Incomplete", state: "incomplete" },
              { label: "Warning",    state: "warning"    },
              { label: "Error",      state: "error"      },
              { label: "Disabled",   state: "disabled"   },
            ]}
          />
        </div>
      </Row>

      {/* ── Vertical — quantity variants ── */}
      <Row label="Vertical — 2 to 5 steps">
        <div style={{ display:"flex", gap:48, flexWrap:"wrap", alignItems:"flex-start" }}>
          {[2, 3, 4, 5].map(n => (
            <div key={n}>
              <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>{n} steps</p>
              <GStepper steps={makeSteps(n, 1)} orientation="vertical" />
            </div>
          ))}
        </div>
      </Row>

      {/* ── Vertical interactive ── */}
      <Row label="Vertical — interactive">
        <div style={{ display:"flex", gap:40, alignItems:"flex-start", flexWrap:"wrap" }}>
          <div>
            <GStepper
              steps={[
                { label: "Account info",    state: activeV > 0 ? "complete" : activeV === 0 ? "active" : "incomplete" },
                { label: "Choose plan",     state: activeV > 1 ? "complete" : activeV === 1 ? "active" : "incomplete" },
                { label: "Payment method",  state: activeV > 2 ? "complete" : activeV === 2 ? "active" : "incomplete" },
                { label: "Confirmation",    state: activeV > 3 ? "complete" : activeV === 3 ? "active" : "incomplete" },
              ]}
              orientation="vertical"
            />
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:12, width:160 }}>
              <button
                onClick={() => setActiveV(Math.min(3, activeV + 1))}
                disabled={activeV > 3}
                style={{
                  padding:"8px 16px", borderRadius:"var(--radius-md)",
                  background:"var(--brand-primary)", border:"none",
                  fontFamily:"var(--brand-font-body)", fontSize:13, fontWeight:600,
                  color:"white", cursor:"pointer",
                }}
              >Next step →</button>
              <button
                onClick={() => setActiveV(Math.max(0, activeV - 1))}
                style={{
                  padding:"8px 16px", borderRadius:"var(--radius-md)",
                  border:"1px solid var(--brand-border)", background:"var(--brand-bg)",
                  fontFamily:"var(--brand-font-body)", fontSize:13, cursor:"pointer",
                  color:"var(--brand-text)",
                }}
              >← Back</button>
            </div>
          </div>

          {/* All states vertical */}
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>All states</p>
            <GStepper
              orientation="vertical"
              steps={STATES.map((st, i) => ({ label: st, state: st }))}
            />
          </div>
        </div>
      </Row>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Component","Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600,
                  color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["GStepper","steps","Array<{label, state}>","[]","Step definitions. state: incomplete|active|complete|warning|error|disabled"],
              ["GStepper","orientation",'"horizontal"|"vertical"','"horizontal"',"Layout direction"],
              ["GStepper","style","object","—","Additional inline styles"],
              ["GStepperPin","state",'"incomplete"|"active"|"complete"|"warning"|"error"|"disabled"','"incomplete"',"Visual state of the pin"],
              ["GStepperPin","number","number","1","Step number displayed inside incomplete/active/disabled pins"],
              ["GStepperPin","size","number","24","Diameter in px"],
            ].map(([comp, prop, type, def, desc], i) => (
              <tr key={i} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{comp}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_SpacingComp ───────────────────────────────────────────────────────────
function DS_SpacingComp({ brand }) {
  const SCALE = [
    { name: "xs",  token: "padding-xs",  px: 4  },
    { name: "sm",  token: "padding-sm",  px: 8  },
    { name: "md",  token: "padding-md",  px: 12 },
    { name: "lg",  token: "padding-lg",  px: 16 },
    { name: "xl",  token: "padding-xl",  px: 20 },
    { name: "2xl", token: "padding-2xl", px: 24 },
    { name: "3xl", token: "padding-3xl", px: 28 },
    { name: "4xl", token: "padding-4xl", px: 32 },
    { name: "5xl", token: "padding-5xl", px: 36 },
    { name: "6xl", token: "padding-6xl", px: 40 },
    { name: "7xl", token: "padding-7xl", px: 48 },
    { name: "8xl", token: "padding-8xl", px: 56 },
    { name: "9xl", token: "padding-9xl", px: 80 },
  ];

  return (
    <PageView title="Spacing" subtitle="Utility spacer component — inserts consistent whitespace using the spacing scale. Use GSpacing between elements instead of arbitrary margins.">

      {/* ── Scale table ── */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
          color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
          margin:"0 0 16px" }}>Spacing scale</p>

        <div style={{ border:"1px solid var(--brand-border)", borderRadius:"var(--radius-md)", overflow:"hidden" }}>
          {/* Header */}
          <div style={{
            display:"grid", gridTemplateColumns:"160px 100px 1fr",
            background:"var(--brand-bg-elev)", borderBottom:"2px solid var(--brand-border)",
            padding:"10px 16px",
          }}>
            {["Name","Value","Preview"].map(h => (
              <span key={h} style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
                color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {SCALE.map((s, i) => (
            <div key={s.name} style={{
              display:"grid", gridTemplateColumns:"160px 100px 1fr",
              alignItems:"center",
              padding:"12px 16px",
              borderBottom: i < SCALE.length - 1 ? "1px solid var(--brand-border)" : "none",
            }}>
              {/* Name */}
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text)" }}>
                  {s.token}
                </span>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--brand-primary)" }}>
                  size="{s.name}"
                </span>
              </div>
              {/* Value */}
              <span style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'IBM Plex Mono',monospace", fontSize:12,
                color:"var(--brand-text-muted)",
                background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-sm)", padding:"2px 8px",
                width:"fit-content",
              }}>{s.px}px</span>
              {/* Preview */}
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  height: s.px,
                  width: "min(100%, 480px)",
                  border: "1.5px dashed var(--brand-primary)",
                  borderRadius: 2,
                  opacity: 0.65,
                  flexShrink: 0,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Live usage demo ── */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
          color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
          margin:"0 0 16px" }}>Usage — between elements</p>

        <div style={{ display:"flex", gap:40, flexWrap:"wrap", alignItems:"flex-start" }}>

          {/* Systematic spacing (correct) */}
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text)", fontWeight:500 }}>
                Systematic — using GSpacing
              </span>
            </div>
            <div style={{
              border:"1px solid var(--brand-border)", borderRadius:"var(--radius-md)",
              padding:16, background:"var(--brand-bg)",
            }}>
              <div style={{ fontFamily:"var(--brand-font-display)", fontSize:16, fontWeight:600, color:"var(--brand-text)" }}>
                Form title
              </div>
              <GSpacing size="md" showGuide />
              <div style={{
                height:40, background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center",
                padding:"0 12px", fontFamily:"var(--brand-font-body)", fontSize:14,
                color:"var(--brand-text-muted)",
              }}>Email address</div>
              <GSpacing size="sm" showGuide />
              <div style={{
                height:40, background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center",
                padding:"0 12px", fontFamily:"var(--brand-font-body)", fontSize:14,
                color:"var(--brand-text-muted)",
              }}>Password</div>
              <GSpacing size="xl" showGuide />
              <div style={{
                height:40, background:"var(--brand-primary)", borderRadius:"var(--radius-md)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--brand-font-body)", fontSize:14, fontWeight:600, color:"white",
                cursor:"pointer",
              }}>Continue</div>
            </div>
          </div>

          {/* Arbitrary spacing (bad) */}
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
                <path d="M5 5l6 6M11 5l-6 6" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily:"var(--brand-font-body)", fontSize:13, color:"var(--brand-text)", fontWeight:500 }}>
                Arbitrary — random margins
              </span>
            </div>
            <div style={{
              border:"1px solid var(--brand-border)", borderRadius:"var(--radius-md)",
              padding:16, background:"var(--brand-bg)",
            }}>
              <div style={{ fontFamily:"var(--brand-font-display)", fontSize:16, fontWeight:600, color:"var(--brand-text)" }}>
                Form title
              </div>
              <div style={{ height:13 }} />
              <div style={{
                height:40, background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center",
                padding:"0 12px", fontFamily:"var(--brand-font-body)", fontSize:14,
                color:"var(--brand-text-muted)",
              }}>Email address</div>
              <div style={{ height:7 }} />
              <div style={{
                height:40, background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
                borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center",
                padding:"0 12px", fontFamily:"var(--brand-font-body)", fontSize:14,
                color:"var(--brand-text-muted)",
              }}>Password</div>
              <div style={{ height:22 }} />
              <div style={{
                height:40, background:"var(--brand-primary)", borderRadius:"var(--radius-md)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--brand-font-body)", fontSize:14, fontWeight:600, color:"white",
                cursor:"pointer",
              }}>Continue</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Orientation demo ── */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
          color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
          margin:"0 0 16px" }}>Orientation — horizontal</p>
        <div style={{ display:"flex", alignItems:"center", gap:0,
          border:"1px solid var(--brand-border)", borderRadius:"var(--radius-md)",
          padding:16, background:"var(--brand-bg)", width:"fit-content" }}>
          {["Home","Products","Pricing"].map((item, i) => (
            <React.Fragment key={item}>
              <span style={{ fontFamily:"var(--brand-font-body)", fontSize:14, color:"var(--brand-text)" }}>{item}</span>
              {i < 2 && <GSpacing size="2xl" orientation="horizontal" showGuide />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600,
                  color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["size", '"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"6xl"|"7xl"|"8xl"|"9xl"', '"md"', "Spacing scale step (4px → 80px)"],
              ["orientation", '"vertical"|"horizontal"', '"vertical"', "Axis — height (vertical) or width (horizontal)"],
              ["showGuide", "boolean", "false", "Renders a dashed brand-primary outline (DS docs only)"],
              ["style", "object", "—", "Additional inline styles"],
            ].map(([prop, type, def, desc]) => (
              <tr key={prop} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_Slider ────────────────────────────────────────────────────────────────
function DS_Slider({ brand }) {
  const [singleVal, setSingleVal]   = useState(35);
  const [dualVal,   setDualVal]     = useState([25, 70]);
  const [singleVal2, setSingleVal2] = useState(60);

  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
        color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
        margin:"0 0 16px" }}>{label}</p>
      {children}
    </div>
  );

  const Col = ({ label, children }) => (
    <div>
      <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <PageView title="Slider" subtitle="Range input control. Supports single-handle and dual-handle (range) variants.">

      {/* ── Single slider — interactive ── */}
      <Row label="GSlider · single — interactive">
        <div style={{ display:"flex", flexDirection:"column", gap:24, maxWidth:480 }}>
          <Col label={`Value: ${singleVal}`}>
            <GSlider value={singleVal} onChange={setSingleVal} />
          </Col>
          <Col label="Disabled (value: 40)">
            <GSlider value={40} disabled />
          </Col>
        </div>
      </Row>

      {/* ── Dual slider — interactive ── */}
      <Row label="GSlider · dual — interactive">
        <div style={{ display:"flex", flexDirection:"column", gap:24, maxWidth:480 }}>
          <Col label={`Range: [${dualVal[0]}, ${dualVal[1]}]`}>
            <GSlider type="dual" value={dualVal} onChange={setDualVal} />
          </Col>
          <Col label="Disabled range: [20, 60]">
            <GSlider type="dual" value={[20, 60]} disabled />
          </Col>
        </div>
      </Row>

      {/* ── Fill snapshots ── */}
      <Row label="GSlider · fill snapshots (0 → 100%)">
        <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:480 }}>
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => (
            <div key={v} style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)", width:32, textAlign:"right" }}>{v}%</span>
              <GSlider value={v} style={{ flex:1 }} />
            </div>
          ))}
        </div>
      </Row>

      {/* ── GSliderSection ── */}
      <Row label="GSliderSection — with min/max labels">
        <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
          <Col label={`Single · value: ${singleVal2}`}>
            <GSliderSection value={singleVal2} onChange={setSingleVal2} />
          </Col>
          <Col label={`Dual · range: [${dualVal[0]}, ${dualVal[1]}]`}>
            <GSliderSection type="dual" value={dualVal} onChange={setDualVal} />
          </Col>
          <Col label="Disabled · single">
            <GSliderSection value={30} disabled />
          </Col>
        </div>
      </Row>

      {/* ── Custom min/max/step ── */}
      <Row label="GSliderSection — custom min / max / step">
        <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
          <Col label="min:0 max:1000 step:50">
            <GSliderSection min={0} max={1000} step={50} defaultValue={300}
              numLeft="$0" numRight="$1,000" />
          </Col>
          <Col label="min:0 max:10 step:0.5">
            <GSliderSection min={0} max={10} step={0.5} defaultValue={4.5}
              numLeft="0x" numRight="10x" />
          </Col>
        </div>
      </Row>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Component","Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600, color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["GSlider","type",'"single"|"dual"','"single"',"Number of handles"],
              ["GSlider","value","number | [number,number]","—","Controlled value"],
              ["GSlider","defaultValue","number | [number,number]","30 / [20,80]","Uncontrolled initial value"],
              ["GSlider","min","number","0","Minimum value"],
              ["GSlider","max","number","100","Maximum value"],
              ["GSlider","step","number","1","Snap increment"],
              ["GSlider","disabled","boolean","false","Disables drag interaction"],
              ["GSlider","onChange","function","—","Called with new value on drag"],
              ["GSliderSection","type",'"single"|"dual"','"single"',"Passed to GSlider"],
              ["GSliderSection","numLeft","string","min","Left label override"],
              ["GSliderSection","numRight","string","max","Right label override"],
              ["GSliderSection","min/max/step","number","0/100/1","Range bounds and step"],
              ["GSliderSection","disabled","boolean","false","Disables the slider"],
              ["GSliderSection","onChange","function","—","Called with new value on drag"],
            ].map(([comp, prop, type, def, desc], i) => (
              <tr key={i} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{comp}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_Radio ─────────────────────────────────────────────────────────────────
function DS_Radio({ brand }) {
  const [groupVal,   setGroupVal]   = useState("option2");
  const [sectionVal, setSectionVal] = useState("plan_b");
  const [hGroupVal,  setHGroupVal]  = useState("option1");
  const [hSecVal,    setHSecVal]    = useState("plan_a");

  const STATES = ["default","hover","focus","disabled","error"];

  const groupItems = [
    { label: "Option one",   value: "option1" },
    { label: "Option two",   value: "option2" },
    { label: "Option three", value: "option3" },
  ];
  const sectionItems = [
    { label: "Plan A", description: "Best for individuals",  value: "plan_a" },
    { label: "Plan B", description: "Best for small teams",  value: "plan_b" },
    { label: "Plan C", description: "Best for enterprises",  value: "plan_c" },
  ];

  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, fontWeight:600,
        color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:"0.07em",
        margin:"0 0 16px" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <PageView title="Radio" subtitle="Single-selection control. Three variants: bare control, label row, and section card.">

      {/* ── RadioControl states ── */}
      <Row label="RadioControl — all states">
        <div style={{ display:"flex", flexWrap:"wrap", gap:28 }}>
          {[false, true].map(sel => (
            STATES.map(st => (
              <div key={`${sel}-${st}`} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                <GRadioControl selected={sel} state={st} />
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--brand-text-muted)", textAlign:"center" }}>
                  {sel ? "selected" : "unsel."}<br/>{st}
                </span>
              </div>
            ))
          ))}
        </div>
      </Row>

      {/* ── GRadio sizes & position ── */}
      <Row label="GRadio — sizes & position">
        <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Large · left</p>
            <GRadio size="lg" position="left" label="Large unselected" selected={false} />
            <GRadio size="lg" position="left" label="Large selected"   selected={true}  />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Medium · left</p>
            <GRadio size="md" position="left" label="Medium unselected" selected={false} />
            <GRadio size="md" position="left" label="Medium selected"   selected={true}  />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Large · right</p>
            <GRadio size="lg" position="right" label="Control on right" selected={true}  />
            <GRadio size="lg" position="right" label="Control on right" selected={false} />
          </div>
        </div>
      </Row>

      {/* ── GRadio states ── */}
      <Row label="GRadio — states">
        <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
          {STATES.map(st => (
            <div key={st} style={{ display:"flex", flexDirection:"column" }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--brand-text-muted)", marginBottom:4 }}>{st}</span>
              <GRadio size="md" label="Option label" selected={st !== "default" && st !== "error"} state={st} />
            </div>
          ))}
        </div>
      </Row>

      {/* ── GRadioGroup interactive ── */}
      <Row label="GRadioGroup — interactive (vertical / horizontal / disabled)">
        <div style={{ display:"flex", gap:60, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Vertical · md</p>
            <GRadioGroup direction="vertical" items={groupItems} value={groupVal} onChange={setGroupVal} size="md" />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Horizontal · lg</p>
            <GRadioGroup direction="horizontal" items={groupItems} value={hGroupVal} onChange={setHGroupVal} size="lg" />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Disabled</p>
            <GRadioGroup direction="vertical" items={groupItems} value="option1" size="md" state="disabled" />
          </div>
        </div>
      </Row>

      {/* ── GRadioSection states ── */}
      <Row label="GRadioSection — states">
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <GRadioSection size="lg" selected={false} state="default"  label="Default unselected" description="Secondary text" />
          <GRadioSection size="lg" selected={false} state="hover"    label="Hover unselected"   description="Secondary text" />
          <GRadioSection size="lg" selected={true}  state="default"  label="Selected"           description="Secondary text" />
          <GRadioSection size="lg" selected={true}  state="focus"    label="Focus selected"     description="Secondary text" />
          <GRadioSection size="lg" selected={false} state="disabled" label="Disabled"           description="Secondary text" />
          <GRadioSection size="lg" selected={false} state="error"    label="Error state"        description="Secondary text" />
        </div>
      </Row>

      {/* ── GRadioSection sizes ── */}
      <Row label="GRadioSection — sizes">
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <GRadioSection size="lg" selected={true}  label="Large (py 18)" description="plan-large" />
          <GRadioSection size="md" selected={true}  label="Medium (py 14)" description="plan-medium" />
        </div>
      </Row>

      {/* ── GRadioSectionGroup interactive ── */}
      <Row label="GRadioSectionGroup — interactive (vertical / horizontal / disabled)">
        <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Vertical · lg</p>
            <GRadioSectionGroup direction="vertical" items={sectionItems} value={sectionVal} onChange={setSectionVal} size="lg" />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Horizontal · md</p>
            <GRadioSectionGroup direction="horizontal" items={sectionItems} value={hSecVal} onChange={setHSecVal} size="md" />
          </div>
          <div>
            <p style={{ fontFamily:"var(--brand-font-body)", fontSize:12, color:"var(--brand-text-muted)", margin:"0 0 8px" }}>Disabled</p>
            <GRadioSectionGroup direction="vertical" items={sectionItems.slice(0,2)} value="plan_a" size="md" state="disabled" />
          </div>
        </div>
      </Row>

      {/* ── Props table ── */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--brand-font-body)", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--brand-border)" }}>
              {["Component","Prop","Type","Default","Description"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 12px", fontWeight:600, color:"var(--brand-text-muted)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["GRadioControl","selected","boolean","false","Whether the inner dot is shown"],
              ["GRadioControl","state",'"default"|"hover"|"focus"|"disabled"|"error"','"default"',"Visual interaction state"],
              ["GRadio","size",'"lg"|"md"','"md"',"Controls padding (12/10px) and font size (16/14px)"],
              ["GRadio","position",'"left"|"right"','"left"',"Control position relative to label"],
              ["GRadio","label","string","—","Label text"],
              ["GRadio","selected","boolean","false","Whether this option is selected"],
              ["GRadio","state","string",'"default"',"Interaction state passed to GRadioControl"],
              ["GRadio","onChange","function","—","Click handler"],
              ["GRadioGroup","direction",'"vertical"|"horizontal"','"vertical"',"Layout axis"],
              ["GRadioGroup","items","Array<{label,value}>","[]","Radio options"],
              ["GRadioGroup","value","string","—","Currently selected value"],
              ["GRadioGroup","onChange","function","—","Called with the new value when an item is clicked"],
              ["GRadioGroup","size",'"lg"|"md"','"md"',"Passed to each GRadio"],
              ["GRadioGroup","state","string",'"default"',"Pass 'disabled' to disable all items"],
              ["GRadioSection","size",'"lg"|"md"','"md"',"Card vertical padding (18/14px)"],
              ["GRadioSection","label","string","—","Primary label"],
              ["GRadioSection","description","string","—","Optional secondary line"],
              ["GRadioSection","selected","boolean","false","Whether selected"],
              ["GRadioSection","state","string",'"default"',"Interaction state (controls border + bg)"],
              ["GRadioSection","onChange","function","—","Click handler"],
              ["GRadioSectionGroup","direction",'"vertical"|"horizontal"','"vertical"',"Card layout axis"],
              ["GRadioSectionGroup","items","Array<{label,description,value}>","[]","Section card options"],
              ["GRadioSectionGroup","value","string","—","Currently selected value"],
              ["GRadioSectionGroup","onChange","function","—","Called with the new value on click"],
              ["GRadioSectionGroup","size",'"lg"|"md"','"md"',"Passed to each GRadioSection"],
              ["GRadioSectionGroup","state","string",'"default"',"Pass 'disabled' to disable all cards"],
            ].map(([comp, prop, type, def, desc], i) => (
              <tr key={i} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{comp}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-primary)" }}>{prop}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"var(--brand-text-muted)" }}>{type}</td>
                <td style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--brand-text-muted)" }}>{def}</td>
                <td style={{ padding:"10px 12px", color:"var(--brand-text)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageView>
  );
}

// ─── DS_Switch ────────────────────────────────────────────────────────────────
function DS_Switch({ brand }) {
  const [groupItems, setGroupItems] = useState([
    { label: "Enable notifications", value: "notif",    on: true  },
    { label: "Dark mode",            value: "dark",     on: false },
    { label: "Auto-save",            value: "autosave", on: true  },
  ]);
  const [secItems, setSecItems] = useState([
    { label: "Push notifications", description: "Receive alerts on your device",    on: true  },
    { label: "Email digest",       description: "Weekly summary to your inbox",      on: false },
    { label: "SMS alerts",         description: "Critical updates via text message", on: false },
  ]);

  const handleGroup = (idx, newOn) => setGroupItems(prev =>
    prev.map((it, i) => i === idx ? { ...it, on: newOn } : it)
  );
  const handleSec = (idx, newOn) => setSecItems(prev =>
    prev.map((it, i) => i === idx ? { ...it, on: newOn } : it)
  );

  const states = ["default", "hover", "focus", "disabled"];
  const sizes  = ["sm", "md", "lg"];

  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 12, fontWeight: 600,
        color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em",
        margin: "0 0 16px" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <PageView title="Switch" desc="Toggle control for binary on/off states. Available in three sizes with label, grouped, and section-card variants.">

      {/* ── Control state matrix ── */}
      <Row label="Switch Control · State matrix">
        {sizes.map(sz => (
          <div key={sz} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
              Size · {sz.toUpperCase()}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {states.map(st => (
                <div key={st}>
                  <div style={{ fontSize: 11, color: "var(--brand-text-muted)", marginBottom: 10, textTransform: "capitalize" }}>{st}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <GSwitchControl size={sz} on={false} state={st} />
                      <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: "var(--brand-text-muted)" }}>off</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <GSwitchControl size={sz} on={true} state={st} />
                      <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: "var(--brand-text-muted)" }}>on</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Row>

      {/* ── Switch with label ── */}
      <Row label="Switch · Label placement">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {["left", "right"].map(placement => (
            <div key={placement}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
                Label · {placement}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["md", "lg"].map(sz => (
                  <div key={sz} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--brand-text-muted)", marginBottom: 4 }}>size={sz}</div>
                    <GSwitch size={sz} on={false} label="Inactive option" placement={placement} />
                    <GSwitch size={sz} on={true}  label="Active option"   placement={placement} />
                    <GSwitch size={sz} on={false} label="Disabled option" placement={placement} state="disabled" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Row>

      {/* ── Switch Group interactive ── */}
      <Row label="Switch Group · Interactive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
              Vertical
            </div>
            <GSwitchGroup
              direction="vertical"
              size="md"
              items={groupItems}
              onChange={handleGroup}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
              Horizontal
            </div>
            <GSwitchGroup
              direction="horizontal"
              size="md"
              items={groupItems}
              onChange={handleGroup}
            />
          </div>
        </div>
      </Row>

      {/* ── Switch Section states ── */}
      <Row label="Switch Section · States">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 800 }}>
          {[
            { label: "Default · off",   description: "Secondary description text",  on: false, state: "default"  },
            { label: "Default · on",    description: "Secondary description text",  on: true,  state: "default"  },
            { label: "Hover · on",      description: "Hover state demonstration",   on: true,  state: "hover"    },
            { label: "Focus · on",      description: "Focus ring state",            on: true,  state: "focus"    },
            { label: "Disabled · off",  description: "Cannot be interacted with",   on: false, state: "disabled" },
            { label: "Disabled · on",   description: "Locked in active state",      on: true,  state: "disabled" },
          ].map((item, i) => (
            <GSwitchSection
              key={i}
              size="md"
              label={item.label}
              description={item.description}
              on={item.on}
              state={item.state}
            />
          ))}
        </div>
      </Row>

      {/* ── Switch Section Group interactive ── */}
      <Row label="Switch Section Group · Interactive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
              Vertical
            </div>
            <GSwitchSectionGroup
              direction="vertical"
              size="md"
              items={secItems}
              onChange={handleSec}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>
              Horizontal
            </div>
            <GSwitchSectionGroup
              direction="horizontal"
              size="md"
              items={secItems}
              onChange={handleSec}
            />
          </div>
        </div>
      </Row>

      {/* ── Props table ── */}
      <Row label="Props">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, background: "var(--brand-bg-elev)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--brand-border)" }}>
                {["Component", "Prop", "Type", "Default", "Description"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["GSwitchControl", "size",       '"sm"|"md"|"lg"',                         '"md"',     "Track+thumb dimensions"],
                ["GSwitchControl", "on",         "boolean",                                "false",    "On/off state"],
                ["GSwitchControl", "state",      '"default"|"hover"|"focus"|"disabled"',   '"default"',"Visual interaction state"],
                ["GSwitchControl", "onChange",   "function",                               "—",        "Called with new boolean value on click"],
                ["GSwitch",        "size",       '"sm"|"md"|"lg"',                         '"md"',     "Passed to inner GSwitchControl"],
                ["GSwitch",        "on",         "boolean",                                "false",    "On/off state"],
                ["GSwitch",        "state",      "string",                                 '"default"',"Interaction state"],
                ["GSwitch",        "label",      "string",                                 "—",        "Label text"],
                ["GSwitch",        "placement",  '"left"|"right"',                         '"left"',   "Label side relative to control"],
                ["GSwitch",        "onChange",   "function",                               "—",        "Toggle callback"],
                ["GSwitchGroup",   "items",      "Array<{label, value, on}>",              "[]",       "Switch options"],
                ["GSwitchGroup",   "direction",  '"vertical"|"horizontal"',                '"vertical"',"Layout axis"],
                ["GSwitchGroup",   "size",       "string",                                 '"md"',     "Size passed to each GSwitch"],
                ["GSwitchGroup",   "onChange",   "function",                               "—",        "Called with (value, newOn) on toggle"],
                ["GSwitchSection", "size",       '"md"|"lg"',                              '"md"',     "Row padding and font size"],
                ["GSwitchSection", "label",      "string",                                 "—",        "Primary label"],
                ["GSwitchSection", "description","string",                                 "—",        "Optional secondary description"],
                ["GSwitchSection", "on",         "boolean",                                "false",    "On/off state"],
                ["GSwitchSection", "state",      "string",                                 '"default"',"Interaction state (border + bg)"],
                ["GSwitchSection", "onChange",   "function",                               "—",        "Toggle callback"],
                ["GSwitchSectionGroup","items",  "Array<{label,description,value,on}>",    "[]",       "Section rows"],
                ["GSwitchSectionGroup","direction",'"vertical"|"horizontal"',              '"vertical"',"Layout axis"],
                ["GSwitchSectionGroup","size",   "string",                                 '"md"',     "Size passed to each section"],
                ["GSwitchSectionGroup","onChange","function",                              "—",        "Called with (value, newOn)"],
              ].map(([comp, prop, type, def, desc], i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--brand-border)" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{comp}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--brand-primary)" }}>{prop}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{type}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--brand-text-muted)" }}>{def}</td>
                  <td style={{ padding: "10px 12px", color: "var(--brand-text)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
    </PageView>
  );
}

// ─── DS_Tab ───────────────────────────────────────────────────────────────────
function DS_Tab({ brand }) {
  const [hTab,   setHTab]   = useState("home");
  const [vTab,   setVTab]   = useState("home");
  const [selGrp, setSelGrp] = useState("tab1");
  const [selGrpNoPad, setSelGrpNoPad] = useState("tab1");

  const SIZES  = ["lg", "md", "sm"];
  const STATES = ["default", "hover", "active", "focus"];
  const SEL_TYPES = ["primary", "outline", "inverse"];

  const NAV_TABS = [
    { label: "Home",     value: "home"     },
    { label: "Products", value: "products" },
    { label: "Pricing",  value: "pricing"  },
    { label: "About",    value: "about"    },
  ];

  const SEL_TABS = [
    { label: "All",       value: "tab1" },
    { label: "Active",    value: "tab2" },
    { label: "Completed", value: "tab3" },
    { label: "Archived",  value: "tab4" },
  ];

  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily: "var(--brand-font-body)", fontSize: 12, fontWeight: 600,
        color: "var(--brand-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em",
        margin: "0 0 16px" }}>{label}</p>
      {children}
    </div>
  );

  return (
    <PageView title="Tabs" desc="Navigation tabs for switching between content sections. Available in two orientations, three sizes, and a pill-selector variant with segmented control.">

      {/* ── Tab individual states – horizontal ── */}
      <Row label="Tab · Horizontal states">
        {SIZES.map(sz => (
          <div key={sz} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "var(--brand-text-muted)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              size={sz}
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {STATES.map(st => (
                <div key={st} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 11, color: "var(--brand-text-muted)", textTransform: "capitalize" }}>{st}</div>
                  <GTab type="horizontal" size={sz} state={st} label="Tab label" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Row>

      {/* ── Tab individual states – vertical ── */}
      <Row label="Tab · Vertical states">
        {SIZES.map(sz => (
          <div key={sz} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "var(--brand-text-muted)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              size={sz}
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {STATES.map(st => (
                <div key={st} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 11, color: "var(--brand-text-muted)", textTransform: "capitalize" }}>{st}</div>
                  <GTab type="vertical" size={sz} state={st} label="Tab label" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Row>

      {/* ── Tab Group – interactive ── */}
      <Row label="Tab Group · Interactive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>Horizontal · equalWidth</div>
            <GTabGroup tabs={NAV_TABS} value={hTab} type="horizontal" size="md" equalWidth={true} onChange={setHTab} />
            <div style={{ padding: "24px 0 0", fontSize: 14, color: "var(--brand-text-muted)" }}>
              Active: <strong style={{ color: "var(--brand-text)" }}>{hTab}</strong>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>Vertical</div>
            <GTabGroup tabs={NAV_TABS} value={vTab} type="vertical" size="md" onChange={setVTab} />
            <div style={{ padding: "16px 0 0", fontSize: 14, color: "var(--brand-text-muted)" }}>
              Active: <strong style={{ color: "var(--brand-text)" }}>{vTab}</strong>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
          {SIZES.map(sz => (
            <div key={sz}>
              <div style={{ fontSize: 11, color: "var(--brand-text-muted)", marginBottom: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>size={sz}</div>
              <GTabGroup tabs={NAV_TABS.slice(0, 3)} value="home" type="horizontal" size={sz} equalWidth={false} />
            </div>
          ))}
        </div>
      </Row>

      {/* ── Tab Selector state matrix ── */}
      <Row label="Tab Selector · State matrix">
        {SEL_TYPES.map(tp => (
          <div key={tp} style={{ marginBottom: 32, padding: 20, borderRadius: "var(--radius-md)", background: tp === "inverse" ? "var(--brand-primary)" : "var(--brand-bg-elev)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tp === "inverse" ? "rgba(255,255,255,0.7)" : "var(--brand-text-muted)", marginBottom: 16 }}>
              type={tp}
            </div>
            {SIZES.map(sz => (
              <div key={sz} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: tp === "inverse" ? "rgba(255,255,255,0.5)" : "var(--brand-text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  size={sz}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {STATES.map(st => (
                    <div key={st} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ fontSize: 10, color: tp === "inverse" ? "rgba(255,255,255,0.5)" : "var(--brand-text-muted)", textTransform: "capitalize" }}>{st}</div>
                      <GTabSelector type={tp} size={sz} state={st} label="Tab label" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Row>

      {/* ── Tab Selector Group – interactive ── */}
      <Row label="Tab Selector Group · Interactive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>padding=true</div>
            <GTabSelectorGroup tabs={SEL_TABS} value={selGrp} size="md" padding={true} onChange={setSelGrp} />
            <div style={{ marginTop: 8, fontSize: 13, color: "var(--brand-text-muted)" }}>
              Active: <strong style={{ color: "var(--brand-text)" }}>{selGrp}</strong>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", marginBottom: 16 }}>padding=false</div>
            <GTabSelectorGroup tabs={SEL_TABS} value={selGrpNoPad} size="md" padding={false} onChange={setSelGrpNoPad} />
            <div style={{ marginTop: 8, fontSize: 13, color: "var(--brand-text-muted)" }}>
              Active: <strong style={{ color: "var(--brand-text)" }}>{selGrpNoPad}</strong>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
          {SIZES.map(sz => (
            <div key={sz} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 36, fontSize: 11, color: "var(--brand-text-muted)", textTransform: "uppercase" }}>{sz}</div>
              <GTabSelectorGroup tabs={SEL_TABS.slice(0, 3)} value="tab1" size={sz} padding={true} />
            </div>
          ))}
        </div>
      </Row>

      {/* ── Props table ── */}
      <Row label="Props">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, background: "var(--brand-bg-elev)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--brand-border)" }}>
                {["Component", "Prop", "Type", "Default", "Description"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-text-muted)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["GTab",               "type",       '"horizontal"|"vertical"',                        '"horizontal"', "Orientation"],
                ["GTab",               "size",       '"lg"|"md"|"sm"',                                 '"md"',         "Controls font size and padding"],
                ["GTab",               "state",      '"default"|"hover"|"active"|"focus"',             '"default"',    "Visual state"],
                ["GTab",               "label",      "string",                                         '"Tab"',        "Tab text"],
                ["GTab",               "icon",       "boolean",                                        "false",        "Show left icon slot"],
                ["GTab",               "count",      "number|null",                                    "null",         "Right-slot count number"],
                ["GTab",               "onClick",    "function",                                       "—",            "Click handler"],
                ["GTabGroup",          "tabs",       "Array<{label, value, icon?, count?}>",           "[]",           "Tab definitions"],
                ["GTabGroup",          "value",      "string",                                         "—",            "Currently active tab value"],
                ["GTabGroup",          "type",       '"horizontal"|"vertical"',                        '"horizontal"', "Orientation"],
                ["GTabGroup",          "size",       "string",                                         '"md"',         "Passed to each GTab"],
                ["GTabGroup",          "equalWidth", "boolean",                                        "true",         "Each tab takes equal width (horizontal only)"],
                ["GTabGroup",          "onChange",   "function",                                       "—",            "Called with new value on tab click"],
                ["GTabSelector",       "type",       '"primary"|"outline"|"inverse"',                  '"primary"',    "Visual style variant"],
                ["GTabSelector",       "size",       '"lg"|"md"|"sm"',                                 '"md"',         "Controls padding and font size"],
                ["GTabSelector",       "state",      '"default"|"hover"|"active"|"focus"',             '"default"',    "Visual state (bg + text colors)"],
                ["GTabSelector",       "label",      "string",                                         '"Tab"',        "Label text"],
                ["GTabSelector",       "icon",       "boolean",                                        "false",        "Show left icon slot"],
                ["GTabSelector",       "count",      "number|null",                                    "null",         "Right-side count number"],
                ["GTabSelectorGroup",  "tabs",       "Array<{label, value}>",                          "[]",           "Selector definitions"],
                ["GTabSelectorGroup",  "value",      "string",                                         "—",            "Active tab value"],
                ["GTabSelectorGroup",  "size",       '"lg"|"md"|"sm"',                                 '"md"',         "Controls font and padding"],
                ["GTabSelectorGroup",  "padding",    "boolean",                                        "true",         "Extra outer padding around the pill container"],
                ["GTabSelectorGroup",  "onChange",   "function",                                       "—",            "Called with new value on click"],
              ].map(([comp, prop, type, def, desc], i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--brand-border)" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{comp}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--brand-primary)" }}>{prop}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--brand-text-muted)" }}>{type}</td>
                  <td style={{ padding: "10px 12px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--brand-text-muted)" }}>{def}</td>
                  <td style={{ padding: "10px 12px", color: "var(--brand-text)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
    </PageView>
  );
}

// Backward compat aliases
// ─── DS_Tooltip ──────────────────────────────────────────────────────────────
function DS_Tooltip() {
  const Row = ({ label, children, gap = 24 }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <p style={{ margin:0, fontSize:11, fontWeight:600, textTransform:"uppercase",
        letterSpacing:".06em", color:"var(--brand-text-muted)" }}>{label}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap, alignItems:"center" }}>{children}</div>
    </div>
  );

  const TYPES      = ["primary","secondary"];
  const SIZES      = ["xl","lg"];
  const ALL_PL     = ["top","topStart","topEnd","bottom","bottomStart","bottomEnd",
                      "left","leftStart","leftEnd","right","rightStart","rightEnd"];

  // Interactive state ─ closable demo
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(true);

  // Trigger for interactive section
  const TriggerBtn = ({ label = "Hover me", size = "sm" }) => (
    <button style={{
      padding:"6px 14px", fontSize:12, fontWeight:500,
      background:"var(--brand-primary)", color:"var(--brand-on-primary)",
      border:"none", borderRadius:"var(--radius-sm)", cursor:"pointer", whiteSpace:"nowrap",
    }}>{label}</button>
  );

  // ── placement demo card: wraps a trigger and pads space for the tooltip
  const PlacementCard = ({ placement }) => {
    const vert  = ["top","topStart","topEnd","bottom","bottomStart","bottomEnd"].includes(placement);
    const isTop = placement.startsWith("top");
    const isBot = placement.startsWith("bottom");
    return (
      <div style={{
        paddingTop:    isTop  ? 56 : vert ? 0 : 0,
        paddingBottom: isBot  ? 56 : vert ? 0 : 0,
        paddingLeft:   !vert  ? 120 : 0,
        paddingRight:  !vert  ? 120 : 0,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <GTooltipWrapper label={placement} type="secondary" size="xl" placement={placement}>
          <div style={{
            width:36, height:36, borderRadius:9999, display:"flex",
            alignItems:"center", justifyContent:"center", cursor:"pointer",
            background:"var(--brand-bg-elev)", border:"1px solid var(--brand-border)",
            fontSize:13, color:"var(--brand-text-muted)",
          }}>⊕</div>
        </GTooltipWrapper>
      </div>
    );
  };

  return (
    <PageView badge="Component" title="Tooltip"
      desc="Contextual label that appears on hover. 2 types × 2 sizes × 12 placements. Optional close button and arrow tip.">

      {/* ── Types ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Types</h2>
          <p className="section-desc">Primary (light, bordered) · Secondary (dark, solid).</p>
        </div>
        <Demo title="Tooltip · Primary vs Secondary (size=xl)">
          <Row label="Primary — bg-elev, bordered">
            <GTooltip type="primary" size="xl" placement="top" label="Tooltip label" />
            <GTooltip type="primary" size="xl" placement="bottom" label="Tooltip label" />
            <GTooltip type="primary" size="xl" placement="right" label="With close" closable onClose={() => {}} />
          </Row>
          <Row label="Secondary — dark, solid">
            <GTooltip type="secondary" size="xl" placement="top" label="Tooltip label" />
            <GTooltip type="secondary" size="xl" placement="bottom" label="Tooltip label" />
            <GTooltip type="secondary" size="xl" placement="right" label="With close" closable onClose={() => {}} />
          </Row>
        </Demo>
      </div>

      {/* ── Sizes ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sizes</h2>
          <p className="section-desc">xl — 16 px / 40 px height · lg — 14 px / up to 2 lines.</p>
        </div>
        <Demo title="Tooltip · xl vs lg (both types, placement=top)">
          {TYPES.map(t => (
            <Row key={t} label={`type=${t}`}>
              {SIZES.map(s => (
                <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <GTooltip type={t} size={s} placement="top" label="Tooltip label" />
                  <span style={{ fontSize:10, color:"var(--brand-text-muted)", textTransform:"uppercase", letterSpacing:".04em" }}>size={s}</span>
                </div>
              ))}
            </Row>
          ))}
        </Demo>
      </div>

      {/* ── Placements ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Placements</h2>
          <p className="section-desc">12 positions — hover each ⊕ to see the tooltip in context.</p>
        </div>
        <Demo title="Tooltip · All 12 placements (hover to preview)">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, auto)", gap:"8px 24px", alignItems:"center", justifyItems:"start" }}>
            {ALL_PL.map(p => <PlacementCard key={p} placement={p} />)}
          </div>
        </Demo>
      </div>

      {/* ── Closable ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Closable</h2>
          <p className="section-desc">Optional × button — pass <code style={{fontFamily:"var(--brand-font-mono)",fontSize:12}}>closable</code> + <code style={{fontFamily:"var(--brand-font-mono)",fontSize:12}}>onClose</code>.</p>
        </div>
        <Demo title="Tooltip · closable=true">
          <div style={{ display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>
            {c1
              ? <GTooltip type="primary" size="xl" placement="top" label="Primary · closable" closable onClose={() => setC1(false)} />
              : <button onClick={() => setC1(true)} style={{ fontSize:12, padding:"4px 10px", borderRadius:"var(--radius-sm)", border:"1px solid var(--brand-border)", background:"var(--brand-bg-elev)", cursor:"pointer", color:"var(--brand-text)" }}>↺ Restore</button>
            }
            {c2
              ? <GTooltip type="secondary" size="xl" placement="top" label="Secondary · closable" closable onClose={() => setC2(false)} />
              : <button onClick={() => setC2(true)} style={{ fontSize:12, padding:"4px 10px", borderRadius:"var(--radius-sm)", border:"1px solid var(--brand-border)", background:"var(--brand-bg-elev)", cursor:"pointer", color:"var(--brand-text)" }}>↺ Restore</button>
            }
          </div>
        </Demo>
      </div>

      {/* ── Interactive ── */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Interactive — GTooltipWrapper</h2>
          <p className="section-desc">Wrap any element with <code style={{fontFamily:"var(--brand-font-mono)",fontSize:12}}>GTooltipWrapper</code> — tooltip appears on hover, positioned automatically.</p>
        </div>
        <Demo title="GTooltipWrapper · hover each trigger">
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, alignItems:"center", justifyContent:"center", padding:"40px 0" }}>
            {[
              { label:"Save",       placement:"top",         type:"secondary" },
              { label:"Share link", placement:"bottom",      type:"secondary" },
              { label:"Edit name",  placement:"topStart",    type:"secondary" },
              { label:"Delete",     placement:"right",       type:"primary"   },
              { label:"More info",  placement:"left",        type:"primary"   },
              { label:"Copy token", placement:"bottomEnd",   type:"secondary" },
            ].map(({ label, placement, type }) => (
              <GTooltipWrapper key={label} label={label} placement={placement} type={type} size="xl">
                <TriggerBtn label={label} />
              </GTooltipWrapper>
            ))}
          </div>
        </Demo>

        <Demo title="GTooltipWrapper · circle icon buttons">
          <div style={{ display:"flex", gap:16, alignItems:"center", justifyContent:"center", padding:"48px 0" }}>
            {[
              { label:"Dashboard",  placement:"top"    },
              { label:"Analytics",  placement:"top"    },
              { label:"Settings",   placement:"top"    },
              { label:"Notifications", placement:"top" },
            ].map(({ label, placement }) => (
              <GTooltipWrapper key={label} label={label} placement={placement} type="secondary">
                <GButtonCircle size="md" variant="secondary" icon={Icon.arrow} aria-label={label} />
              </GTooltipWrapper>
            ))}
          </div>
        </Demo>
      </div>

      {/* ── Props table ── */}
      <div className="section">
        <div className="section-head"><h2 className="section-title">Props</h2></div>
        <Demo title="GTooltip">
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:"var(--brand-font-mono,'IBM Plex Mono',monospace)" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--brand-border)" }}>
                {["Prop","Type","Default","Description"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 12px", color:"var(--brand-text-muted)", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["type",      '"primary"|"secondary"',                                                 '"secondary"',     "Light (bordered) or dark (solid)"],
                ["size",      '"xl"|"lg"',                                                              '"xl"',            "Font 16px or 14px"],
                ["placement", '"top"|"topStart"|"topEnd"|"bottom"|..."|"left"|...|"right"|..."',       '"top"',           "Arrow direction and alignment"],
                ["label",     "string",                                                                 '"Tooltip label"', "Text content"],
                ["closable",  "boolean",                                                                "false",           "Show × close button"],
                ["tip",       "boolean",                                                                "true",            "Show directional arrow"],
                ["onClose",   "function",                                                               "—",               "Called when × is clicked"],
                ["style",     "object",                                                                 "—",               "Inline style override"],
              ].map(([p,t,d,desc]) => (
                <tr key={p} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                  <td style={{ padding:"6px 12px", color:"var(--brand-primary)", fontWeight:600 }}>{p}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text-muted)" }}>{t}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)" }}>{d}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)", fontFamily:"var(--brand-font-body)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Demo>
        <Demo title="GTooltipWrapper">
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:"var(--brand-font-mono,'IBM Plex Mono',monospace)" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--brand-border)" }}>
                {["Prop","Type","Default","Description"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 12px", color:"var(--brand-text-muted)", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["children",  "ReactNode",                                            "—",           "Trigger element"],
                ["label",     "string",                                               '"Tooltip"',   "Tooltip text"],
                ["type",      '"primary"|"secondary"',                               '"secondary"', "Tooltip visual type"],
                ["size",      '"xl"|"lg"',                                            '"xl"',        "Tooltip size"],
                ["placement", "same 12 values as GTooltip",                          '"top"',       "Where tooltip appears"],
                ["closable",  "boolean",                                              "false",       "Show × on tooltip"],
              ].map(([p,t,d,desc]) => (
                <tr key={p} style={{ borderBottom:"1px solid var(--brand-border)" }}>
                  <td style={{ padding:"6px 12px", color:"var(--brand-primary)", fontWeight:600 }}>{p}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text-muted)" }}>{t}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)" }}>{d}</td>
                  <td style={{ padding:"6px 12px", color:"var(--brand-text)", fontFamily:"var(--brand-font-body)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Demo>
      </div>

    </PageView>
  );
}

const OverviewPage    = DS_Overview;
const FoundationsPage = DS_Colors;
const ComponentsPage  = DS_Buttons;

Object.assign(window, {
  DS_Overview,
  DS_Colors, DS_Typography, DS_Spacing, DS_Radius, DS_Shadows, DS_Borders, DS_Grid, DS_Accessibility, DS_Versions, DS_Icons,
  DS_Buttons, DS_Inputs, DS_Badges, DS_Tags, DS_Cards, DS_Alerts, DS_Avatars,
  DS_Accordion, DS_Breadcrumb, DS_Calendar, DS_Checkbox, DS_Divider, DS_Dropdowns, DS_Dropzone, DS_Form, DS_Link, DS_Media,
  DS_Progress, DS_Popover, DS_Paragraph, DS_Pagination, DS_Notification,
  DS_Modal, DS_ModalPromo,
  DS_Radio, DS_Slider, DS_SpacingComp, DS_Stepper, DS_Switch, DS_Tab, DS_Tooltip,
  DS_PatternLogin, DS_PatternDashboard, DS_PatternCreatePlatform, DS_PatternBrandSetup, DS_PatternUserProfile,
  OverviewPage, FoundationsPage, ComponentsPage,
});
