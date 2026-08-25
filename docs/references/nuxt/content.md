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

## Artículos

Los artículos son documentos Markdown y no siguen el contrato `{ title, description, content }` de las páginas editoriales.

| Pieza | Dónde | Papel |
|---|---|---|
| Schema zod | `shared/schemas/articles.ts` | Valida el frontmatter y habilita `rawbody` |
| Colección | `content.config.ts`, clave `articles_<locale>` | Registra los Markdown del idioma |
| Contenido | `content/<locale>/articles/<slug>.md` | Frontmatter y cuerpo editorial |
| Endpoint de listado | `server/api/pages/articles/index.get.ts` | Devuelve el contenido editorial y los resúmenes del locale |
| Endpoint | `server/api/pages/articles/[slug].get.ts` | Devuelve un artículo por slug y locale |

- **La vista tampoco consulta directamente la colección de artículos.** Consume el endpoint mediante `useArticles()`.
- El copy de `/articulos` vive en `content/<locale>/pages/articles.yml`. Su colección se llama `articles_page_<locale>` para no colisionar con los documentos `articles_<locale>`.
- El listado selecciona solo frontmatter y `stem`, deriva el slug y ordena por `publishedAt` descendente. No recupera `rawbody`.
- No existe estado de borrador ni filtrado por fecha: todo Markdown desplegado pertenece al listado.
- `rawbody` permite que infraestructura recupere el Markdown original. El BFF lo expone como `content`; no filtra tipos internos de Nuxt Content.
- El repositorio busca `content/<locale>/articles/<slug>.md` mediante su `stem`.
- El contrato editorial, sus categorías y campos viven en `docs/references/content/articles.md`.
