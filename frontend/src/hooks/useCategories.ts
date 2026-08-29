import { useCallback, useEffect, useState } from 'react'

import {
  getCategories,
} from '../api/services/products'

import type {
  ProductCategory,
} from '../types/product'


type UseCategoriesResult = {
  categories: ProductCategory[]
  loading: boolean
  error: string | null
  retry: () => void
}


export function useCategories(): UseCategoriesResult {

  const [categories, setCategories] =
    useState<ProductCategory[]>([])

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


    async function loadCategories() {

      try {

        setLoading(true)
        setError(null)


        const data =
          await getCategories(
            controller.signal
          )


        if (!isMounted) {
          return
        }


        setCategories(data)

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
          'Categories error:',
          error
        )


        setError(
          'تعذر تحميل التصنيفات حاليًا.'
        )

        setCategories([])

      } finally {

        if (isMounted) {
          setLoading(false)
        }

      }

    }


    loadCategories()


    return () => {

      isMounted = false
      controller.abort()

    }

  }, [retryKey])


  return {
    categories,
    loading,
    error,
    retry,
  }
}