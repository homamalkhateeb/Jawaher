import './ProductCardSkeleton.css'

function ProductCardSkeleton() {

  return (
    <div
      className="product-card-skeleton"
      aria-hidden="true"
    >

      <div className="product-card-skeleton-image" />

      <div className="product-card-skeleton-content">

        <div className="product-card-skeleton-category" />

        <div className="product-card-skeleton-title">
          <span />
          <span />
        </div>

        <div className="product-card-skeleton-footer">

          <div className="product-card-skeleton-price">
            <span />
            <span />
          </div>

          <div className="product-card-skeleton-arrow" />

        </div>

      </div>

    </div>
  )
}

export default ProductCardSkeleton