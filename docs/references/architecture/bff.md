# BFF

Cómo organizar el servidor de Nuxt como Backend for Frontend.

## Objetivo

El BFF entrega a la aplicación datos preparados para su consumo.

- **El frontend no conoce proveedores externos ni transforma sus respuestas.**
- **Toda llamada a un servicio externo pasa primero por el BFF.** La aplicación solo consume endpoints propios.
- El servidor controla el contrato que consume la interfaz.
- Los cambios de un proveedor quedan aislados en infraestructura.
- Los endpoints pueden aplicar caché, validación y una política de errores común.
- El SSR puede llamar a endpoints internos de Nitro sin una petición HTTP adicional.

El BFF no es una API genérica para terceros. Sus endpoints responden a las necesidades de la aplicación.

## Estructura

**El código es la fuente de verdad de la estructura.** Para consultarla:

```sh
find server shared/types -type f | sort
```

### Endpoints

Los endpoints ligados a la interfaz reflejan la estructura que los consume.

| Consumidor | Fichero | Ruta HTTP |
|---|---|---|
| Página `/` | `server/api/pages/home/index.get.ts` | `GET /api/pages/home?locale=<code>` |
| Página `/releases` | `server/api/pages/releases/index.get.ts` | `GET /api/pages/releases?locale=<code>` |
| Página `/articulos/[slug]` | `server/api/pages/articles/[slug].get.ts` | `GET /api/pages/articles/<slug>?locale=<code>` |

Los casos que no pertenecen a una página ni al arranque de la aplicación usan su propio contexto. Un formulario de contacto puede exponer `server/api/contact/index.post.ts` y delegar en `server/contexts/contact/`.

### Contextos

- Se nombran por capacidad de negocio: `releases`, `contact`.
- Un contexto no importa otro contexto concreto.
- Las piezas reutilizables y sin significado de negocio viven en `contexts/shared/`.
- `shared/` no contiene reglas de negocio.
- `contexts/di/` contiene únicamente la composición del servidor.

### Capas

| Capa | Responsabilidad | Puede depender de |
|---|---|---|
| Domain | Entidades, errores y puertos | Nada de Nuxt, Nitro ni proveedores |
| Application | Casos de uso y reglas de orquestación | Domain |
| Infrastructure | Adaptadores | Domain y tecnología concreta |
| DI container | Construcción y exposición de casos de uso | Todas las capas necesarias |
| Nitro plugin | Creación del contenedor durante el arranque | DI container y Nitro |
| Endpoint | Transporte, caché, contrato HTTP y delegación al caso de uso | Nitro y el contenedor |

Flujo de dependencias:

```text
container plugin
  -> createServerContainer
    -> ArticleFinder
      -> ArticleRepository
        <- ContentArticleRepository
          -> queryCollection
    -> PageFinder
      -> PageRepository
        <- ContentPageRepository
          -> queryCollection
    -> ReleaseSearcher
      -> ReleaseRepository
        <- GithubReleaseRepository
          -> GithubReleaseMapper
          -> GithubReleaseResponse
          -> HttpClient
            <- NitroFetchHttpClient

page endpoint
  -> useServerContainer
    -> NitroApp.container.pageFinder
    -> NitroApp.container.releaseSearcher
```

El endpoint y `NitroFetchHttpClient` pueden depender de Nitro. Las entidades, el repositorio de dominio y el caso de uso no dependen del framework.

## Convenciones

### Casos de uso

| Sufijo | Uso |
|---|---|
| `Searcher` | Recupera una colección mediante criterios o reglas |
| `Finder` | Recupera una entidad concreta |
| `Creator` | Crea una entidad |
| `Updater` | Modifica una entidad |
| `Deleter` | Elimina una entidad |

La página de releases necesita una colección. El caso de uso se llama `ReleaseSearcher`. `ReleaseFinder` se reserva para recuperar una release concreta.

### Endpoints

