"use client"
import UserProvider from '@/components/provider/UserProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider } from '@mantine/core'
import { Main, NextScript } from 'next/document'
import { AppLayout } from '@/components/AppLayout'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <UserProvider session={''}>
              {children}
            
          </UserProvider>
        </MantineProvider>
        
        
      </body>
    </html>
  )
}
