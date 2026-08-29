import {
  useEffect,
  useState,
} from 'react'

import {
  getSiteSettings,
} from '../../api/services/siteSettings'

import type {
  SiteSettings,
} from '../../types/siteSettings'

import './Contact.css'

function Contact() {
  const [settings, setSettings] =
    useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        setSettings(data)
      })
      .catch((error) => {
        console.error(
          'Failed to load contact settings:',
          error
        )
      })
  }, [])

  /*
    WhatsApp يحتاج الرقم بدون:
    +
    مسافات
    -
    أقواس

    مثال:
    +963 999 123 456

    يصبح:
    963999123456
  */
  const whatsappUrl =
    settings?.whatsapp
      ? `https://wa.me/${settings.whatsapp.replace(
        /\D/g,
        ''
      )}`
      : null

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-container">

        <div className="contact-heading">

          <span>
            تواصل معنا
          </span>

          <h2>
            لنصنع شيئًا
            <br />
            مميزًا معًا
          </h2>

          <p>
            لديك مشروع أو مناسبة وتبحث عن مطبوعات
            تعكس تفاصيلك بشكل مميز؟
            تواصل معنا وسنساعدك في اختيار الحل المناسب.
          </p>

        </div>

        <div className="contact-details">

          {settings?.whatsapp &&
            whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <span className="contact-item-label">
                  واتساب
                </span>

                <span className="contact-item-value">
                  {settings.whatsapp}
                </span>
              </a>
            )}

          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="contact-item"
            >
              <span className="contact-item-label">
                الهاتف
              </span>

              <span className="contact-item-value">
                {settings.phone}
              </span>
            </a>
          )}

          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="contact-item"
            >
              <span className="contact-item-label">
                البريد الإلكتروني
              </span>

              <span className="contact-item-value">
                {settings.email}
              </span>
            </a>
          )}

          {settings?.address && (
            <div className="contact-item">

              <span className="contact-item-label">
                العنوان
              </span>

              <span className="contact-item-value">
                {settings.address}
              </span>

            </div>
          )}

          {settings?.google_maps_url && (
            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-link"
            >
              عرض موقعنا على الخريطة
            </a>
          )}

          {settings?.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              Instagram
            </a>
          )}

        </div>

      </div>
    </section>
  )
}

export default Contact