import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Hero from '../../components/Hero/Hero'

import ProductCard from '../../components/Products/ProductCard/ProductCard'
import ProductCardSkeleton from '../../components/Products/ProductCard/ProductCardSkeleton'

import {
  getProducts,
  getCategories,
} from '../../api/services/products'

import type {
  Product,
  ProductCategory,
} from '../../types/product'

import {
  getSiteSettings,
} from '../../api/services/siteSettings'

import type {
  SiteSettings
} from '../../types/siteSettings'

import './Home.css'


function Home() {

  const [featuredProducts, setFeaturedProducts] =
    useState<Product[]>([])

  const [categories, setCategories] =
    useState<ProductCategory[]>([])

  const [loadingProducts, setLoadingProducts] =
    useState(true)

  const [loadingCategories, setLoadingCategories] =
    useState(true)

  const [siteSettings, setSiteSettings] =
    useState<SiteSettings | null>(null)


  useEffect(() => {

    async function loadHomeData() {

      try {

        const [
          productsData,
          categoriesData,
          settingsData,
        ] = await Promise.all([
          getProducts(
            undefined,
            true
          ),
          getCategories(),
          getSiteSettings(),
        ])


        setFeaturedProducts(
          productsData.results.slice(0, 6)
        )

        setCategories(
          categoriesData
        )

        setSiteSettings(
          settingsData
        )

      } catch (error) {

        console.error(
          'Home data error:',
          error
        )

      } finally {

        setLoadingProducts(false)
        setLoadingCategories(false)

      }

    }

    loadHomeData()

  }, [])


  const whatsappUrl =
    siteSettings?.whatsapp
      ? `https://wa.me/${siteSettings.whatsapp.replace(
          /\D/g,
          ''
        )}?text=${encodeURIComponent(
          'مرحبًا، أرغب بالتواصل معكم والاستفسار عن خدمات ومنتجات جواهر.'
        )}`
      : null


  return (
    <main className="home-page">

      {/* =========================
          Hero
      ========================= */}

      <Hero />


      {/* About */}

        <section className="home-about">

        <div className="home-section-container">

            <div className="home-about-content">

            <span className="home-section-label">
                عن جواهر
            </span>

            <h2>
                نؤمن أن التفاصيل
                <br />
                تصنع الفرق
            </h2>

            <p className="home-about-intro">
                في جواهر، لا نرى الطباعة مجرد ورق وحبر،
                بل نراها جزءًا أساسيًا من الصورة التي تمثل
                علامتك التجارية أو مناسبتك.
            </p>

            <p>
                لذلك نقدم حلولًا طباعية وتغليفية تجمع بين
                الجودة، الأناقة، والدقة، مع اهتمام خاص بكل
                تفصيل يجعل المنتج النهائي يعكس الصورة التي
                تتخيلها.
            </p>

            <div className="home-about-features">

                <div className="home-about-feature">
                <span className="home-about-feature-number">
                    01
                </span>

                <div>
                    <h3>جودة عالية</h3>

                    <p>
                    نحرص على تقديم نتائج طباعية تليق
                    بجودة علامتك التجارية.
                    </p>
                </div>
                </div>

                <div className="home-about-feature">
                <span className="home-about-feature-number">
                    02
                </span>

                <div>
                    <h3>عناية بالتفاصيل</h3>

                    <p>
                    نهتم بالتفاصيل الصغيرة التي تصنع
                    الفرق في النتيجة النهائية.
                    </p>
                </div>
                </div>

                <div className="home-about-feature">
                <span className="home-about-feature-number">
                    03
                </span>

                <div>
                    <h3>حلول مخصصة</h3>

                    <p>
                    نساعدك في اختيار الحل المناسب
                    لاحتياجك وطبيعة مشروعك.
                    </p>
                </div>
                </div>

            </div>

            </div>


            <div className="home-about-visual">

            <div className="home-about-visual-inner">

                <span className="home-about-visual-label">
                JAWAHER
                </span>

                <span className="home-about-visual-mark">
                ج
                </span>

                <span className="home-about-visual-caption">
                طباعة تُعبّر عنك
                </span>

            </div>

            <span className="home-about-visual-number">
                01
            </span>

            </div>

        </div>

        </section>

      {/* =========================
          Categories
      ========================= */}

      <section className="home-categories">

        <div className="home-section-container">

          <div className="home-section-header">

            <div>

              <span className="home-section-label">
                تصنيفات جواهر
              </span>

              <h2>
                اختر ما يناسبك
              </h2>

              <p>
                تصفح مجموعتنا حسب نوع المنتج
                للوصول إلى ما تبحث عنه بسهولة.
              </p>

            </div>


            <Link
              to="/products"
              className="home-view-all"
            >
              جميع التصنيفات
              <span aria-hidden="true">
                ←
              </span>
            </Link>

          </div>


          {loadingCategories ? (

            <p className="home-categories-message">
              جاري تحميل التصنيفات...
            </p>

          ) : categories.length > 0 ? (

            <div className="home-categories-grid">

              {categories.map(
                (category) => (

                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    className="home-category-card"
                  >

                    <div className="home-category-image">

                      {category.image ? (

                        <img
                          src={category.image}
                          alt={category.name}
                          loading="lazy"
                        />

                      ) : (

                        <div className="home-category-no-image">
                          {category.name}
                        </div>

                      )}

                      <span
                        className="home-category-overlay"
                        aria-hidden="true"
                      >
                        <span>
                          استكشف
                        </span>

                        <span className="home-category-arrow">
                          ←
                        </span>
                      </span>

                    </div>


                    <div className="home-category-content">

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
              )}

            </div>

          ) : (

            <p className="home-categories-message">
              لا توجد تصنيفات متاحة حاليًا.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          Featured Products
      ========================= */}

      <section className="home-featured">

        <div className="home-section-container">

          <div className="home-section-header">

            <div>

              <span className="home-section-label">
                مختاراتنا
              </span>

              <h2>
                منتجات مميزة
              </h2>

              <p>
                مجموعة من المنتجات التي اخترناها
                لتمنحك لمحة عن ما نقدمه.
              </p>

            </div>


            <Link
              to="/products"
              className="home-view-all"
            >
              عرض جميع المنتجات
              <span aria-hidden="true">
                ←
              </span>
            </Link>

          </div>


            {loadingProducts ? (

            <div className="home-products-grid">

                {Array.from({ length: 6 }).map(
                (_, index) => (

                    <ProductCardSkeleton
                    key={index}
                    />

                )
                )}

            </div>

            ) : featuredProducts.length > 0 ? (

            <div className="home-products-grid">

              {featuredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}

            </div>

          ) : (

            <p className="home-products-message">
              لا توجد منتجات مميزة حاليًا.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section
        className="home-cta"
        id="contact"
      >

        <div className="home-cta-container">

          <span className="home-section-label">
            هل لديك طلب؟
          </span>

          <h2>
            لنصنع شيئًا
            <br />
            مميزًا معًا
          </h2>

          <p>
            تواصل معنا عبر واتساب للاستفسار عن
            المنتجات أو طلب عرض مناسب لاحتياجك.
          </p>


          {whatsappUrl ? (

            <a
              href={whatsappUrl}
              className="home-cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              تواصل معنا عبر واتساب
            </a>

          ) : (

            <Link
              to="/products"
              className="home-cta-button"
            >
              اكتشف منتجاتنا
            </Link>

          )}

        </div>

      </section>

    </main>
  )
}


export default Home
