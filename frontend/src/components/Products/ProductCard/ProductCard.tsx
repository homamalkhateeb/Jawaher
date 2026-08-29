import { Link } from 'react-router-dom'

import type { Product } from '../../../types/product'

import './ProductCard.css'

import { getMediaUrl } from '../../../api/media'

type ProductCardProps = {
  product: Product
}

function ProductCard({
  product,
}: ProductCardProps) {

  const priceLabel =
    product.price_type === 'STARTING_FROM'
      ? 'يبدأ من'
      : 'السعر'

  return (
    <Link
      to={`/products/${product.slug}`}
      className="product-card"
      aria-label={`عرض تفاصيل ${product.title}`}
    >

      <div className="product-card-image">

        {product.images.length > 0 ? (

          <img
            src={getMediaUrl(product.images[0].image) ?? ''}
            alt={product.title}
            loading="lazy"
          />

        ) : (

          <div
            className="product-card-no-image"
            aria-hidden="true"
          >
            لا توجد صورة
          </div>

        )}

        <span className="product-card-image-label">
          جواهر
        </span>

      </div>


      <div className="product-card-content">

        <span className="product-card-category">
          {product.category.name}
        </span>


        <h3>
          {product.title}
        </h3>


        <div className="product-card-footer">

          <div className="product-card-price">

            <span className="product-card-price-label">
              {priceLabel}
            </span>

            <span className="product-card-price-value">
              {product.price} ريال
            </span>

          </div>


          <span
            className="product-card-arrow"
            aria-hidden="true"
          >
            ←
          </span>

        </div>

      </div>

    </Link>
  )
}

export default ProductCard
