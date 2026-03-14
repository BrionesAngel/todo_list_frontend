// Small HTTP helper to keep fetch logic consistent across services.
// It injects JWT token when available and parses JSON responses.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

interface RequestOptions extends RequestInit {
  token?: string | null
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  // Some endpoints may return empty body (e.g. DELETE 204).
  const raw = await response.text()
  const data = raw ? (JSON.parse(raw) as unknown) : null

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: string }).message)
        : `Request failed with status ${response.status}`
    throw new HttpError(message, response.status)
  }

  return data as T
}
