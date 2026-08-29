import { apiGet } from '../client'
import { API_ENDPOINTS } from '../endpoints'

import type { SiteSettings } from '../../types/siteSettings'


export async function getSiteSettings(
  signal?: AbortSignal
): Promise<SiteSettings> {

  return apiGet<SiteSettings>(
    API_ENDPOINTS.siteSettings.detail,
    signal
  )
}