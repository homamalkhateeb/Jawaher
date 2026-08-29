import { useState } from 'react'

import type { Product } from '../types/product'


export function useProductShare(
  product: Product
) {

  const [shareMessage, setShareMessage] =
    useState<string | null>(null)


  async function handleShare() {

    const shareUrl =
      window.location.href


    const shareData = {
      title: product.title,

      text:
        `شاهد هذا المنتج من جواهر: ${product.title}`,

      url: shareUrl,
    }


    try {

      if (navigator.share) {

        await navigator.share(
          shareData
        )

        return
      }


      await navigator.clipboard.writeText(
        shareUrl
      )


      setShareMessage(
        'تم نسخ رابط المنتج.'
      )


      setTimeout(() => {

        setShareMessage(null)

      }, 3000)

    } catch (error) {

      console.error(
        'Share error:',
        error
      )

    }

  }


  return {
    shareMessage,
    handleShare,
  }
}
