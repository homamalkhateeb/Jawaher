import { Link } from 'react-router-dom'

import type { ProductCategory } from '../../../types/product'

import './CategoryCard.css'

type CategoryCardProps = {
  category: ProductCategory
}

function CategoryCard({
  category,
}: CategoryCardProps) {

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="category-card"
    >

      <div className="category-card-image">

        {category.image ? (

          <img
            src={category.image}
            alt={category.name}
          />

        ) : (

          <div className="category-card-no-image">
            لا توجد صورة
          </div>

        )}

      </div>

      <div className="category-card-content">

        <h3>
          {category.name}
        </h3>

        {category.description && (
          <p>
            {category.description}
          </p>
        )}

      </div>

    </Link>
  )
}

export default CategoryCard
