import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack/types'
import type { HttpClient } from '#server/contexts/shared/domain/http/HttpClient'

export class NitroFetchHttpClient implements HttpClient {
  async request<T>(url: string, options: unknown = {}): Promise<T> {
    return await $fetch<T>(url, options as NitroFetchOptions<NitroFetchRequest>) as T
  }
}
