import { useEffect, useState } from 'react'

import CategoryCard from './CategoryCard/CategoryCard'

import {
  getCategories,
} from '../../api/services/products'

import type {
  ProductCategory,
} from '../../types/product'

import './Categories.css'

function Categories() {

  const [categories, setCategories] =
    useState<ProductCategory[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {

    async function loadCategories() {

      try {

        setLoading(true)
        setError(null)

        const data = await getCategories()

        setCategories(data)

      } catch (error) {

        console.error(
          'Categories error:',
          error
        )

        setError(
          'تعذر تحميل التصنيفات حاليًا.'
        )

      } finally {

        setLoading(false)

      }

    }

    loadCategories()

  }, [])

  return (
    <section className="categories-section">

      <div className="categories-container">

        <div className="categories-heading">

          <span>
            ما نقدمه
          </span>

          <h2>
            اكتشف مجموعة
            <br />
            من منتجات جواهر
          </h2>

        </div>

        {loading && (
          <p className="categories-message">
            جاري تحميل التصنيفات...
          </p>
        )}

        {error && (
          <p className="categories-message categories-error">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          categories.length > 0 && (

            <div className="categories-grid">

              {categories.map((category) => (

                <CategoryCard
                  key={category.id}
                  category={category}
                />

              ))}

            </div>

          )}

        {!loading &&
          !error &&
          categories.length === 0 && (

            <p className="categories-message">
              لا توجد تصنيفات حاليًا.
            </p>

          )}

      </div>

    </section>
  )
}

export default Categories
