import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack/types'
import type { HttpClient } from '~~/server/contexts/shared/domain/http/HttpClient'

export class NitroFetchHttpClient implements HttpClient {
  request<T>(url: string, options?: NitroFetchOptions<NitroFetchRequest>) {
    return $fetch(url, options) as Promise<T>
  }
}
