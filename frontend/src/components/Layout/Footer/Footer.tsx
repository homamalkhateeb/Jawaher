
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
  getSiteSettings,
} from '../../../api/services/siteSettings'

import type {
  SiteSettings
} from '../../../types/siteSettings'
import './Footer.css'

function Footer() {
  const [settings, setSettings] =
    useState<SiteSettings | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings()

        setSettings(data)
      } catch (error) {
        console.error(
          'Failed to load site settings:',
          error
        )
      }
    }

    loadSettings()
  }, [])

  const whatsappUrl = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(
        /\D/g,
        ''
      )}`
    : null

  const currentYear =
    new Date().getFullYear()

  return (
    <footer className="site-footer">

      <div className="site-footer-container">

        {/* =========================
            Brand
        ========================= */}

        <div className="site-footer-brand">

          <NavLink
            to="/"
            className="site-footer-logo"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            {settings?.site_name || 'جواهر'}
          </NavLink>

          <p>
            {settings?.description ||
              'حلول طباعية فاخرة وعصرية للأعمال والمناسبات وكل تفاصيلك التي تستحق أن تظهر بشكل مختلف.'}
          </p>

        </div>


        {/* =========================
            Quick Links
        ========================= */}

        <nav
          className="site-footer-links"
          aria-label="روابط سريعة"
        >

          <h3>
            روابط سريعة
          </h3>

          <NavLink to="/">
            الرئيسية
          </NavLink>

          <NavLink to="/products">
            المنتجات
          </NavLink>

        </nav>


        {/* =========================
            Contact
        ========================= */}

        <div className="site-footer-contact">

          <h3>
            تواصل معنا
          </h3>

          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
            >
              {settings.phone}
            </a>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              واتساب
            </a>
          )}

          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
            >
              {settings.email}
            </a>
          )}

        </div>


        {/* =========================
            Location & Social
        ========================= */}

        <div className="site-footer-location">

          <h3>
            موقعنا
          </h3>

          {settings?.address && (
            <p>
              {settings.address}
            </p>
          )}

          {settings?.google_maps_url && (
            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              عرض الموقع على الخريطة
            </a>
          )}

          {settings?.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}

        </div>

      </div>


      {/* =========================
          Bottom
      ========================= */}

      <div className="site-footer-bottom">

        <p>
          © {currentYear} جواهر.
          جميع الحقوق محفوظة.
        </p>

      </div>

    </footer>
  )
}

export default Footer
