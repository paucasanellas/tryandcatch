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

```text
shared/
└── types/
    └── nitro.d.ts
server/
├── api/
│   ├── app/
│   │   └── index.get.ts
│   └── pages/
│       └── releases/
│           └── index.get.ts
├── contexts/
│   ├── di/
│   │   └── container.ts
│   ├── releases/
│   │   ├── application/
│   │   │   └── search/
│   │   │       └── ReleaseSearcher.ts
│   │   ├── domain/
│   │   │   ├── Release.ts
│   │   │   ├── ReleaseErrors.ts
│   │   │   └── ReleaseRepository.ts
│   │   └── infrastructure/
│   │       ├── GithubRelease.ts
│   │       ├── GithubReleaseMapper.ts
│   │       └── GithubReleaseRepository.ts
│   └── shared/
│       ├── domain/
│       │   ├── http/
│       │   │   └── HttpClient.ts
│       │   └── DomainErrors.ts
│       └── infrastructure/
│           └── http/
│               └── NitroFetchHttpClient.ts
├── plugins/
│   └── container.ts
└── utils/
    ├── container.ts
    └── error.ts
```

### Endpoints

Los endpoints ligados a la interfaz reflejan la estructura que los consume.

| Consumidor | Fichero | Ruta HTTP |
|---|---|---|
| `app.vue` | `server/api/app/index.get.ts` | `GET /api/app` |
| Página `/releases` | `server/api/pages/releases/index.get.ts` | `GET /api/pages/releases` |

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
    -> ReleaseSearcher
      -> ReleaseRepository
        <- GithubReleaseRepository
          -> GithubReleaseMapper
          -> GithubReleaseResponse
          -> HttpClient
            <- NitroFetchHttpClient

index.get.ts
  -> useServerContainer
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
- Reciben `H3Event` cuando necesitan consultar datos de la petición o usar APIs de Nitro asociadas al evento.
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

Los contratos compartidos entre servidor y aplicación viven en `shared/types/`. Los tipos de un proveedor son privados de su adaptador.

## Ejemplo: releases

La página `/releases` obtiene hoy los datos de ungh. El BFF debe ocultar ese proveedor y devolver un contrato propio.

### Contrato público

`shared/types/releases.ts` conserva los tipos editoriales existentes y sustituye los tipos de ungh por el contrato del BFF:

```ts
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
  releases: Release[]
}
```

`GET /api/pages/releases` garantiza:

- Un objeto `{ releases }` como raíz.
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

`server/contexts/di/container.ts` construye el grafo completo. Solo expone casos de uso.

```ts
import type { RuntimeConfig } from 'nuxt/schema'
import { ReleaseSearcher } from '~~/server/contexts/releases/application/search/ReleaseSearcher'
import { GithubReleaseRepository } from '~~/server/contexts/releases/infrastructure/GithubReleaseRepository'
import { NitroFetchHttpClient } from '~~/server/contexts/shared/infrastructure/http/NitroFetchHttpClient'

export type ServerContainer = {
  releaseSearcher: ReleaseSearcher
}

export function createServerContainer(config: RuntimeConfig) {
  const httpClient = new NitroFetchHttpClient()
  const releaseRepository = new GithubReleaseRepository(
    httpClient,
    config.public.repository.url,
  )
  const releaseSearcher = new ReleaseSearcher(releaseRepository)

  return {
    releaseSearcher,
  } satisfies ServerContainer
}
```

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

`server/api/pages/releases/index.get.ts` obtiene el caso de uso del contenedor, define el contrato HTTP, delega la traducción de errores en `handleError` y aplica la caché:

