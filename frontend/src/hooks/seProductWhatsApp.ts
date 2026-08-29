import type { Product } from '../types/product'
import type { SiteSettings } from '../types/siteSettings'

export function useProductWhatsApp(
  product: Product,
  siteSettings: SiteSettings | null
) {

  const priceText =
    product.price_type === 'STARTING_FROM'
      ? `يبدأ من ${product.price} ريال`
      : `${product.price} ريال`


  const whatsappMessage =
    `مرحبًا، أرغب بالاستفسار عن المنتج: ${product.title}\n` +
    `السعر: ${priceText}`


  const whatsappUrl =
    siteSettings?.whatsapp
      ? `https://wa.me/${siteSettings.whatsapp.replace(
          /\D/g,
          ''
        )}?text=${encodeURIComponent(
          whatsappMessage
        )}`
      : null


  return {
    whatsappUrl,
    priceText,
  }
}
