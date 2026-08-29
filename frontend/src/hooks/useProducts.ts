import { useCallback, useEffect, useState } from 'react'

import {
  getProducts,
} from '../api/services/products'

import type {
  Product,
} from '../types/product'


type UseProductsResult = {
  products: Product[]
  loading: boolean
  error: string | null
  totalProducts: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  retry: () => void
}


export function useProducts(
  categorySlug?: string,
  page: number = 1
): UseProductsResult {

  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [totalProducts, setTotalProducts] =
    useState(0)

  const [hasNextPage, setHasNextPage] =
    useState(false)

  const [hasPreviousPage, setHasPreviousPage] =
    useState(false)

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


    async function loadProducts() {

      try {

        setLoading(true)
        setError(null)


        const data =
          await getProducts(
            categorySlug,
            undefined,
            page,
            controller.signal
          )


        if (!isMounted) {
          return
        }


        setProducts(
          data.results
        )

        setTotalProducts(
          data.count
        )

        setHasNextPage(
          data.next !== null
        )

        setHasPreviousPage(
          data.previous !== null
        )


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
          'Products error:',
          error
        )


        setError(
          'تعذر تحميل المنتجات حاليًا.'
        )

        setProducts([])


      } finally {

        if (isMounted) {
          setLoading(false)
        }

      }

    }


    loadProducts()


    return () => {

      isMounted = false
      controller.abort()

    }

  }, [
    categorySlug,
    page,
    retryKey,
  ])


  return {
    products,
    loading,
    error,
    totalProducts,
    hasNextPage,
    hasPreviousPage,
    retry,
  }
}