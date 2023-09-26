"use client"
import '@/app/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '只想优优',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
        {children}
    </section>
  )
}
