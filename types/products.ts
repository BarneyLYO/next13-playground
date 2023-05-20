import { allDefined, defined } from '@/utils/defined'

export type ProductRating = {
  rate: number
  count: number
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export function isProduct(thing: any): thing is Product {
  if (typeof thing !== 'object') return false

  if (
    !allDefined([
      thing.id,
      thing.title,
      thing.price,
      thing.description,
      thing.category,
      thing.image,
      thing.rating
    ])
  ) {
    return false
  }

  if (
    !allDefined([thing.rating.rate, thing.rating.count])
  ) {
    return false
  }

  return true
}
