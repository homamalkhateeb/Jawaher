const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    'VITE_API_BASE_URL is not configured'
  )
}


export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}


export { API_BASE_URL }