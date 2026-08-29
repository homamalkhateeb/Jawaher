
import type { Product } from '../../../types/product'
import type { SiteSettings } from '../../../types/siteSettings'

import { useProductWhatsApp } from '../../../hooks/seProductWhatsApp'
import { useProductShare } from '../../../hooks/useProductShare'


type ProductInfoProps = {
  product: Product
  siteSettings: SiteSettings | null
}


function ProductInfo({
  product,
  siteSettings,
}: ProductInfoProps) {



  /*
   * =========================
   * WhatsApp
   * =========================
   */

  const {
    whatsappUrl,
    priceText,
  } = useProductWhatsApp(
    product,
    siteSettings
  )

  const {
    shareMessage,
    handleShare,
  } = useProductShare(product)

  /*
   * =========================
   * Render
   * =========================
   */

  return (
    <div className="product-details-content">

      {/* Category */}

      <span className="product-details-category">
        {product.category.name}
      </span>


      {/* Title */}

      <h1>
        {product.title}
      </h1>


      {/* Price */}

      <div className="product-details-price-box">

        <span className="product-details-price-label">
          السعر
        </span>

        <p className="product-details-price">
          {priceText}
        </p>

      </div>


      <div
        className="product-details-divider"
        aria-hidden="true"
      />


      {/* Description */}

      <section className="product-details-description-section">

        <h2>
          عن المنتج
        </h2>

        <p className="product-details-description">
          {product.description}
        </p>

      </section>


      {/* Specifications */}

      <section className="product-specifications">

        <h2>
          المواصفات
        </h2>


        {product.specifications.length > 0 ? (

          <div className="specifications-list">

            {product.specifications.map(
              (specification) => (

              <div
                className="specification"
                key={specification.id}
              >

                <span className="specification-name">
                  {specification.name}
                </span>

                <span className="specification-value">
                  {specification.value}
                </span>

              </div>

            )
            )}

          </div>

        ) : (

          <p className="no-specifications">
            لا توجد مواصفات إضافية لهذا المنتج.
          </p>

        )}

      </section>


      {/* WhatsApp */}

      {whatsappUrl && (

        <div className="product-details-contact">

          <p className="product-details-contact-text">
            هل لديك استفسار عن هذا المنتج؟
          </p>


          <a
            className="whatsapp-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`الاستفسار عن ${product.title} عبر واتساب`}
          >

            <span
              className="whatsapp-icon"
              aria-hidden="true"
            >
              WhatsApp
            </span>


            <span>
              اطلب عبر واتساب
            </span>


            <span
              className="whatsapp-arrow"
              aria-hidden="true"
            >
              ←
            </span>

          </a>

        </div>

      )}


      {/* Share */}

      <button
        type="button"
        className="product-share-button"
        onClick={handleShare}
        aria-label={`مشاركة ${product.title}`}
      >

        <span
          className="product-share-icon"
          aria-hidden="true"
        >
          ↗️
        </span>


        <span>
          مشاركة المنتج
        </span>

      </button>


      {shareMessage && (

        <p
          className="product-share-message"
          role="status"
        >
          {shareMessage}
        </p>

      )}

    </div>
  )
}


export default ProductInfo
