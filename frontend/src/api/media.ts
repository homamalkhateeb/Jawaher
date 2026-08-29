import { API_BASE_URL } from './config'

export function getMediaUrl(
  path: string | null | undefined
): string | null {

  if (!path) {
    return null
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path
  }

  const baseUrl =
    API_BASE_URL.replace(/\/api\/v1\/?$/, '')

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}