export enum Method {
  GET = 'GET',
  POST = 'POST'
}

export type QueryParam = string | number | boolean

export type FetcherQuery = Record<
  string,
  QueryParam | QueryParam[] | null | undefined
>

export type FetcherResource<
  D = unknown,
  Q extends FetcherQuery = FetcherQuery
> = {
  url: string
  method?: Method
  data?: D
  query?: Q
}

export const fetcher = async <
  T = unknown,
  D = unknown,
  Q extends FetcherQuery = FetcherQuery
>(
  resource: FetcherResource<D, Q> | string,
  init?: Omit<RequestInit, 'body' | 'method'>
) => {
  let url,
    method = Method.GET,
    data
  if (typeof resource === 'string') {
    url = resource
  } else {
    url = resource.url
    method = resource.method || Method.GET
    data = resource.data

    if (method === Method.GET && resource.query) {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(resource.query)) {
        if (value === null || value === undefined) continue
        if (Array.isArray(value)) {
          for (const item of value) params.append(key, String(item))
        } else {
          params.append(key, String(value))
        }
      }
      const queryString = params.toString()
      if (queryString) url += `?${queryString}`
    }
  }

  const headers = new Headers(init?.headers)
  let body: BodyInit | undefined
  const hasBody = method !== Method.GET && data !== undefined

  if (hasBody) {
    if (
      typeof data === 'string' ||
      data instanceof FormData ||
      data instanceof Blob ||
      data instanceof URLSearchParams ||
      data instanceof ArrayBuffer
    ) {
      body = data as BodyInit
    } else {
      body = JSON.stringify(data)
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
      }
    }
  }

  const res = await fetch(url, {
    method,
    body,
    ...init,
    headers
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const response = await res.json()
  return response as T
}
