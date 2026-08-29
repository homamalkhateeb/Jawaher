import { API_BASE_URL } from './config'
import { APIError } from './errors'

type APIResponse<T> = {
  success: boolean
  message: string
  data: T
}

export async function apiGet<T>(
  endpoint: string,
  signal?: AbortSignal
): Promise<T> {

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      signal,
    }
  )
  let responseData: APIResponse<T>

  try {
    responseData = await response.json()
  } catch {
    throw new Error(
      `Invalid server response: ${response.status}`
    )
  }

  /*
   * HTTP error
   */
    if (!response.ok) {
    throw new APIError(
        responseData?.message ??
        `Request failed: ${response.status}`,
        response.status
    )
    }
  /*
   * API-level error
   */
    if (!responseData.success) {
    throw new APIError(
        responseData.message || 'Request failed',
        response.status
    )
    }

  return responseData.data
}