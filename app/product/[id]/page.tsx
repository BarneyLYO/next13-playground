import { ProductImage } from '@/components/product-image'
import { getProduct } from '@/querys/get-product'
import { Product } from '@/types/products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

async function ProductPage({ params: { id } }: PageProps) {
  let product: Product
  try {
    product = await getProduct(id)
  } catch (e) {
    return notFound()
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
      <ProductImage product={product} />

      <div className="divide-y">
        <div className="space-y-2 pb-8">
          <h1 className="text-2xl md:text-4xl font-bold">
            {product.title}
          </h1>
          <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
            {product.price}
          </h2>
        </div>

        <div className="pt-8">
          <p className="text-xs md:text-sm">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