- Obtienen los casos de uso desde el contenedor.
- Traducen el resultado de aplicación al contrato HTTP.
- Traducen errores conocidos a errores HTTP.
- Validan los datos de petición antes de delegar en los casos de uso.
- La infraestructura ligada a la petición obtiene el evento activo mediante `useEvent()`; `H3Event` no se propaga por dominio ni aplicación.
- No construyen repositorios ni clientes.

### Repositorios

- El dominio define la interfaz.
- Infraestructura implementa la interfaz para un proveedor.
- El nombre identifica el proveedor: `GithubReleaseRepository`.
- La respuesta externa nunca sale del repositorio.

### Contratos y mappers de proveedor

- La respuesta externa se tipa dentro del adaptador, nunca como `unknown`.
- Los contratos externos solo contienen tipos.
- Los mappers convierten los primitivos externos al dominio y no guardan estado.
- La entidad de dominio valida todos sus datos antes de crearse.
- No devuelve valores parciales ni inventa datos obligatorios.
- Una respuesta inválida produce un error tipado.

### Entidades

- Usan clases.
- Sus propiedades usan primitivos.
- El constructor es privado y la creación pasa por un método estático que valida sus invariantes.
- No se crean value objects mientras el dominio no los necesite.

### Tipos públicos

Los contratos compartidos entre servidor y aplicación viven en `shared/types/`. Los tipos de un proveedor son privados de su adaptador. Las páginas usan `PageResponse<Content>` para concretar el contenido editorial sin introducir tipos de presentación en dominio o aplicación.

## Contenido de página

`PageFinder` recupera cualquier página mediante `{ page, locale }`. Dominio representa su contenido como `unknown`; el finder conserva esa frontera y devuelve el genérico solicitado por el endpoint.

`ContentPageRepository` construye la colección `<page>_<locale>`, la tipa explícitamente como `'home_es'` y consulta únicamente `title`, `description` y `content`. El literal evita un tipo calculado dependiente del resto de colecciones.

`experimental.asyncContext` mantiene el evento de la petición disponible después de atravesar endpoint, caso de uso y repositorio. El contenedor conserva una única instancia stateless del adaptador.

El locale llega como `?locale=<code>`. Cada página define su schema de query con Zod 4 y el endpoint lo aplica mediante `getValidatedQuery`; valores ausentes, vacíos o repetidos producen un 400. El nombre de la página lo fija cada endpoint; el frontend nunca construye nombres de colección.

Home concreta el contrato genérico en `shared/types/home.ts`:

```ts
export type HomeContent = {
  hero: HomeHero
}

export type GetHomeResponse = {
  page: PageResponse<HomeContent>
}
```

## Artículos

`ArticleFinder` recupera un artículo concreto mediante `{ slug, locale }`. `ContentArticleRepository` construye `articles_<locale>`, busca el `stem` `<locale>/articles/<slug>` y convierte `rawbody` en `content`. El contrato privado de Nuxt Content vive en `server/contexts/articles/infrastructure/ContentArticle.ts`.

El contrato público no expone `body`, `rawbody` ni tipos de Nuxt Content:

```ts
export type GetArticleResponse = {
  article: {
    title: string
    description: string
    publishedAt: string
    readingTime: number
    author: string
    categories: Array<'producto' | 'frontend'>
    image: {
      src: string
      alt: string
    }
    content: string
  }
}
```

- `Article` valida los primitivos antes de salir de infraestructura.
- `ArticleFinder` convierte un resultado nulo en `ArticleNotFoundError`.
- `InvalidArticleError` representa contenido que no se puede consultar o procesar.
- El endpoint valida slug y locale antes de llamar al caso de uso.
- La página entrega `content` a MDC para renderizar el Markdown durante SSR.

## Ejemplo: releases

La página `/releases` obtiene los datos de ungh. El BFF oculta ese proveedor y devuelve un contrato propio.

### Contrato público

`shared/types/pages.ts` define la forma compartida y `shared/types/releases.ts` concreta el contenido editorial y los datos de ungh:

```ts
export type PageResponse<Content> = {
  title: string
  description: string
  content: Content
}

export type ReleasesContent = {
  hero: ReleasesListHero
}

export type Release = {
  tag: string
  title: string
  publishedAt: string
  content: string
  url: string
  compareUrl: string | null
  prerelease: boolean
}

export type GetReleasesResponse = {
  page: PageResponse<ReleasesContent>
  releases: Release[]
}
```

`GET /api/pages/releases` garantiza:

- Un objeto `{ page, releases }` como raíz.
- `page` contiene `title`, `description` y `content` editorial tipado.
- Drafts excluidas.
- Prereleases incluidas y marcadas con `prerelease`.
- Releases ordenadas por `publishedAt` descendente.
- Fechas válidas en el formato entregado por GitHub.
- `title` con el nombre publicado o el tag como fallback.
- `compareUrl` con una URL o `null`.
- `content` con Markdown sin el encabezado técnico generado por release-please.
- `content` conserva las Highlights y secciones de release-please sin clasificarlas ni normalizarlas en el BFF.

### Cliente HTTP

`server/contexts/shared/domain/http/HttpClient.ts` define un puerto pequeño y reutilizable:

```ts
export interface HttpClient {
  request<T>(url: string, options?: unknown): Promise<T>
}
```

`server/contexts/shared/infrastructure/http/NitroFetchHttpClient.ts` adapta `$fetch` al puerto:

```ts
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack/types'
import type { HttpClient } from '~~/server/contexts/shared/domain/http/HttpClient'

export class NitroFetchHttpClient implements HttpClient {
  request<T>(url: string, options: unknown = {}) {
    return $fetch<T>(url, options as NitroFetchOptions<NitroFetchRequest>) as Promise<T>
  }
}
```

El puerto no expone tipos de Nitro. Las opciones permanecen `unknown` hasta que el adaptador las convierte en `NitroFetchOptions<NitroFetchRequest>`. Un test puede sustituir el adaptador por una implementación en memoria.

### Dominio

`server/contexts/releases/domain/Release.ts` contiene primitivos. `draft` permanece en dominio para que la implementación del repositorio pueda descartar borradores después de validar y mapear toda la respuesta.

```ts
import { InvalidReleaseError } from '~~/server/contexts/releases/domain/ReleaseErrors'

export type ReleasePrimitives = {
  tag: string
  title: string
  publishedAt: string
  content: string
  url: string
  compareUrl: string | null
  draft: boolean
  prerelease: boolean
}

export class Release {
  private constructor(
    readonly tag: string,
    readonly title: string,
    readonly publishedAt: string,
    readonly content: string,
    readonly url: string,
    readonly compareUrl: string | null,
    readonly draft: boolean,
    readonly prerelease: boolean,
  ) {}

  static create(release: ReleasePrimitives) {
    this.ensureReleaseIsValid(release)

    return new Release(
      release.tag,
      release.title,
      release.publishedAt,
      release.content,
      release.url,
      release.compareUrl,
      release.draft,
      release.prerelease,
    )
  }

  private static ensureReleaseIsValid(release: ReleasePrimitives) {
    if (typeof release?.tag !== 'string') {
      throw new InvalidReleaseError('Release tag must be a string')
    }

    if (typeof release.title !== 'string') {
      throw new InvalidReleaseError('Release title must be a string')
    }

    if (typeof release.publishedAt !== 'string') {
      throw new InvalidReleaseError('Release published date must be a string')
    }

    if (Number.isNaN(Date.parse(release.publishedAt))) {
      throw new InvalidReleaseError('Release published date must be valid')
    }

    if (typeof release.content !== 'string') {
      throw new InvalidReleaseError('Release content must be a string')
    }

    if (typeof release.url !== 'string') {
      throw new InvalidReleaseError('Release URL must be a string')
    }

    if (release.compareUrl !== null && typeof release.compareUrl !== 'string') {
      throw new InvalidReleaseError('Release compare URL must be a string or null')
    }

    if (typeof release.draft !== 'boolean') {
      throw new InvalidReleaseError('Release draft must be a boolean')
    }

    if (typeof release.prerelease !== 'boolean') {
      throw new InvalidReleaseError('Release prerelease must be a boolean')
    }
  }
}
```

