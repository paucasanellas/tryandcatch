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
│   │       ├── controllers/
│   │       │   └── HttpGetReleasesController.ts
│   │       └── github/
│   │           ├── GithubRelease.ts
│   │           └── GithubReleaseRepository.ts
│   └── shared/
│       ├── domain/
│       │   └── http/
│       │       └── HttpClient.ts
│       └── infrastructure/
│           └── http/
│               └── NitroFetchHttpClient.ts
└── plugins/
    └── container.ts
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
| Infrastructure | Controladores y adaptadores | Application, Domain y tecnología concreta |
| DI container | Construcción y exposición de controllers y casos de uso | Todas las capas necesarias |
| Nitro plugin | Creación del contenedor durante el arranque | DI container y Nitro |
| Endpoint | Transporte, caché y delegación al controller | Nitro y el contenedor |

Flujo de dependencias:

```text
container plugin
  -> createServerContainer
    -> HttpGetReleasesController
      -> ReleaseSearcher
        -> ReleaseRepository
          <- GithubReleaseRepository
            -> GithubRelease
            -> HttpClient
              <- NitroFetchHttpClient

index.get.ts
  -> NitroApp.container.getReleasesController
```

El controlador HTTP y `NitroFetchHttpClient` pueden depender de Nitro. Las entidades, el repositorio de dominio y el caso de uso no dependen del framework.

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

### Controladores

- Reciben sus casos de uso por constructor.
- Exponen un método `run()` y solo reciben `H3Event` cuando necesitan consultar datos de la petición o usar APIs de Nitro asociadas al evento.
- Traducen el resultado de aplicación al contrato HTTP.
- Traducen errores conocidos a errores HTTP.
- No construyen repositorios ni clientes.

### Repositorios

- El dominio define la interfaz.
- Infraestructura implementa la interfaz para un proveedor.
- El nombre identifica el proveedor: `GithubReleaseRepository`.
- La respuesta externa nunca sale del repositorio.

### Entidades de proveedor

- La respuesta externa se tipa dentro del adaptador, nunca como `unknown`.
- Cada entidad de proveedor es una clase responsable de validar y convertir sus propios primitivos.
- La validación vive en un método privado con un nombre semántico, como `ensureReleaseIsValid`.
- La clase solo crea una entidad de dominio después de validar todos los datos obligatorios.
- No devuelve valores parciales ni inventa datos obligatorios.
- Una respuesta inválida produce un error tipado.

### Entidades

- Usan clases.
- Sus propiedades usan primitivos.
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
import type { HttpClient } from '#server/contexts/shared/domain/http/HttpClient'

export class NitroFetchHttpClient implements HttpClient {
  async request<T>(url: string, options: unknown = {}): Promise<T> {
    return await $fetch<T>(url, options as NitroFetchOptions<NitroFetchRequest>) as T
  }
}
```

El puerto no expone tipos de Nitro. Las opciones permanecen `unknown` hasta que el adaptador las convierte en `NitroFetchOptions<NitroFetchRequest>`. Un test puede sustituir el adaptador por una implementación en memoria.

### Dominio

`server/contexts/releases/domain/Release.ts` contiene primitivos. `draft` permanece en dominio para que la implementación del repositorio pueda descartar borradores después de validar y mapear toda la respuesta.

```ts
export class Release {
  constructor(
    readonly tag: string,
    readonly title: string,
    readonly publishedAt: string,
    readonly content: string,
    readonly url: string,
    readonly compareUrl: string | null,
    readonly draft: boolean,
    readonly prerelease: boolean,
  ) {}
}
```

`server/contexts/releases/domain/ReleaseErrors.ts` separa un dato inválido del fallo que entiende el caso de uso:

```ts
export class InvalidReleaseDataError extends Error {
  override name = 'InvalidReleaseDataError'

  constructor(options?: ErrorOptions) {
    super('Invalid release data', options)
  }
}

