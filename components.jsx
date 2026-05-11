// Multi-Brand Design System — Shared React Components
// REGLA: los componentes SOLO consumen tokens alias (--brand-*).
// Nunca colores hardcoded. Esto permite intercambiar theme sin tocar componentes.

const { useState, useEffect, useMemo, useRef } = React;

function hexToRgb(hex) {
  const h = hex.replace("#","");
  const n = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}

function Swatch({ name, value, role, textOn = "auto" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const rgb = hexToRgb(value);
  const lum = (0.299*rgb.r + 0.587*rgb.g + 0.114*rgb.b) / 255;
  const textColor = textOn === "auto" ? (lum > 0.6 ? "#0A0B0E" : "#FFFFFF") : textOn;

  return (
    <button onClick={onCopy} style={{
      display: "flex", flexDirection: "column", alignItems: "stretch",
      textAlign: "left", borderRadius: 8, overflow: "hidden",
      border: "1px solid var(--brand-border)", background: "var(--brand-bg)",
      transition: "transform .15s, box-shadow .15s", cursor: "pointer",
    }}
    onMouseOver={(e)=>{ e.currentTarget.style.boxShadow="0 6px 18px -8px rgba(10,11,14,.14)"; e.currentTarget.style.transform="translateY(-1px)"; }}
    onMouseOut={(e)=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
      <div style={{
        background: value, color: textColor,
        padding: "18px 14px 14px", minHeight: 96,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, position: "relative",
      }}>
        <span style={{ opacity: 0.85 }}>{role}</span>
        <span style={{ fontSize: 13, letterSpacing: "-0.01em" }}>{value.toUpperCase()}</span>
        {copied && <span style={{
          position: "absolute", top: 8, right: 8,
          background: "rgba(10,11,14,.85)", color: "#fff",
          padding: "2px 6px", borderRadius: 4, fontSize: 10,
        }}>Copied</span>}
      </div>
      <div style={{
        padding: "8px 14px", fontSize: 12, color: "var(--brand-text)",
        display: "flex", justifyContent: "space-between",
        borderTop: "1px solid var(--brand-border)",
      }}>
        <span style={{ fontWeight: 500 }}>{name}</span>
        <span className="mono" style={{ color: "var(--brand-text-muted)" }}>click to copy</span>
      </div>
    </button>
  );
}

function Demo({ title, meta, children, pad = 40, bg = "var(--brand-bg-elev)" }) {
  return (
    <div style={{
      border: "1px solid var(--brand-border)", borderRadius: 10,
      overflow: "hidden", background: "var(--brand-bg)",
    }}>
      <div style={{
        padding: "10px 14px", borderBottom: "1px solid var(--brand-border)",
        display: "flex", alignItems: "center", gap: 12, fontSize: 12,
        fontFamily: "'IBM Plex Mono', monospace", color: "var(--brand-text-muted)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--brand-primary)" }} />
        <span style={{ color: "var(--brand-text)" }}>{title}</span>
        {meta && <span style={{ marginLeft: "auto" }}>{meta}</span>}
      </div>
      <div style={{
        padding: pad, background: bg,
        display: "flex", flexWrap: "wrap", gap: 16,
        alignItems: "center", justifyContent: "flex-start",
      }}>{children}</div>
    </div>
  );
}

// ─── BUTTON — el ejemplo canónico: mismo componente, 4 marcas ───
function GButton({ variant = "primary", size = "md", state = "default", icon, children }) {
  const dens = "var(--density, 1)";
  const sizes = {
    lg: { py: 16, px: 20, fs: 18, gap: 10, icon: 24, radius: "var(--radius-lg)" },
    md: { py: 12, px: 16, fs: 16, gap: 8,  icon: 20, radius: "var(--radius-md)" },
    sm: { py: 6,  px: 12, fs: 14, gap: 6,  icon: 16, radius: "var(--radius-sm)" },
  };
  const s = sizes[size] || sizes.md;
  const isDisabled = state === "disabled";
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: s.gap,
    paddingTop: `calc(${s.py}px * ${dens})`,
    paddingBottom: `calc(${s.py}px * ${dens})`,
    paddingLeft: s.px, paddingRight: s.px,
    fontSize: s.fs, fontWeight: 600,
    fontFamily: "var(--brand-font-body)",
    borderRadius: s.radius, lineHeight: 1.33,
    transition: "background .15s, color .15s, border-color .15s",
    userSelect: "none", whiteSpace: "nowrap",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.4 : 1,
    border: "1px solid transparent",
  };
  const bgFor = (def, hover, pressed) =>
    state === "hover" ? hover : state === "pressed" || state === "active" ? pressed : def;
  const variants = {
    primary: {
      background: bgFor("var(--brand-primary)", "var(--brand-primary-hover)", "var(--brand-primary-pressed)"),
      color: "var(--brand-on-primary)",
    },
    secondary: {
      background: bgFor(
        "var(--brand-bg-elev)",
        "color-mix(in srgb, var(--brand-text) 8%, var(--brand-bg-elev))",
        "color-mix(in srgb, var(--brand-text) 12%, var(--brand-bg-elev))"
      ),
      color: "var(--brand-text)",
    },
    tertiary: {
      background: bgFor(
        "transparent",
        "color-mix(in srgb, var(--brand-text) 6%, var(--brand-bg))",
        "color-mix(in srgb, var(--brand-text) 10%, var(--brand-bg))"
      ),
      color: "var(--brand-text)",
    },
    outline: {
      background: state === "hover" ? "var(--brand-bg-elev)" : "transparent",
      color: "var(--brand-text)",
      border: "1px solid var(--brand-border)",
    },
    inverse: {
      background: bgFor(
        "var(--brand-bg)",
        "color-mix(in srgb, var(--brand-primary) 8%, var(--brand-bg))",
        "color-mix(in srgb, var(--brand-primary) 14%, var(--brand-bg))"
      ),
      color: "var(--brand-primary)",
    },
    transparent: {
      background: bgFor(
        "transparent",
        "color-mix(in srgb, var(--brand-text) 6%, transparent)",
        "color-mix(in srgb, var(--brand-text) 10%, transparent)"
      ),
      color: "var(--brand-text)",
    },
  };
  return (
    <button style={{ ...base, ...(variants[variant] || variants.primary) }}>
      {icon && <span style={{ width: s.icon, height: s.icon, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>}
      {children}
    </button>
  );
}

function _GButtonIcon({ type = "primary", size = "md", state = "default", shape = "square", children }) {
  const dens = "var(--density, 1)";
  const sizes = {
    lg: { dim: 56, pad: 16, iconSz: 24, radius: shape === "circle" ? 9999 : "var(--radius-lg)" },
    md: { dim: 48, pad: 12, iconSz: 24, radius: shape === "circle" ? 9999 : "var(--radius-md)" },
    sm: { dim: 32, pad: 8,  iconSz: 16, radius: shape === "circle" ? 9999 : "var(--radius-sm)" },
  };
  const s = sizes[size] || sizes.md;
  const isDisabled = state === "disabled";
  const bgFor = (def, hover, pressed) =>
    state === "hover" ? hover : state === "pressed" || state === "active" ? pressed : def;
  const types = {
    primary: {
      bg: bgFor("var(--brand-primary)", "var(--brand-primary-hover)", "var(--brand-primary-pressed)"),
      color: "var(--brand-on-primary)", border: "none",
    },
    secondary: {
      bg: bgFor(
        "var(--brand-bg-elev)",
        "color-mix(in srgb, var(--brand-text) 8%, var(--brand-bg-elev))",
        "color-mix(in srgb, var(--brand-text) 12%, var(--brand-bg-elev))"
      ),
      color: "var(--brand-text)", border: "none",
    },
    tertiary: {
      bg: bgFor(
        "transparent",
        "color-mix(in srgb, var(--brand-text) 6%, var(--brand-bg))",
        "color-mix(in srgb, var(--brand-text) 10%, var(--brand-bg))"
      ),
      color: "var(--brand-text)", border: "none",
    },
    outline: {
      bg: state === "hover" ? "var(--brand-bg-elev)" : "transparent",
      color: "var(--brand-text)",
      border: "1px solid var(--brand-border)",
    },
    inverse: {
      bg: bgFor(
        "var(--brand-bg)",
        "color-mix(in srgb, var(--brand-primary) 8%, var(--brand-bg))",
        "color-mix(in srgb, var(--brand-primary) 14%, var(--brand-bg))"
      ),
      color: "var(--brand-primary)", border: "none",
    },
    transparent: {
      bg: bgFor(
        "transparent",
        "color-mix(in srgb, var(--brand-text) 6%, transparent)",
        "color-mix(in srgb, var(--brand-text) 10%, transparent)"
      ),
      color: "var(--brand-text)", border: "none",
    },
  };
  const t = types[type] || types.primary;
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: `calc(${s.dim}px * ${dens})`,
      height: `calc(${s.dim}px * ${dens})`,
      padding: 0,
      background: t.bg, color: t.color,
      border: t.border || "none",
      borderRadius: s.radius,
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.4 : 1,
      transition: "background .15s",
      flexShrink: 0,
    }}>
      <span style={{ width: s.iconSz, height: s.iconSz, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </span>
    </button>
  );
}

function GButtonSquare(props) { return <_GButtonIcon {...props} shape="square" />; }
function GButtonCircle(props) { return <_GButtonIcon {...props} shape="circle" />; }

function GInput({ label, placeholder = "Escribe aquí...", state = "default", hint, size = "md", value, leading }) {
  const pads = { lg: "14px 16px", md: "10px 14px", sm: "8px 12px" }[size];
  const fs   = { lg: 16, md: 14, sm: 13 }[size];
  const stateStyles = {
    default: { borderColor: "var(--brand-border)", bg: "var(--brand-bg)" },
    focus:   { borderColor: "var(--brand-primary)", bg: "var(--brand-bg)", shadow: "0 0 0 3px color-mix(in srgb, var(--brand-primary) 20%, transparent)" },
    error:   { borderColor: "var(--color-danger)", bg: "var(--brand-bg)", shadow: "0 0 0 3px color-mix(in srgb, var(--color-danger) 18%, transparent)" },
    disabled:{ borderColor: "var(--brand-border)", bg: "var(--brand-bg-elev)" },
  }[state] || {};
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-text)" }}>{label}</label>}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: pads,
        border: `1px solid ${stateStyles.borderColor}`,
        borderRadius: "var(--radius-md)",
        background: stateStyles.bg,
        boxShadow: stateStyles.shadow || "none",
        fontSize: fs,
        color: state === "disabled" ? "var(--brand-text-muted)" : "var(--brand-text)",
        transition: "border-color .15s, box-shadow .15s",
      }}>
        {leading && <span style={{ display: "inline-flex", color: "var(--brand-text-muted)" }}>{leading}</span>}
        {value !== undefined
          ? <span style={{ flex: 1 }}>{value}</span>
          : <span style={{ flex: 1, color: "var(--brand-text-muted)", opacity: 0.7 }}>{placeholder}</span>}
        {state === "focus" && <span style={{ width: 1.5, height: 14, background: "var(--brand-text)", animation: "blink 1s step-end infinite" }} />}
      </div>
      {hint && <span style={{ fontSize: 12, color: state === "error" ? "var(--color-danger)" : "var(--brand-text-muted)" }}>{hint}</span>}
    </div>
  );
}

function GBadge({ type = "brand", size = "md", shape = "circle", children }) {
  const sz = {
    lg: { h: 32, py: 4,  px: 12, fs: 18 },
    md: { h: 24, py: 2,  px: 8,  fs: 14 },
    sm: { h: 16, py: 0,  px: 4,  fs: 12 },
  }[size] || { h: 24, py: 2, px: 8, fs: 14 };
  const colors = {
    brand:   { bg: "var(--brand-primary)",  fg: "var(--brand-on-primary)" },
    none:    { bg: "#7B7F87",               fg: "#FFFFFF" },
    warning: { bg: "#FFC700",               fg: "var(--brand-text)" },
    error:   { bg: "var(--color-danger)",   fg: "#FFFFFF" },
    success: { bg: "var(--color-success)",  fg: "#FFFFFF" },
  };
  const c = colors[type] || colors.brand;
  const single = String(children).length <= 1;
  const radius = shape === "circle" ? 9999 : 4;
  const sizeStyle = single
    ? { width: sz.h, height: sz.h, padding: 0 }
    : { paddingTop: sz.py, paddingBottom: sz.py, paddingLeft: sz.px, paddingRight: sz.px };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      ...sizeStyle,
      fontSize: sz.fs, fontWeight: 400, lineHeight: 1,
      background: c.bg, color: c.fg,
      borderRadius: radius,
      fontFamily: "var(--brand-font-body)",
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

// ─── GTag ─────────────────────────────────────────────────────────────────────
const TAG_TYPE_STYLES = {
  primary:  { bg: "var(--brand-primary-soft)",  color: "var(--brand-primary)",    metaColor: "var(--brand-text-muted)", closeColor: "var(--brand-primary)" },
  secondary:{ bg: "var(--brand-bg-elev)",        color: "var(--brand-text)",       metaColor: "var(--brand-text-muted)", closeColor: "var(--brand-text-muted)" },
  tertiary: { bg: "var(--brand-text)",           color: "#ffffff",                 metaColor: "rgba(255,255,255,.45)",   closeColor: "rgba(255,255,255,.7)" },
  outline:  { bg: "transparent",                 color: "var(--brand-text)",       metaColor: "var(--brand-text-muted)", closeColor: "var(--brand-text-muted)", border: "1px solid var(--brand-border)" },
  inverse:  { bg: "var(--brand-bg)",             color: "var(--brand-text)",       metaColor: "var(--brand-text-muted)", closeColor: "var(--brand-text-muted)" },
};
const TAG_SIZE_DIM = {
  lg: { height: 40, cPx: 8,  cPy: 2, font: 16, lineH: "20px", iconSz: 20, closeSz: 10, outerPx: 8  },
  md: { height: 36, cPx: 8,  cPy: 2, font: 14, lineH: "20px", iconSz: 18, closeSz: 10, outerPx: 8  },
  sm: { height: 28, cPx: 6,  cPy: 0, font: 12, lineH: "20px", iconSz: 14, closeSz:  8, outerPx: 6  },
};

function GTag({
  type     = "primary",   // "primary"|"secondary"|"tertiary"|"outline"|"inverse"
  size     = "md",        // "lg"|"md"|"sm"
  state    = "default",   // "default"|"hover"|"active"|"focus"|"disabled"
  label    = "Tag name",
  icon     = false,       // show left icon slot
  count    = null,        // show right count slot  (number or string)
  onRemove = null,        // show close ×  button if provided
  onClick  = null,
  style,
}) {
  const [hov,  setHov]  = useState(false);
  const [down, setDown] = useState(false);
  const [foc,  setFoc]  = useState(false);

  const disabled      = state === "disabled";
  const showHov       = (hov  || state === "hover")  && !disabled;
  const showActive    = (down || state === "active") && !disabled;
  const showFocus     = (foc  || state === "focus")  && !disabled;

  const ts = TAG_TYPE_STYLES[type] || TAG_TYPE_STYLES.primary;
  const sz = TAG_SIZE_DIM[size]    || TAG_SIZE_DIM.md;

  const filterVal  = showActive ? "brightness(0.84)" : showHov ? "brightness(0.92)" : undefined;
  const shadowVal  = showFocus  ? "0 0 0 2px #fff, 0 0 0 4px var(--brand-primary)"  : undefined;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        display: "inline-flex", alignItems: "center",
        height: sz.height, boxSizing: "border-box",
        paddingLeft: sz.outerPx, paddingRight: sz.outerPx,
        borderRadius: 9999, overflow: "hidden",
        background: ts.bg,
        border: ts.border || "none",
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        opacity: disabled ? 0.4 : 1,
        filter: filterVal,
        boxShadow: shadowVal,
        transition: "filter .12s, box-shadow .12s",
        fontFamily: "var(--brand-font-body)",
        userSelect: "none",
        ...style,
      }}
      onMouseEnter={!disabled ? () => setHov(true)  : undefined}
      onMouseLeave={!disabled ? () => { setHov(false); setDown(false); } : undefined}
      onMouseDown ={!disabled ? () => setDown(true)  : undefined}
      onMouseUp   ={!disabled ? () => setDown(false) : undefined}
      onFocus     ={!disabled ? () => setFoc(true)   : undefined}
      onBlur      ={!disabled ? () => setFoc(false)  : undefined}
      onClick     ={!disabled && onClick ? onClick   : undefined}
    >
      {/* ── Slot Left — icon ── */}
      {icon && (
        <span style={{ display:"flex", alignItems:"center", paddingLeft: 2, paddingRight: 0, color: ts.color, flexShrink: 0 }}>
          <svg width={sz.iconSz} height={sz.iconSz} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a7 7 0 1 0 0 14A7 7 0 0 0 10 3zm-.5 1.6V10H4.08A5.51 5.51 0 0 1 9.5 4.6z" opacity=".6"/>
            <path d="M11 4.16A5.5 5.5 0 0 1 15.92 10H11V4.16z" opacity=".35"/>
          </svg>
        </span>
      )}

      {/* ── Content — label ── */}
      <span style={{
        paddingLeft:  sz.cPx, paddingRight:  sz.cPx,
        paddingTop:   sz.cPy, paddingBottom: sz.cPy,
        fontSize: sz.font, lineHeight: sz.lineH,
        fontWeight: 400, color: ts.color,
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {label}
      </span>

      {/* ── Slot Right — count ── */}
      {count != null && (
        <span style={{
          paddingRight: sz.cPx,
          paddingTop: sz.cPy, paddingBottom: sz.cPy,
          fontSize: sz.font, lineHeight: sz.lineH,
          fontWeight: 400, color: ts.metaColor,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {count}
        </span>
      )}

      {/* ── Action — close × ── */}
      {onRemove && (
        <button
          onClick={e => { e.stopPropagation(); if (!disabled) onRemove(); }}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            width: sz.closeSz + 8, height: sz.closeSz + 8,
            marginRight: -2,
            background:"none", border:"none", cursor:"pointer",
            color: ts.closeColor, opacity:.75, flexShrink: 0, borderRadius: 3,
            padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "1"}
          onMouseLeave={e => e.currentTarget.style.opacity = ".75"}
          aria-label="Remove tag"
        >
          <svg width={sz.closeSz} height={sz.closeSz} viewBox="0 0 10 10" fill="none">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── GTagGroup ────────────────────────────────────────────────────────────────
function GTagGroup({
  tags    = [],      // array of GTag prop objects
  padding = true,    // adds vertical breathing room
  gap     = 8,
  style,
}) {
  return (
    <div style={{
      display:"flex", flexWrap:"wrap", alignItems:"center",
      gap,
      paddingTop:    padding ? 12 : 0,
      paddingBottom: padding ? 12 : 0,
      ...style,
    }}>
      {tags.map((t, i) => <GTag key={i} {...t} />)}
    </div>
  );
}

function GCard({ eyebrow, title, body, footer, image }) {
  return (
    <div style={{
      width: 300,
      border: "1px solid var(--brand-border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--brand-bg)",
      display: "flex", flexDirection: "column",
    }}>
      {image && <div style={{ height: 140, background: image, borderBottom: "1px solid var(--brand-border)" }} />}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
        {eyebrow && <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          color: "var(--brand-primary)", textTransform: "uppercase", letterSpacing: ".04em",
        }}>{eyebrow}</span>}
        <h3 style={{
          margin: 0, fontSize: 18, fontWeight: 700,
          fontFamily: "var(--brand-font-display)",
          color: "var(--brand-text)", letterSpacing: "-0.01em",
        }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 14, color: "var(--brand-text-muted)", lineHeight: 1.55 }}>{body}</p>
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}

// Mini-preview de un botón dentro de un contexto de marca específico
// (usa la clase .brand-xxx para aplicar el tema por instancia, sin tocar el resto de la página)
function BrandPreview({ brandKey, brand, children }) {
  return (
    <div className={"brand-" + brandKey} style={{
      border: "1px solid var(--brand-border)",
      borderRadius: 12, overflow: "hidden",
      background: "var(--brand-bg)",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--brand-border)",
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--brand-bg-elev)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--brand-primary)" }} />
        <span style={{
          fontFamily: "var(--brand-font-display)",
          fontSize: 14, fontWeight: 700,
          color: "var(--brand-text)", letterSpacing: "-0.01em",
        }}>{brand.name}</span>
        <span className="mono" style={{ marginLeft: "auto", color: "var(--brand-text-muted)", fontSize: 10 }}>
          {brand.primary}
        </span>
      </div>
      <div style={{
        padding: "32px 24px",
        background: "var(--brand-bg)",
        display: "flex", flexDirection: "column",
        gap: 14, alignItems: "flex-start",
        minHeight: 220,
      }}>
        {children}
      </div>
    </div>
  );
}

const Icon = {
  arrow:   <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus:    <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>,
  search:  <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M13 13l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  check:   <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x:       <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>,
  user:    <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 13c.8-2.5 3-3.5 5-3.5s4.2 1 5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  sparkle: <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%"><path d="M8 2l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 2z" fill="currentColor"/></svg>,
};

// ─── AVATAR ──────────────────────────────────────────────────────────────────
function GAvatar({ shape = "circle", type = "icon", size = "md", src, initials, alt = "", bordered = false }) {
  const dims = { xs: 24, sm: 36, md: 48, lg: 64, xl: 80, "2xl": 96, "3xl": 112, "4xl": 144 };
  const iconSizes = { xs: 16, sm: 24, md: 24, lg: 24, xl: 36, "2xl": 36, "3xl": 36, "4xl": 36 };
  const textFonts = { xs: 12, sm: 18, md: 20, lg: 24, xl: 24, "2xl": 32, "3xl": 32, "4xl": 32 };
  const squareRadii = { xs: 4, sm: 8, md: 12, lg: 12, xl: 12, "2xl": 16, "3xl": 16, "4xl": 16 };

  const dim = dims[size] || 48;
  const iconSz = iconSizes[size] || 24;
  const textFs = textFonts[size] || 20;
  const radius = shape === "circle" ? "50%" : (squareRadii[size] || 12) + "px";

  const bg = {
    image:    "var(--brand-bg-elev)",
    icon:     "var(--brand-bg-elev)",
    text:     "var(--brand-bg-elev)",
    error:    "color-mix(in srgb, var(--color-danger) 10%, var(--brand-bg))",
    checkbox: "var(--brand-primary)",
  }[type] || "var(--brand-bg-elev)";

  const fg = type === "checkbox" ? "var(--brand-on-primary)" : "var(--brand-text)";

  const UserSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={iconSz} height={iconSz}>
      <circle cx="12" cy="8" r="3.8"/>
      <path d="M4.5 20c0-3.866 3.358-7 7.5-7s7.5 3.134 7.5 7H4.5z"/>
    </svg>
  );

  const CheckSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" width={iconSz} height={iconSz}>
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const wrapStyle = {
    width: dim, height: dim, borderRadius: radius,
    background: bg,
    backgroundImage: type === "image" && src ? `url(${src})` : "none",
    backgroundSize: "cover", backgroundPosition: "center",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden", flexShrink: 0,
    userSelect: "none", color: fg,
    boxShadow: (bordered || type === "image") ? "inset 0 0 0 1px var(--brand-bg)" : "none",
  };

  return (
    <div style={wrapStyle} title={alt}>
      {type === "text" && (
        <span style={{ fontSize: textFs, fontWeight: 400, fontFamily: "var(--brand-font-body)", lineHeight: 1 }}>
          {initials}
        </span>
      )}
      {(type === "icon" || type === "error") && <UserSVG />}
      {type === "checkbox" && <CheckSVG />}
    </div>
  );
}

function GAvatarGroup({ avatars = [], size = "xl", max = 4 }) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      {visible.map((av, i) => (
        <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: visible.length - i, position: "relative" }}>
          <GAvatar
            shape="circle"
            type={av.src ? "image" : av.initials ? "text" : "icon"}
            size={size}
            src={av.src}
            initials={av.initials}
            alt={av.alt || ""}
            bordered
          />
        </div>
      ))}
      {overflow > 0 && (
        <div style={{ marginLeft: -8, position: "relative", zIndex: 0 }}>
          <GAvatar shape="circle" type="text" size={size} initials={`+${overflow}`} bordered />
        </div>
      )}
    </div>
  );
}

