'use client'
import { ProductImage } from '@/components/product-image'
import { getProduct } from '@/querys/get-product'
import { Product } from '@/types/products'
import { useBoolean } from '@/utils/use-boolean'
import { useSafeState } from '@/utils/use-safe-state'
import { Dialog } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

function Stars({ len }: { len: number }) {
  return (
    <>
      {Array.from({ length: len }, (_, i) => (
        <StarIcon
          key={i}
          className="h-4 w-4 text-yellow-500"
        />
      ))}
    </>
  )
}

function Unstars({ len }: { len: number }) {
  return (
    <>
      {Array.from({ length: len }, (_, i) => (
        <OutlineStarIcon
          key={i}
          className="h-4 w-4 text-yellow-500"
        />
      ))}
    </>
  )
}

function ProductRating({ product }: { product?: Product }) {
  const len = Math.floor(product?.rating.rate || -1)
  return (
    <div>
      {len !== -1 && (
        <div className="flex items-center justify-between  mr-6">
          <div className="flex items-center">
            <Stars len={len} />
            <Unstars len={5 - len} />
            <p className="ml-2">{product?.rating.rate}</p>
          </div>
          <p className="text-blue-600 hover:underline cursor-pointer text-xs">
            See all {product?.rating.count} reviews
          </p>
        </div>
      )}
    </div>
  )
}

const Loading = () => {
  return (
    <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
  )
}

export default function Modal() {
  const [isOpen, { setFalse }] = useBoolean(true)
  const [
    loading,
    { setFalse: loadingDone, setTrue: startLoading }
  ] = useBoolean(false)
  const { id } = useParams()
  const [product, setProduct] = useSafeState<Product>()
  const router = useRouter()

  useEffect(() => {
    startLoading()
    getProduct(id).then((p) => {
      setProduct(p)
      loadingDone()
    })
  }, [id, loadingDone, setProduct, startLoading])

  const onClose = useCallback(() => {
    setFalse()
    router.back()
  }, [router, setFalse])

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            {loading && <Loading />}
            {!loading && (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <ProductImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div>
                    <h4 className="font-semibold">
                      {product?.title}
                    </h4>
                    <p className="font-medium text-sm">
                      ${product?.price}
                    </p>
                    <ProductRating product={product} />
                  </div>
                  <p className="line-clamp-5 text-sm flex-1">
                    {product?.description}
                  </p>
                  <div className="space-y-3 text-sm">
                    <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                      Add to Bag
                    </button>
                    <button
                      onClick={() =>
                        window.location.reload()
                      }
                      className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
