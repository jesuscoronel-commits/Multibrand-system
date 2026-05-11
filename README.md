# Handoff: Multi-Brand Design System

## Overview
Sistema de diseño multi-marca escalable con 4 themes intercambiables (Zamna, UXC, Círculo Plus, Data Central). Un solo conjunto de componentes, un theme por marca. Cero duplicación.

## About the Design Files
Los archivos de este bundle son **referencias de diseño construidas en HTML + React (vía Babel standalone)** — prototipos que muestran intención visual y comportamiento, no código de producción para copiar tal cual. La tarea es **recrear estos diseños en el entorno del codebase destino** (React, Vue, SwiftUI, native, etc.) usando sus patrones establecidos. Si no hay entorno aún, elegir el framework apropiado.

## Fidelity
**High-fidelity.** Colores, tipografías, radios y espaciados son los valores finales. Recrea pixel-perfect usando la librería del codebase.

## Architecture (3 token layers)

### Layer 1 — Global tokens (compartidos)
Definidos en `tokens.js` bajo `window.GENESIS_TOKENS`:
- `palette.neutral` — escala 0→950 (12 pasos)
- `typeScale` — 11 pasos (font-display-1 a font-caption) con px/rem/lh/weight/letterSpacing
- `spacing` — 15 pasos, base 4px
- `radii` — none/sm/md/lg/xl/pill
- `elevation` — 0→4
- `semantic` — success/warning/danger/info (no cambian por marca)

### Layer 2 — Brand themes
Cada marca implementa el mismo contrato (`GENESIS_THEME_SCHEMA`):

| Brand | primary | fontDisplay | radiusSm/Md/Lg | density |
|---|---|---|---|---|
| **Zamna** | `#000000` | Inter | 0/2/4 | 1.0 |
| **UXC** | `#F7701D` | Montserrat | 6/10/16 | 1.0 |
| **Círculo Plus** | `#EA212E` | Mulish | 6/12/20 | 1.05 |
| **Data Central** | `#0B50C5` | Inter | 2/4/8 | 0.95 |

Todas comparten: `primaryHover`, `primaryPressed`, `primarySoft`, `onPrimary`, `accent`, `text`, `textMuted`, `bg`, `bgElev`, `border`, `fontBody`, `fontMono`, `radiusPill`.

### Layer 3 — CSS alias variables (lo que los componentes leen)
Definidas en `base.css` bajo `.brand-zamna`, `.brand-uxc`, `.brand-circulo`, `.brand-datacentral`:
- `--brand-primary` / `--brand-primary-hover` / `--brand-primary-pressed` / `--brand-primary-soft` / `--brand-on-primary`
- `--brand-accent` / `--brand-text` / `--brand-text-muted`
- `--brand-bg` / `--brand-bg-elev` / `--brand-border`
- `--brand-font-display` / `--brand-font-body` / `--brand-font-mono`
- `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-pill`
- `--density`

**Regla clave:** los componentes JAMÁS hardcodean colores o fuentes. Solo leen variables `--brand-*`.

## Components
Ubicados en `components.jsx`:

### GButton
- Variants: `primary` | `secondary` | `tertiary` | `outline`
- Sizes: `lg` (py 14, px 20, fs 16) | `md` (py 10, px 16, fs 14) | `sm` (py 6, px 12, fs 13)
- States: `default` | `hover` | `pressed` | `disabled`
- Props: icon, children
- Padding vertical se multiplica por `var(--density)`

### GInput
- Sizes: `lg` | `md` | `sm`
- States: `default` | `focus` | `error` | `disabled`
- Props: label, placeholder, hint, value, leading (icon)
- Focus usa `--brand-primary` con shadow `0 0 0 3px color-mix`
- Error usa `--color-danger` (global)

### GBadge
- Tones: `brand` | `neutral` | `success` | `warning` | `danger` | `info`
- Props: dot (bool), children
- border-radius: `--radius-pill`

### GTag
- Variants: `primary` | `secondary` | `outline` | `soft`
- Props: onClose (removable)
- border-radius: `--radius-sm`

### GCard
- Props: eyebrow, title, body, footer, image (CSS background)
- Width 300, border-radius: `--radius-lg`

## Design Tokens

### Neutral scale
```
N-0:  #FFFFFF   N-500: #7B7F87
N-50: #F8F9FA   N-600: #5A5E66
N-100:#F1F3F5   N-700: #3E4148
N-200:#E6E8EC   N-800: #24272D
N-300:#D0D3D9   N-900: #14161B
N-400:#A7ABB3   N-950: #0A0B0E
```

### Semantic (shared)
```
success: #0E8A3E
warning: #C47A00
danger:  #D6213D
info:    #0B50C5
```

### Type scale
11 pasos (display-1 72px → caption 12px). Ver `tokens.js › typeScale`.

### Spacing
Base 4px. Pasos: 0, 2px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px.

## Fonts (self-hosted en /fonts/)
- **Inter** — 18 archivos (Thin→Black + italics) · Zamna + Data Central
- **Inter Display** — 8 archivos (28pt optical para titulares) · disponible como opcional
- **Montserrat** — 18 archivos (Thin→Black + italics) · UXC
- **Mulish** — 16 archivos (ExtraLight→Black + italics) · Círculo Plus
- **IBM Plex Mono** — vía Google Fonts CDN · para código/mono

## How to add a new brand (3 steps, zero component changes)

1. Agrega un objeto a `GENESIS_TOKENS.brands.<slug>` en `tokens.js` implementando el contrato `GENESIS_THEME_SCHEMA`.
2. Declara `.brand-<slug> { --brand-primary: ...; --brand-font-display: ...; ... }` en `base.css`.
3. Aplica `className="brand-<slug>"` al root. Todos los componentes adoptan el theme automáticamente.

## Files in this handoff
- `Multi-Brand DS.html` — Shell del sitio (topbar, brand tabs, token export drawer)
- `base.css` — Reset + layout + 4 brand themes + @font-face de Inter/Montserrat/Mulish
- `tokens.js` — GENESIS_TOKENS (global + 4 brands) + GENESIS_THEME_SCHEMA
- `components.jsx` — GButton, GInput, GBadge, GTag, GCard, BrandPreview, Swatch, Demo, Icon
- `pages.jsx` — OverviewPage, FoundationsPage, ComponentsPage
- `fonts/` — Inter, Montserrat, Mulish (TTF, self-hosted)

## Implementation notes
- El shell usa React 18.3.1 + Babel standalone (prototipo). Para producción, migra a React compilado o al framework destino.
- El Token Drawer exporta el theme activo como CSS vars o JSON — útil como referencia para Tailwind config, CSS modules, styled-components, etc.
- `localStorage` persiste la marca activa (`genesis.brand`) y la página (`genesis.page`).
- `color-mix(in srgb, ...)` se usa para focus shadows y semantic backgrounds — fallback si el target no soporta CSS Color Level 5.
