# Stack

Las tecnologías de la aplicación y con qué papel.

| Pieza | Elección | Papel |
|---|---|---|
| Framework | **Nuxt 4** (Vue 3, Nitro) | Aplicación web con SSR |
| Lenguaje | **TypeScript** (línea 6) | typescript-eslint aún no soporta TS 7; se subirá cuando lo soporte |
| Runtime | **Node ≥ 24** | Fijado en `engines` de `package.json` |
| Paquetes | **pnpm 11** | Fijado en `packageManager` (Corepack); los build scripts se aprueban en `pnpm-workspace.yaml` |
| Lint y formato | **ESLint** con `@nuxt/eslint-config` standalone y `stylistic` | Una sola herramienta para calidad y formato; sin Prettier |
| Tipos | **vue-tsc** vía `pnpm typecheck` | Verificación completa de tipos |
| Git hooks | **husky** | `pre-commit`: lint + typecheck; `commit-msg`: commitlint |
| Mensajes de commit | **commitlint** (`config-conventional`, en `package.json`) | Conventional commits completos |
| Versionado | **release-please** | SemVer y changelog automatizados — ver `docs/references/github/releases.md` |
| Despliegue | **Vercel** | Continuous deployment desde `main` — ver `docs/references/github/deployment.md` |

- **Quien añade o cambia una pieza del stack actualiza esta tabla en el mismo cambio.**
