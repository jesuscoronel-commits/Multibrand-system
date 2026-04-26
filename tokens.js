// Multi-Brand Design System — Tokens
// Global tokens (compartidos) + 4 brand themes (intercambiables).
// Regla: los componentes consumen VARIABLES ALIAS (--brand-*). Nunca colores hardcoded.

window.GENESIS_TOKENS = {

  // ═══════════════════════════════════════════════════════════
  //  1. GLOBAL TOKENS — compartidos por TODAS las marcas
  // ═══════════════════════════════════════════════════════════

  // Paleta neutra (escala de grises compartida)
  palette: {
    neutral: {
      0:   "#FFFFFF",
      50:  "#F8F9FA",
      100: "#F1F3F5",
      200: "#E6E8EC",
      300: "#D0D3D9",
      400: "#A7ABB3",
      500: "#7B7F87",
      600: "#5A5E66",
      700: "#3E4148",
      800: "#24272D",
      900: "#14161B",
      950: "#0A0B0E",
    },
  },

  // Escala tipográfica (misma para todas las marcas — cambia la familia, no la escala)
  typeScale: [
    { token: "font-display-1", px: 72, rem: "4.5rem",  lh: "80px", weight: 700, letterSpacing: "-0.03em" },
    { token: "font-display-2", px: 56, rem: "3.5rem",  lh: "64px", weight: 700, letterSpacing: "-0.025em" },
    { token: "font-display-3", px: 44, rem: "2.75rem", lh: "52px", weight: 600, letterSpacing: "-0.02em" },
    { token: "font-h1",        px: 36, rem: "2.25rem", lh: "44px", weight: 600, letterSpacing: "-0.02em" },
    { token: "font-h2",        px: 28, rem: "1.75rem", lh: "36px", weight: 600, letterSpacing: "-0.015em" },
    { token: "font-h3",        px: 22, rem: "1.375rem",lh: "30px", weight: 600, letterSpacing: "-0.01em" },
    { token: "font-h4",        px: 18, rem: "1.125rem",lh: "26px", weight: 600, letterSpacing: "-0.005em" },
    { token: "font-body-lg",   px: 18, rem: "1.125rem",lh: "28px", weight: 400, letterSpacing: "0" },
    { token: "font-body-md",   px: 16, rem: "1rem",    lh: "24px", weight: 400, letterSpacing: "0" },
    { token: "font-body-sm",   px: 14, rem: "0.875rem",lh: "20px", weight: 400, letterSpacing: "0" },
    { token: "font-caption",   px: 12, rem: "0.75rem", lh: "16px", weight: 500, letterSpacing: "0.01em" },
  ],

  // Escala de espaciado (múltiplo de 4)
  spacing: {
    "0":   "0px",
    "1":   "2px",
    "2":   "4px",
    "3":   "8px",
    "4":   "12px",
    "5":   "16px",
    "6":   "20px",
    "7":   "24px",
    "8":   "32px",
    "9":   "40px",
    "10":  "48px",
    "11":  "64px",
    "12":  "80px",
    "13":  "96px",
    "14":  "128px",
  },

  // Radios (compartidos — las marcas pueden sobreescribir)
  radii: {
    none: 0,
    sm:   4,
    md:   8,
    lg:   12,
    xl:   16,
    pill: 999,
  },

  // Elevación (compartida)
  elevation: {
    0: "none",
    1: "0 1px 2px rgba(20,22,27,0.06), 0 1px 3px rgba(20,22,27,0.04)",
    2: "0 4px 8px -2px rgba(20,22,27,0.08), 0 2px 4px rgba(20,22,27,0.04)",
    3: "0 12px 24px -6px rgba(20,22,27,0.10), 0 4px 8px -2px rgba(20,22,27,0.06)",
    4: "0 24px 48px -12px rgba(20,22,27,0.14), 0 8px 16px -4px rgba(20,22,27,0.06)",
  },

  // Estado semántico (compartido — la intención no cambia por marca)
  semantic: {
    success: "#0E8A3E",
    warning: "#C47A00",
    danger:  "#D6213D",
    info:    "#0B50C5",
  },

  // ═══════════════════════════════════════════════════════════
  //  2. BRAND THEMES — cada uno sobreescribe los alias
  // ═══════════════════════════════════════════════════════════

  brands: {
    zamna: {
      name: "Zamna",
      tagline: "Minimalista · editorial · high-end · dark.",
      voice: "Sobria, curada, confiada. Sin adornos innecesarios.",
      primary: "#000000",
      primaryHover: "#1A1A1A",
      primaryPressed: "#333333",
      primarySoft: "#F1F3F5",
      onPrimary: "#FFFFFF",
      accent: "#000000",
      text: "#0A0B0E",
      textMuted: "#5A5E66",
      bg: "#FFFFFF",
      bgElev: "#F8F9FA",
      border: "#E6E8EC",
      // Modo oscuro disponible como alternativa
      dark: {
        primary: "#FFFFFF",
        onPrimary: "#000000",
        bg: "#0A0B0E",
        bgElev: "#14161B",
        text: "#FFFFFF",
        textMuted: "#A7ABB3",
        border: "#24272D",
      },
      fontDisplay: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      fontMono: "'IBM Plex Mono', monospace",
      radiusSm: 0,
      radiusMd: 2,
      radiusLg: 4,
      radiusPill: 999,
      density: 1.0,
    },

    uxc: {
      name: "UXC",
      tagline: "Moderno · accesible · tecnológico.",
      voice: "Directa, entusiasta, clara. Cercana al producto.",
      primary: "#F7701D",
      primaryHover: "#E05E10",
      primaryPressed: "#B94B0A",
      primarySoft: "#FFEADB",
      onPrimary: "#FFFFFF",
      accent: "#14161B",
      text: "#14161B",
      textMuted: "#5A5E66",
      bg: "#FFFFFF",
      bgElev: "#FBF8F5",
      border: "#EFE9E2",
      fontDisplay: "'Montserrat', sans-serif",
      fontBody: "'Montserrat', sans-serif",
      fontMono: "'IBM Plex Mono', monospace",
      radiusSm: 6,
      radiusMd: 10,
      radiusLg: 16,
      radiusPill: 999,
      density: 1.0,
    },

    circulo: {
      name: "Círculo Plus",
      tagline: "Retail · beneficios · masivo pero premium.",
      voice: "Cálida, generosa, directa. Habla de recompensas y valor.",
      primary: "#EA212E",
      primaryHover: "#C81924",
      primaryPressed: "#9F1019",
      primarySoft: "#FEE8EA",
      onPrimary: "#FFFFFF",
      accent: "#14161B",
      text: "#14161B",
      textMuted: "#5A5E66",
      bg: "#FFFFFF",
      bgElev: "#FBF7F7",
      border: "#EFE5E6",
      fontDisplay: "'Mulish', 'Muli', sans-serif",
      fontBody: "'Mulish', 'Muli', sans-serif",
      fontMono: "'IBM Plex Mono', monospace",
      radiusSm: 6,
      radiusMd: 12,
      radiusLg: 20,
      radiusPill: 999,
      density: 1.05,
    },

    datacentral: {
      name: "Data Central",
      tagline: "Corporativo · data-driven · confiable.",
      voice: "Precisa, institucional, honesta. Respaldada por datos.",
      primary: "#0B50C5",
      primaryHover: "#0943A5",
      primaryPressed: "#063682",
      primarySoft: "#E5EEFB",
      onPrimary: "#FFFFFF",
      accent: "#5C8AD8",
      text: "#14161B",
      textMuted: "#5A5E66",
      bg: "#FFFFFF",
      bgElev: "#F5F7FB",
      border: "#E3E8F0",
      fontDisplay: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      fontMono: "'IBM Plex Mono', monospace",
      radiusSm: 2,
      radiusMd: 4,
      radiusLg: 8,
      radiusPill: 999,
      density: 0.95,
    },
  },
};

// ═══════════════════════════════════════════════════════════
//  3. ESQUEMA DEL CONTRATO DE TEMA
//  Cualquier marca nueva DEBE implementar estas claves.
//  Así el sistema escala sin romper componentes.
// ═══════════════════════════════════════════════════════════
window.GENESIS_THEME_SCHEMA = {
  // meta
  name: "string",
  tagline: "string",
  voice: "string",
  // color alias (obligatorios)
  primary: "hex",
  primaryHover: "hex",
  primaryPressed: "hex",
  primarySoft: "hex",
  onPrimary: "hex",
  accent: "hex",
  text: "hex",
  textMuted: "hex",
  bg: "hex",
  bgElev: "hex",
  border: "hex",
  // tipografía (obligatorios)
  fontDisplay: "css font-family stack",
  fontBody: "css font-family stack",
  fontMono: "css font-family stack",
  // radios (obligatorios)
  radiusSm: "number (px)",
  radiusMd: "number (px)",
  radiusLg: "number (px)",
  radiusPill: "number (px)",
  // densidad de paddings (1.0 = default)
  density: "number",
  // dark mode (opcional)
  dark: "object | undefined",
};
