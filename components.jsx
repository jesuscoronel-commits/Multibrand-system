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

function GTag({ variant = "primary", children, onClose }) {
  const variants = {
    primary:   { bg: "var(--brand-primary)", color: "var(--brand-on-primary)" },
    secondary: { bg: "var(--brand-bg-elev)", color: "var(--brand-text)" },
    outline:   { bg: "transparent", color: "var(--brand-text)", border: "1px solid var(--brand-border)" },
    soft:      { bg: "var(--brand-primary-soft)", color: "var(--brand-primary)" },
  };
  const v = variants[variant] || variants.primary;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 10px", fontSize: 13, fontWeight: 500,
      background: v.bg, color: v.color,
      border: v.border || "none",
      borderRadius: "var(--radius-sm)", lineHeight: 1.3,
    }}>
      {children}
      {onClose && <span style={{ cursor: "pointer", marginLeft: 2, opacity: .7 }}>×</span>}
    </span>
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

Object.assign(window, { Swatch, Demo, GButton, GButtonSquare, GButtonCircle, GInput, GBadge, GTag, GCard, GAlert, GAvatar, GAvatarGroup, GAccordion, GAccordionGroup, GBreadcrumb, GCalendar, GCheckbox, GCheckboxGroup, GDivider, GDropdownItem, GDropdown, BrandPreview, Icon, hexToRgb });
