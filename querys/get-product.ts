import { GET_ALL_PRODUCTS } from '@/constants/urls'
import { isProduct } from '@/types/products'

export const getProduct = async (id: string) => {
  const res = await fetch(`${GET_ALL_PRODUCTS}/${id}`).then(
    (res) => res.json()
  )
  if (!isProduct(res))
    throw new Error(
      'Parse Error, Bad Product recevied',
      res
    )

  return res
}
