import { apiGet } from '../client'
import { API_ENDPOINTS } from '../endpoints'

import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from '../../types/product'


export async function getProducts(
  categorySlug?: string,
  featured?: boolean,
  page: number = 1,
  signal?: AbortSignal
): Promise<ProductsResponse> {

  const params = new URLSearchParams()

  if (categorySlug) {
    params.set('category', categorySlug)
  }

  if (featured === true) {
    params.set('featured', 'true')
  }

  if (page > 1) {
    params.set('page', String(page))
  }

  const queryString = params.toString()

  const endpoint = queryString
    ? `${API_ENDPOINTS.products.list}?${queryString}`
    : API_ENDPOINTS.products.list

  return apiGet<ProductsResponse>(
    endpoint,
    signal
  )
}


export async function getProduct(
  slug: string,
  signal?: AbortSignal
): Promise<Product> {

  return apiGet<Product>(
    API_ENDPOINTS.products.detail(slug),
    signal
  )
}


export async function getCategories(
  signal?: AbortSignal
): Promise<ProductCategory[]> {

  const data = await apiGet<{
    count: number
    next: string | null
    previous: string | null
    results: ProductCategory[]
  }>(
    API_ENDPOINTS.products.categories,
    signal
  )

  return data.results
}