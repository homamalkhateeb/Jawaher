import { Link } from 'react-router-dom'

import heroImage from '../../assets/images/Screenshot_٢٠٢٦٠٨٢٣_١٨٠٤٢٥_Instagram.jpg'

import './Hero.css'


function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
    >

      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-label">
            جواهر للطباعة والمطبوعات
          </span>


          <h1 id="hero-title">
            نصنع التفاصيل
            <br />
            التي تترك أثرًا
          </h1>


          <p className="hero-description">
            حلول طباعية فاخرة وعصرية للأعمال والمناسبات،
            وكل تفاصيلك التي تستحق أن تظهر بشكل مختلف.
          </p>


          <div className="hero-actions">

            <Link
              to="/products"
              className="hero-button hero-button-primary"
            >
              اكتشف منتجاتنا
            </Link>


            <a
              href="#contact"
              className="hero-button hero-button-secondary"
            >
              تواصل معنا
            </a>

          </div>

        </div>


        <div className="hero-image-wrapper">

          <img
            className="hero-image"
            src={heroImage}
            alt="مجموعة من بوكسات ومنتجات جواهر المطبوعة"
          />

        </div>

      </div>

    </section>
  )
}


export default Hero
