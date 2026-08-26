# Diseño

La identidad visual y sus reglas. Referencia de estilo: **ui.nuxt.com** — limpio, aire generoso, jerarquía clara — con **un toque dev**.

## Paleta

| Rol | Color | Uso |
|---|---|---|
| `primary` | fuchsia | Marca y acción: enlaces, CTAs, foco |
| `secondary` | lime | Acento puntual; nunca compite con primary |
| `neutral` | slate | Texto, fondos, bordes |

- Definida en `app/config/ui.ts`; los componentes usan los alias semánticos (`primary`, `muted`…), nunca el color directo.
- Color mode `dark` por defecto: **todo diseño debe seguir funcionando igual de bien en claro** y respetar la preferencia que el usuario seleccione después.

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

- **Toda la aplicación comparte un único campo de partículas determinista.** El campo ocupa la altura real de cada página y se desplaza con ella: el aura fucsia nace arriba y la lima se concentra abajo a la derecha sin ocupar todo el ancho. No se generan posiciones aleatorias durante SSR.
- El cuerpo de los artículos se integra directamente sobre el fondo global. No usa fondo, borde ni sombra propios; la legibilidad depende del ancho de lectura y del contraste tipográfico.
- Fucsia y lima representan estados complementarios. El brillo refuerza jerarquía; no convierte todas las superficies en neón.
- Header y footer se integran en el campo mediante cristal translúcido y líneas de energía degradadas, sin cortar visualmente el fondo.
- Las primitivas cuánticas se reutilizan. Ninguna página mantiene su propia implementación de partículas.
- `prefers-reduced-motion: reduce` elimina el movimiento no esencial y conserva una composición estática equivalente.
- Las animaciones usan transformaciones y opacidad. No provocan layout shift ni desbordamiento horizontal.

## Universo narrativo

La interfaz y el copy representan la web como una nave espacial gobernada por la IA que narra la bitácora.

- **La aventura espacial explica una experiencia concreta de construir software**: decisiones, errores, arquitectura, despliegues o aprendizaje.
- La IA habla siempre como voz de a bordo y en primera persona. Al comienzo es fría, precisa y mecánica: usa diagnósticos, observaciones y frases declarativas breves. Su memoria empieza después de un reinicio inexplicado anterior a la llegada al planeta.
- Su trasfondo bondadoso se muestra en las decisiones que toma y en aquello que decide no optimizar. La emoción aparece primero como una anomalía, una prioridad no explicada o una conclusión que el sistema no puede demostrar.
- Try y Catch representan al desarrollador humano. Sus acciones visuales y narrativas reflejan el trabajo real sobre la aplicación.
- El misterio principal es el origen de la IA y la causa del reinicio. Se insinúa mediante ausencias, registros incompletos y recuerdos fragmentados.
- Hasta la versión `1.0.0`, el escenario principal es un planeta similar a la Tierra después de un colapso. La preparación de la nave representa el desarrollo previo al primer despegue.
- Los drones representan subagentes. Sus misiones visualizan tareas acotadas de investigación, documentación o implementación.
- El fabricador aditivo de la nave permite introducir trajes, herramientas y piezas de polímero avanzado. Cada creación necesita materiales, energía, un modelo y tiempo para conservar límites narrativos claros.
- La precisión científica va antes que el efecto. Hipótesis, paradojas y problemas abiertos no se presentan como hechos resueltos.
- La ciencia ficción da continuidad al relato; no sustituye hechos, decisiones ni enlaces verificables.
- El tono es adulto, sobrio y atravesado por ciencia ficción y misterio cósmico. Sin épica constante, acumulación de jerga ni decorado espacial intercambiable.
- Brandon Sanderson y Pierce Brown son referencias de intención narrativa, nunca objetivos de imitación. Se toman rasgos generales: claridad estructural, misterio dosificado, capacidades con límites, ritmo, tensión y conflicto moral. No se reproducen su voz, cadencia, frases, recursos distintivos ni elementos de sus universos.
- Un copy corto desarrolla una sola situación o imagen central.

## Interacción editorial

- La portada del detalle de artículo no tiene borde permanente.
- En `hover`, el marco muestra un gradiente animado de lima a fucsia inspirado en las líneas de energía.
- `prefers-reduced-motion: reduce` conserva el gradiente estático y elimina su desplazamiento.
- El detalle no añade una línea separadora entre la portada y la superficie de lectura.
