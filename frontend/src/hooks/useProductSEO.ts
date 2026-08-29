import { useEffect } from 'react'

import type { Product } from '../types/product'


export function useProductSEO(
  product: Product | null
) {

  useEffect(() => {

    if (!product) {
      return
    }


    const previousTitle =
      document.title


    const description =
      product.description
        ?.replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160)


    /*
     * Page title
     */

    document.title =
      `${product.title} | جواهر`


    /*
     * Meta description
     */

    let metaDescription =
      document.querySelector(
        'meta[name="description"]'
      )


    if (!metaDescription) {

      metaDescription =
        document.createElement('meta')

      metaDescription.setAttribute(
        'name',
        'description'
      )

      document.head.appendChild(
        metaDescription
      )

    }


    const previousDescription =
      metaDescription.getAttribute(
        'content'
      )


    metaDescription.setAttribute(
      'content',
      description ||
        `اكتشف ${product.title} من جواهر.`
    )


    /*
     * Restore previous SEO values
     * when leaving the product page.
     */

    return () => {

      document.title =
        previousTitle


      if (
        previousDescription !== null
      ) {

        metaDescription?.setAttribute(
          'content',
          previousDescription
        )

      }

    }

  }, [product])

}
