# Scripts

Los scripts de `package.json` y cuándo ejecutarlos.

| Script | Qué hace | Cuándo |
|---|---|---|
| `pnpm dev` | Servidor de desarrollo en `http://localhost:3000` | Al trabajar en la aplicación |
| `pnpm lint` | ESLint sobre todo el proyecto | Antes de dar un cambio por bueno; el `pre-commit` lo lanza solo |
| `pnpm lint:fix` | ESLint arreglando lo autoarreglable (incluido el formato) | Cuando el lint falla por reglas autoarreglables |
| `pnpm typecheck` | Verificación completa de tipos (vue-tsc) | Antes de dar un cambio por bueno; el `pre-commit` lo lanza solo |
| `pnpm build` | Build de producción | Para verificar que el proyecto compila como en producción |
| `pnpm preview` | Sirve el build de producción en local | Para probar el resultado real de `build` |
| `pnpm generate` | Genera el sitio estático | No se usa de momento; el deploy es SSR en Vercel |

- `postinstall` (`nuxt prepare`) y `prepare` (`husky`) **se ejecutan solos con `pnpm install`**: nunca a mano.
- **Quien añade o cambia un script actualiza esta tabla en el mismo cambio.**
