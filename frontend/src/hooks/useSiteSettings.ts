import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  getSiteSettings,
} from '../api/services/siteSettings'

import type {
  SiteSettings,
} from '../types/siteSettings'


type UseSiteSettingsResult = {
  settings: SiteSettings | null
  loading: boolean
  error: string | null
  retry: () => void
}


export function useSiteSettings(): UseSiteSettingsResult {

  const [settings, setSettings] =
    useState<SiteSettings | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [retryKey, setRetryKey] =
    useState(0)


  const retry = useCallback(() => {
    setRetryKey(
      (value) => value + 1
    )
  }, [])


  useEffect(() => {

    const controller =
      new AbortController()

    let isMounted = true


    async function loadSettings() {

      try {

        setLoading(true)
        setError(null)


        const data =
          await getSiteSettings(
            controller.signal
          )


        if (!isMounted) {
          return
        }


        setSettings(data)

      } catch (error) {

        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return
        }


        if (!isMounted) {
          return
        }


        console.error(
          'Site settings error:',
          error
        )


        setError(
          'تعذر تحميل إعدادات الموقع حاليًا.'
        )

        setSettings(null)

      } finally {

        if (isMounted) {
          setLoading(false)
        }

      }

    }


    loadSettings()


    return () => {

      isMounted = false
      controller.abort()

    }

  }, [retryKey])


  return {
    settings,
    loading,
    error,
    retry,
  }
}