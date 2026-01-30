import type { H3Event, EventHandlerRequest } from 'h3'

export type ServerEvent = H3Event<EventHandlerRequest>

export type ServerSingleResponse<T> = {
  data: T
}
