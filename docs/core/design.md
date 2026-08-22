# Diseño

La identidad visual y sus reglas. Referencia de estilo: **ui.nuxt.com** — limpio, aire generoso, jerarquía clara — con **un toque dev**.

## Paleta

| Rol | Color | Uso |
|---|---|---|
| `primary` | fuchsia | Marca y acción: enlaces, CTAs, foco |
| `secondary` | lime | Acento puntual; nunca compite con primary |
| `neutral` | slate | Texto, fondos, bordes |

- Definida en `app/config/ui.ts`; los componentes usan los alias semánticos (`primary`, `muted`…), nunca el color directo.
- Color mode `system`: **todo diseño debe funcionar igual de bien en claro y oscuro**.

## Tipografías

| Familia | Token | Uso |
|---|---|---|
| Inter | `font-sans` | Todo: cuerpo, títulos, UI |
| JetBrains Mono | `font-mono` | Eyebrows, rutas, código, versiones y detalles dev — **nunca el cuerpo** |

- Declaradas en `app/assets/css/theme.css` (`@theme`); las descarga el `@nuxt/fonts` integrado en Nuxt UI.

## Toque dev

- **Eyebrows/headlines en mono con forma de ruta o fichero**: `~/articles`, `CHANGELOG.md` — sobre los títulos de sección.
- **Vocabulario de código con intención en el copy**: try/catch en la narrativa, versiones semver visibles, commits y PRs enlazados. Con sentido, no como decoración.
- **Detalles de terminal con moderación**: cursor parpadeante, prefijos `$`, marcos tipo ventana de terminal — uno por vista como mucho.
- Los títulos display van en `font-sans`: el mono es acento, no protagonista.
