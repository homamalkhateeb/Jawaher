import { useState } from 'react'
import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'

import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false)

  const location = useLocation()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function handleContactClick() {
    closeMenu()

    /*
      إذا كنا بالفعل داخل الصفحة الرئيسية
      والـ hash هو contact، فلن يحدث تغيير
      في React Router عند الضغط مرة أخرى.

      لذلك نقوم بالـ scroll يدويًا في هذه الحالة.
    */
    if (
      location.pathname === '/' &&
      location.hash === '#contact'
    ) {
      document
        .getElementById('contact')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }
  }

  return (
    <header className="site-navbar">
      <div className="site-navbar-container">

        {/* =========================
            Logo
        ========================= */}

        <NavLink
          to="/"
          end
          className="site-navbar-logo"
          onClick={closeMenu}
          aria-label="جواهر - الصفحة الرئيسية"
        >
          <span className="site-navbar-logo-name">
            جواهر
          </span>
        </NavLink>

        {/* =========================
            Desktop Navigation
        ========================= */}

        <nav
          className="site-navbar-links"
          aria-label="التنقل الرئيسي"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'navbar-link active'
                : 'navbar-link'
            }
          >
            الرئيسية
          </NavLink>

          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              isActive
                ? 'navbar-link active'
                : 'navbar-link'
            }
          >
            المنتجات
          </NavLink>

          <Link
            to="/#contact"
            className="navbar-link"
            onClick={handleContactClick}
          >
            تواصل معنا
          </Link>
        </nav>

        {/* =========================
            Desktop CTA
        ========================= */}

        <Link
          to="/#contact"
          className="navbar-contact-button"
          onClick={handleContactClick}
        >
          اطلب الآن

          <span aria-hidden="true">
            ←
          </span>
        </Link>

        {/* =========================
            Mobile Menu Button
        ========================= */}

        <button
          type="button"
          className={`navbar-menu-button ${isMenuOpen ? 'open' : ''
            }`}
          onClick={() =>
            setIsMenuOpen(
              (previous) => !previous
            )
          }
          aria-label={
            isMenuOpen
              ? 'إغلاق القائمة'
              : 'فتح القائمة'
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* =========================
          Mobile Navigation
      ========================= */}

      <nav
        id="mobile-navigation"
        className={`site-navbar-mobile ${isMenuOpen ? 'open' : ''
          }`}
        aria-label="التنقل للجوال"
      >
        <div className="site-navbar-mobile-inner">

          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? 'navbar-mobile-link active'
                : 'navbar-mobile-link'
            }
          >
            الرئيسية
          </NavLink>

          <NavLink
            to="/products"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? 'navbar-mobile-link active'
                : 'navbar-mobile-link'
            }
          >
            المنتجات
          </NavLink>

          <Link
            to="/#contact"
            className="navbar-mobile-link"
            onClick={handleContactClick}
          >
            تواصل معنا
          </Link>

          <Link
            to="/#contact"
            className="navbar-mobile-cta"
            onClick={handleContactClick}
          >
            <span>
              اطلب الآن
            </span>

            <span aria-hidden="true">
              ←
            </span>
          </Link>

        </div>
      </nav>
    </header>
  )
}

export default Navbar