// ─── ALERT ───────────────────────────────────────────────────────────────────
function GAlert({ type = "brand", light = false, children, onClose }) {
  const palettes = {
    brand:   {
      dark:  { bg: "var(--brand-primary)",      fg: "#FFFFFF" },
      light: { bg: "var(--brand-primary-soft)", fg: "var(--brand-text)" },
    },
    primary: {
      dark:  { bg: "var(--brand-text)",         fg: "var(--brand-bg)" },
      light: { bg: "var(--brand-bg-elev)",      fg: "var(--brand-text)" },
    },
    success: {
      dark:  { bg: "var(--color-success)",      fg: "#FFFFFF" },
      light: { bg: "color-mix(in srgb, var(--color-success) 12%, var(--brand-bg))", fg: "var(--brand-text)" },
    },
    warning: {
      dark:  { bg: "#FFC700",                   fg: "var(--brand-text)" },
      light: { bg: "color-mix(in srgb, var(--color-warning) 14%, var(--brand-bg))", fg: "var(--brand-text)" },
    },
    error: {
      dark:  { bg: "var(--color-danger)",       fg: "#FFFFFF" },
      light: { bg: "color-mix(in srgb, var(--color-danger) 10%, var(--brand-bg))", fg: "var(--brand-text)" },
    },
  };

  const s = (palettes[type] || palettes.brand)[light ? "light" : "dark"];

  const icons = {
    brand:   <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v1M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    primary: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v1M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    success: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    warning: <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 4.5L3.5 19h17L12 4.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>,
    error:   <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "12px 24px", minHeight: 48,
      background: s.bg, color: s.fg,
      fontFamily: "var(--brand-font-body)",
      fontSize: 16, lineHeight: "24px",
    }}>
      <span style={{ display: "inline-flex", flexShrink: 0, width: 24, height: 24, color: s.fg }}>
        {icons[type] || icons.brand}
      </span>
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          onMouseOver={e => e.currentTarget.style.background = "rgba(128,128,128,0.18)"}
          onMouseOut={e => e.currentTarget.style.background = "transparent"}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 24, height: 24, borderRadius: 9999, flexShrink: 0,
            color: s.fg, transition: "background .15s",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── ACCORDION ───────────────────────────────────────────────────────────────
