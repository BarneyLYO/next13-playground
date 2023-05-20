'use client'

import { Product } from '@/types/products'
import { useBoolean } from '@/utils/use-boolean'
import Image from 'next/image'
import { useMemo } from 'react'

interface ProductImageProps {
  product: Product
  fill?: boolean
}

export function ProductImage({
  fill = false,
  product: { image, title }
}: ProductImageProps) {
  const [loading, { setFalse }] = useBoolean(true)
  const animation = loading
    ? 'scale-110 blur-2xl grayscale'
    : 'scale-100 blur-0 grayscale-0'

  const dimension = useMemo(() => {
    if (fill) return {}
    return {
      width: 400,
      height: 1000
    }
  }, [fill])

  return (
    <Image
      src={image}
      alt={title}
      fill={fill}
      className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${animation}`}
      onLoadingComplete={setFalse}
      {...dimension}
    />
  )
}
