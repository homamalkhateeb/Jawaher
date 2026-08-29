import {
  useSearchParams,
} from 'react-router-dom'

import ProductCard from '../../components/Products/ProductCard/ProductCard'
import ProductCardSkeleton from '../../components/Products/ProductCard/ProductCardSkeleton'

import './Products.css'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import LoadingState from '../../components/UI/LoadingState/LoadingState'
import ErrorState from '../../components/UI/ErrorState/ErrorState'


function Products() {

  const [searchParams, setSearchParams] =
    useSearchParams()


  /*
   * =========================
   * URL State
   * =========================
   */

  const selectedCategory =
    searchParams.get('category')


  const requestedPage =
    Number(searchParams.get('page')) || 1


  const currentPage =
    requestedPage > 0
      ? Math.floor(requestedPage)
      : 1


  /*
   * =========================
   * State
   * =========================
   */

    const {
      products,
      loading,
      error,
      totalProducts,
      hasNextPage,
      hasPreviousPage,
      retry,
    } = useProducts(
      selectedCategory ?? undefined,
      currentPage
    )

    const {
      categories,
      loading: categoriesLoading,
      error: categoriesError,
      retry: retryCategories,
    } = useCategories()



  const PRODUCTS_PER_PAGE = 12


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalProducts /
        PRODUCTS_PER_PAGE
      )
    )


  /*
   * =========================
   * Change Category
   * =========================
   */

  function handleCategoryChange(
    categorySlug: string | null
  ) {

    const params =
      new URLSearchParams()


    /*
     * Changing the category
     * always starts from page 1.
     */

    if (categorySlug) {

      params.set(
        'category',
        categorySlug
      )

    }


    setSearchParams(
      params
    )

  }


  /*
   * =========================
   * Change Page
   * =========================
   */

  function handlePageChange(
    page: number
  ) {

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return
    }


    const params =
      new URLSearchParams()


    if (selectedCategory) {

      params.set(
        'category',
        selectedCategory
      )

    }


    /*
     * Page 1 does not need
     * ?page=1 in the URL.
     */

    if (page > 1) {

      params.set(
        'page',
        String(page)
      )

    }


    setSearchParams(
      params
    )

  }


  /*
   * =========================
   * Pagination Numbers
   * =========================
   */

  function getPageNumbers():
    (number | 'ellipsis')[] {

    if (totalPages <= 7) {

      return Array.from(
        {
          length: totalPages,
        },
        (_, index) =>
          index + 1
      )

    }


    const pages:
      (number | 'ellipsis')[] = []


    pages.push(1)


    if (currentPage <= 4) {

      pages.push(2)
      pages.push(3)
      pages.push(4)
      pages.push(5)
      pages.push('ellipsis')
      pages.push(totalPages)

      return pages

    }


    if (
      currentPage >=
      totalPages - 3
    ) {

      pages.push('ellipsis')
      pages.push(
        totalPages - 4
      )
      pages.push(
        totalPages - 3
      )
      pages.push(
        totalPages - 2
      )
      pages.push(
        totalPages - 1
      )
      pages.push(totalPages)

      return pages

    }


    pages.push('ellipsis')

    pages.push(
      currentPage - 1
    )

    pages.push(
      currentPage
    )

    pages.push(
      currentPage + 1
    )

    pages.push('ellipsis')

    pages.push(totalPages)


    return pages

  }


  const pageNumbers =
    getPageNumbers()


  /*
   * =========================
   * Render
   * =========================
   */

  return (
    <main className="products-page">

      <div className="products-page-container">

        {/* =========================
            Header
        ========================= */}

        <header className="products-page-header">

          <div className="products-page-eyebrow">

            <span className="products-page-eyebrow-line" />

            <span>
              منتجات جواهر
            </span>

            <span className="products-page-eyebrow-line" />

          </div>


          <h1>
            اكتشف مجموعتنا
            <br />
            من المطبوعات والمنتجات
          </h1>


          <p>
            مجموعة مختارة بعناية من المنتجات
            والمطبوعات التي نقدمها لعملائنا،
            بتفاصيل تعكس هوية جواهر.
          </p>

        </header>


        {/* =========================
            Categories
        ========================= */}

        <div
          className="products-categories-wrapper"
        >

          <div
            className="products-categories"
            aria-label="تصنيفات المنتجات"
          >

            <button
              type="button"
              className={`category-button ${
                selectedCategory === null
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleCategoryChange(null)
              }
              aria-pressed={
                selectedCategory === null
              }
            >
              جميع المنتجات
            </button>

            {categoriesLoading && (
            <LoadingState
                message="جاري تحميل التصنيفات..."
              />
            )}

            {categoriesError && (
              <ErrorState
                message={categoriesError}
                onRetry={retryCategories}
              />
            )}

            {
              !categoriesLoading &&
              !categoriesError &&
              categories.map(
              (category) => (

                <button
                  type="button"
                  key={category.id}
                  className={`category-button ${
                    selectedCategory ===
                    category.slug
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    handleCategoryChange(
                      category.slug
                    )
                  }
                  aria-pressed={
                    selectedCategory ===
                    category.slug
                  }
                >
                  {category.name}
                </button>

              )
            )}

          </div>

        </div>


        {/* =========================
            Results Info
        ========================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div
              className="products-results-info"
              aria-live="polite"
            >

              <span>
                عرض {products.length} من أصل{' '}
                {totalProducts} منتج
              </span>


              {selectedCategory && (

                <span
                  className="products-results-category"
                >
                  تصنيف محدد
                </span>

              )}

            </div>

          )}


        {/* =========================
            Loading
        ========================= */}

        {loading && (

          <div
            className="products-grid products-skeleton-grid"
            aria-busy="true"
            aria-label="جاري تحميل المنتجات"
          >

            {Array.from(
              {
                length:
                  PRODUCTS_PER_PAGE,
              }
            ).map(
              (_, index) => (

                <ProductCardSkeleton
                  key={index}
                />

              )
            )}

          </div>

        )}


        {/* =========================
            Error
        ========================= */}

        {error && (
          <ErrorState
            message={error}
            onRetry={retry}
          />
        )}


        {/* =========================
            Empty
        ========================= */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div className="products-message">

              <div className="products-message-icon">
                —
              </div>

              <p>
                {selectedCategory
                  ? 'لا توجد منتجات ضمن هذا التصنيف حاليًا.'
                  : 'لا توجد منتجات حاليًا.'}
              </p>

            </div>

          )}


        {/* =========================
            Products
        ========================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div
              className="products-grid"
              aria-live="polite"
            >

              {products.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}

            </div>

          )}


        {/* =========================
            Pagination
        ========================= */}

        {!loading &&
          !error &&
          products.length > 0 &&
          totalPages > 1 && (

            <nav
              className="products-pagination"
              aria-label="صفحات المنتجات"
            >

              <button
                type="button"
                disabled={
                  !hasPreviousPage
                }
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                aria-label="الصفحة السابقة"
              >
                السابق
              </button>


              <div
                className="products-page-numbers"
              >

                {pageNumbers.map(
                  (page, index) => {

                    if (
                      page ===
                      'ellipsis'
                    ) {

                      return (

                        <span
                          key={`ellipsis-${index}`}
                          aria-hidden="true"
                        >
                          ...
                        </span>

                      )

                    }


                    return (

                      <button
                        key={page}
                        type="button"
                        className={
                          currentPage === page
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          handlePageChange(
                            page
                          )
                        }
                        aria-current={
                          currentPage === page
                            ? 'page'
                            : undefined
                        }
                        aria-label={`الصفحة ${page}`}
                      >
                        {page}
                      </button>

                    )

                  }
                )}

              </div>


              <button
                type="button"
                disabled={
                  !hasNextPage
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                aria-label="الصفحة التالية"
              >
                التالي
              </button>

            </nav>

          )}

      </div>

    </main>
  )
}


export default Products
