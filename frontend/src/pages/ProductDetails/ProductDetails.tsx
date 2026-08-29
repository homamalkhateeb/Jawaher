
import {
  Link,
  useParams,
} from 'react-router-dom'

import './ProductDetails.css'

import ProductCard from '../../components/Products/ProductCard/ProductCard'

import { useProductDetails } from '../../hooks/useProductDetails'

import ProductGallery from '../../components/Products/ProductGallery/ProductGallery'

import ProductInfo from '../../components/Products/ProductInfo/ProductInfo'

import ErrorState from '../../components/UI/ErrorState/ErrorState'

import { useProductSEO } from '../../hooks/useProductSEO'


function ProductDetails() {

  const { slug } = useParams()


  const {
    product,
    siteSettings,
    relatedProducts,
    loading,
    error,
    retry,
  } = useProductDetails(slug)
  useProductSEO(product)

  /*
   * =========================
   * Loading
   * =========================
   */

  if (loading) {

    return (
      <main className="product-details">

        <div className="product-details-container">

          <div
            className="product-details-skeleton"
            aria-hidden="true"
          >

            <div className="skeleton-back" />


            <div className="skeleton-main">

              <div className="skeleton-gallery">

                <div className="skeleton-main-image-wrapper">

                  <div className="skeleton-main-image" />

                </div>


                <div className="skeleton-thumbnails">

                  <span />
                  <span />
                  <span />
                  <span />

                </div>

              </div>


              <div className="skeleton-content">

                <span className="skeleton-category" />

                <span className="skeleton-title" />

                <span className="skeleton-title short" />

                <span className="skeleton-price" />

                <span className="skeleton-divider" />

                <span className="skeleton-description" />

                <span className="skeleton-description" />

                <span className="skeleton-description short" />

                <span className="skeleton-specification-title" />

                <span className="skeleton-specification" />

                <span className="skeleton-specification" />

                <span className="skeleton-specification" />

                <span className="skeleton-button" />

              </div>

            </div>

          </div>

        </div>

      </main>
    )

  }


  /*
   * =========================
   * Error
   * =========================
   */

  if (error) {

    return (
      <main className="product-details">

        <div className="product-details-container">

          <ErrorState
            message={error}
            onRetry={retry}
          />

          <Link
            to="/products"
            className="product-details-back-button"
          >
            العودة إلى المنتجات
          </Link>

        </div>

      </main>
    )

  }


  /*
   * =========================
   * Product Not Found
   * =========================
   */

  if (!product) {

    return (
      <div className="product-details-message">

        <p>
          المنتج غير موجود.
        </p>

        <Link
          to="/products"
          className="product-details-back-button"
        >
          العودة إلى المنتجات
        </Link>

      </div>
    )

  }


  /*
   * =========================
   * Render
   * =========================
   */

  return (
    <main className="product-details">

      <div className="product-details-container">

        {/* Back */}

        <Link
          to="/products"
          className="product-details-back"
        >

          <span aria-hidden="true">
            →
          </span>

          العودة إلى المنتجات

        </Link>


        <div className="product-details-main">

          <ProductGallery
            images={product.images}
            productTitle={product.title}
          />


          <ProductInfo
            product={product}
            siteSettings={siteSettings}
          />

        </div>


        {/* =========================
            Related Products
        ========================= */}

        {relatedProducts.length > 0 && (

          <section
            className="related-products"
            aria-labelledby="related-products-title"
          >

            <div className="related-products-header">

              <span className="related-products-label">
                قد يعجبك أيضًا
              </span>


              <h2 id="related-products-title">
                منتجات مشابهة
              </h2>


              <p>
                اكتشف المزيد من المنتجات المشابهة لهذا المنتج.
              </p>

            </div>


            <div className="related-products-grid">

              {relatedProducts
                .slice(0, 4)
                .map(
                  (relatedProduct) => (

                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />

                )
              )}

            </div>

          </section>

        )}

      </div>

    </main>
  )
}


export default ProductDetails
