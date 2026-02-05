export enum Method {
  GET = 'GET',
  POST = 'POST'
}

export type FetcherResource<D extends object> = {
  url: string
  method?: Method
  data?: D
  query?: D
}

export const fetcher = async <T, D extends object>(
  resource: FetcherResource<D> | string,
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
      const queryString = new URLSearchParams(
        resource.query as Record<string, string>
      ).toString()
      url += `?${queryString}`
    }
  }

  const res = await fetch(url, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  })

  return res.json() as Promise<T>
}
