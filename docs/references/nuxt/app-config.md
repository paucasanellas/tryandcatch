# App Config

`app/app.config.ts` se mantiene limpio: solo importa y compone.

- La configuración real vive en `app/config/*.ts`, un fichero por concepto, y se importa en el app.config (`config/ui.ts` → `ui`).
- `config/ui.ts` es el theming global de Nuxt UI: colores semánticos y overrides de slots/variants por componente. Lo que se repita instancia a instancia se configura aquí, no con el prop `ui` inline.
- Datos de app siguen el mismo patrón: `config/<concepto>.ts` → `<concepto>` (por ejemplo, `config/navigation.ts` → `navigation` con los ítems de navegación): solo claves de i18n, nunca texto; el `$t` y el estado activo (depende de la ruta) se resuelven en el componente que pinta.
