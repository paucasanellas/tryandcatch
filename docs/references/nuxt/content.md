# Content

Cómo funciona el contenido de página: **Nuxt Content 3 con YAML tipado detrás del BFF**. Una página es un schema, un endpoint, una vista y un YAML por idioma.

| Pieza | Dónde | Papel |
|---|---|---|
| Schema zod | `shared/schemas/<pagina>.ts` | El contrato: tipa el YAML y las consultas de extremo a extremo |
| Colección | `content.config.ts`, clave `<pagina>_<locale>` | Registra el YAML con su schema |
| Contenido | `content/<locale>/pages/<pagina>.yml` | Solo datos: copy, enlaces, features — nunca markup |
| Endpoint | `server/api/pages/<pagina>/index.get.ts` | Expone el contrato propio de la página |

- **El copy de página vive en `content/`**; los textos de interfaz (botones, navegación), en `app/locales/` — ver `i18n.md`.
- Cada schema y YAML usa `{ title, description, content }`. `content` contiene la estructura editorial específica de la página.
- Ojo: con `type: page`, un `title`/`description` ausente **no rompe el build** — Nuxt Content lo deriva del fichero. El schema protege el tipado, no la completitud del YAML.
- **Las vistas no consultan Nuxt Content.** Consumen su endpoint mediante un composable y envían solo el locale.
- `ContentPageRepository` construye `<pagina>_<locale>`, obtiene el evento actual con `useEvent()` y consulta `title`, `description` y `content`.
- `PageFinder` devuelve cualquier página sin conocer su contenido concreto y convierte el resultado al genérico solicitado por el endpoint.
- Cada endpoint valida su query con un schema Zod 4 del contexto y `getValidatedQuery`.
- El conector SQLite es el nativo de Node 24 (`sqliteConnector: 'native'`): sin dependencia extra; la base vive en `.data/` (ignorada).

## Añadir una página

1. Schema en `shared/schemas/<pagina>.ts`.
2. Colección `<pagina>_es` en `content.config.ts`.
3. YAML en `content/es/pages/<pagina>.yml`.
4. Tipos públicos de contenido y respuesta en `shared/types/`.
5. Endpoint `GET /api/pages/<pagina>?locale=<code>` que delega en `PageFinder`.
6. Composable de página que consume el endpoint.
7. La vista usa el composable y define `useSeoMeta` desde la respuesta.

## Añadir un idioma a una página

1. YAML en `content/<code>/pages/<pagina>.yml` con el mismo schema.
2. Colección `<pagina>_<code>` en `content.config.ts`.
