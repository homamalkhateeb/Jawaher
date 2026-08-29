import { useEffect, useState } from 'react'

import {
  getProduct,
  getProducts,
} from '../api/services/products'

import {
  getSiteSettings,
} from '../api/services/siteSettings'

import type { Product } from '../types/product'
import type { SiteSettings } from '../types/siteSettings'


type UseProductDetailsResult = {
  product: Product | null
  siteSettings: SiteSettings | null
  relatedProducts: Product[]
  loading: boolean
  error: string | null
  retry: () => void
}


export function useProductDetails(
  slug?: string
): UseProductDetailsResult {

  const [product, setProduct] =
    useState<Product | null>(null)

  const [siteSettings, setSiteSettings] =
    useState<SiteSettings | null>(null)

  const [relatedProducts, setRelatedProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [retryKey, setRetryKey] =
    useState(0)


  function retry() {
    setRetryKey((current) => current + 1)
  }


  useEffect(() => {

    const controller =
      new AbortController()


    async function loadProductDetails() {

      if (!slug) {

        setProduct(null)
        setSiteSettings(null)
        setRelatedProducts([])
        setError('المنتج غير موجود.')
        setLoading(false)

        return
      }


      try {

        setLoading(true)
        setError(null)

        setProduct(null)
        setSiteSettings(null)
        setRelatedProducts([])


        /*
         * Load product and site settings
         * at the same time.
         */

        const [
          productData,
          settingsData,
        ] = await Promise.all([

          getProduct(
            slug,
            controller.signal
          ),

          getSiteSettings(
            controller.signal
          ),

        ])


        if (controller.signal.aborted) {
          return
        }


        setProduct(productData)
        setSiteSettings(settingsData)


        /*
         * Load related products.
         *
         * Failure here should not break
         * the main product page.
         */

        try {

          const relatedData =
            await getProducts(
              productData.category.slug,
              undefined,
              1,
              controller.signal
            )


          if (controller.signal.aborted) {
            return
          }


          const filteredRelatedProducts =
            relatedData.results.filter(
              (item) =>
                item.id !== productData.id
            )


          setRelatedProducts(
            filteredRelatedProducts
          )

        } catch (relatedError) {

          if (
            controller.signal.aborted
          ) {
            return
          }


          console.error(
            'Related products error:',
            relatedError
          )

          setRelatedProducts([])

        }

      } catch (error) {

        if (controller.signal.aborted) {
          return
        }


        console.error(
          'Product details error:',
          error
        )


        setError(
          'تعذر تحميل المنتج حاليًا.'
        )

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false)
        }

      }

    }


    loadProductDetails()


    return () => {
      controller.abort()
    }

  }, [slug, retryKey])


  return {
    product,
    siteSettings,
    relatedProducts,
    loading,
    error,
    retry,
  }
}