import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Algorhythmic Synthesis - Mathematical Music Composition',
  description: 'Revolutionary musical composition system integrating mathematics, physics, music history, literature, visual arts, dance, and comedy',
  keywords: ['algorithmic composition', 'music theory', 'mathematics', 'physics', 'sonic pi', 'midi', 'generative music'],
  authors: [{ name: 'Algorhythmic Synthesis Team' }],
  openGraph: {
    title: 'Algorhythmic Synthesis',
    description: 'Mathematical Music Composition System',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