function GAccordion({
  label = "Accordion",
  slotRight,
  type = "primary",    // "primary" | "transparent"
  size = "md",         // "md" | "lg"
  chevron = "right",   // "left" | "right"
  state: stateProp = "default",
  open: openProp,
  defaultOpen = false,
  standalone = true,
  children,
  onChange,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : (stateProp === "active" ? true : internalOpen);
  const isDisabled = stateProp === "disabled";
  const isLoading = stateProp === "loading";
  const [hovered, setHovered] = useState(stateProp === "hover");
  const [focused, setFocused] = useState(stateProp === "focus");

  const sz = {
    lg: { py: 16, pxOuter: 20, pxInner: 16, fs: 18, lh: "24px", contentPad: "16px 20px", contentFs: 16 },
    md: { py: 8,  pxOuter: 16, pxInner: 12, fs: 16, lh: "20px", contentPad: "16px",       contentFs: 14 },
  }[size] || {};

  const triggerPad = chevron === "left"
    ? `${sz.py}px ${sz.pxOuter}px ${sz.py}px ${sz.pxInner}px`
    : `${sz.py}px ${sz.pxInner}px ${sz.py}px ${sz.pxOuter}px`;

  const showHover = hovered || stateProp === "hover";
  const showFocus = focused || stateProp === "focus";

  const getBg = () => {
    if (type === "transparent") return showHover ? "color-mix(in srgb, var(--brand-border) 35%, transparent)" : "transparent";
    return showHover ? "color-mix(in srgb, var(--brand-border) 55%, var(--brand-bg-elev))" : "var(--brand-bg-elev)";
  };

  const handleToggle = () => {
    if (isDisabled || isLoading) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onChange && onChange(next);
  };

  const chevronRotation = isOpen ? (chevron === "left" ? 90 : 180) : 0;
  const ChevronIcon = chevron === "left"
    ? <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

  const showTriggerDivider = standalone && !isOpen;
  const showContentDivider = !standalone && isOpen;

  return (
    <div style={{
      background: standalone && isOpen ? "var(--brand-bg)" : "transparent",
      border: standalone && isOpen ? "1px solid var(--brand-border)" : "none",
      borderRadius: standalone && isOpen ? "var(--radius-md)" : 0,
      overflow: "hidden",
    }}>
      <button
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isDisabled}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: triggerPad, width: "100%",
          background: getBg(),
          fontFamily: "var(--brand-font-body)",
          fontSize: sz.fs, lineHeight: sz.lh, fontWeight: 400,
          color: "var(--brand-text)",
          borderBottom: (showTriggerDivider || showContentDivider) ? "1px solid var(--brand-border)" : "none",
          boxShadow: showFocus ? "0 0 0 2px inset color-mix(in srgb, var(--brand-primary) 60%, transparent)" : "none",
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.5 : 1,
          transition: "background .15s, box-shadow .15s",
          textAlign: "left",
        }}
      >
        {chevron === "left" && (
          <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--brand-text)", transform: `rotate(${chevronRotation}deg)`, transition: "transform .2s ease" }}>
            {ChevronIcon}
          </span>
        )}
        <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <span>{label}</span>
          {slotRight !== undefined && <span style={{ color: "var(--brand-text-muted)" }}>{slotRight}</span>}
          {isLoading && (
            <span style={{ display: "inline-flex", width: 16, height: 16 }}>
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16" style={{ animation: "g-spin 0.8s linear infinite" }}>
                <circle cx="8" cy="8" r="6" stroke="var(--brand-bg-elev)" strokeWidth="2.5"/>
                <path d="M8 2a6 6 0 0 1 6 6" stroke="var(--brand-primary)" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </span>
          )}
        </span>
        {chevron === "right" && (
          <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--brand-text)", transform: `rotate(${chevronRotation}deg)`, transition: "transform .2s ease" }}>
            {ChevronIcon}
          </span>
        )}
      </button>
      {isOpen && children && (
        <div style={{
          padding: sz.contentPad,
          fontSize: sz.contentFs, lineHeight: 1.6,
          color: "var(--brand-text)",
          fontFamily: "var(--brand-font-body)",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function GAccordionGroup({ items = [], size = "md", type = "primary", chevron = "right" }) {
  return (
    <div style={{
      border: "1px solid var(--brand-border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--brand-bg)",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--brand-border)" : "none" }}>
          <GAccordion
            label={item.label}
            slotRight={item.slotRight}
            defaultOpen={item.defaultOpen}
            size={size}
            type={type}
            chevron={chevron}
            standalone={false}
          >
            {item.content}
          </GAccordion>
        </div>
      ))}
    </div>
  );
}

function GBreadcrumb({ items = [], separator = "icon" }) {
  const HomeSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5L8 2L14 6.5V13.5C14 13.7761 13.7761 14 13.5 14H10V10H6V14H2.5C2.22386 14 2 13.7761 2 13.5V6.5Z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none"/>
    </svg>
  );
  const ChevronSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <nav style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const color = isLast ? "var(--brand-text-muted)" : "var(--brand-text)";
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                paddingLeft: separator === "slash" ? 4 : 0,
                paddingRight: separator === "slash" ? 4 : 0,
                paddingTop: separator === "icon" ? 2 : 0,
                paddingBottom: separator === "icon" ? 2 : 0,
                color: "var(--brand-text-muted)",
                fontSize: 14, lineHeight: "20px", userSelect: "none",
              }}>
                {separator === "slash" ? "/" : <ChevronSVG />}
              </span>
            )}
            <span style={{
              display: "inline-flex", alignItems: "center",
              paddingTop: item.icon ? 2 : 0,
              paddingBottom: item.icon ? 2 : 0,
              fontSize: 14, fontWeight: 400, lineHeight: "20px",
              color,
              cursor: isLast ? "default" : "pointer",
              fontFamily: "var(--brand-font-body)",
            }}>
              {item.icon ? <HomeSVG /> : item.label}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function GCalendar({ type = "single", value, onChange }) {
  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAYS   = ['L','M','X','J','V','S','D'];

  const today = new Date(); today.setHours(0,0,0,0);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(null);
  const [rangeStart,setRangeStart]= useState(null);
  const [rangeEnd,  setRangeEnd]  = useState(null);
  const [hovered,   setHovered]   = useState(null);

  const isRange = type === "double" || type === "range";

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function nextMonthOf(y, m) { return m === 11 ? [y + 1, 0] : [y, m + 1]; }

  function toKey(d) { return d ? d.toDateString() : null; }
  function sameDay(a, b) { return a && b && toKey(a) === toKey(b); }

  function dayState(date) {
    if (date < today && !sameDay(date, today)) {
      if (isRange && rangeStart && rangeEnd && date > rangeStart && date < rangeEnd) return "middle";
      return "past";
    }
    if (sameDay(date, today)) return "active";
    if (!isRange && sameDay(date, selected)) return "selected";
    if (isRange) {
      if (sameDay(date, rangeStart)) return "start";
      if (sameDay(date, rangeEnd))   return "end";
      const effectiveEnd = rangeEnd || (hovered && rangeStart && hovered > rangeStart ? hovered : null);
      if (rangeStart && effectiveEnd && date > rangeStart && date < effectiveEnd) return "middle";
    }
    return "default";
  }

  function handleClick(date) {
    if (!isRange) {
      setSelected(date);
      onChange && onChange(date);
    } else {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date); setRangeEnd(null);
      } else {
        if (date < rangeStart) { setRangeEnd(rangeStart); setRangeStart(date); }
        else { setRangeEnd(date); }
        onChange && onChange([rangeStart, date]);
      }
    }
  }

  const ChevL = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ChevR = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const navBtn = {
    width: 28, height: 28, borderRadius: "var(--radius-sm)",
    border: "none", background: "transparent", cursor: "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "var(--brand-text)", padding: 0,
  };

  function getDayStyle(st, isHov) {
    const base = {
      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 14, fontFamily: "var(--brand-font-body)", cursor: "pointer",
      position: "relative", userSelect: "none", transition: "background .1s",
    };
    switch (st) {
      case "start":
        return { ...base, background: "var(--brand-primary)", color: "var(--brand-on-primary)",
          fontWeight: 400, borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)" };
      case "end":
        return { ...base, background: "var(--brand-primary)", color: "var(--brand-on-primary)",
          fontWeight: 400, borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" };
      case "selected":
        return { ...base, background: "var(--brand-primary)", color: "var(--brand-on-primary)",
          fontWeight: 400, borderRadius: 8 };
      case "active":
        return { ...base, background: isHov ? "var(--brand-bg-elev)" : "var(--brand-primary-soft)",
          color: "var(--brand-primary)", fontWeight: 700, borderRadius: 8 };
      case "middle":
        return { ...base, background: "color-mix(in srgb, var(--brand-primary) 12%, var(--brand-bg))",
          color: "var(--brand-text)", fontWeight: 400, borderRadius: 0 };
      case "past":
        return { ...base, background: isHov ? "var(--brand-bg-elev)" : "transparent",
          color: "var(--brand-text-muted)", fontWeight: 400, borderRadius: 8 };
      default:
        return { ...base, background: isHov ? "var(--brand-bg-elev)" : "transparent",
          color: "var(--brand-text)", fontWeight: 400, borderRadius: 8 };
    }
  }

  function renderGrid(year, month, showPrev, showNext) {
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = Array(firstDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0, width: 240 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", padding: "6px 8px", marginBottom: 4 }}>
          {showPrev
            ? <button style={navBtn} onClick={prevMonth}><ChevL /></button>
            : <div style={{ width: 28 }} />}
          <span style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 600,
            color: "var(--brand-text)", fontFamily: "var(--brand-font-body)" }}>
            {MONTHS[month]}, {year}
          </span>
          {showNext
            ? <button style={navBtn} onClick={nextMonth}><ChevR /></button>
            : <div style={{ width: 28 }} />}
        </div>
        {/* Weekday labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {DAYS.map(d => (
            <div key={d} style={{ height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600, color: "var(--brand-text-muted)", fontFamily: "var(--brand-font-body)" }}>
              {d}
            </div>
          ))}
        </div>
        {/* Days */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {cells.map((day, i) => {
            if (!day) return <div key={i} style={{ width: 32, height: 32 }} />;
            const date = new Date(year, month, day); date.setHours(0,0,0,0);
            const st   = dayState(date);
            const isHov= hovered && sameDay(hovered, date);
            return (
              <div key={i}
                style={getDayStyle(st, isHov)}
                onClick={() => handleClick(date)}
                onMouseEnter={() => setHovered(date)}
                onMouseLeave={() => setHovered(null)}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const [y2, m2] = nextMonthOf(viewYear, viewMonth);

  return (
    <div style={{
      display: "inline-flex", gap: 24,
      background: "var(--brand-primary-soft)",
      border: "1px solid var(--brand-border)",
      borderRadius: "var(--radius-md)",
      padding: 20,
    }}>
      {renderGrid(viewYear, viewMonth, true, type === "single")}
      {type === "double" && renderGrid(y2, m2, false, true)}
    </div>
  );
}

// ── GCheckbox ──────────────────────────────────────────────────────────────────
// Variants: plain (inline label) | section (card-style row)
// Sizes: lg | md
// position: left | right (which side the control sits)
// States: default, hover, focus, error, disabled (controlled via props or internal)
function GCheckbox({
  variant = "plain",
  size = "md",
  position = "left",
  checked = false,
  onChange,
  label,
  error = false,
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const plain = {
    lg: { height: 44, py: 12, gap: 12, fs: 16, ctrl: 20 },
    md: { height: 40, py: 10, gap: 12, fs: 14, ctrl: 20 },
  };
  const section = {
    lg: { height: 56, py: 18, px: 20, gap: 12, fs: 16, ctrl: 20, radius: "var(--radius-md)" },
    md: { height: 48, py: 14, px: 20, gap: 12, fs: 14, ctrl: 20, radius: "var(--radius-md)" },
  };

  const sz = variant === "section" ? (section[size] || section.md) : (plain[size] || plain.md);

  // Determine border/fill colors for the control box
  let controlBorder = "var(--brand-border)";
  let controlFill = "transparent";
  let controlCheck = "transparent";

  if (disabled) {
    controlBorder = "var(--brand-border)";
    controlFill = checked ? "transparent" : "color-mix(in srgb, var(--brand-text) 10%, var(--brand-bg-elev))";
  } else if (error) {
    controlBorder = "var(--color-danger)";
    controlFill = checked ? "var(--color-danger)" : "transparent";
    if (checked) controlCheck = "var(--brand-on-primary)";
  } else if (checked) {
    controlBorder = "var(--brand-primary)";
    controlFill = "var(--brand-primary)";
    controlCheck = "var(--brand-on-primary)";
  } else if (hovered) {
    controlBorder = "var(--brand-primary)";
  } else {
    controlBorder = "var(--brand-border)";
  }

  // Focus ring
  const focusShadow = focused && !disabled
    ? "0 0 0 3px color-mix(in srgb, var(--brand-primary) 28%, transparent)"
    : "none";

  // Section card background
  let cardBg = "var(--brand-primary-soft)";
  let cardBorder = checked ? "var(--brand-primary)" : "var(--brand-border)";
  if (error) cardBorder = "var(--color-danger)";
  if (disabled) { cardBg = "var(--brand-bg-elev)"; cardBorder = "var(--brand-border)"; }

  const textColor = disabled ? "var(--brand-text-muted)" : "var(--brand-text)";
  const cursor = disabled ? "not-allowed" : "pointer";

  const CheckIcon = () => (
    <svg width={sz.ctrl} height={sz.ctrl} viewBox="0 0 20 20" fill="none">
      <rect
        x="1" y="1" width="18" height="18"
        rx={3}
        fill={controlFill}
        stroke={controlBorder}
        strokeWidth="1.5"
        style={{ transition: "fill .12s, stroke .12s" }}
      />
      {(checked && !disabled) && (
        <path
          d="M5 10.5L8.5 14L15 7"
          stroke={controlCheck}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {(checked && disabled) && (
        <rect x="1" y="1" width="18" height="18" rx={3}
          fill="color-mix(in srgb, var(--brand-text) 10%, var(--brand-bg-elev))"
          stroke="var(--brand-border)" strokeWidth="1.5" />
      )}
    </svg>
  );

  const control = (
    <div style={{
      flexShrink: 0,
      width: sz.ctrl, height: sz.ctrl,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: focusShadow,
      borderRadius: 3,
      transition: "box-shadow .15s",
    }}>
      <CheckIcon />
    </div>
  );

  const labelEl = label ? (
    <span style={{
      fontFamily: "var(--brand-font-body)",
      fontSize: sz.fs,
      fontWeight: 400,
      color: textColor,
      lineHeight: 1.4,
      flex: 1,
    }}>{label}</span>
  ) : null;

  const inner = (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: sz.gap,
      flexDirection: position === "right" ? "row-reverse" : "row",
      width: "100%",
    }}>
      {control}
      {labelEl}
    </div>
  );

  const sharedProps = {
    role: "checkbox",
    "aria-checked": checked,
    tabIndex: disabled ? -1 : 0,
    onClick: disabled ? undefined : () => onChange && onChange(!checked),
    onKeyDown: disabled ? undefined : (e) => { if (e.key === " ") { e.preventDefault(); onChange && onChange(!checked); }},
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => { setHovered(false); },
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: { cursor, userSelect: "none", outline: "none" },
  };

  if (variant === "section") {
    return (
      <div
        {...sharedProps}
        style={{
          ...sharedProps.style,
          display: "flex",
          alignItems: "center",
          width: 240,
          minHeight: sz.height,
          paddingTop: sz.py,
          paddingBottom: sz.py,
          paddingLeft: sz.px,
          paddingRight: sz.px,
          gap: sz.gap,
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: sz.radius,
          transition: "border-color .12s, background .12s",
          boxSizing: "border-box",
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      {...sharedProps}
      style={{
        ...sharedProps.style,
        display: "inline-flex",
        alignItems: "center",
        minHeight: sz.height,
        paddingTop: sz.py,
        paddingBottom: sz.py,
        gap: sz.gap,
      }}
    >
      {inner}
    </div>
  );
}

// ── GCheckboxGroup ──────────────────────────────────────────────────────────────
// direction: horizontal | vertical
// items: [{ label, value, checked?, disabled?, error? }]
// onChange(value, newChecked)
function GCheckboxGroup({
  items = [],
  variant = "plain",
  size = "md",
  direction = "vertical",
  onChange,
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap: direction === "horizontal" ? 24 : 8,
      flexWrap: "wrap",
    }}>
      {items.map((item) => (
        <GCheckbox
          key={item.value}
          variant={variant}
          size={size}
          label={item.label}
          checked={!!item.checked}
          disabled={!!item.disabled}
          error={!!item.error}
          onChange={(val) => onChange && onChange(item.value, val)}
        />
      ))}
    </div>
  );
}

// ── GDivider ────────────────────────────────────────────────────────────────────
// Sizes: 2xs | xs | sm | md | lg | xl | 2xl  (symmetric vertical padding around 1px line)
// dash: false = solid, true = dashed 4/4px
// Color: --brand-border
function GDivider({ size = "md", dash = false }) {
  const py = { "2xs": 0, xs: 2, sm: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }[size] ?? 6;
  return (
    <div style={{ paddingTop: py, paddingBottom: py, width: "100%" }}>
      <div style={{
        height: 0,
        borderTop: `1px ${dash ? "dashed" : "solid"} var(--brand-border)`,
        width: "100%",
      }} />
    </div>
  );
}

// ── GDropdownItem ───────────────────────────────────────────────────────────────
// type: primary | search
// size: lg | md
// state: default | hover | active | disabled
function GDropdownItem({
  type = "primary",
  size = "lg",
  state = "default",
  label = "Option",
  description,
  iconLeft,
  iconRight,
  divider = false,
  onClick,
}) {
  const [hov, setHov] = useState(false);
  const isDisabled = state === "disabled";
  const isActive   = state === "active";
  const isHover    = state === "hover" || hov;

  const py = size === "lg" ? 16 : 8;
  const px = size === "lg" ? 16 : 12;
  const labelFs = size === "lg" ? 18 : 14;
  const descFs  = size === "lg" ? 13 : 12;
  const iconSz  = size === "lg" ? 24 : 16;

  const bgColor = isDisabled ? "transparent"
    : isActive  ? "color-mix(in srgb, var(--brand-primary) 14%, var(--brand-bg-elev))"
    : isHover   ? "color-mix(in srgb, var(--brand-text) 6%, var(--brand-primary-soft))"
    : "var(--brand-primary-soft)";

  const textColor  = isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)";
  const borderColor = isHover || isActive ? "var(--brand-primary)" : "var(--brand-border)";

  if (type === "search") {
    return (
      <div style={{
        padding: `${py}px ${px}px`,
        background: "var(--brand-primary-soft)",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: `1px solid ${borderColor}`,
        cursor: "text",
      }}>
        <svg width={iconSz} height={iconSz} viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="4" stroke="var(--brand-text-muted)" strokeWidth="1.25"/>
          <path d="M11 11L14 14" stroke="var(--brand-text-muted)" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
        <span style={{
          fontSize: labelFs, color: "var(--brand-text-muted)",
          fontFamily: "var(--brand-font-body)", flex: 1,
        }}>
          {label || "Search"}
        </span>
        <span style={{
          width: 1, height: size === "lg" ? 20 : 14,
          background: "var(--brand-primary)",
          display: "inline-block",
          animation: "blink 1s step-start infinite",
        }} />
      </div>
    );
  }

  return (
    <div
      role="option"
      aria-disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={() => !isDisabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: `${py}px ${px}px`,
        background: bgColor,
        display: "flex", alignItems: "center", gap: 8,
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "background .12s",
        borderBottom: divider ? `1px solid ${borderColor}` : "none",
        opacity: isDisabled ? 0.45 : 1,
      }}
    >
      {iconLeft && (
        <span style={{
          width: iconSz, height: iconSz, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
        }}>
          {iconLeft}
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: "block",
          fontSize: labelFs, fontWeight: 400, lineHeight: "1.3",
          color: textColor, fontFamily: "var(--brand-font-body)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{label}</span>
        {description && (
          <span style={{
            display: "block", fontSize: descFs,
            color: "var(--brand-text-muted)", lineHeight: "1.4",
            marginTop: 2,
          }}>{description}</span>
        )}
      </span>
      {iconRight && (
        <span style={{
          width: iconSz, height: iconSz, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--brand-text-muted)",
        }}>
          {iconRight}
        </span>
      )}
    </div>
  );
}

// ── GDropdown ───────────────────────────────────────────────────────────────────
// size: md (240px, radius-md) | lg (320px, radius-lg)
// children: GDropdownItem nodes
function GDropdown({ size = "md", children, style }) {
  const width  = size === "lg" ? 320 : 240;
  const radius = size === "lg" ? "var(--radius-lg)" : "var(--radius-md)";

  return (
    <div style={{
      width,
      background: "var(--brand-primary-soft)",
      border: "1px solid var(--brand-border)",
      borderRadius: radius,
      overflow: "hidden",
      boxShadow: "0 8px 24px -6px rgba(10,11,14,.14), 0 2px 6px -2px rgba(10,11,14,.08)",
      display: "flex", flexDirection: "column",
      ...style,
    }}>
      <div style={{ overflowY: "auto", maxHeight: size === "lg" ? 392 : 252 }}>
        {children}
      </div>
    </div>
  );
}

// ── GThumbnail ─────────────────────────────────────────────────────────────────
// Figma: Thumbnails · sizes 16 | 24 | 32 | 48 px · radius-xs · object-cover
function GThumbnail({ src, alt = "", size = 32, style }) {
  const radii = { 16: 2, 24: 3, 32: 4, 48: 6 };
  const radius = radii[size] ?? 4;
  const bg = "var(--brand-bg-elev)";

  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      overflow: "hidden", flexShrink: 0, background: bg,
      position: "relative", ...style,
    }}>
      {src ? (
        <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      ) : (
        <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" style={{ position:"absolute", inset:0 }}>
          <rect width="32" height="32" fill="var(--brand-bg-elev)"/>
          <path d="M6 22l6-6 4 4 3-3 7 7" stroke="var(--brand-border)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="11" cy="11" r="3" stroke="var(--brand-border)" strokeWidth="1.2"/>
        </svg>
      )}
    </div>
  );
}

// ── GMediaPhoto ────────────────────────────────────────────────────────────────
// Figma: Media Photo  ·  quantity: 1 | 2  ·  viewport: desktop | mobile
// Desktop q=1: full-width, aspect 21:9, radius-lg
// Desktop q=2: flex-row, 1:2 split, gap=24px, radius-lg
// Mobile q=1:  full-width, aspect 4:3, radius-md
// Mobile q=2:  flex-col, equal heights, gap=12px, radius-md
function GMediaPhoto({
  quantity = 1,
  viewport = "desktop",
  src,
  src2,
  alt   = "",
  alt2  = "",
  caption,
  style,
}) {
  const isMobile  = viewport === "mobile";
  const isDouble  = quantity === 2;
  const radius    = isMobile ? "var(--radius-md)" : "var(--radius-lg)";
  const gap       = isMobile ? 12 : 24;
  const py        = isMobile ? 16 : 32;
  const aspect1   = isMobile ? "4/3"  : (isDouble ? "4/3"  : "21/9");
  const aspect2   = isMobile ? "4/3"  : "4/3";

  // placeholder fill — uses brand-bg-elev with a simple image icon
  const Placeholder = ({ tall }) => (
    <div style={{
      width:"100%", height:"100%", background:"var(--brand-bg-elev)",
      display:"flex", alignItems:"center", justifyContent:"center",
      borderRadius: radius,
    }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="var(--brand-bg-elev)"/>
        <path d="M6 30l10-10 6 6 5-5 7 9" stroke="var(--brand-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="4" stroke="var(--brand-border)" strokeWidth="1.5"/>
      </svg>
    </div>
  );

  const imgStyle = (aspectRatio, flex) => ({
    position:"relative", borderRadius: radius, overflow:"hidden",
    flexShrink: flex ? 0 : undefined,
    flex: flex || undefined,
    aspectRatio,
    minWidth: 0,
    background: "var(--brand-bg-elev)",
  });

  return (
    <div style={{
      display:"flex",
      flexDirection: isDouble && !isMobile ? "row" : "column",
      alignItems: isDouble ? "stretch" : "center",
      gap: isDouble ? gap : 0,
      padding: `${py}px 0`,
      width: "100%",
      ...style,
    }}>
      {/* Image 1 */}
      <div style={imgStyle(aspect1, isDouble && !isMobile ? "1" : undefined)}>
        {src ? (
          <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        ) : <Placeholder />}
      </div>

      {/* Image 2 (quantity=2 only) */}
      {isDouble && (
        <div style={imgStyle(aspect2, !isMobile ? "2" : undefined)}>
          {src2 ? (
            <img src={src2} alt={alt2} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          ) : <Placeholder />}
        </div>
      )}

      {/* Optional caption */}
      {caption && (
        <p style={{
          marginTop: 12, fontSize: 13, color: "var(--brand-text-muted)",
          fontFamily: "var(--brand-font-body)", lineHeight: "1.5", textAlign:"center",
        }}>{caption}</p>
      )}
    </div>
  );
}

// ── GLink ──────────────────────────────────────────────────────────────────────
// Figma node: 50:3071  ·  5 states · optional left/right icon slots
// state: default | hover | focus | active | visited
// Maps to brand tokens: --brand-primary / hover / pressed / soft
function GLink({
  label    = "Text link",
  href     = "#",
  state    = "default",
  slotLeft  = false,
  slotRight = false,
  iconLeft,
  iconRight,
  external  = false,
  onClick,
  style,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  const effectiveState = act || state === "active"   ? "active"
    : foc || state === "focus"    ? "focus"
    : hov || state === "hover"    ? "hover"
    : state === "visited"         ? "visited"
    : "default";

  const colorMap = {
    default: "var(--brand-primary)",
    hover:   "var(--brand-primary-hover, color-mix(in srgb, var(--brand-primary) 75%, white))",
    focus:   "var(--brand-primary)",
    active:  "var(--brand-primary-pressed, color-mix(in srgb, var(--brand-primary) 75%, black))",
    visited: "color-mix(in srgb, var(--brand-primary) 55%, var(--brand-text-muted))",
  };

  const color = colorMap[effectiveState];

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        color,
        textDecoration: "underline",
        textDecorationColor: color,
        textUnderlineOffset: 2,
        fontFamily: "var(--brand-font-body)",
        fontSize: 16, fontWeight: 400, lineHeight: "20px",
        cursor: "pointer",
        outline: effectiveState === "focus"
          ? `2px solid color-mix(in srgb, var(--brand-primary) 40%, transparent)`
          : "none",
        outlineOffset: 2,
        borderRadius: 2,
        transition: "color .12s, text-decoration-color .12s",
        ...style,
      }}
    >
      {slotLeft && (iconLeft || <PlusIcon />)}
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      {slotRight && (iconRight || <ArrowIcon />)}
    </a>
  );
}

// ── GFormField ─────────────────────────────────────────────────────────────────
// Floating-label form field. Figma node: 18:6817 (Form Label Inside)
// size:  lg | md | sm
// state: default | hover | focus | active | filled | error | warning | success | disabled
// type:  input | password | select | datepicker | textarea
// Props: label, placeholder, value, onChange, required, caption, slotLeft, slotRight, rows
function GFormField({
  size       = "lg",
  state      = "default",
  type       = "input",
  label      = "Label",
  placeholder = "Placeholder",
  value: valueProp,
  onChange,
  required   = false,
  caption,
  slotLeft   = false,
  slotRight  = true,
  rows       = 3,
  style,
}) {
  const [internalVal, setInternalVal] = useState(valueProp ?? "");
  const [focused, setFocused] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalVal;

  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isWarning  = state === "warning";
  const isSuccess  = state === "success";
  const isFocus    = state === "focus" || state === "active" || focused;
  const isFilled   = state === "filled" || (value && value.length > 0);
  const isHover    = state === "hover";

  // Size tokens
  const sizeMap = {
    lg: { px: 12, pyBox: 5, labelFs: 13, inputFs: 18, inputLh: "24px", radius: "var(--radius-md)", gap: 1 },
    md: { px: 12, pyBox: 4, labelFs: 12, inputFs: 16, inputLh: "20px", radius: "var(--radius-md)", gap: 1 },
    sm: { px: 10, pyBox: 3, labelFs: 11, inputFs: 14, inputLh: "18px", radius: "var(--radius-sm)", gap: 0 },
  };
  const s = sizeMap[size] || sizeMap.lg;

  // Border per state
  const borderColor = isError   ? "var(--color-danger)"
    : isWarning ? "var(--color-warning)"
    : isSuccess ? "var(--color-success)"
    : isFocus   ? "var(--brand-primary)"
    : isHover   ? "color-mix(in srgb, var(--brand-text) 30%, var(--brand-border))"
    : isDisabled? "color-mix(in srgb, var(--brand-border) 50%, transparent)"
    : "var(--brand-border)";
  const borderWidth = isFocus ? "1.5px" : "1px";
  const bgColor = isFocus
    ? "color-mix(in srgb, var(--brand-primary) 4%, var(--brand-bg))"
    : isDisabled ? "color-mix(in srgb, var(--brand-bg-elev) 60%, var(--brand-bg))"
    : "var(--brand-bg)";

  // Caption color
  const captionColor = isError   ? "var(--color-danger)"
    : isWarning ? "var(--color-warning)"
    : isSuccess ? "var(--color-success)"
    : "var(--brand-text-muted)";

  // Label float: always visible inside (Genesis "label inside" pattern)
  const labelColor = isError   ? "var(--color-danger)"
    : isWarning ? "var(--color-warning)"
    : isSuccess ? "var(--color-success)"
    : isFocus   ? "var(--brand-primary)"
    : "var(--brand-text-muted)";

  const handleChange = (e) => {
    if (!isControlled) setInternalVal(e.target.value);
    if (onChange) onChange(e);
  };

  // Slot icons
  const ChevronSVG = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const CalendarSVG = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
  const EyeSVG = ({ open }) => open
    ? <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.25"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25"/></svg>
    : <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M13.5 5.5C12.4 6.9 10.3 8.5 8 8.5S3.6 6.9 2.5 5.5M2 3l12 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>;
  const UserSVG = () => (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M3 13c.8-2.5 3-3.5 5-3.5s4.2 1 5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );

  const slotColor = isDisabled ? "var(--brand-text-muted)" : isFocus ? "var(--brand-primary)" : "var(--brand-text-muted)";

  const sharedInputStyle = {
    flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
    fontFamily: "var(--brand-font-body)", fontSize: s.inputFs, lineHeight: s.inputLh,
    color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
    cursor: isDisabled ? "not-allowed" : "auto",
    resize: "none",
  };

  const showRightIcon = type === "select" || type === "datepicker" || (type === "password" && slotRight);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap: 4, width:"100%", ...style }}>
      {/* ── Input box ── */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: `${s.pyBox}px ${s.px}px`,
        background: bgColor,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: s.radius,
        transition: "border .12s, background .12s",
        cursor: isDisabled ? "not-allowed" : "default",
        position: "relative", overflow: "hidden",
        gap: 8,
      }}
        onMouseEnter={() => !isDisabled && state === "default" && setFocused(false)}
      >
        {/* Left slot */}
        {slotLeft && (
          <span style={{ display:"flex", alignItems:"center", flexShrink:0, color: slotColor }}>
            <UserSVG />
          </span>
        )}

        {/* Label + input stacked */}
        <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap: s.gap }}>
          <span style={{
            fontSize: s.labelFs, lineHeight: "1.3",
            color: labelColor,
            fontFamily: "var(--brand-font-body)",
            userSelect: "none", pointerEvents: "none",
          }}>
            {label}{required && <span style={{ color:"var(--color-danger)", marginLeft:2 }}>*</span>}
          </span>
          {type === "textarea" ? (
            <textarea
              rows={rows}
              placeholder={placeholder}
              value={value}
              disabled={isDisabled}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ ...sharedInputStyle, lineHeight:"1.5" }}
              placeholder={placeholder}
            />
          ) : (
            <input
              type={type === "password" && !pwVisible ? "password" : "text"}
              placeholder={isFilled ? "" : placeholder}
              value={value}
              disabled={isDisabled}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={sharedInputStyle}
            />
          )}
        </div>

        {/* Right slot */}
        {showRightIcon && (
          <span
            style={{ display:"flex", alignItems:"center", flexShrink:0, color: slotColor, cursor: type === "password" ? "pointer" : "default" }}
            onClick={() => type === "password" && setPwVisible(v => !v)}
          >
            {type === "select"     && <ChevronSVG />}
            {type === "datepicker" && <CalendarSVG />}
            {type === "password"   && <EyeSVG open={pwVisible} />}
          </span>
        )}
      </div>

      {/* ── Caption ── */}
      {caption && (
        <span style={{
          fontSize: 13, fontFamily: "var(--brand-font-body)",
          color: captionColor, lineHeight: "1.4", paddingLeft: 2,
        }}>
          {caption}
        </span>
      )}
    </div>
  );
}

