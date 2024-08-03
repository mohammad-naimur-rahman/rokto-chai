import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans as FontSans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Rokto Chai',
  description: 'Donate blood and save lives',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='bn'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