export class ReleaseSearchError extends Error {
  override name = 'ReleaseSearchError'

  constructor(options?: ErrorOptions) {
    super('Releases could not be retrieved', options)
  }
}
```

`server/contexts/releases/domain/ReleaseRepository.ts` define el puerto de salida:

```ts
import type { Release } from '#server/contexts/releases/domain/Release'

export interface ReleaseRepository {
  search(): Promise<Release[]>
}
```

### Entidad de GitHub

`server/contexts/releases/infrastructure/github/GithubRelease.ts` tipa el contrato externo y encapsula su validación y conversión:

```ts
import { Release } from '#server/contexts/releases/domain/Release'
import { InvalidReleaseDataError } from '#server/contexts/releases/domain/ReleaseErrors'

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

export class GithubRelease {
  private constructor(private readonly response: GithubReleaseResponse) {
    this.ensureReleaseIsValid()
  }

  static fromResponse(response: GithubReleaseResponse): GithubRelease {
    return new GithubRelease(response)
  }

  toDomain(repositoryUrl: string): Release {
    const { content, compareUrl } = this.parseMarkdown()

    return new Release(
      this.response.tag,
      this.response.name?.trim() || this.response.tag,
      this.response.publishedAt,
      content,
      `${repositoryUrl.replace(/\/$/, '')}/releases/tag/${encodeURIComponent(this.response.tag)}`,
      compareUrl,
      this.response.draft,
      this.response.prerelease,
    )
  }

  private ensureReleaseIsValid(): void {
    if (
      typeof this.response?.tag !== 'string'
      || (this.response.name !== undefined && this.response.name !== null && typeof this.response.name !== 'string')
      || typeof this.response.draft !== 'boolean'
      || typeof this.response.prerelease !== 'boolean'
      || typeof this.response.publishedAt !== 'string'
      || Number.isNaN(Date.parse(this.response.publishedAt))
      || typeof this.response.markdown !== 'string'
    ) {
      throw new InvalidReleaseDataError()
    }
  }

  private parseMarkdown(): { content: string, compareUrl: string | null } {
    const [heading = '', ...body] = this.response.markdown.split('\n')
    const compareUrl = heading.match(/\]\((https:\/\/github\.com\/[^)]+\/compare\/[^)]+)\)/)?.[1] ?? null
    const content = heading.startsWith('## ')
      ? body.join('\n').trim()
      : this.response.markdown

    return {
      content,
      compareUrl,
    }
  }
}
```

`GithubReleaseResponse` representa el JSON plano que recibe `$fetch`. `GithubRelease.fromResponse` instancia la clase antes de convertirla al dominio. La extracción de `compareUrl` y la limpieza del Markdown pertenecen a esta clase porque responden al formato concreto del proveedor.

### Repositorio de GitHub

`server/contexts/releases/infrastructure/github/GithubReleaseRepository.ts` conoce ungh y construye su URL. La base `https://ungh.cc/repos/` no forma parte de `runtimeConfig`.

```ts
import type { HttpClient } from '#server/contexts/shared/domain/http/HttpClient'
import type { Release } from '#server/contexts/releases/domain/Release'
import type { ReleaseRepository } from '#server/contexts/releases/domain/ReleaseRepository'
import { InvalidReleaseDataError, ReleaseSearchError } from '#server/contexts/releases/domain/ReleaseErrors'
import { GithubRelease, type GithubReleasesResponse } from '#server/contexts/releases/infrastructure/github/GithubRelease'

export class GithubReleaseRepository implements ReleaseRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly repositoryUrl: string,
  ) {}

  async search(): Promise<Release[]> {
    try {
      const url = this.releasesUrl()
      const response = await this.httpClient.request<GithubReleasesResponse>(url, {
        method: 'GET',
      })

      if (!Array.isArray(response.releases)) {
        throw new InvalidReleaseDataError()
      }

      return response.releases
        .map(release => GithubRelease.fromResponse(release).toDomain(this.repositoryUrl))
        .filter(release => !release.draft)
        .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
    }
    catch (error) {
      throw new ReleaseSearchError({ cause: error })
    }
  }

  private releasesUrl(): string {
    const repository = new URL(this.repositoryUrl)
    const path = repository.pathname.split('/').filter(Boolean)

    if (repository.hostname !== 'github.com' || path.length !== 2) {
      throw new InvalidReleaseDataError()
    }

    return `https://ungh.cc/repos/${path.join('/')}/releases`
  }
}
```

El repositorio recibe `runtimeConfig.public.repository.url` desde el contenedor. No lee configuración global y no depende de Nitro. Su método `search` entrega la colección ya filtrada y ordenada.

### Caso de uso

`server/contexts/releases/application/search/ReleaseSearcher.ts` delega la búsqueda en el puerto de dominio:

```ts
import type { Release } from '#server/contexts/releases/domain/Release'
import type { ReleaseRepository } from '#server/contexts/releases/domain/ReleaseRepository'