// ── GDropzone ──────────────────────────────────────────────────────────────────
// size:  lg (600px wide, flex-col, 236px tall) | md (600px wide, flex-row, 96px tall)
// state: default | hover | progress | error | disabled
// Props: title, buttonLabel, description, uploadLabel, errorTitle, showAction, showDescription, onSelect
function GDropzone({
  size = "lg",
  state = "default",
  showAction = true,
  showDescription = true,
  title = "Arrastra y suelta archivos aquí para subirlos",
  buttonLabel = "Seleccionar archivo",
  description = "Tipos de archivos aceptados: png, jpg, gif, txt, csv, doc, xls, pdf. Tamaño máximo: 20 MB",
  uploadLabel = "Subiendo tu archivo…",
  errorTitle = "¡Tipo de archivo no compatible!",
  onSelect,
  style,
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const isLg       = size === "lg";
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isProgress = state === "progress";
  const isHover    = state === "hover" || dragOver;

  const borderColor = isError    ? "var(--color-danger, #d30519)"
    : isHover    ? "var(--brand-primary)"
    : isDisabled ? "color-mix(in srgb, var(--brand-border) 45%, transparent)"
    : "var(--brand-border)";
  const borderWidth  = (isError || isHover) ? "1.5px" : "1px";
  const bgColor      = isHover ? "var(--brand-primary-soft)" : "var(--brand-bg)";

  const wrapStyle = {
    width: "100%", maxWidth: 600,
    background: bgColor,
    border: `${borderWidth} dashed ${borderColor}`,
    borderRadius: "var(--radius-lg)",
    display: "flex",
    flexDirection: isLg ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: isLg ? "36px 32px" : "24px 32px",
    cursor: isDisabled ? "not-allowed" : "default",
    transition: "background .15s, border .15s",
    boxSizing: "border-box",
    ...style,
  };

  const SpinnerSVG = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
      style={{ animation: "spin 1s linear infinite", flexShrink: 0 }}>
      <circle cx="32" cy="32" r="26" stroke="var(--brand-border)" strokeWidth="4"/>
      <circle cx="32" cy="32" r="26"
        stroke="var(--brand-primary)" strokeWidth="4"
        strokeLinecap="round" strokeDasharray="55 108"
        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
      />
    </svg>
  );

  const ActionBtn = ({ label = buttonLabel, faded = false }) => (
    <button
      disabled={isDisabled}
      onClick={() => !isDisabled && inputRef.current?.click()}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "10px 16px",
        border: "1px solid var(--brand-border)", borderRadius: "var(--radius-md)",
        background: "transparent",
        fontSize: 14, fontWeight: 600,
        fontFamily: "var(--brand-font-body)",
        color: "var(--brand-text)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: faded ? 0.4 : 1,
        whiteSpace: "nowrap",
        minWidth: isLg ? 200 : "auto",
        transition: "background .12s",
      }}
      onMouseOver={e => { if (!isDisabled && !faded) e.currentTarget.style.background = "var(--brand-bg-elev)"; }}
      onMouseOut={e  => { e.currentTarget.style.background = "transparent"; }}
    >{label}</button>
  );

  const handleDragOver  = e => { if (!isDisabled) { e.preventDefault(); setDragOver(true); } };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop      = e => {
    if (isDisabled) return;
    e.preventDefault(); setDragOver(false);
    if (onSelect) onSelect(e.dataTransfer.files);
  };

  const textPrimary = isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)";
  const textMuted   = "var(--brand-text-muted)";

  return (
    <div style={wrapStyle} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <input ref={inputRef} type="file" multiple style={{ display:"none" }}
        onChange={e => onSelect && onSelect(e.target.files)} />

      {/* ── PROGRESS ── */}
      {isProgress && (
        <>
          <SpinnerSVG />
          <p style={{ margin:0, fontSize:16, fontWeight:400, fontFamily:"var(--brand-font-body)", color:"var(--brand-text)", textAlign:"center" }}>
            {uploadLabel}
          </p>
        </>
      )}

      {/* ── ERROR ── */}
      {isError && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, width:"100%" }}>
          <p style={{ margin:0, fontSize:18, fontWeight:600, fontFamily:"var(--brand-font-display)", color:"var(--color-danger,#d30519)", textAlign:"center" }}>
            {errorTitle}
          </p>
          {showAction && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:14, fontFamily:"var(--brand-font-body)", color:textPrimary }}>
                Inténtalo de nuevo
              </span>
              <ActionBtn />
            </div>
          )}
        </div>
      )}

      {/* ── DEFAULT / HOVER / DISABLED — LG ── */}
      {!isProgress && !isError && isLg && (
        <>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, width:"100%" }}>
            <p style={{ margin:0, fontSize:18, fontWeight:600, fontFamily:"var(--brand-font-display)", color:textPrimary, textAlign:"center" }}>
              {title}
            </p>
            {showAction && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:14, fontFamily:"var(--brand-font-body)", color:textMuted }}>o</span>
                <ActionBtn faded={isDisabled} />
              </div>
            )}
          </div>
          {showDescription && (
            <p style={{ margin:0, fontSize:12, fontFamily:"var(--brand-font-body)", color:textMuted, textAlign:"center", width:"100%", lineHeight:"1.5" }}>
              {description}
            </p>
          )}
        </>
      )}

      {/* ── DEFAULT / HOVER / DISABLED — MD ── */}
      {!isProgress && !isError && !isLg && (
        <>
          <p style={{ margin:0, flex:1, fontSize:18, fontWeight:600, fontFamily:"var(--brand-font-display)", color:textPrimary, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {title}
          </p>
          {showAction && (
            <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
              <span style={{ fontSize:14, fontFamily:"var(--brand-font-body)", color:textMuted }}>o</span>
              <ActionBtn faded={isDisabled} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── GModal ──────────────────────────────────────────────────────────────────
// Props:
//   open         boolean   — controls visibility
//   onClose      fn        — called on backdrop click or close button
//   title        string
//   description  string    — default body text (ignored if children supplied)
//   children     node      — custom body content
//   cancelLabel  string    — default "Cancelar"
//   confirmLabel string    — default "Confirmar"
//   onCancel     fn        — cancel button; falls back to onClose
//   onConfirm    fn
//   closable     boolean   — show X button (default true)
//   size         "sm"|"md"|"lg"  — 480 / 640 / 800 px (default "md")
function GModal({
  open = false,
  onClose,
  title = "Modal title",
  description = "Modal body content goes here.",
  children,
  cancelLabel = "Cancelar",
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm,
  closable = true,
  size = "md",
}) {
  const widthMap = { sm: 480, md: 640, lg: 800 };
  const w = widthMap[size] || 640;

  if (!open) return null;

  const handleCancel = onCancel || onClose;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      role="dialog" aria-modal="true" aria-label={title}
    >
      {/* Backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(10,11,14,0.5)",
        backdropFilter: "blur(2px)",
      }} onClick={onClose} />

      {/* Dialog */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: w,
        background: "var(--brand-bg)",
        border: "1px solid var(--brand-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,.12), 0 4px 6px -4px rgba(0,0,0,.1)",
        display: "flex", flexDirection: "column",
        fontFamily: "var(--brand-font-body)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          padding: "40px 48px 8px",
          gap: 16,
        }}>
          <h2 style={{
            margin: 0, flex: 1,
            fontSize: 24, fontWeight: 600, lineHeight: 1.3,
            fontFamily: "var(--brand-font-display)",
            color: "var(--brand-text)",
            letterSpacing: "-0.015em",
          }}>
            {title}
          </h2>
          {closable && (
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              style={{
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, padding: 0,
                background: "transparent",
                border: "1px solid var(--brand-border)",
                borderRadius: "50%",
                cursor: "pointer",
                color: "var(--brand-text-muted)",
                transition: "background .15s, color .15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--brand-bg-elev)";
                e.currentTarget.style.color = "var(--brand-text)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--brand-text-muted)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "24px 48px", flex: 1 }}>
          {children ? children : (
            <p style={{
              margin: 0,
              fontSize: 16, lineHeight: 1.6,
              color: "var(--brand-text)",
              fontFamily: "var(--brand-font-body)",
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          gap: 12,
          padding: "16px 48px 48px",
        }}>
          <button
            onClick={handleCancel}
            style={{
              height: 40, padding: "0 20px",
              fontSize: 14, fontWeight: 500,
              fontFamily: "var(--brand-font-body)",
              background: "transparent",
              color: "var(--brand-text)",
              border: "1px solid var(--brand-border)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              transition: "background .15s, border-color .15s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--brand-bg-elev)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{
              height: 40, padding: "0 20px",
              fontSize: 14, fontWeight: 500,
              fontFamily: "var(--brand-font-body)",
              background: "var(--brand-primary)",
              color: "var(--brand-on-primary)",
              border: "1px solid transparent",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              transition: "background .15s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--brand-primary-hover)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "var(--brand-primary)"; }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GModalPromo — slot-based promotional / wizard modal ─────────────────────
//
// Container:
//   <GModalPromo open onClose viewport="desktop"|"mobile">…</GModalPromo>
//
// Slot sub-components (also on window):
//   GPromoHeader  type: "title" | "media" | "media-card" | "empty"
//   GPromoText    type: "title-lg" | "title-md" | "subtitle+title" | "text"
//   GPromoDivider type: "line" | "spacing"
//   GPromoMedia   type: "avatars" | "articles"
//   GPromoForm    fields: [{label, type}]
//   GPromoFooter  type: "button" | "2-buttons" | "2-equal" | "button+text"

function GModalPromo({ open, onClose, viewport = "desktop", children }) {
  if (!open) return null;
  const isDesktop = viewport === "desktop";
  const w = isDesktop ? 640 : 360;
  return (
    <div
      style={{
        position:"fixed", inset:0, zIndex:9100,
        display:"flex",
        alignItems: isDesktop ? "center" : "flex-end",
        justifyContent:"center",
        padding: isDesktop ? 24 : 0,
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      role="dialog" aria-modal="true"
    >
      <div style={{
        position:"absolute", inset:0,
        background:"rgba(10,11,14,0.5)", backdropFilter:"blur(2px)",
      }} onClick={onClose} />
      <div style={{
        position:"relative", zIndex:1,
        width:w, maxWidth:"100%",
        background:"var(--brand-bg)",
        borderRadius: isDesktop
          ? "var(--radius-lg)"
          : "var(--radius-lg) var(--radius-lg) 0 0",
        boxShadow:"0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)",
        display:"flex", flexDirection:"column",
        overflow:"hidden",
        fontFamily:"var(--brand-font-body)",
        maxHeight: isDesktop ? "90vh" : "92vh",
        overflowY:"auto",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── GPromoHeader ──────────────────────────────────────────────────────────────
function GPromoHeader({
  type      = "title",   // "title" | "media" | "media-card" | "empty"
  title     = "Título",
  subtitle,
  onClose,
  onBack,
  viewport  = "desktop",
}) {
  const isDesktop = viewport === "desktop";
  const px = isDesktop ? 56 : 20;

  // Shared close button
  const CloseBtn = ({ white = false, pos = "relative" }) => (
    <button onClick={onClose} aria-label="Cerrar" style={{
      position: pos, width:40, height:40,
      display:"flex", alignItems:"center", justifyContent:"center",
      background: white ? "rgba(255,255,255,0.18)" : "transparent",
      border:"none", borderRadius:"50%",
      cursor:"pointer", flexShrink:0,
      color: white ? "#fff" : "var(--brand-text)",
      transition:"background .15s",
    }}
    onMouseOver={(e)=>{ e.currentTarget.style.background = white ? "rgba(255,255,255,0.3)" : "var(--brand-bg-elev)"; }}
    onMouseOut={(e)=>{ e.currentTarget.style.background = white ? "rgba(255,255,255,0.18)" : "transparent"; }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  );

  const BackBtn = ({ white = false }) => (
    <button onClick={onBack} aria-label="Atrás" style={{
      width:40, height:40,
      display:"flex", alignItems:"center", justifyContent:"center",
      background: white ? "rgba(255,255,255,0.18)" : "transparent",
      border:"none", borderRadius:"50%",
      cursor:"pointer", flexShrink:0,
      color: white ? "#fff" : "var(--brand-text)",
    }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );

  // ── media: gradient bg + avatar / subtitle overlay ──
  if (type === "media") {
    const h = isDesktop ? 180 : 140;
    return (
      <div style={{
        position:"relative", height:h, flexShrink:0, overflow:"hidden",
        background:"linear-gradient(160deg, var(--brand-primary) 0%, var(--brand-accent, var(--brand-primary)) 100%)",
      }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.25)" }} />
        {/* top bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:4, zIndex:1,
        }}>
          {onBack ? <BackBtn white /> : <div style={{width:40}} />}
          <CloseBtn white />
        </div>
        {/* centred content */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:8, padding:"48px 24px 16px",
          color:"#fff",
        }}>
          {/* avatar placeholder ring */}
          <div style={{
            width: isDesktop ? 64 : 48,
            height: isDesktop ? 64 : 48,
            borderRadius:"50%",
            background:"rgba(255,255,255,0.2)",
            border:"2px solid rgba(255,255,255,0.5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.7"/>
              <path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          {subtitle && (
            <p style={{
              margin:0, color:"#fff",
              fontSize: isDesktop ? 18 : 15,
              fontWeight:600,
              fontFamily:"var(--brand-font-display)",
              textAlign:"center", lineHeight:"1.3",
            }}>{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // ── media-card: light illustrative header (promo / contest) ──
  if (type === "media-card") {
    return (
      <div style={{
        position:"relative", height: isDesktop ? 120 : 100, flexShrink:0,
        background:"var(--brand-primary-soft)",
        overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {/* decorative confetti dots */}
        {[...Array(18)].map((_,i) => (
          <div key={i} style={{
            position:"absolute",
            width: 6 + (i%3)*3,
            height: 6 + (i%3)*3,
            borderRadius: i%2===0 ? "50%" : 2,
            background: i%3===0 ? "var(--brand-primary)" : i%3===1 ? "var(--brand-accent, var(--brand-primary))" : "var(--brand-primary-soft)",
            opacity: 0.35 + (i%4)*0.1,
            left: `${(i*53+11)%90}%`,
            top: `${(i*37+7)%80}%`,
          }} />
        ))}
        {/* centered gift/promo icon */}
        <div style={{ position:"relative", zIndex:1 }}>
          <svg width={isDesktop ? 64 : 52} height={isDesktop ? 64 : 52} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="28" width="48" height="30" rx="4" fill="var(--brand-primary)" fillOpacity="0.15" stroke="var(--brand-primary)" strokeWidth="1.5"/>
            <rect x="4" y="22" width="56" height="10" rx="4" fill="var(--brand-primary)" fillOpacity="0.2" stroke="var(--brand-primary)" strokeWidth="1.5"/>
            <path d="M32 22v36" stroke="var(--brand-primary)" strokeWidth="1.5"/>
            <path d="M32 22c0 0-8-12 0-16 8 4 0 16 0 16z" fill="var(--brand-primary)" fillOpacity="0.4"/>
            <path d="M32 22c0 0 8-12 0-16-8 4 0 16 0 16z" fill="var(--brand-primary)" fillOpacity="0.6"/>
          </svg>
        </div>
        {/* close btn */}
        <div style={{ position:"absolute", top:0, right:0, padding:4, zIndex:2 }}>
          <CloseBtn />
        </div>
      </div>
    );
  }

  // ── empty: just a floating close btn ──
  if (type === "empty") {
    return (
      <div style={{ position:"relative", height:16, flexShrink:0 }}>
        <div style={{ position:"absolute", top:-8, right:0, zIndex:1 }}>
          <CloseBtn />
        </div>
        {onBack && (
          <div style={{ position:"absolute", top:-8, left:0, zIndex:1 }}>
            <BackBtn />
          </div>
        )}
      </div>
    );
  }

  // ── title (default): plain title + close btn ──
  return (
    <div style={{ display:"flex", flexDirection:"column", flexShrink:0, paddingBottom:40 }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"flex-end",
        padding:4,
      }}>
        {onBack && <BackBtn />}
        {!onBack && <div style={{flex:1}} />}
        <CloseBtn />
      </div>
      <div style={{ padding:`0 ${px}px` }}>
        <h2 style={{
          margin:0, fontSize:24, fontWeight:600, lineHeight:"32px",
          fontFamily:"var(--brand-font-display)",
          color:"var(--brand-text)",
          textAlign: isDesktop ? "left" : "center",
        }}>{title}</h2>
      </div>
    </div>
  );
}

// ── GPromoText ────────────────────────────────────────────────────────────────
function GPromoText({
  type      = "text",   // "title-lg" | "title-md" | "subtitle+title" | "text"
  title,
  subtitle,
  content,
  viewport  = "desktop",
}) {
  const isDesktop = viewport === "desktop";
  const px = isDesktop ? 48 : 20;

  if (type === "title-lg") return (
    <div style={{ padding:`${isDesktop ? 16 : 8}px ${px}px` }}>
      <h2 style={{
        margin:0, textAlign:"center",
        fontSize: isDesktop ? 24 : 20,
        lineHeight: isDesktop ? "32px" : "28px",
        fontWeight:600, fontFamily:"var(--brand-font-display)",
        color:"var(--brand-text)",
      }}>{title}</h2>
    </div>
  );

  if (type === "title-md") return (
    <div style={{ padding:`12px ${px}px` }}>
      <h3 style={{
        margin:0, textAlign:"center",
        fontSize:20, lineHeight:"28px",
        fontWeight:600, fontFamily:"var(--brand-font-display)",
        color:"var(--brand-text)",
      }}>{title}</h3>
    </div>
  );

  if (type === "subtitle+title") return (
    <div style={{ padding:`${isDesktop ? 20 : 8}px ${px}px`, display:"flex", flexDirection:"column", gap:12 }}>
      {subtitle && <p style={{
        margin:0, textAlign:"center",
        fontSize: isDesktop ? 18 : 15, lineHeight:isDesktop ? "24px" : "20px",
        fontFamily:"var(--brand-font-body)", color:"var(--brand-text-muted)",
      }}>{subtitle}</p>}
      {title && <h2 style={{
        margin:0, textAlign:"center",
        fontSize: isDesktop ? 24 : 20, lineHeight: isDesktop ? "32px" : "28px",
        fontWeight:600, fontFamily:"var(--brand-font-display)",
        color:"var(--brand-text)",
      }}>{title}</h2>}
    </div>
  );

  // type="text" (default)
  return (
    <div style={{ padding:`8px ${px}px` }}>
      <p style={{
        margin:0, textAlign:"center",
        fontSize:16, lineHeight:"24px",
        fontFamily:"var(--brand-font-body)", color:"var(--brand-text)",
      }}>{content}</p>
    </div>
  );
}

// ── GPromoDivider ─────────────────────────────────────────────────────────────
function GPromoDivider({ type = "spacing", spacing = 12, viewport = "desktop" }) {
  const px = viewport === "desktop" ? 48 : 16;
  if (type === "line") return (
    <div style={{ padding:`${spacing}px ${px}px` }}>
      <div style={{ height:1, background:"var(--brand-border)" }} />
    </div>
  );
  return <div style={{ height:spacing, flexShrink:0 }} />;
}

// ── GPromoMedia ───────────────────────────────────────────────────────────────
function GPromoMedia({ type = "avatars", items = [], viewport = "desktop" }) {
  const isDesktop = viewport === "desktop";
  const px = isDesktop ? 48 : 20;

  if (type === "avatars") {
    const size = isDesktop ? 112 : 72;
    const defaultItems = [{}, {}, {}];
    const list = items.length ? items : defaultItems;
    return (
      <div style={{
        padding:`24px ${px}px`,
        display:"flex", gap:16, alignItems:"center", justifyContent:"center",
      }}>
        {list.map((item, i) => (
          <div key={i} style={{
            width:size, height:size, borderRadius:"50%",
            background:[
              "var(--brand-primary)",
              "var(--brand-accent, var(--brand-primary))",
              "var(--brand-primary-soft)",
            ][i % 3],
            border:"3px solid var(--brand-bg)",
            boxShadow:"0 2px 5px rgba(0,0,0,0.07)",
            overflow:"hidden", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"var(--brand-on-primary)",
          }}>
            {item.image
              ? <img src={item.image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              : <svg width={size*0.4} height={size*0.4} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.7"/>
                  <path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            }
          </div>
        ))}
      </div>
    );
  }

  if (type === "articles") {
    const defaultItems = [
      { category:"Categoría", title:"Título", desc:"Escribe una breve descripción de la experiencia que quieres que lea el usuario." },
      { category:"Categoría", title:"Título", desc:"Escribe una breve descripción de la experiencia que quieres que lea el usuario." },
    ];
    const list = items.length ? items : defaultItems;
    return (
      <div style={{
        padding:`24px ${px}px`,
        display:"flex", gap: isDesktop ? 24 : 12, alignItems:"flex-start",
      }}>
        {list.map((item, i) => (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", gap:12, minWidth:0 }}>
            {/* thumbnail */}
            <div style={{
              aspectRatio:"16/10", borderRadius:"var(--radius-md)",
              background:"var(--brand-primary-soft)",
              overflow:"hidden", position:"relative",
            }}>
              {item.image
                ? <img src={item.image} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <div style={{
                    position:"absolute", inset:0,
                    background:`linear-gradient(135deg, var(--brand-primary-soft) 0%, var(--brand-border) 100%)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="14" rx="2" stroke="var(--brand-text-muted)" strokeWidth="1.5"/>
                      <path d="M3 13l4-3 4 3 4-5 4 4" stroke="var(--brand-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
              }
            </div>
            {/* text */}
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <span style={{ fontSize:12, lineHeight:"16px", color:"var(--brand-text-muted)", fontFamily:"var(--brand-font-body)" }}>{item.category}</span>
              <span style={{ fontSize:16, fontWeight:600, lineHeight:"20px", color:"var(--brand-text)", fontFamily:"var(--brand-font-display)" }}>{item.title}</span>
              <span style={{
                fontSize:14, lineHeight:"20px", color:"var(--brand-text-muted)",
                fontFamily:"var(--brand-font-body)",
                display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical", overflow:"hidden",
              }}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// ── GPromoForm ────────────────────────────────────────────────────────────────
function GPromoForm({ fields = [], viewport = "desktop" }) {
  const isDesktop = viewport === "desktop";
  const px = isDesktop ? 48 : 20;
  if (!fields.length) return null;
  return (
    <div style={{ padding:`0 ${px}px` }}>
      {fields.map((f, i) => (
        <div key={i} style={{ padding:"8px 0" }}>
          <GFormField
            label={f.label || "Label"}
            size={isDesktop ? "lg" : "md"}
            type={f.type || "input"}
            state="default"
            placeholder={f.placeholder}
          />
        </div>
      ))}
    </div>
  );
}

// ── GPromoFooter ──────────────────────────────────────────────────────────────
function GPromoFooter({
  type         = "button",  // "button" | "2-buttons" | "2-equal" | "button+text"
  primaryLabel = "Continuar",
  secondaryLabel = "Cancelar",
  onPrimary,
  onSecondary,
  onBack,
  showArrow    = true,
  viewport     = "desktop",
}) {
  const isDesktop = viewport === "desktop";
  const px = isDesktop ? 48 : 20;
  const pb = isDesktop ? 48 : 24;
  const h  = isDesktop ? 52 : 48;
  const r  = "var(--radius-md)";
  const font = { fontFamily:"var(--brand-font-body)", fontSize:16, fontWeight:600 };

  const PrimaryBtn = ({ flex, fullW }) => (
    <button onClick={onPrimary} style={{
      height:h, flex: flex ? 1 : undefined,
      width: fullW ? "100%" : ((!flex && isDesktop) ? 240 : undefined),
      padding:"0 16px",
      background:"var(--brand-primary)", color:"var(--brand-on-primary)",
      border:"none", borderRadius:r, cursor:"pointer",
      display:"flex", alignItems:"center", justifyContent:"center", gap:8,
      transition:"background .15s",
      ...font,
    }}
    onMouseOver={(e)=>{ e.currentTarget.style.background="var(--brand-primary-hover)"; }}
    onMouseOut={(e)=>{ e.currentTarget.style.background="var(--brand-primary)"; }}
    >
      {primaryLabel}
      {showArrow && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );

  const SecondaryBtn = ({ flex }) => (
    <button onClick={onSecondary} style={{
      height:h, flex: flex ? 1 : undefined,
      padding:"0 16px",
      background:"var(--brand-bg-elev)", color:"var(--brand-text)",
      border:"1px solid var(--brand-border)", borderRadius:r, cursor:"pointer",
      ...font,
    }}>
      {secondaryLabel}
    </button>
  );

  const BackBtn = () => (
    <button onClick={onBack || onSecondary} aria-label="Atrás" style={{
      width:h, height:h, flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"var(--brand-bg-elev)", color:"var(--brand-text)",
      border:"1px solid var(--brand-border)", borderRadius:r, cursor:"pointer",
    }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );

  if (type === "button") return (
    <div style={{ padding:`12px ${px}px ${pb}px`, display:"flex", justifyContent:"center" }}>
      <PrimaryBtn />
    </div>
  );

  if (type === "2-buttons") return (
    <div style={{ padding:`8px ${px}px ${pb}px`, display:"flex", gap:8, alignItems:"center" }}>
      <BackBtn />
      <PrimaryBtn flex />
    </div>
  );

  if (type === "2-equal") return (
    <div style={{ padding:`12px ${px}px ${pb}px`, display:"flex", gap:8 }}>
      <SecondaryBtn flex />
      <PrimaryBtn flex />
    </div>
  );

  if (type === "button+text") return (
    <div style={{ padding:`12px ${px}px ${pb}px`, display:"flex", flexDirection:"column", gap:12, alignItems:"center" }}>
      <PrimaryBtn fullW />
      <button onClick={onSecondary} style={{
        background:"none", border:"none", cursor:"pointer",
        fontSize:14, color:"var(--brand-text-muted)",
        fontFamily:"var(--brand-font-body)",
        textDecoration:"underline",
      }}>{secondaryLabel}</button>
    </div>
  );

  return null;
}

// ─── GNotification ────────────────────────────────────────────────────────────
// Props:
//   type          "primary"|"info"|"success"|"error"
//   title         string
//   description   string
//   showIcon      boolean   (default true)
//   closable      boolean   (default true)
//   action        boolean   show action button group (default false)
//   primaryLabel  string
//   secondaryLabel string
//   onClose / onPrimary / onSecondary  callbacks
function GNotification({
  type           = "primary",
  title          = "Título de notificación",
  description    = "Una nueva versión de la aplicación está disponible. ¡Actualice ahora para obtener las últimas funciones y mejoras!",
  showIcon       = true,
  closable       = true,
  action         = false,
  primaryLabel   = "Button",
  secondaryLabel = "Button",
  onClose,
  onPrimary,
  onSecondary,
}) {
  const TYPE = {
    primary: {
      bg:        "var(--brand-bg)",
      border:    "1px solid var(--brand-border)",
      iconColor: "var(--brand-primary)",
      icon:      "info",
    },
    info: {
      bg:        "#fff9e6",
      border:    "none",
      iconColor: "var(--color-warning, #C47A00)",
      icon:      "info",
    },
    success: {
      bg:        "#e9f9e6",
      border:    "none",
      iconColor: "var(--color-success, #0E8A3E)",
      icon:      "check",
    },
    error: {
      bg:        "#fde6e8",
      border:    "none",
      iconColor: "var(--color-danger, #D6213D)",
      icon:      "warning",
    },
  };
  const cfg = TYPE[type] || TYPE.primary;
  const c = cfg.iconColor;

  const IconInfo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.25" stroke={c} strokeWidth="1.5"/>
      <path d="M12 8v.4M12 11v5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  const IconCheck = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.25" stroke={c} strokeWidth="1.5"/>
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const IconWarning = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 4L2.5 20.5h19L12 4z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 10.5v4M12 17v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  const ICON = { info: <IconInfo/>, check: <IconCheck/>, warning: <IconWarning/> };

  return (
    <div style={{
      display:"flex", alignItems:"flex-start",
      padding:16, gap:0,
      borderRadius:12,
      background: cfg.bg,
      border: cfg.border,
      width:344, maxWidth:"100%",
      boxSizing:"border-box",
      fontFamily:"var(--brand-font-body)",
    }}>
      {/* ── Slot Left — icon ── */}
      {showIcon && (
        <div style={{ display:"flex", alignItems:"center", paddingRight:8, paddingTop:2, flexShrink:0 }}>
          {ICON[cfg.icon]}
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:16, paddingTop:2 }}>
        {/* title + description */}
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          {title && (
            <p style={{
              margin:0, fontSize:16, fontWeight:600, lineHeight:"20px",
              fontFamily:"var(--brand-font-display)", color:"var(--brand-text)",
            }}>{title}</p>
          )}
          {description && (
            <p style={{
              margin:0, fontSize:14, lineHeight:"20px",
              color:"var(--brand-text)",
            }}>{description}</p>
          )}
        </div>
        {/* action buttons */}
        {action && (
          <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
            <button onClick={onPrimary} style={{
              padding:"5px 12px",
              background:"var(--brand-primary)", color:"var(--brand-on-primary)",
              border:"none", borderRadius:8,
              fontSize:14, fontWeight:600,
              fontFamily:"var(--brand-font-body)", cursor:"pointer",
              transition:"background .15s",
            }}
            onMouseOver={(e)=>{ e.currentTarget.style.background="var(--brand-primary-hover)"; }}
            onMouseOut={(e)=>{ e.currentTarget.style.background="var(--brand-primary)"; }}
            >{primaryLabel}</button>
            <button onClick={onSecondary} style={{
              padding:"5px 12px",
              background:"transparent",
              border:"1px solid var(--brand-border)", borderRadius:8,
              fontSize:14, fontWeight:600,
              fontFamily:"var(--brand-font-body)", cursor:"pointer",
              color:"var(--brand-text)",
            }}>{secondaryLabel}</button>
          </div>
        )}
      </div>

      {/* ── Close button ── */}
      {closable && (
        <button onClick={onClose} aria-label="Cerrar notificación" style={{
          marginLeft:4, flexShrink:0,
          width:24, height:24, padding:4,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:"transparent", border:"none",
          borderRadius:"50%", cursor:"pointer",
          color:"var(--brand-text-muted)",
          transition:"background .15s",
        }}
        onMouseOver={(e)=>{ e.currentTarget.style.background="rgba(0,0,0,0.06)"; }}
        onMouseOut={(e)=>{ e.currentTarget.style.background="transparent"; }}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── GPagination ──────────────────────────────────────────────────────────────
// Fully-controlled pagination component.
//
// Props:
//   type         "primary"   ← Atrás | numbers | Siguiente →
//              | "secondary" « ‹ | numbers | › »
//   currentPage  number (controlled, 1-based)
//   totalPages   number
//   onChange     (page: number) => void
//
// Truncation (auto):
//   ≤7 pages    → no truncation
//   near start  → 1 2 3 4 5 … last
//   near end    → 1 … last-4 … last
//   middle      → 1 … prev cur next … last
(function() {
  // ── Icon primitives ──────────────────────────────────────────────────────────
  function IcoChevLeft()  { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.5 7l-5.5 5 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
  function IcoChevRight() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.5 7l5.5 5-5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
  function IcoDblLeft()   { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 7l-5 5 5 5M17 7l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
  function IcoDblRight()  { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 7l5 5-5 5M7 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

  // ── Truncation algorithm ─────────────────────────────────────────────────────
  function getRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const left  = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);
    const dotL  = left  > 2;
    const dotR  = right < total - 1;
    if (!dotL && dotR)  return [1, 2, 3, 4, 5, "…", total];
    if (dotL  && !dotR) return [1, "…", total-4, total-3, total-2, total-1, total];
    if (dotL  && dotR)  return [1, "…", current-1, current, current+1, "…", total];
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // ── GPagination ──────────────────────────────────────────────────────────────
  window.GPagination = function GPagination({
    type        = "primary",
    currentPage = 1,
    totalPages  = 10,
    onChange,
  }) {
    const [hov, setHov] = useState(null);
    const pages = getRange(currentPage, totalPages);
    const goTo  = (p) => { if (p >= 1 && p <= totalPages && p !== currentPage) onChange?.(p); };
    const r     = "var(--radius-md)";
    const font  = { fontFamily:"var(--brand-font-body)", fontSize:16, lineHeight:"20px" };
    const base  = { border:"none", cursor:"pointer", outline:"none", transition:"background .12s, color .12s, opacity .12s" };

    // Page number / ellipsis item
    const PageItem = ({ page, idx }) => {
      const isActive = page === currentPage;
      const isDots   = page === "…";
      const isHov    = hov === idx && !isDots && !isActive;
      return (
        <button
          key={idx}
          onClick={() => !isDots && goTo(page)}
          disabled={isDots}
          onMouseEnter={() => !isDots && !isActive && setHov(idx)}
          onMouseLeave={() => setHov(null)}
          aria-current={isActive ? "page" : undefined}
          style={{
            ...base, ...font,
            width:32, height:32,
            padding:"6px 4px",
            borderRadius: r,
            background: isActive ? "var(--brand-primary-soft)"
                       : isHov   ? "var(--brand-bg-elev)"
                                 : "transparent",
            color: isActive ? "var(--brand-primary)" : "var(--brand-text)",
            cursor: isDots ? "default" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}
        >{page}</button>
      );
    };

    // Square icon-only nav button
    const IconBtn = ({ ico, onClick: handleClick, disabled, id }) => (
      <button
        onClick={handleClick}
        disabled={disabled}
        onMouseEnter={() => !disabled && setHov(id)}
        onMouseLeave={() => setHov(null)}
        style={{
          ...base, width:32, height:32, padding:4, borderRadius:r, flexShrink:0,
          background: hov === id && !disabled ? "var(--brand-bg-elev)" : "transparent",
          color: "var(--brand-text)",
          opacity: disabled ? 0.38 : 1,
          cursor: disabled ? "default" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}
      >{ico}</button>
    );

    // Text nav button (Atrás / Siguiente)
    const TextBtn = ({ dir }) => {
      const isPrev    = dir === "prev";
      const disabled  = isPrev ? currentPage === 1 : currentPage === totalPages;
      const id        = "txt-" + dir;
      return (
        <button
          onClick={() => goTo(isPrev ? currentPage - 1 : currentPage + 1)}
          disabled={disabled}
          onMouseEnter={() => !disabled && setHov(id)}
          onMouseLeave={() => setHov(null)}
          style={{
            ...base, ...font,
            height:32,
            padding: isPrev ? "4px 8px 4px 2px" : "4px 2px 4px 8px",
            borderRadius: r, flexShrink:0,
            background: hov === id && !disabled ? "var(--brand-bg-elev)" : "transparent",
            color: "var(--brand-text)",
            opacity: disabled ? 0.38 : 1,
            cursor: disabled ? "default" : "pointer",
            display:"flex", alignItems:"center", gap:0,
          }}
        >
          {isPrev && <IcoChevLeft />}
          <span>{isPrev ? "Atrás" : "Siguiente"}</span>
          {!isPrev && <IcoChevRight />}
        </button>
      );
    };

    return (
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {/* ── Primary: text nav ── */}
        {type === "primary" && <TextBtn dir="prev" />}

        {/* ── Secondary: icon nav left ── */}
        {type === "secondary" && (
          <div style={{ display:"flex", gap:8 }}>
            <IconBtn ico={<IcoDblLeft />}  onClick={() => goTo(1)}               disabled={currentPage === 1}         id="dbl-l" />
            <IconBtn ico={<IcoChevLeft />} onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}         id="chv-l" />
          </div>
        )}

        {/* ── Page list ── */}
        <div style={{ display:"flex" }}>
          {pages.map((page, idx) => <PageItem key={idx} page={page} idx={idx} />)}
        </div>

        {/* ── Primary: text nav right ── */}
        {type === "primary" && <TextBtn dir="next" />}

        {/* ── Secondary: icon nav right ── */}
        {type === "secondary" && (
          <div style={{ display:"flex" }}>
            <IconBtn ico={<IcoChevRight />} onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} id="chv-r" />
            <IconBtn ico={<IcoDblRight />}  onClick={() => goTo(totalPages)}       disabled={currentPage === totalPages} id="dbl-r" />
          </div>
        )}
      </div>
    );
  };
})();

// ─── GParagraph ───────────────────────────────────────────────────────────────
// Typography scale component.
// Props:
//   size      : "5xl"|"4xl"|"3xl"|"2xl"|"xl"|"lg"|"md"|"md-upper"|"sm"|"sm-upper"|"icon-md"|"icon-sm"|"highlight"
//   viewport  : "desktop"|"mobile"  (applies to 5xl→xl; ignored for universal sizes)
//   children  : text content (all sizes except highlight)
//   title     : string  (highlight only — bold first line)
//   body      : string  (highlight only — muted second line)
//   href      : string  (highlight only — appended as link inside body)
//   color     : "primary"|"muted"  default "primary"
function GParagraph({ size = "md", viewport = "desktop", children, title, body, href, color = "primary", tag }) {

  const textColor = color === "muted" ? "var(--brand-text-muted)" : "var(--brand-text)";

  // ── Heading scale (5xl → xl) ─────────────────────────────────────────────
  const HEADING = {
    "5xl-desktop": { fontSize: 56, lineHeight: 64, fontWeight: 600 },
    "5xl-mobile":  { fontSize: 40, lineHeight: 48, fontWeight: 700 },
    "4xl-desktop": { fontSize: 48, lineHeight: 56, fontWeight: 600 },
    "4xl-mobile":  { fontSize: 32, lineHeight: 40, fontWeight: 600 },
    "3xl-desktop": { fontSize: 40, lineHeight: 48, fontWeight: 600 },
    "3xl-mobile":  { fontSize: 24, lineHeight: 32, fontWeight: 600 },
    "2xl-desktop": { fontSize: 24, lineHeight: 32, fontWeight: 600 },
    "2xl-mobile":  { fontSize: 20, lineHeight: 28, fontWeight: 600 },
    "xl-desktop":  { fontSize: 20, lineHeight: 28, fontWeight: 600 },
    "xl-mobile":   { fontSize: 18, lineHeight: 24, fontWeight: 600 },
  };

  // ── Highlight variant ────────────────────────────────────────────────────
  if (size === "highlight") {
    const m = viewport === "mobile";
    return (
      <div style={{ borderLeft: "2px solid var(--brand-primary)", paddingLeft: m ? 16 : 24 }}>
        <div style={{
          fontSize: m ? 18 : 20, lineHeight: `${m ? 24 : 28}px`,
          fontWeight: 600, fontFamily: "var(--brand-font-display)",
          color: "var(--brand-text)", marginBottom: 4,
        }}>
          {title || children}
        </div>
        {body && (
          <div style={{
            fontSize: m ? 14 : 16, lineHeight: "20px",
            fontWeight: 400, fontFamily: "var(--brand-font-body)",
            color: "var(--brand-text-muted)",
          }}>
            {href
              ? <React.Fragment>{body}{" "}<a href={href} style={{ color: "var(--brand-primary)", textDecoration: "none" }}>{href}</a></React.Fragment>
              : body}
          </div>
        )}
      </div>
    );
  }

  // ── Heading sizes (5xl → xl) ─────────────────────────────────────────────
  const needsViewport = ["5xl","4xl","3xl","2xl","xl"].includes(size);
  if (needsViewport) {
    const key = `${size}-${viewport}`;
    const s = HEADING[key] || HEADING["xl-desktop"];
    const El = tag || "p";
    return (
      <El style={{
        fontSize: s.fontSize, lineHeight: `${s.lineHeight}px`,
        fontWeight: s.fontWeight, fontFamily: "var(--brand-font-display)",
        color: textColor, margin: 0,
      }}>
        {children}
      </El>
    );
  }

  // ── Body / utility sizes ─────────────────────────────────────────────────
  const BODY = {
    "lg":       { fontSize: 18, lineHeight: 24, fontWeight: 400 },
    "md":       { fontSize: 16, lineHeight: 20, fontWeight: 400 },
    "md-upper": { fontSize: 16, lineHeight: 20, fontWeight: 400, textTransform: "uppercase" },
    "sm":       { fontSize: 14, lineHeight: 20, fontWeight: 400 },
    "sm-upper": { fontSize: 14, lineHeight: 20, fontWeight: 400, textTransform: "uppercase" },
    "icon-md":  { fontSize: 16, lineHeight: 20, fontWeight: 400, iconSize: 16 },
    "icon-sm":  { fontSize: 14, lineHeight: 20, fontWeight: 400, iconSize: 16 },
  };

  const s = BODY[size] || BODY["md"];
  const El = tag || "p";

  if (s.iconSize) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: s.fontSize, lineHeight: `${s.lineHeight}px`,
        fontWeight: s.fontWeight, fontFamily: "var(--brand-font-body)",
        color: textColor,
      }}>
        <svg width={s.iconSize} height={s.iconSize} viewBox="0 0 16 16" fill="none" style={{ flex:"none", color:"var(--brand-primary)" }}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>{children}</span>
      </span>
    );
  }

  return (
    <El style={{
      fontSize: s.fontSize, lineHeight: `${s.lineHeight}px`,
      fontWeight: s.fontWeight, fontFamily: "var(--brand-font-body)",
      color: textColor, margin: 0,
      textTransform: s.textTransform || "none",
    }}>
      {children}
    </El>
  );
}

// ─── GProgressBar ────────────────────────────────────────────────────────────
// Horizontal track + fill bar.
// Props: value 0–100 · size "lg"(12px)|"md"(8px)|"sm"(4px) · style
function GProgressBar({ value = 0, size = "md", style }) {
  const h   = { lg: 12, md: 8, sm: 4 }[size] || 8;
  const pct = Math.min(100, Math.max(0, Number(value)));
  return (
    <div style={{
      height: h, borderRadius: 9999,
      background: "var(--brand-border)",
      position: "relative", overflow: "hidden",
      flexShrink: 0,
      ...style,
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: `${pct}%`,
        background: "var(--brand-primary)",
        borderRadius: 9999,
        transition: "width .35s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

// ─── GProgressCircle ──────────────────────────────────────────────────────────
// SVG radial progress ring.
// Props: value 0–100 · size "lg"(96)|"md"(64)|"sm"(24) · showValue bool · style
function GProgressCircle({ value = 0, size = "md", showValue = false, style }) {
  const CFG = {
    lg: { outer: 96, sw: 8,   r: 44,    fs: 20, lh: 28 },
    md: { outer: 64, sw: 6,   r: 29,    fs: 18, lh: 24 },
    sm: { outer: 24, sw: 2.5, r: 10.75, fs: 0,  lh: 0  },
  };
  const cfg  = CFG[size] || CFG.md;
  const pct  = Math.min(100, Math.max(0, Number(value)));
  const circ = 2 * Math.PI * cfg.r;
  const offset = circ * (1 - pct / 100);

  return (
    <div style={{
      position: "relative",
      width: cfg.outer, height: cfg.outer,
      flexShrink: 0,
      ...style,
    }}>
      <svg
        width={cfg.outer} height={cfg.outer}
        viewBox={`0 0 ${cfg.outer} ${cfg.outer}`}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        {/* Track */}
        <circle
          cx={cfg.outer / 2} cy={cfg.outer / 2} r={cfg.r}
          fill="none"
          stroke="var(--brand-border)"
          strokeWidth={cfg.sw}
        />
        {/* Fill arc */}
        {pct > 0 && (
          <circle
            cx={cfg.outer / 2} cy={cfg.outer / 2} r={cfg.r}
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth={cfg.sw}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset .35s cubic-bezier(.4,0,.2,1)" }}
          />
        )}
      </svg>
      {/* Centered percentage text (lg + md only) */}
      {showValue && cfg.fs > 0 && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: "var(--brand-font-display)",
            fontSize: cfg.fs, lineHeight: `${cfg.lh}px`, fontWeight: 700,
            color: "var(--brand-text)",
          }}>{pct}%</span>
        </div>
      )}
    </div>
  );
}

// ─── GProgressSection ─────────────────────────────────────────────────────────
// Composite: circle OR bar + label / percentage row.
// Props:
//   type     : "circle" | "bar"
//   size     : "lg" | "md" | "sm"
//   value    : 0–100
//   label    : string  (circle label below ring)
//   labelBar : string  (bar label beside percentage)
//   style    : inline overrides
function GProgressSection({
  type = "circle",
  size = "lg",
  value = 20,
  label    = "Label",
  labelBar = "Long name for data",
  style,
}) {
  const pct  = Math.min(100, Math.max(0, Number(value)));
  const TS   = { lg: { fs: 20, lh: 28 }, md: { fs: 18, lh: 24 }, sm: { fs: 16, lh: 20 } };
  const ts   = TS[size] || TS.md;
  const gap  = size === "sm" ? 8 : 12;
  const pyMap = { lg: 12, md: 8, sm: 8 };

  const labelStyle = {
    fontFamily: "var(--brand-font-body)",
    fontSize: ts.fs, lineHeight: `${ts.lh}px`, fontWeight: 400,
    color: "var(--brand-text-muted)",
  };
  const valueStyle = {
    fontFamily: "var(--brand-font-display)",
    fontSize: ts.fs, lineHeight: `${ts.lh}px`, fontWeight: 700,
    color: "var(--brand-text)",
  };

  if (type === "bar") {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap,
        padding: `${pyMap[size] || 8}px 0`,
        width: "100%",
        ...style,
      }}>
        <GProgressBar value={pct} size={size} style={{ width: "100%" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", overflow: "hidden" }}>
          <span style={{ ...labelStyle, flex: 1, minWidth: 0 }}>{labelBar}</span>
          <span style={{ ...valueStyle, flexShrink: 0, width: 68, textAlign: "right" }}>{pct}%</span>
        </div>
      </div>
    );
  }

  // type === "circle"
  const circDim   = { lg: 96, md: 64, sm: 24 }[size] || 64;
  const containerW = size === "sm" ? 64 : circDim;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap, ...style }}>
      <div style={{ position: "relative", width: containerW, height: circDim, flexShrink: 0 }}>
        <GProgressCircle
          value={pct}
          size={size}
          showValue={size !== "sm"}
          style={size === "sm"
            ? { position: "absolute", left: 20, top: 0 }
            : { position: "absolute", inset: 0 }
          }
        />
      </div>
      <span style={{ ...labelStyle, textAlign: "center" }}>{label}</span>
    </div>
  );
}

// ─── GPopover ─────────────────────────────────────────────────────────────────
// Floating tooltip/popover bubble with 12 placement variants.
// Props:
//   placement   : "top"|"top-start"|"top-end"|"bottom"|"bottom-start"|"bottom-end"
//                 "left"|"left-start"|"left-end"|"right"|"right-start"|"right-end"
//   title       : string
//   description : string
//   closable    : boolean (default true)  — shows × button
//   showTip     : boolean (default true)  — shows the directional arrow
//   onClose     : () => void
//   children    : React node (custom content)
//   style       : inline style overrides
function GPopoverArrow({ placement }) {
  const S = 9, half = S / 2;
  const VW = 12, VH = 7;   // vertical arrow (up / down)
  const HW = 7,  HH = 12;  // horizontal arrow (left / right)

  // [containerW, containerH, squareCX, squareCY, positionStyle]
  const MAP = {
    "top":          [VW, VH, VW/2, 0,   { bottom:-7, left:"50%",  transform:"translateX(-50%)" }],
    "top-start":    [VW, VH, VW/2, 0,   { bottom:-7, left:19 }],
    "top-end":      [VW, VH, VW/2, 0,   { bottom:-7, right:19 }],
    "bottom":       [VW, VH, VW/2, VH,  { top:-7,    left:"50%",  transform:"translateX(-50%)" }],
    "bottom-start": [VW, VH, VW/2, VH,  { top:-7,    left:19 }],
    "bottom-end":   [VW, VH, VW/2, VH,  { top:-7,    right:19 }],
    "left":         [HW, HH, HW,  HH/2, { right:-7,  top:"50%",   transform:"translateY(-50%)" }],
    "left-start":   [HW, HH, HW,  HH/2, { right:-7,  top:7 }],
    "left-end":     [HW, HH, HW,  HH/2, { right:-7,  bottom:7 }],
    "right":        [HW, HH, 0,   HH/2, { left:-7,   top:"50%",   transform:"translateY(-50%)" }],
    "right-start":  [HW, HH, 0,   HH/2, { left:-7,   top:7 }],
    "right-end":    [HW, HH, 0,   HH/2, { left:-7,   bottom:7 }],
  };

  const cfg = MAP[placement];
  if (!cfg) return null;
  const [cw, ch, cx, cy, posStyle] = cfg;

  return (
    <div style={{
      position: "absolute",
      width: cw, height: ch,
      overflow: "hidden",
      pointerEvents: "none",
      ...posStyle,
    }}>
      <div style={{
        position: "absolute",
        width: S, height: S,
        background: "var(--brand-bg, #fff)",
        border: "1px solid var(--brand-border)",
        transform: "rotate(45deg)",
        left: cx - half,
        top: cy - half,
      }} />
    </div>
  );
}

function GPopover({
  placement = "top",
  title,
  description,
  closable = true,
  showTip = true,
  onClose,
  children,
  style,
}) {
  return (
    <div style={{
      position: "relative",
      width: 240,
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      padding: 12,
      background: "var(--brand-bg, #fff)",
      border: "1px solid var(--brand-border)",
      borderRadius: "var(--radius-md)",
      boxSizing: "border-box",
      ...style,
    }}>
      {/* ── Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        {title && (
          <p style={{
            margin: 0,
            fontFamily: "var(--brand-font-display)",
            fontSize: 16, lineHeight: "20px", fontWeight: 600,
            color: "var(--brand-text)",
          }}>{title}</p>
        )}
        {description && (
          <p style={{
            margin: 0,
            fontFamily: "var(--brand-font-body)",
            fontSize: 14, lineHeight: "20px", fontWeight: 400,
            color: "var(--brand-text)",
          }}>{description}</p>
        )}
        {children}
      </div>

      {/* ── Close button ── */}
      {closable && (
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            flex: "none", width: 16, height: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            padding: 0, color: "var(--brand-text-muted)",
            marginTop: 2,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* ── Arrow ── */}
      {showTip && <GPopoverArrow placement={placement} />}
    </div>
  );
}

// ─── GSwitch ─────────────────────────────────────────────────────────────────
// Dimensions per size
const SWITCH_DIMS = {
  sm: { w: 26, h: 16, thumb: 12 },
  md: { w: 34, h: 20, thumb: 16 },
  lg: { w: 50, h: 28, thumb: 24 },
};

// Bare toggle control
function GSwitchControl({ size = "md", on = false, state = "default", onChange, style }) {
  const d = SWITCH_DIMS[size] || SWITCH_DIMS.md;
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isFocus    = state === "focus";
  const isHover    = state === "hover";

  const trackBg = (() => {
    if (isDisabled) return on ? "var(--brand-border)" : "#eaebee";
    if (isError)    return "var(--color-danger, #D6213D)";
    if (on)         return isHover ? "var(--brand-primary-hover, var(--brand-primary))" : "var(--brand-primary)";
    return isHover  ? "var(--brand-text-muted)" : "var(--brand-border)";
  })();

  const boxShadow = isFocus
    ? "0 0 0 2px var(--brand-bg), 0 0 0 4px var(--brand-primary)"
    : "none";

  const thumbLeft = on ? d.w - d.thumb - 2 : 2;
  const thumbBg   = isDisabled ? "#c8c9cc" : "white";

  return (
    <div
      role="switch"
      aria-checked={on}
      aria-disabled={isDisabled}
      onClick={!isDisabled && onChange ? onChange : undefined}
      style={{
        width: d.w, height: d.h,
        borderRadius: d.h / 2,
        background: trackBg,
        position: "relative",
        flexShrink: 0,
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow,
        transition: "background .2s, box-shadow .15s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{
        position: "absolute",
        top: 2, left: thumbLeft,
        width: d.thumb, height: d.thumb,
        borderRadius: "50%",
        background: thumbBg,
        transition: "left .2s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 1px 3px rgba(0,0,0,.22)",
      }} />
    </div>
  );
}

// Control + label
function GSwitch({ size = "md", on = false, state = "default", label, placement = "left", onChange, style }) {
  const isDisabled = state === "disabled";
  const GAP   = { sm: 8, md: 10, lg: 12 }[size] ?? 10;
  const FSIZE = { sm: 13, md: 14, lg: 16 }[size] ?? 14;
  const LH    = { sm: "20px", md: "20px", lg: "24px" }[size] ?? "20px";

  return (
    <div
      onClick={!isDisabled && onChange ? onChange : undefined}
      style={{
        display: "flex", alignItems: "center", gap: GAP,
        flexDirection: placement === "right" ? "row-reverse" : "row",
        cursor: isDisabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
    >
      <GSwitchControl size={size} on={on} state={state} />
      {label && (
        <span style={{
          fontFamily: "var(--brand-font-body)",
          fontSize: FSIZE, lineHeight: LH, fontWeight: 400,
          color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
        }}>{label}</span>
      )}
    </div>
  );
}

// Stacked / inline group of GSwitch items
function GSwitchGroup({
  items       = [],   // [{ label, on, state }]
  direction   = "vertical",
  size        = "md",
  onChange,           // (index, newOn) => void
  style,
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap: direction === "horizontal" ? 16 : 4,
      alignItems: direction === "horizontal" ? "center" : "flex-start",
      ...style,
    }}>
      {items.map((item, i) => (
        <GSwitch
          key={i}
          size={size}
          on={item.on ?? false}
          state={item.state ?? "default"}
          label={item.label}
          onChange={() => onChange && onChange(i, !item.on)}
        />
      ))}
    </div>
  );
}

// Full-width row: label (+ optional description) + switch on the right
function GSwitchSection({
  size        = "md",
  on          = false,
  state       = "default",
  label,
  description,
  onChange,
  style,
}) {
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const py    = size === "lg" ? 16 : 14;
  const FSIZE = size === "lg" ? 16 : 14;
  const LH    = size === "lg" ? "24px" : "20px";

  return (
    <div
      onClick={!isDisabled && onChange ? onChange : undefined}
      style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 12,
        paddingTop: py, paddingBottom: py,
        paddingLeft: 0, paddingRight: 0,
        cursor: isDisabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: "block",
          fontFamily: "var(--brand-font-body)",
          fontSize: FSIZE, lineHeight: LH, fontWeight: 400,
          color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
        }}>{label}</span>
        {description && (
          <span style={{
            display: "block", marginTop: 2,
            fontFamily: "var(--brand-font-body)",
            fontSize: 13, lineHeight: "18px", fontWeight: 400,
            color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text-muted)",
          }}>{description}</span>
        )}
      </div>
      <GSwitchControl size={size} on={on} state={state} />
    </div>
  );
}

// Bordered card grouping multiple GSwitchSection rows
function GSwitchSectionGroup({
  items       = [],   // [{ label, description, on, state }]
  direction   = "vertical",
  size        = "md",
  onChange,           // (index, newOn) => void
  style,
}) {
  const isVert = direction === "vertical";

  return (
    <div style={{
      display: "flex",
      flexDirection: isVert ? "column" : "row",
      border: "1px solid var(--brand-border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--brand-bg)",
      ...style,
    }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div style={{ paddingLeft: 16, paddingRight: 16 }}>
            <GSwitchSection
              size={size}
              on={item.on ?? false}
              state={item.state ?? "default"}
              label={item.label}
              description={item.description}
              onChange={() => onChange && onChange(i, !item.on)}
            />
          </div>
          {i < items.length - 1 && (
            <div style={{
              [isVert ? "height" : "width"]: 1,
              flexShrink: 0,
              background: "var(--brand-border)",
              margin: isVert ? "0 16px" : "16px 0",
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── GStepper ─────────────────────────────────────────────────────────────────
// Step pin (the circular indicator)
function GStepperPin({ state = "incomplete", number = 1, size = 24 }) {
  const half = size / 2;
  const base = {
    width: size, height: size, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, boxSizing: "border-box",
    position: "relative", zIndex: 1,
  };
  const numStyle = {
    fontFamily: "var(--brand-font-body)",
    fontSize: size > 20 ? 12 : 10,
    fontWeight: 600,
    lineHeight: 1,
  };

  switch (state) {
    case "complete":
      return (
        <div style={{ ...base, background: "var(--color-success, #0E8A3E)" }}>
          <svg width={size * 0.46} height={size * 0.38} viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    case "active":
      return (
        <div style={{ ...base, background: "var(--brand-bg)", border: "2px solid var(--brand-primary)" }}>
          <span style={{ ...numStyle, color: "var(--brand-text)" }}>{number}</span>
        </div>
      );
    case "warning":
      return (
        <div style={{ ...base, background: "var(--color-warning, #C47A00)" }}>
          <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 16 16" fill="none">
            <path d="M8 5v4.5M8 11.5v.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      );
    case "error":
      return (
        <div style={{ ...base, background: "var(--color-danger, #D6213D)" }}>
          <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 10 10" fill="none">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="white" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </div>
      );
    case "disabled":
      return (
        <div style={{ ...base, background: "#eaebee", border: "1.5px solid var(--brand-border)" }}>
          <span style={{ ...numStyle, color: "var(--brand-text-muted)" }}>{number}</span>
        </div>
      );
    default: // incomplete
      return (
        <div style={{ ...base, background: "var(--brand-bg)", border: "1.5px solid var(--brand-border)" }}>
          <span style={{ ...numStyle, color: "var(--brand-text)" }}>{number}</span>
        </div>
      );
  }
}

// Main stepper component
function GStepper({
  steps        = [],   // Array of { label, state }
  orientation  = "horizontal", // "horizontal" | "vertical"
  style,
}) {
  const isH = orientation === "horizontal";

  // connector between steps[i] and steps[i+1] is filled when steps[i] is complete
  const connFilled = i => i >= 0 && i < steps.length && steps[i]?.state === "complete";

  if (isH) {
    return (
      <div style={{
        display: "flex", alignItems: "flex-start",
        padding: "4px 0",
        ...style,
      }}>
        {steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast  = i === steps.length - 1;
          return (
            <div key={i} style={{
              flex: "1 0 0", minWidth: 0,
              display: "flex", flexDirection: "column", gap: 4, alignItems: "center",
            }}>
              {/* Track row with connectors + pin */}
              <div style={{ height: 24, width: "100%", position: "relative", flexShrink: 0 }}>
                {/* Left connector */}
                {!isFirst && (
                  <div style={{
                    position: "absolute",
                    top: "45.83%", bottom: "45.83%",
                    left: 0, right: "50%",
                    background: connFilled(i - 1) ? "var(--brand-primary)" : "var(--brand-border)",
                  }} />
                )}
                {/* Right connector */}
                {!isLast && (
                  <div style={{
                    position: "absolute",
                    top: "45.83%", bottom: "45.83%",
                    left: "50%", right: 0,
                    background: connFilled(i) ? "var(--brand-primary)" : "var(--brand-border)",
                  }} />
                )}
                {/* Pin */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                  <GStepperPin state={step.state} number={i + 1} />
                </div>
              </div>
              {/* Label */}
              <span style={{
                fontFamily: "var(--brand-font-body)",
                fontSize: 14, lineHeight: "20px", fontWeight: 400,
                color: step.state === "disabled" ? "var(--brand-text-muted)" : "var(--brand-text-muted)",
                textAlign: "center", width: "100%",
              }}>{step.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {steps.map((step, i) => {
        const isFirst = i === 0;
        const isLast  = i === steps.length - 1;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
          }}>
            {/* Track column */}
            <div style={{ width: 24, height: 48, position: "relative", flexShrink: 0 }}>
              {/* Top connector */}
              {!isFirst && (
                <div style={{
                  position: "absolute",
                  left: "45.83%", right: "45.83%",
                  top: 0, bottom: "50%",
                  background: connFilled(i - 1) ? "var(--brand-primary)" : "var(--brand-border)",
                }} />
              )}
              {/* Bottom connector */}
              {!isLast && (
                <div style={{
                  position: "absolute",
                  left: "45.83%", right: "45.83%",
                  top: "50%", bottom: 0,
                  background: connFilled(i) ? "var(--brand-primary)" : "var(--brand-border)",
                }} />
              )}
              {/* Pin */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <GStepperPin state={step.state} number={i + 1} />
              </div>
            </div>
            {/* Label */}
            <span style={{
              fontFamily: "var(--brand-font-body)",
              fontSize: 14, lineHeight: "20px", fontWeight: 400,
              color: step.state === "disabled" ? "var(--brand-text-muted)" : "var(--brand-text-muted)",
            }}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── GSpacing ────────────────────────────────────────────────────────────────
// Utility spacer — inserts consistent whitespace using the spacing scale.
// In production renders as an empty block; in the DS docs it renders with a
// dashed outline so the size is visible.
const SPACING_SCALE = {
  "xs":  4,  "sm":  8,  "md":  12, "lg":  16, "xl":  20,
  "2xl": 24, "3xl": 28, "4xl": 32, "5xl": 36, "6xl": 40,
  "7xl": 48, "8xl": 56, "9xl": 80,
};

function GSpacing({ size = "md", orientation = "vertical", showGuide = false, style }) {
  const px = SPACING_SCALE[size] ?? 16;
  const isH = orientation === "horizontal";
  return (
    <div style={{
      display: "block",
      flexShrink: 0,
      [isH ? "width" : "height"]: px,
      ...(showGuide ? {
        border: "1.5px dashed var(--brand-primary)",
        borderRadius: 2,
        opacity: 0.6,
        width: isH ? px : "100%",
        height: isH ? "100%" : px,
        minWidth: isH ? px : undefined,
        minHeight: isH ? undefined : px,
      } : {}),
      ...style,
    }} />
  );
}

// ─── GSlider ─────────────────────────────────────────────────────────────────
function GSlider({
  type         = "single",   // "single" | "dual"
  value,                     // number (single) | [number, number] (dual)
  defaultValue,
  min          = 0,
  max          = 100,
  step         = 1,
  disabled     = false,
  onChange,
  style,
}) {
  const isDual = type === "dual";

  const init = value !== undefined ? value
             : defaultValue !== undefined ? defaultValue
             : isDual ? [20, 80] : 30;

  const [internal, setInternal] = useState(init);
  const controlled = value !== undefined;
  const val = controlled ? value : internal;

  const single = !isDual ? (typeof val === "number" ? val : 30) : null;
  const lo     =  isDual ? (Array.isArray(val) ? val[0] : 20) : null;
  const hi     =  isDual ? (Array.isArray(val) ? val[1] : 80) : null;

  const pct   = v => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));
  const snap  = v => Math.max(min, Math.min(max, Math.round((v - min) / step) * step + min));

  const trackRef = useRef(null);
  const [hover, setHover] = useState({});   // {single|lo|hi: bool}

  const getVal = clientX => {
    const rect = trackRef.current.getBoundingClientRect();
    return snap(min + Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * (max - min));
  };

  const startDrag = (which, e) => {
    if (disabled) return;
    e.preventDefault();

    const onMove = ev => {
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const v  = getVal(cx);
      let next;
      if (!isDual) {
        next = v;
      } else {
        const curLo = controlled ? lo : (Array.isArray(internal) ? internal[0] : 20);
        const curHi = controlled ? hi : (Array.isArray(internal) ? internal[1] : 80);
        next = which === "lo"
          ? [Math.min(v, curHi - step), curHi]
          : [curLo, Math.max(v, curLo + step)];
      }
      if (!controlled) setInternal(next);
      onChange && onChange(next);
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend",  onUp);
    onMove(e.nativeEvent || e);
  };

  const sP = !isDual ? pct(single) : null;
  const lP =  isDual ? pct(lo) : null;
  const hP =  isDual ? pct(hi) : null;

  const thumbSty = (key) => ({
    position: "absolute",
    top: "50%",
    left: key === "single" ? `${sP}%` : key === "lo" ? `${lP}%` : `${hP}%`,
    transform: "translateX(-50%) translateY(-50%)",
    width: 24, height: 24, borderRadius: "50%",
    background: disabled ? "#eaebee" : hover[key] ? "var(--brand-primary)" : "white",
    border: `2px solid ${disabled ? "var(--brand-border)" : "var(--brand-primary)"}`,
    boxShadow: "0 1px 4px rgba(0,0,0,.12)",
    boxSizing: "border-box",
    cursor: disabled ? "not-allowed" : "grab",
    zIndex: 2,
    transition: "background .15s, border-color .15s",
    touchAction: "none",
    flexShrink: 0,
  });

  return (
    <div
      ref={trackRef}
      style={{
        position: "relative", height: 44, width: "100%",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : "default",
        ...style,
      }}
    >
      {/* Track */}
      <div style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        left: 0, right: 0, height: 4,
        background: "var(--brand-bg-elev, #eaebee)",
        borderRadius: "var(--radius-sm, 4px)",
      }} />

      {/* Fill */}
      <div style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        left:  isDual ? `${lP}%` : "0",
        width: isDual ? `${hP - lP}%` : `${sP}%`,
        height: 4,
        background: disabled ? "var(--brand-border)" : "var(--brand-primary)",
        borderRadius: 2,
        pointerEvents: "none",
        transition: "width .05s, left .05s",
      }} />

      {!isDual && (
        <div
          style={thumbSty("single")}
          onMouseDown={e => startDrag("single", e)}
          onMouseEnter={() => !disabled && setHover(h => ({...h, single: true}))}
          onMouseLeave={() => setHover(h => ({...h, single: false}))}
        />
      )}

      {isDual && <>
        <div
          style={thumbSty("lo")}
          onMouseDown={e => startDrag("lo", e)}
          onMouseEnter={() => !disabled && setHover(h => ({...h, lo: true}))}
          onMouseLeave={() => setHover(h => ({...h, lo: false}))}
        />
        <div
          style={thumbSty("hi")}
          onMouseDown={e => startDrag("hi", e)}
          onMouseEnter={() => !disabled && setHover(h => ({...h, hi: true}))}
          onMouseLeave={() => setHover(h => ({...h, hi: false}))}
        />
      </>}
    </div>
  );
}

// ─── GSliderSection ───────────────────────────────────────────────────────────
function GSliderSection({
  type         = "single",
  value,
  defaultValue,
  min          = 0,
  max          = 100,
  step         = 1,
  disabled     = false,
  numLeft,
  numRight,
  onChange,
  style,
}) {
  const isDual = type === "dual";

  const init = value !== undefined ? value
             : defaultValue !== undefined ? defaultValue
             : isDual ? [20, 80] : 30;

  const [internal, setInternal] = useState(init);
  const controlled = value !== undefined;
  const val = controlled ? value : internal;

  const handleChange = v => {
    if (!controlled) setInternal(v);
    onChange && onChange(v);
  };

  const displayL = numLeft  !== undefined ? numLeft  : String(min);
  const displayR = numRight !== undefined ? numRight : String(max);

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 4,
      paddingTop: 8, paddingBottom: 8,
      width: 400,
      ...style,
    }}>
      <GSlider
        type={type}
        value={controlled ? val : undefined}
        defaultValue={!controlled ? init : undefined}
        min={min} max={max} step={step}
        disabled={disabled}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--brand-font-body)",
          fontSize: 16, lineHeight: "20px", fontWeight: 400,
          color: "var(--brand-text-muted)",
        }}>{displayL}</span>
        <span style={{
          fontFamily: "var(--brand-font-body)",
          fontSize: 16, lineHeight: "20px", fontWeight: 400,
          color: "var(--brand-text-muted)",
          textAlign: "right",
        }}>{displayR}</span>
      </div>
    </div>
  );
}

// ─── GRadioControl ────────────────────────────────────────────────────────────
function GRadioControl({ selected = false, state = "default", style }) {
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isFocus    = state === "focus";
  const isHover    = state === "hover";

  let borderColor = "var(--brand-border)";
  if (isError) borderColor = "var(--color-danger)";
  else if (isDisabled) borderColor = "var(--brand-border)";
  else if (selected || isHover || isFocus) borderColor = "var(--brand-primary)";

  const bg = isDisabled ? "#eaebee" : "var(--brand-bg)";

  let boxShadow = "none";
  if (isFocus) boxShadow = "0 0 0 2px var(--brand-bg), 0 0 0 4px var(--brand-primary)";

  let dotColor = "var(--brand-primary)";
  if (isDisabled) dotColor = "var(--brand-border)";
  if (isError)    dotColor = "var(--color-danger)";

  return (
    <div style={{
      width: 20, height: 20, borderRadius: "50%",
      border: `1.5px solid ${borderColor}`,
      background: bg,
      boxShadow,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      boxSizing: "border-box",
      transition: "border-color .15s, box-shadow .15s",
      ...style,
    }}>
      {selected && (
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: dotColor,
          transition: "background .15s",
        }} />
      )}
    </div>
  );
}

// ─── GRadio ───────────────────────────────────────────────────────────────────
function GRadio({ size = "md", position = "left", label, selected = false, state = "default", onChange, style }) {
  const isDisabled = state === "disabled";
  const py         = size === "lg" ? 12 : 10;
  const fontSize   = size === "lg" ? 16 : 14;
  const lineHeight = size === "lg" ? "24px" : "20px";

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      onClick={!isDisabled && onChange ? onChange : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: position === "right" ? "row-reverse" : "row",
        gap: 12,
        paddingTop: py, paddingBottom: py,
        cursor: isDisabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
    >
      <GRadioControl selected={selected} state={state} />
      {label && (
        <span style={{
          fontFamily: "var(--brand-font-body)",
          fontSize, lineHeight, fontWeight: 400,
          color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
        }}>{label}</span>
      )}
    </div>
  );
}

// ─── GRadioGroup ──────────────────────────────────────────────────────────────
function GRadioGroup({ direction = "vertical", items = [], value, onChange, size = "md", state = "default", style }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap: direction === "horizontal" ? 20 : 0,
      alignItems: direction === "horizontal" ? "center" : "flex-start",
      ...style,
    }}>
      {items.map((item, i) => (
        <GRadio
          key={item.value ?? i}
          label={item.label}
          selected={value === item.value}
          size={size}
          state={state === "disabled" ? "disabled" : "default"}
          onChange={() => onChange && onChange(item.value)}
        />
      ))}
    </div>
  );
}

// ─── GRadioSection ────────────────────────────────────────────────────────────
function GRadioSection({ size = "md", selected = false, state = "default", label, description, onChange, style }) {
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isFocus    = state === "focus";
  const isHover    = state === "hover";

  let borderColor = "var(--brand-border)";
  if (selected || isHover) borderColor = "var(--brand-primary)";
  if (isFocus)             borderColor = "var(--brand-primary)";
  if (isError)             borderColor = "var(--color-danger)";
  if (isDisabled)          borderColor = "var(--brand-border)";

  let boxShadow = "none";
  if (isFocus) boxShadow = "0 0 0 2px var(--brand-bg), 0 0 0 4px var(--brand-primary)";

  const bg = isDisabled ? "var(--brand-bg-elev)" : "var(--brand-bg)";
  const py = size === "lg" ? 18 : 14;

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      onClick={!isDisabled && onChange ? onChange : undefined}
      style={{
        width: 240, boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: 12,
        paddingLeft: 20, paddingRight: 20,
        paddingTop: py, paddingBottom: py,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        background: bg,
        boxShadow,
        cursor: isDisabled ? "not-allowed" : "pointer",
        userSelect: "none",
        transition: "border-color .15s, box-shadow .15s",
        ...style,
      }}
    >
      <GRadioControl selected={selected} state={state} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontFamily: "var(--brand-font-body)",
          fontSize: 16, lineHeight: "24px", fontWeight: 400,
          color: isDisabled ? "var(--brand-text-muted)" : "var(--brand-text)",
          display: "block",
        }}>{label}</span>
        {description && (
          <span style={{
            fontFamily: "var(--brand-font-body)",
            fontSize: 14, lineHeight: "20px", fontWeight: 400,
            color: "var(--brand-text-muted)",
            display: "block",
          }}>{description}</span>
        )}
      </div>
    </div>
  );
}

// ─── GRadioSectionGroup ───────────────────────────────────────────────────────
function GRadioSectionGroup({ direction = "vertical", items = [], value, onChange, size = "md", state = "default", style }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap: direction === "horizontal" ? 12 : 8,
      flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
      alignItems: "flex-start",
      ...style,
    }}>
      {items.map((item, i) => (
        <GRadioSection
          key={item.value ?? i}
          label={item.label}
          description={item.description}
          selected={value === item.value}
          size={size}
          state={state === "disabled" ? "disabled" : "default"}
          onChange={() => onChange && onChange(item.value)}
        />
      ))}
    </div>
  );
}

// ─── GTab ─────────────────────────────────────────────────────────────────────
const TAB_FOCUS_RING = "0 0 0 2px #fff, 0 0 0 5px rgba(16,73,169,0.6)";

const TAB_FONT_MAP = {
  lg: { fontSize: 18, lineH: "24px" },
  md: { fontSize: 16, lineH: "20px" },
  sm: { fontSize: 14, lineH: "20px" },
};

function GTab({
  type     = "horizontal",
  size     = "md",
  state    = "default",
  label    = "Tab",
  icon     = false,
  count    = null,
  onClick,
  style,
}) {
  const fnt      = TAB_FONT_MAP[size] || TAB_FONT_MAP.md;
  const isVert   = type === "vertical";
  const isActive = state === "active" || state === "hover";
  const isFocus  = state === "focus";
  const py       = size === "lg" ? 16 : size === "sm" ? 6 : 12;
  const pl       = isVert ? (size === "lg" ? 24 : size === "sm" ? 12 : 16) : 0;
  const gap      = size === "lg" ? 8 : 6;
  const iconSize = size === "sm" ? 16 : 24;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: `${py}px 0 ${py}px ${pl}px`,
        borderBottom: (!isVert && isActive) ? "2px solid var(--brand-primary)" : undefined,
        marginBottom: (!isVert && isActive) ? -1 : undefined,
        borderLeft:   (isVert  && isActive) ? "2px solid var(--brand-primary)" : undefined,
        background:   isFocus ? "var(--brand-bg)" : undefined,
        boxShadow:    isFocus ? TAB_FOCUS_RING : undefined,
        ...style,
      }}
    >
      {icon && (
        <div style={{
          display: "flex", alignItems: "center",
          paddingRight: gap,
          ...(size === "sm" ? { paddingTop: 2, paddingBottom: 2 } : {}),
        }}>
          <div style={{ width: iconSize, height: iconSize, borderRadius: "50%", background: "var(--brand-text-muted)", opacity: 0.4 }} />
        </div>
      )}
      <span style={{
        fontSize: fnt.fontSize, lineHeight: fnt.lineH,
        color: "var(--brand-text)", whiteSpace: "nowrap",
        fontFamily: "var(--brand-font-body)", fontWeight: 400,
      }}>
        {label}
      </span>
      {count !== null && (
        <div style={{
          display: "flex", alignItems: "center",
          paddingLeft: gap,
          ...(size === "md" ? { paddingTop: 2, paddingBottom: 2 } : {}),
        }}>
          <span style={{ fontSize: fnt.fontSize, lineHeight: fnt.lineH, color: "var(--brand-text-muted)", whiteSpace: "nowrap" }}>
            {count}
          </span>
        </div>
      )}
    </div>
  );
}

function GTabGroup({
  tabs       = [],
  value,
  type       = "horizontal",
  size       = "md",
  equalWidth = true,
  onChange,
  style,
}) {
  const isVert = type === "vertical";
  return (
    <div style={{
      display: "flex",
      flexDirection: isVert ? "column" : "row",
      alignItems: isVert ? "flex-start" : "stretch",
      ...(!isVert ? { borderBottom: "1px solid var(--brand-border)" } : {}),
      ...(!isVert && !equalWidth ? { gap: 16 } : {}),
      ...style,
    }}>
      {tabs.map((tab, i) => (
        <GTab
          key={i}
          type={type}
          size={size}
          state={tab.value === value ? "active" : "default"}
          label={tab.label}
          icon={tab.icon || false}
          count={tab.count ?? null}
          onClick={() => onChange && onChange(tab.value)}
          style={!isVert && equalWidth ? { flex: "1 0 0", minWidth: 0 } : {}}
        />
      ))}
    </div>
  );
}

// ─── GTabSelector ─────────────────────────────────────────────────────────────
function GTabSelector({
  type  = "primary",
  size  = "md",
  state = "default",
  label = "Tab",
  icon  = false,
  count = null,
  onClick,
  style,
}) {
  const fnt      = TAB_FONT_MAP[size] || TAB_FONT_MAP.md;
  const isActive = state === "active" || state === "hover";
  const isFocus  = state === "focus";
  const py  = size === "lg" ? 16 : size === "sm" ? 6  : 12;
  const pl  = size === "sm" ? 8  : 16;
  const pr  = size === "sm" ? 12 : 20;
  const rad = size === "sm" ? "var(--radius-sm)" : "var(--radius-lg)";
  const gap = size === "lg" ? 8  : 6;
  const iconSize = size === "sm" ? 16 : 24;

  let bg, border, color;
  if (type === "primary") {
    bg     = isActive ? "var(--brand-primary)"    : "var(--brand-bg-elev)";
    color  = isActive ? "var(--brand-on-primary)"  : "var(--brand-text)";
    border = "none";
  } else if (type === "outline") {
    bg     = isActive ? "var(--brand-text)"        : "var(--brand-bg)";
    color  = isActive ? "var(--brand-on-primary)"  : "var(--brand-text)";
    border = isActive ? "none" : "1px solid var(--brand-border)";
  } else { // inverse — white pill on dark context
    bg     = "var(--brand-bg)";
    color  = isActive ? "var(--brand-primary)"     : "var(--brand-text-muted)";
    border = "none";
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", overflow: "hidden",
        padding: `${py}px ${pr}px ${py}px ${pl}px`,
        borderRadius: rad, background: bg,
        border: border || "none",
        boxShadow: isFocus ? TAB_FOCUS_RING : undefined,
        ...style,
      }}
    >
      {icon && (
        <div style={{
          display: "flex", alignItems: "center",
          paddingRight: gap,
          ...(size === "sm" ? { paddingTop: 2, paddingBottom: 2 } : {}),
        }}>
          <div style={{ width: iconSize, height: iconSize, borderRadius: "50%", background: color, opacity: 0.45 }} />
        </div>
      )}
      <span style={{
        fontSize: fnt.fontSize, lineHeight: fnt.lineH,
        color, whiteSpace: "nowrap",
        fontFamily: "var(--brand-font-body)", fontWeight: 400,
      }}>
        {label}
      </span>
      {count !== null && (
        <div style={{ display: "flex", alignItems: "center", paddingLeft: gap }}>
          <span style={{
            fontSize: fnt.fontSize, lineHeight: fnt.lineH,
            color: isActive ? "rgba(255,255,255,0.65)" : "var(--brand-text-muted)",
            whiteSpace: "nowrap",
          }}>{count}</span>
        </div>
      )}
    </div>
  );
}

// ─── GTabSelectorGroup ────────────────────────────────────────────────────────
function GTabSelectorGroup({
  tabs    = [],
  value,
  size    = "md",
  padding = true,
  onChange,
  style,
}) {
  const fnt = TAB_FONT_MAP[size] || TAB_FONT_MAP.md;
  const py  = size === "lg" ? 14 : size === "sm" ? 5 : 10;
  const px  = size === "sm" ? 10 : 16;
  const pad = padding ? 6 : 2;

  return (
    <div style={{
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      background: "var(--brand-bg-elev)",
      borderRadius: 9999,
      padding: pad,
      ...style,
    }}>
      {tabs.map((tab, i) => {
        const isActive = tab.value === value;
        return (
          <div
            key={i}
            onClick={() => onChange && onChange(tab.value)}
            style={{
              flex: "1 0 0",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              padding: `${py}px ${px}px`,
              borderRadius: 9999,
              background: isActive ? "var(--brand-primary)" : "transparent",
              color: isActive ? "var(--brand-on-primary)" : "var(--brand-text)",
              fontSize: fnt.fontSize, lineHeight: fnt.lineH,
              fontFamily: "var(--brand-font-body)", fontWeight: 400,
              whiteSpace: "nowrap",
              userSelect: "none",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}

// ─── GTooltip ────────────────────────────────────────────────────────────────
// Internal arrow rendered as inline SVG (supports CSS vars)
function GTooltipArrow({ type, placement }) {
  const light    = type === "primary";
  const bg       = light ? "var(--brand-bg-elev)" : "var(--brand-text)";
  const bdr      = light ? "var(--brand-border)"  : null;
  const isStart  = placement.endsWith("Start");
  const isEnd    = placement.endsWith("End");
  const isMid    = !isStart && !isEnd;
  const base     = placement.replace("Start","").replace("End","").toLowerCase();

  // w×h for each arrow direction (12×7 vertical, 7×12 horizontal)
  const dims = { top:{w:12,h:7,dir:"down"}, bottom:{w:12,h:7,dir:"up"},
                 left:{w:7,h:12,dir:"right"}, right:{w:7,h:12,dir:"left"} };
  const { w, h, dir } = dims[base] || dims.top;

  // Outer triangle path (border colour or fill)
  const outerPaths = {
    down:  `M0,0 L${w},0 L${w/2},${h} Z`,
    up:    `M0,${h} L${w},${h} L${w/2},0 Z`,
    right: `M0,0 L0,${h} L${w},${h/2} Z`,
    left:  `M${w},0 L${w},${h} L0,${h/2} Z`,
  };
  // Inner triangle path (1 px inset, bg colour – gives bordered look for primary)
  const innerPaths = {
    down:  `M1,0 L${w-1},0 L${w/2},${h-1} Z`,
    up:    `M1,${h} L${w-1},${h} L${w/2},1 Z`,
    right: `M0,1 L0,${h-1} L${w-1},${h/2} Z`,
    left:  `M${w},1 L${w},${h-1} L1,${h/2} Z`,
  };

  // Absolute position offset from tooltip edge
  const pos = { position:"absolute", lineHeight:0, display:"block" };
  if (dir === "down") {
    pos.bottom = -(h); pos.top = "auto";
    if (isMid)        { pos.left="50%"; pos.transform="translateX(-50%)"; }
    else if (isStart) { pos.left=10; }
    else              { pos.right=10; }
  } else if (dir === "up") {
    pos.top = -(h); pos.bottom = "auto";
    if (isMid)        { pos.left="50%"; pos.transform="translateX(-50%)"; }
    else if (isStart) { pos.left=10; }
    else              { pos.right=10; }
  } else if (dir === "right") {
    pos.right = -(w); pos.left = "auto";
    if (isMid)        { pos.top="50%"; pos.transform="translateY(-50%)"; }
    else if (isStart) { pos.top=8; }
    else              { pos.bottom=8; }
  } else {
    pos.left = -(w); pos.right = "auto";
    if (isMid)        { pos.top="50%"; pos.transform="translateY(-50%)"; }
    else if (isStart) { pos.top=8; }
    else              { pos.bottom=8; }
  }

  return (
    <span style={pos}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:"block" }}>
        <path d={outerPaths[dir]} style={{ fill: bdr || bg }} />
        {bdr && <path d={innerPaths[dir]} style={{ fill: bg }} />}
      </svg>
    </span>
  );
}

function GTooltip({
  type      = "secondary",  // "primary" | "secondary"
  size      = "xl",         // "xl" | "lg"
  placement = "top",        // "top"|"topStart"|"topEnd"|"bottom"|"bottomStart"|"bottomEnd"|"left"|"leftStart"|"leftEnd"|"right"|"rightStart"|"rightEnd"
  label     = "Tooltip label",
  closable  = false,
  tip       = true,
  onClose,
  style,
}) {
  const light = type === "primary";
  const pad   = size === "xl" ? 8 : "4px 8px";
  const fs    = size === "xl" ? 16 : 14;

  return (
    <div style={{
      position: "relative", display: "inline-flex", alignItems: "center",
      borderRadius: "var(--radius-sm, 4px)",
      background: light ? "var(--brand-bg-elev)" : "var(--brand-text)",
      border: light ? "1px solid var(--brand-border)" : "none",
      padding: pad,
      fontFamily: "var(--brand-font-body)",
      boxSizing: "border-box",
      ...style,
    }}>
      {/* Label */}
      <span style={{
        fontSize: fs, lineHeight: "20px", fontWeight: 400,
        color: light ? "var(--brand-text)" : "#ffffff",
        textAlign: "center", whiteSpace: "nowrap",
        flex: 1, minWidth: 0, padding: "2px 0",
      }}>
        {label}
      </span>

      {/* Close button */}
      {closable && (
        <button
          onClick={onClose}
          aria-label="Close tooltip"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            width:24, height:24, marginLeft:4, padding:0,
            background:"none", border:"none", cursor:"pointer", borderRadius:9999, flexShrink:0,
            color: light ? "var(--brand-text-muted)" : "rgba(255,255,255,.7)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = light ? "rgba(0,0,0,.06)" : "rgba(255,255,255,.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* Arrow tip */}
      {tip && <GTooltipArrow type={type} placement={placement} />}
    </div>
  );
}

// Wraps any trigger element and shows a tooltip on hover
function GTooltipWrapper({
  children,
  label     = "Tooltip",
  type      = "secondary",
  size      = "xl",
  placement = "top",
  closable  = false,
  style,
}) {
  const [show, setShow] = useState(false);
  const GAP = 10; // gap (px) between trigger edge and tooltip bubble

  const pos = (() => {
    const b = { position:"absolute", zIndex:100 };
    const g = `calc(100% + ${GAP}px)`;
    if (placement === "top")         return { ...b, bottom:g,  left:"50%",  transform:"translateX(-50%)" };
    if (placement === "topStart")    return { ...b, bottom:g,  left:0 };
    if (placement === "topEnd")      return { ...b, bottom:g,  right:0 };
    if (placement === "bottom")      return { ...b, top:g,     left:"50%",  transform:"translateX(-50%)" };
    if (placement === "bottomStart") return { ...b, top:g,     left:0 };
    if (placement === "bottomEnd")   return { ...b, top:g,     right:0 };
    if (placement === "left")        return { ...b, right:g,   top:"50%",   transform:"translateY(-50%)" };
    if (placement === "leftStart")   return { ...b, right:g,   top:0 };
    if (placement === "leftEnd")     return { ...b, right:g,   bottom:0 };
    if (placement === "right")       return { ...b, left:g,    top:"50%",   transform:"translateY(-50%)" };
    if (placement === "rightStart")  return { ...b, left:g,    top:0 };
    if (placement === "rightEnd")    return { ...b, left:g,    bottom:0 };
    return { ...b, bottom:g, left:"50%", transform:"translateX(-50%)" };
  })();

  return (
    <div style={{ position:"relative", display:"inline-block", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <GTooltip type={type} size={size} placement={placement}
          label={label} closable={closable} style={pos} />
      )}
    </div>
  );
}

Object.assign(window, { Swatch, Demo, GButton, GButtonSquare, GButtonCircle, GInput, GBadge, TAG_TYPE_STYLES, TAG_SIZE_DIM, GTag, GTagGroup, GCard, GAlert, GAvatar, GAvatarGroup, GAccordion, GAccordionGroup, GBreadcrumb, GCalendar, GCheckbox, GCheckboxGroup, GDivider, GDropdownItem, GDropdown, GDropzone, GFormField, GLink, GThumbnail, GMediaPhoto, GModal, GModalPromo, GPromoHeader, GPromoText, GPromoDivider, GPromoMedia, GPromoForm, GPromoFooter, GNotification, GParagraph, GProgressBar, GProgressCircle, GProgressSection, GPopover, GRadioControl, GRadio, GRadioGroup, GRadioSection, GRadioSectionGroup, GSlider, GSliderSection, GSpacing, SPACING_SCALE, GStepperPin, GStepper, SWITCH_DIMS, GSwitchControl, GSwitch, GSwitchGroup, GSwitchSection, GSwitchSectionGroup, TAB_FOCUS_RING, TAB_FONT_MAP, GTab, GTabGroup, GTabSelector, GTabSelectorGroup, GTooltipArrow, GTooltip, GTooltipWrapper, BrandPreview, Icon, hexToRgb });
