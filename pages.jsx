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
              <GTag variant="soft">Disponible</GTag>
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
function DS_Colors({ brand }) {
  const t = window.GENESIS_TOKENS;
  return (
    <PageView badge="Foundations" title="Colors" desc="Tres capas: brand aliases (cambian por marca), escala neutral global, y semánticos compartidos.">

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Brand aliases · {brand.name}</h2>
          <p className="section-desc">Estos tokens cambian por marca. Los componentes los leen por nombre.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Swatch name="--brand-primary"         role="Primary"         value={brand.primary} />
          <Swatch name="--brand-primary-hover"   role="Primary · hover"   value={brand.primaryHover} />
          <Swatch name="--brand-primary-pressed" role="Primary · pressed" value={brand.primaryPressed} />
          <Swatch name="--brand-primary-soft"    role="Primary · soft"    value={brand.primarySoft} />
          <Swatch name="--brand-accent"          role="Accent"          value={brand.accent} />
          <Swatch name="--brand-text"            role="Text"            value={brand.text} />
          <Swatch name="--brand-bg-elev"         role="Surface · elev"  value={brand.bgElev} />
          <Swatch name="--brand-border"          role="Border"          value={brand.border} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Neutral scale (global)</h2>
          <p className="section-desc">Compartido entre las 4 marcas. N-0 → N-950.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {Object.entries(t.palette.neutral).map(([step, hex]) => (
            <Swatch key={step} name={`--n-${step}`} role={`Neutral ${step}`} value={hex} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Semantic (global)</h2>
          <p className="section-desc">La intención no cambia por marca — success es success.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Swatch name="--color-success" role="Success" value={t.semantic.success} />
          <Swatch name="--color-warning" role="Warning" value={t.semantic.warning} />
          <Swatch name="--color-danger"  role="Danger"  value={t.semantic.danger} />
          <Swatch name="--color-info"    role="Info"    value={t.semantic.info} />
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
function DS_Spacing() {
  const t = window.GENESIS_TOKENS;
  return (
    <PageView badge="Foundations" title="Spacing" desc="Escala de espaciado global. Base 4px, 15 pasos. Compartida por todas las marcas.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Spacing scale</h2>
          <p className="section-desc">Múltiplo de 4px. 15 pasos.</p>
        </div>
        <div style={{ border: "1px solid var(--brand-border)", borderRadius: 10, overflow: "hidden" }}>
          {Object.entries(t.spacing).filter(([k]) => parseInt(k) > 1).map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 80px 1fr", gap: 16, padding: "14px 20px", borderBottom: "1px solid var(--brand-border)", alignItems: "center" }}>
              <span className="mono" style={{ color: "var(--brand-text)" }}>space-{k}</span>
              <span className="mono" style={{ color: "var(--brand-text-muted)" }}>{v}</span>
              <div style={{ height: 14, width: v, background: "var(--brand-primary)", borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>
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
  return (
    <PageView badge="Component" title="Tags" desc="Compacta. 4 variantes. Removible con onClose. border-radius: --radius-sm.">
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Variants</h2>
          <p className="section-desc">Primary · Secondary · Outline · Soft.</p>
        </div>
        <Demo title="Tag / Variants">
          <GTag variant="primary">Primary</GTag>
          <GTag variant="secondary">Secondary</GTag>
          <GTag variant="outline">Outline</GTag>
          <GTag variant="soft">Soft</GTag>
          <GTag variant="secondary" onClose>Removable</GTag>
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
            footer={<div style={{ display:"flex", gap:6 }}><GTag variant="soft">iOS</GTag><GTag variant="soft">Android</GTag></div>}
          />
          <GCard
            eyebrow="Team"
            title="Mariana Rivera"
            body="Senior Product Designer. Lidera el sistema desde 2024."
            footer={<GTag variant="soft">En línea</GTag>}
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

function DS_PatternLogin()          { return <DS_PatternPlaceholder name="Login"           desc="Flujo de autenticación. Email + password. Social login. Multi-factor." />; }
function DS_PatternDashboard()      { return <DS_PatternPlaceholder name="Dashboard"       desc="Vista principal con métricas, gráficas y acciones rápidas." />; }
function DS_PatternCreatePlatform() { return <DS_PatternPlaceholder name="Create platform" desc="Wizard de onboarding para crear una nueva plataforma." />; }
function DS_PatternBrandSetup()     { return <DS_PatternPlaceholder name="Brand setup"     desc="Configuración de identidad de marca: colores, tipografía, logo." />; }
function DS_PatternUserProfile()    { return <DS_PatternPlaceholder name="User profile"    desc="Perfil de usuario: datos personales, avatar, preferencias." />; }

// Backward compat aliases
const OverviewPage    = DS_Overview;
const FoundationsPage = DS_Colors;
const ComponentsPage  = DS_Buttons;

Object.assign(window, {
  DS_Overview,
  DS_Colors, DS_Typography, DS_Spacing, DS_Radius, DS_Shadows, DS_Borders,
  DS_Buttons, DS_Inputs, DS_Badges, DS_Tags, DS_Cards, DS_Alerts, DS_Avatars,
  DS_Accordion, DS_Breadcrumb, DS_Calendar, DS_Checkbox, DS_Divider, DS_Dropdowns,
  DS_PatternLogin, DS_PatternDashboard, DS_PatternCreatePlatform, DS_PatternBrandSetup, DS_PatternUserProfile,
  OverviewPage, FoundationsPage, ComponentsPage,
});