export class ReleaseSearcher {
  constructor(private readonly repository: ReleaseRepository) {}

  search(): Promise<Release[]> {
    return this.repository.search()
  }
}
```

El caso de uso no sabe si los datos proceden de GitHub, ungh, una base de datos o memoria.

### Controlador

`server/contexts/releases/infrastructure/controllers/HttpGetReleasesController.ts` contiene la frontera HTTP:

```ts
import { createError } from 'h3'
import type { Release as DomainRelease } from '#server/contexts/releases/domain/Release'
import { ReleaseSearchError } from '#server/contexts/releases/domain/ReleaseErrors'
import type { ReleaseSearcher } from '#server/contexts/releases/application/search/ReleaseSearcher'

export class HttpGetReleasesController {
  constructor(private readonly releaseSearcher: ReleaseSearcher) {}

  async run(): Promise<GetReleasesResponse> {
    try {
      const releases = await this.releaseSearcher.search()

      return {
        releases: releases.map(release => this.toResponse(release)),
      }
    }
    catch (error) {
      if (error instanceof ReleaseSearchError) {
        throw createError({
          statusCode: 502,
          statusMessage: 'Releases unavailable',
          data: {
            code: 'RELEASES_UNAVAILABLE',
          },
        })
      }

      throw error
    }
  }

  private toResponse(release: DomainRelease): Release {
    return {
      tag: release.tag,
      title: release.title,
      publishedAt: release.publishedAt,
      content: release.content,
      url: release.url,
      compareUrl: release.compareUrl,
      prerelease: release.prerelease,
    }
  }
}
```

Este controlador no recibe el evento porque no necesita leer cabeceras, sesión ni contexto de petición. Se añadirá a la firma cuando exista esa necesidad.

### Contenedor de dependencias

`server/contexts/di/container.ts` construye el grafo completo. Solo expone controllers y casos de uso.

```ts
import type { RuntimeConfig } from 'nuxt/schema'
import { ReleaseSearcher } from '#server/contexts/releases/application/search/ReleaseSearcher'
import { HttpGetReleasesController } from '#server/contexts/releases/infrastructure/controllers/HttpGetReleasesController'
import { GithubReleaseRepository } from '#server/contexts/releases/infrastructure/github/GithubReleaseRepository'
import { NitroFetchHttpClient } from '#server/contexts/shared/infrastructure/http/NitroFetchHttpClient'

export function createServerContainer(config: RuntimeConfig) {
  const httpClient = new NitroFetchHttpClient()
  const releaseRepository = new GithubReleaseRepository(
    httpClient,
    config.public.repository.url,
  )
  const releaseSearcher = new ReleaseSearcher(releaseRepository)
  const getReleasesController = new HttpGetReleasesController(releaseSearcher)

  return {
    getReleasesController,
    releaseSearcher,
  }
}

