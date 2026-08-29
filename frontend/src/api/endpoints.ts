export const API_ENDPOINTS = {
  products: {
    list: '/products/',
    detail: (slug: string) => `/products/${slug}/`,
    categories: '/products/categories/',
  },

  siteSettings: {
    detail: '/site-settings/',
  },

  works: {
    list: '/works/',
    detail: (slug: string) => `/works/${slug}/`,
    categories: '/works/categories/',
  },

  contact: {
    create: '/contact/',
  },
} as const