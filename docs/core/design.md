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

## Lenguaje cuántico

La física cuántica es el lenguaje visual compartido. Se expresa con partículas, órbitas, ondas, estados, saltos discretos, interferencias y glitch.

- **Toda la aplicación comparte un único campo de partículas determinista.** El fondo mantiene la misma intensidad y un aura continua de fucsia a lima en todas las rutas. No se generan posiciones aleatorias durante SSR.
- Las vistas de lectura usan superficies translúcidas para conservar contraste y reducir la intensidad del fondo.
- Fucsia y lima representan estados complementarios. El brillo refuerza jerarquía; no convierte todas las superficies en neón.
- Header y footer se integran en el campo mediante cristal translúcido y líneas de energía degradadas, sin cortar visualmente el fondo.
- Las primitivas cuánticas se reutilizan. Ninguna página mantiene su propia implementación de partículas.
- `prefers-reduced-motion: reduce` elimina el movimiento no esencial y conserva una composición estática equivalente.
- Las animaciones usan transformaciones y opacidad. No provocan layout shift ni desbordamiento horizontal.

## Voz cósmica

El copy editorial usa el universo, el misterio cósmico y la física cuántica como marco narrativo para explicar el desarrollo de la web.

- **Cada metáfora conecta un fenómeno científico con una experiencia concreta de construir software**: decisiones, errores, arquitectura, despliegues o aprendizaje.
- La precisión científica va antes que el efecto. Hipótesis, paradojas y problemas abiertos no se presentan como hechos resueltos.
- La referencia cósmica ayuda a entender el desarrollo; no lo sustituye. Cada copy aterriza en una consecuencia técnica o humana.
- El tono es curioso, misterioso y sobrio. Sin grandilocuencia, acumulación de jerga ni ciencia ficción decorativa.
- Un copy corto desarrolla una sola metáfora central.
