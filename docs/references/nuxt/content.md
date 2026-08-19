# Content

Cómo funciona el contenido de página: **Nuxt Content 3 con YAML tipado**. Una página es un schema, una vista y un YAML por idioma.

| Pieza | Dónde | Papel |
|---|---|---|
| Schema zod | `shared/schemas/<pagina>.ts` | El contrato: tipa el YAML y las consultas de extremo a extremo |
| Colección | `content.config.ts`, clave `<pagina>_<locale>` | Registra el YAML con su schema |
| Contenido | `content/<locale>/pages/<pagina>.yml` | Solo datos: copy, enlaces, features — nunca markup |

- **El copy de página vive en `content/`**; los textos de interfaz (botones, navegación), en `app/locales/` — ver `i18n.md`.
- Ojo: con `type: page`, un `title`/`description` ausente **no rompe el build** — Nuxt Content lo deriva del fichero. El schema protege el tipado, no la completitud del YAML.
- Las vistas consultan con `usePage()` (`app/composables/page.ts`) y la clave `<pagina>_${locale.value}`, con `watch: [locale]` en el `useAsyncData`.
- El conector SQLite es el nativo de Node 24 (`sqliteConnector: 'native'`): sin dependencia extra; la base vive en `.data/` (ignorada).

## Añadir una página

1. Schema en `shared/schemas/<pagina>.ts`.
2. Colección `<pagina>_es` en `content.config.ts`.
3. YAML en `content/es/pages/<pagina>.yml`.
4. La vista consume con `usePage()` y define `useSeoMeta` desde el contenido.

## Añadir un idioma a una página

1. YAML en `content/<code>/pages/<pagina>.yml` con el mismo schema.
2. Colección `<pagina>_<code>` en `content.config.ts`.
