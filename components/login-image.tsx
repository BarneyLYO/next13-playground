'use client'
import Image from 'next/image'

const imageLoader = ({ src }: any) => {
  return src
}

export function LogoImage() {
  return (
    <div className="relative w-52 h-14 ">
      <Image
        src="https://i.ibb.co/r581WhP/Logo-Makr-3-UYbjb.png"
        alt="logo"
        fill
        className="object-contain"
        loader={imageLoader}
      />
    </div>
  )
}
