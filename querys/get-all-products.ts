import { GET_ALL_PRODUCTS } from '@/constants/urls'
import { isProduct, Product } from '@/types/products'

export const getAllProducts = async () => {
  const res = await fetch(GET_ALL_PRODUCTS).then((res) =>
    res.json()
  )
  if (!Array.isArray(res)) {
    throw new Error('Invalid GET ALL Product call')
  }

  for (const r of res) {
    if (!isProduct(r)) {
      throw new Error(
        'Parse Error, Bad Product recevied',
        r
      )
    }
  }

  return res as Product[]
}
