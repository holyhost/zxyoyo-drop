"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: '只想优优',
  description: 'Generated by create next app',
}

export default function LoginRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
              {children} 
      </body>
    </html>
  )
}