`server/contexts/releases/domain/ReleaseErrors.ts` representa cualquier release que no se puede procesar. Hereda la semántica HTTP 422 de `UnprocessableEntityError`:

```ts
import { UnprocessableEntityError } from '~~/server/contexts/shared/domain/DomainErrors'

export class InvalidReleaseError extends UnprocessableEntityError {
  constructor(override readonly cause: string) {
    super(cause)
  }
}
```

La causa identifica la invariante concreta que no se puede procesar y se convierte en el mensaje HTTP.

`server/contexts/releases/domain/ReleaseRepository.ts` define el puerto de salida:

```ts
import type { Release } from '~~/server/contexts/releases/domain/Release'

export interface ReleaseRepository {
  search(): Promise<Release[]>
}
```

### Contrato y mapper de GitHub

`server/contexts/releases/infrastructure/GithubRelease.ts` contiene únicamente los tipos del contrato externo:

```ts
export type GithubReleaseResponse = {
  tag: string
  name?: string | null
  draft: boolean
  prerelease: boolean
  publishedAt: string
  markdown: string
}

export type GithubReleasesResponse = {
  releases: GithubReleaseResponse[]
}
```

`server/contexts/releases/infrastructure/GithubReleaseMapper.ts` convierte cada respuesta al dominio:

```ts
import { Release } from '~~/server/contexts/releases/domain/Release'
import type { GithubReleaseResponse } from '~~/server/contexts/releases/infrastructure/GithubRelease'

export class GithubReleaseMapper {
  toDomain(response: GithubReleaseResponse, repositoryUrl: string) {
    const { content, compareUrl } = this.parseMarkdown(response.markdown)

    return Release.create({
      tag: response.tag,
      title: response.name?.trim() || response.tag,
      publishedAt: response.publishedAt,
      content,
      url: `${repositoryUrl}/releases/tag/${encodeURIComponent(response.tag)}`,
      compareUrl,
      draft: response.draft,
      prerelease: response.prerelease,
    })
  }

  private parseMarkdown(markdown: string) {
    const [heading = '', ...body] = markdown.split('\n')
    const compareUrl = heading.match(/\]\((https:\/\/github\.com\/[^)]+\/compare\/[^)]+)\)/)?.[1] ?? null
    const content = heading.startsWith('## ')
      ? body.join('\n').trim()
      : markdown

    return {
      content,
      compareUrl,
    }
  }
}
```

`GithubReleaseResponse` representa el JSON plano que recibe `$fetch`. `GithubReleaseMapper` no guarda estado: `toDomain` recibe cada respuesta y la convierte mediante `Release.create`. El mapper solo extrae `compareUrl` y retira el primer encabezado técnico. `Release` valida los primitivos finales. release-please es responsable de estructurar las notas; el BFF no interpreta, reordena ni agrupa sus secciones.

### Repositorio de GitHub

`server/contexts/releases/infrastructure/GithubReleaseRepository.ts` recibe la URL pública del repositorio y construye el endpoint de ungh.

