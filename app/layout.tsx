import { Header } from '@/components/header'
import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NEXT13 Playground',
  description: 'NEXT Playground by BL'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* <footer>This is the footer</footer> */}
      </body>
    </html>
  )
}
