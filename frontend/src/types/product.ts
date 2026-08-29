export type ProductImage = {
  id: number
  image: string
  is_main: boolean
}


export type ProductCategory = {
  id: number
  name: string
  slug: string
  description: string
  image: string | null
}


export type ProductSpecification = {
  id: number
  name: string
  value: string
  sort_order: number
}


export type Product = {
  id: number
  title: string
  slug: string
  description: string
  price: string
  price_type: string
  category: ProductCategory
  is_featured: boolean
  images: ProductImage[]
  specifications: ProductSpecification[]
}


export type ProductsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}