```ts
export default defineCachedEventHandler(async () => {
  const { releaseSearcher } = useServerContainer()

  try {
    const releases = await releaseSearcher.search()

    return {
      releases: releases.map(release => ({
        tag: release.tag,
        title: release.title,
        publishedAt: release.publishedAt,
        content: release.content,
        url: release.url,
        compareUrl: release.compareUrl,
        prerelease: release.prerelease,
      })),
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
  async function getReleases() {
    return await $fetch<GetReleasesResponse>('/api/pages/releases')
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
      v-bind="data.page.hero"
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
const { fetchPage } = usePage()
const { getReleases } = useReleases()

const { data, status } = await useAsyncData(() => `page-releases-${locale.value}`, async () => {
  const [page, releasesResponse] = await Promise.all([
    fetchPage(`releases_${locale.value}`),
    getReleases(),
  ])

  return {
    page,
    releases: releasesResponse.releases,
  }
}, {
  watch: [locale],
})

if (status.value === 'success' && !data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => data.value?.page?.title,
  description: () => data.value?.page?.description,
})
</script>
```

`ReleasesListVersions` y `ReleasesListStatus` son dos secciones independientes basadas en `UPageSection`. La página solo monta `ReleasesListVersions` cuando la carga ha terminado correctamente y la colección contiene releases. `ReleasesListStatus` coordina loading, error y vacío mediante los componentes de `app/components/releases/list/status/`. El estado de error llama directamente a `refreshNuxtData()` para reintentar la carga sin propagar eventos entre componentes.

Los componentes de presentación reciben `Release[]` y usan `publishedAt`. No mantienen un segundo modelo con campos renombrados para la misma respuesta.

### Migración pendiente de Nuxt Content

La página todavía consulta Nuxt Content desde `usePage`. Es una transición temporal.

- **Falta mover el contenido editorial de la página al BFF.**
- `GET /api/pages/releases` deberá entregar todo lo necesario para renderizar `/releases`: contenido editorial y releases.
- Cuando se migre, `useReleases` será la única fuente de datos y la página dejará de usar `usePage`.
- El envelope `{ releases }` permite añadir el contenido de página sin exponer Nuxt Content al frontend.

## Errores

`DomainError` define `statusCode` y deriva `name` del constructor. Sus subclases compartidas representan errores HTTP estables, como `NotFoundError` y `UnprocessableEntityError`. `handleError` usa `name` como `data.code`, convierte cualquier `DomainError` en un error de H3 y oculta los errores no reconocidos detrás de un 500 genérico.

| Situación | Resultado |
|---|---|
| ungh no responde | `422` con `data.code: InvalidReleaseError` |
| ungh responde con error HTTP | `422` con el mismo código |
| El envelope no contiene `releases` como array | `422` con el mismo código |
| Una release tiene un campo obligatorio inválido | `422` con el mismo código |
| Error de programación no reconocido | Nitro responde con su error `500` |

- El cliente nunca recibe la URL, el estado ni el mensaje interno del proveedor.
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

- La respuesta válida se considera fresca durante 15 minutos.
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
| `handleError` | Traduce `NotFoundError` a 404 con código estable |
| `handleError` | Traduce `UnprocessableEntityError` a 422 usando su nombre como código |
| `handleError` | Traduce errores desconocidos a 500 sin detalles internos |
| `createServerContainer` | Expone `releaseSearcher` |
| `createServerContainer` | No expone clientes, contratos externos, mappers ni repositorios |

### Integración

- `GET /api/pages/releases` devuelve el contrato público.
- El endpoint omite `draft` del contrato público.
- `handleError` traduce `InvalidReleaseError` a 422 usando su nombre como código.
- El plugin registra un `ServerContainer` en `NitroApp`.
- El endpoint resuelve `releaseSearcher` desde el contenedor.
- Una segunda petición dentro de 15 minutos usa la respuesta cacheada.
- Una petición posterior puede recibir la respuesta anterior durante la revalidación.
- SSR consume `/api/pages/releases` sin acceder directamente a ungh.
- Un fallo del proveedor no expone detalles internos.

## Referencias

- [Nitro v2](https://v2.nitro.build/guide)
- [Routing en Nitro](https://v2.nitro.build/guide/routing)
- [Cache en Nitro](https://v2.nitro.build/guide/cache)
- [Fetch en Nitro](https://v2.nitro.build/guide/fetch)
- [Directorio server de Nuxt 4](https://nuxt.com/docs/4.x/directory-structure/server)
