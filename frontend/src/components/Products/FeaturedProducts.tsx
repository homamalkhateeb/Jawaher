import { useEffect, useState } from 'react'
import ProductCard from './ProductCard/ProductCard'
import { getProducts} from '../../api/services/products'
import type {Product} from '../../types/product'
import './FeaturedProducts.css'
import { Link } from 'react-router-dom'

function FeaturedProducts() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)

        const data = await getProducts(undefined, true)

        setProducts(data.results)

      } catch (error) {

        console.error(error)

        setError('تعذر تحميل المنتجات حاليًا.')

      } finally {

        setLoading(false)

      }
    }

    loadProducts()
  }, [])

  return (
    <section className="featured-products">

      <div className="featured-products-container">

        <div className="featured-products-heading">
          <span>اختياراتنا</span>

          <h2>
            منتجات مختارة
            <br />
            من جواهر
          </h2>
        </div>

        {loading && (
          <p className="products-message">
            جاري تحميل المنتجات...
          </p>
        )}

        {error && (
          <p className="products-message products-error">
            {error}
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">

            {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="products-message">
            لا توجد منتجات مميزة حاليًا.
          </p>
        )}

        <div className="products-more">
            <Link to="/products">
            عرض جميع المنتجات
            </Link>
        </div>

      </div>

    </section>
  )
}

export default FeaturedProducts