```ts
import type { HttpClient } from '~~/server/contexts/shared/domain/http/HttpClient'
import type { ReleaseRepository } from '~~/server/contexts/releases/domain/ReleaseRepository'
import { InvalidReleaseError } from '~~/server/contexts/releases/domain/ReleaseErrors'
import type { GithubReleasesResponse } from '~~/server/contexts/releases/infrastructure/GithubRelease'
import { GithubReleaseMapper } from '~~/server/contexts/releases/infrastructure/GithubReleaseMapper'

export class GithubReleaseRepository implements ReleaseRepository {
  private readonly mapper = new GithubReleaseMapper()

  constructor(
    private readonly httpClient: HttpClient,
    private readonly repositoryUrl: string,
  ) {}

  async search() {
    try {
      const releases = await this.request()

      return releases
        .map(release => this.mapper.toDomain(release, this.repositoryUrl))
        .filter(release => !release.draft)
        .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
    }
    catch {
      throw new InvalidReleaseError('Releases could not be retrieved')
    }
  }

  private async request() {
    const { releases } = await this.httpClient.request<GithubReleasesResponse>(this.buildReleasesUrl(), {
      method: 'GET',
    })

    return releases
  }

  private buildReleasesUrl() {
    const repository = this.repositoryUrl.replace('https://github.com/', 'https://ungh.cc/repos/')

    return `${repository}/releases`
  }
}
```

El contenedor entrega al repositorio `runtimeConfig.public.repository.url`. El repositorio construye el endpoint de ungh sin validar la configuración. No lee configuración global y no depende de Nitro.

### Caso de uso

`server/contexts/releases/application/search/ReleaseSearcher.ts` delega la búsqueda en el puerto de dominio:

```ts
import type { ReleaseRepository } from '~~/server/contexts/releases/domain/ReleaseRepository'

export class ReleaseSearcher {
  constructor(private readonly repository: ReleaseRepository) {}

  search() {
    return this.repository.search()
  }
}
```

El caso de uso no sabe si los datos proceden de GitHub, ungh, una base de datos o memoria.

### Contenedor de dependencias

`server/contexts/di/container.ts` es la fuente de verdad del grafo de dependencias. Construye adaptadores y casos de uso, pero solo expone los casos de uso.

- Las dependencias internas no forman parte del objeto devuelto.
- `ServerContainer` rompe el ciclo de inferencia entre el contenedor, Nitro y los endpoints.
- Los casos de uso deben ser stateless. Los datos de una petición entran mediante sus argumentos.

### Tipado de Nitro

`shared/types/nitro.d.ts` amplía `NitroApp` con el contenedor:

```ts
import type { ServerContainer } from '~~/server/contexts/di/container'

declare module 'nitropack/types' {
  interface NitroApp {
    container: ServerContainer
  }
}
```

El import usa `~~/server`. En Nuxt 4, `@` apunta a `app/` y no resuelve `server/contexts/`.

`server/utils/container.ts` encapsula el acceso al contenedor desde los endpoints:

```ts
export function useServerContainer() {
  const { container } = useNitroApp()

  return container
}
```

### Plugin de Nitro

`server/plugins/container.ts` crea una instancia del contenedor al arrancar cada instancia de Nitro:

```ts
import { createServerContainer } from '~~/server/contexts/di/container'

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()

  nitroApp.container = createServerContainer(config)
})
```

Se usa `defineNitroPlugin`. `definePlugin` no registra un plugin del servidor de Nitro.

### Endpoint

`server/api/pages/releases/index.get.ts` valida el locale, obtiene los dos casos de uso, define el contrato HTTP, delega la traducción de errores en `handleError` y aplica la caché:

```ts
import { getReleasesQuery } from '~~/shared/schemas/releases'

export default defineCachedEventHandler<Promise<GetReleasesResponse>>(async (event) => {
  const { locale } = await getValidatedQuery(event, query => getReleasesQuery.parse(query))
  const { pageFinder, releaseSearcher } = useServerContainer()

  try {
    const page = await pageFinder.find<PageResponse<ReleasesContent>>({
      locale,
      page: 'releases',
    })
    const releases = await releaseSearcher.search()

    return {
      page,
      releases,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, {
  maxAge: 900,
  swr: true,
})
```

El endpoint no construye dependencias ni lee configuración. El contenedor es el único punto que conoce simultáneamente configuración, implementaciones y composición.

### Consumo desde la página

`app/pages/releases/index.vue` consume el contrato propio. No construye URLs de ungh, filtra drafts ni normaliza Markdown. `ReleasesListVersionsItem` entrega `content` directamente a MDC para conservar la estructura generada por release-please.