export type ServerContainer = ReturnType<typeof createServerContainer>
```

- Las dependencias internas no forman parte del objeto devuelto.
- `ServerContainer` se infiere desde la función para evitar mantener el tipo por duplicado.
- Controllers y casos de uso deben ser stateless. Los datos de una petición entran mediante `event` o los argumentos del caso de uso.

### Tipado de Nitro

`shared/types/nitro.d.ts` amplía `NitroApp` con el contenedor:

```ts
import type { ServerContainer } from '#server/contexts/di/container'

declare module 'nitropack/types' {
  interface NitroApp {
    container: ServerContainer
  }
}
```

El import usa `#server`. En Nuxt 4, `@` apunta a `app/` y no resuelve `server/contexts/`.

### Plugin de Nitro

`server/plugins/container.ts` crea una instancia del contenedor al arrancar cada instancia de Nitro:

```ts
import { createServerContainer } from '#server/contexts/di/container'

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()

  nitroApp.container = createServerContainer(config)
})
```

Se usa `defineNitroPlugin`. `definePlugin` no registra un plugin del servidor de Nitro.

### Endpoint

`server/api/pages/releases/index.get.ts` obtiene el controller del contenedor y aplica la caché:

```ts
export default defineCachedEventHandler(() => {
  const { container } = useNitroApp()

  return container.getReleasesController.run()
}, {
  maxAge: 900,
  swr: true,
})
```

El endpoint no construye dependencias ni lee configuración. El contenedor es el único punto que conoce simultáneamente configuración, implementaciones y composición.

### Consumo desde la página

`app/pages/releases/index.vue` consume el contrato propio. No construye URLs de ungh, filtra drafts ni normaliza Markdown.

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
    <ReleasesHero
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

| Situación | Resultado |
|---|---|
| ungh no responde | `502` con `data.code: RELEASES_UNAVAILABLE` |
| ungh responde con error HTTP | `502` con el mismo código |
| El envelope no contiene `releases` como array | `502` con el mismo código |
| Una release tiene un campo obligatorio inválido | `502` con el mismo código |
| Error de programación no reconocido | Nitro responde con su error `500` |

- El cliente nunca recibe la URL, el estado ni el mensaje interno del proveedor.
- Una colección inválida no se convierte en una lista vacía.
- Una release inválida no se omite silenciosamente.
- Solo los errores previstos se traducen a `RELEASES_UNAVAILABLE`.

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
| `GithubRelease` | Convierte todos los campos válidos al dominio |
| `GithubRelease` | Usa el tag cuando falta el nombre |
| `GithubRelease` | Retira el primer encabezado `##` |
| `GithubRelease` | Extrae `compareUrl` |
| `GithubRelease` | Devuelve `compareUrl: null` cuando no existe |
| `GithubRelease` | Rechaza cada campo obligatorio inválido al instanciarse |
| `GithubReleaseRepository` | Construye la URL de ungh desde la URL del repositorio |
| `GithubReleaseRepository` | Rechaza una URL de repositorio inválida |
| `GithubReleaseRepository` | Rechaza un envelope inválido |
| `GithubReleaseRepository` | Convierte errores HTTP en `ReleaseSearchError` |
| `GithubReleaseRepository` | Excluye drafts |
| `GithubReleaseRepository` | Incluye prereleases |
| `GithubReleaseRepository` | Ordena por fecha descendente |
| `ReleaseSearcher` | Delega directamente en `ReleaseRepository.search` |
| `HttpGetReleasesController` | Devuelve `{ releases }` |
| `HttpGetReleasesController` | Omite `draft` del contrato público |
| `HttpGetReleasesController` | Traduce `ReleaseSearchError` a 502 con código estable |
| `createServerContainer` | Expone `getReleasesController` y `releaseSearcher` |
| `createServerContainer` | No expone clientes, entidades de proveedor ni repositorios |

### Integración

- `GET /api/pages/releases` devuelve el contrato público.
- El plugin registra un `ServerContainer` en `NitroApp`.
- El endpoint resuelve `getReleasesController` desde el contenedor.
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
