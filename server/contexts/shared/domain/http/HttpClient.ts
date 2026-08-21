export interface HttpClient {
  request<T>(url: string, options?: unknown): Promise<T>
}
