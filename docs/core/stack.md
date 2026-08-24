# Stack

Las tecnologías de la aplicación y con qué papel.

| Pieza | Elección | Papel |
|---|---|---|
| Framework | **Nuxt 4** (Vue 3, Nitro) | Aplicación web con SSR |
| Lenguaje | **TypeScript** (línea 6) | typescript-eslint aún no soporta TS 7; se subirá cuando lo soporte |
| Runtime | **Node ≥ 24** | Fijado en `engines` de `package.json` |
| Paquetes | **pnpm 11** | Fijado en `packageManager` (Corepack); los build scripts se aprueban en `pnpm-workspace.yaml` |
| UI | **Nuxt UI 4** (Tailwind CSS 4) | Componentes y tema; colores en `app/config/ui.ts`, fuentes en `theme.css` (Inter + JetBrains Mono), iconos lucide servidos en local (`@iconify-json/lucide`) |
| Contenido | **Nuxt Content 3** | Copy de página en YAML tipado con zod, una colección por página e idioma; SQLite nativo de Node |
| Validación HTTP | **Zod 4** | Schemas de entrada para los endpoints del BFF |
| Datos de releases | **GitHub Releases vía ungh** | Notas publicadas que alimentan la página `/releases` |
| i18n | **@nuxtjs/i18n** | Castellano como idioma base sin prefijo (`prefix_except_default`); preparado para catalán e inglés |
| Lint y formato | **ESLint** con `@nuxt/eslint-config` standalone y `stylistic` | Una sola herramienta para calidad y formato; sin Prettier |
| Tipos | **vue-tsc** vía `pnpm typecheck` | Verificación completa de tipos |
| Git hooks | **husky** | `pre-commit`: lint + typecheck; `commit-msg`: commitlint |
| Mensajes de commit | **commitlint** (`config-conventional`, en `package.json`) | Conventional commits completos |
| Versionado | **release-please** | SemVer y notas de release automatizadas — ver `docs/references/github/releases.md` |
| Despliegue | **Vercel** | Continuous deployment desde `main` — ver `docs/references/github/deployment.md` |

- **Quien añade o cambia una pieza del stack actualiza esta tabla en el mismo cambio.**