`app/composables/releases.ts` encapsula el acceso al BFF:

```ts
export const useReleases = () => {
  async function getReleases(locale: string) {
    return await $fetch<GetReleasesResponse>('/api/pages/releases', {
      query: {
        locale,
      },
    })
  }

  return {
    getReleases,
  }
}
```

La página coordina el contenido editorial y las releases en un único `useAsyncData`. La carga no es lazy.

```vue
<template>
  <UPage>
    <ReleasesListHero
      v-if="data?.page"
      v-bind="data.page.content.hero"
    />

    <ReleasesListStatus
      v-if="status !== 'success' || !data?.releases.length"
      :status
    />

    <ReleasesListVersions
      v-else
      :releases="data.releases"
    />
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { getReleases } = useReleases()

const { data, error, status } = await useAsyncData(() => `page-releases-${locale.value}`, () => {
  return getReleases(locale.value)
}, {
  watch: [locale],
})

if (error.value?.status === 404) {
  throw createError({
    cause: error.value,
    data: error.value.data,
    fatal: true,
    message: error.value.message,
    status: error.value.status,
    statusText: error.value.statusText,
  })
}

useSeoMeta({
  title: () => data.value?.page?.title,
  description: () => data.value?.page?.description,
})
</script>
```

`ReleasesListVersions` y `ReleasesListStatus` son dos secciones independientes basadas en `UPageSection`. La página solo monta `ReleasesListVersions` cuando la carga ha terminado correctamente y la colección contiene releases. `ReleasesListStatus` coordina loading, error y vacío mediante los componentes de `app/components/releases/list/status/`. El estado de error llama directamente a `refreshNuxtData()` para reintentar la carga sin propagar eventos entre componentes.

Los componentes de presentación reciben `Release[]` y usan `publishedAt`. No mantienen un segundo modelo con campos renombrados para la misma respuesta. Home sigue el mismo flujo mediante `useHome()` y `GET /api/pages/home`. El detalle de artículo usa `useArticles()` y `GET /api/pages/articles/<slug>`. Ninguna página usa `queryCollection` ni conoce nombres de colección.

## Errores

`DomainError` define `statusCode` y deriva `name` del constructor. Sus subclases compartidas representan errores HTTP estables, como `NotFoundError` y `UnprocessableEntityError`. `handleError` usa `name` como `data.code`, convierte cualquier `DomainError` en un error de H3 y oculta los errores no reconocidos detrás de un 500 genérico.

| Situación | Resultado |
|---|---|
| Falta `locale`, está vacío o aparece varias veces | `400` antes de ejecutar casos de uso |
| La colección existe pero no contiene la página | `404` con `data.code: PageNotFoundError` |
| El slug no existe en la colección del locale | `404` con `data.code: ArticleNotFoundError` |
| Nuxt Content no puede consultar la colección | `422` con `data.code: InvalidPageError` |
| El artículo no se puede consultar o validar | `422` con `data.code: InvalidArticleError` |
| ungh no responde | `422` con `data.code: InvalidReleaseError` |
| ungh responde con error HTTP | `422` con el mismo código |
| El envelope no contiene `releases` como array | `422` con el mismo código |
| Una release tiene un campo obligatorio inválido | `422` con el mismo código |
| Error de programación no reconocido | Nitro responde con su error `500` |

- El cliente nunca recibe la URL, el estado ni el mensaje interno del proveedor.
- El frontend envía el locale, pero no el nombre de la página ni el de la colección.
- Una colección inválida no se convierte en una lista vacía.
- Una release inválida no se omite silenciosamente.
- Los fallos al recuperar o procesar releases se traducen a `InvalidReleaseError`.

## Caché

La caché pertenece al endpoint porque es una decisión de transporte.

```ts
{
  maxAge: 900,
  swr: true,
}
```

- Las respuestas válidas de Home, Releases y el detalle de artículo se consideran frescas durante 15 minutos.
- SWR permite servir la versión anterior mientras Nitro la revalida.
- Los casos de uso y repositorios no importan utilidades de caché de Nitro.
- El almacenamiento por defecto sirve como primera implementación.
- En producción, la caché en memoria puede estar separada por instancia.
- Una caché compartida requiere configurar un storage compartido de Nitro. Se añade cuando el despliegue lo necesite.

Si varios endpoints necesitan reutilizar exactamente la misma consulta, se puede añadir después un repositorio decorador o una función cacheada en infraestructura. No se introduce antes de tener ese segundo consumidor.

## Pruebas al implementar

### Unitarias

| Pieza | Caso |
|---|---|
| `GithubReleaseMapper` | Convierte todos los campos válidos al dominio |
| `GithubReleaseMapper` | Usa el tag cuando falta el nombre |
| `GithubReleaseMapper` | Retira el primer encabezado `##` |
| `GithubReleaseMapper` | Extrae `compareUrl` |
| `GithubReleaseMapper` | Devuelve `compareUrl: null` cuando no existe |
| `Release` | Rechaza cada campo obligatorio inválido mediante `create` |
| `GithubReleaseRepository` | Construye la URL de ungh desde la URL del repositorio |
| `GithubReleaseRepository` | Convierte cualquier fallo en `InvalidReleaseError` |
| `GithubReleaseRepository` | Excluye drafts |
| `GithubReleaseRepository` | Incluye prereleases |
| `GithubReleaseRepository` | Ordena por fecha descendente |
| `ReleaseSearcher` | Delega directamente en `ReleaseRepository.search` |
| `PageFinder` | Devuelve la página encontrada |
| `PageFinder` | Convierte un resultado nulo en `PageNotFoundError` |
| `ContentPageRepository` | Construye `<page>_<locale>` y selecciona solo el contrato de página |
| `ContentPageRepository` | Convierte fallos de Nuxt Content en `InvalidPageError` |
| `handleError` | Traduce `NotFoundError` a 404 con código estable |
| `handleError` | Traduce `UnprocessableEntityError` a 422 usando su nombre como código |
| `handleError` | Traduce errores desconocidos a 500 sin detalles internos |
| `createServerContainer` | Expone `pageFinder` y `releaseSearcher` |
| `createServerContainer` | No expone clientes, contratos externos, mappers ni repositorios |

### Integración

- `GET /api/pages/home` devuelve contenido editorial tipado.
- `GET /api/pages/releases` devuelve contenido editorial y releases en una única respuesta.
- Ambos endpoints exigen `locale` y rechazan valores inválidos con 400.
- `handleError` traduce `PageNotFoundError` a 404 e `InvalidPageError` a 422.
- `handleError` traduce `InvalidReleaseError` a 422 usando su nombre como código.
- El plugin registra un `ServerContainer` en `NitroApp`.
- Los endpoints resuelven `pageFinder` y `releaseSearcher` desde el contenedor.
- Una segunda petición dentro de 15 minutos usa la respuesta cacheada.
- Una petición posterior puede recibir la respuesta anterior durante la revalidación.
- SSR consume `/api/pages/releases` sin acceder directamente a ungh.
- SSR consume contenido editorial sin acceder directamente a Nuxt Content.
- Un fallo del proveedor no expone detalles internos.

## Referencias

- [Nitro v2](https://v2.nitro.build/guide)
- [Routing en Nitro](https://v2.nitro.build/guide/routing)
- [Cache en Nitro](https://v2.nitro.build/guide/cache)
- [Fetch en Nitro](https://v2.nitro.build/guide/fetch)
- [Directorio server de Nuxt 4](https://nuxt.com/docs/4.x/directory-structure/server)
- [Async context de Nuxt](https://nuxt.com/docs/4.x/guide/going-further/experimental-features#asynccontext)
- [Consultas de Nuxt Content en servidor](https://content.nuxt.com/docs/utils/query-collection#server-usage)
