import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BlockchainProvider } from "@/components/providers/blockchain-provider"
import { CookieConsent } from "@/components/cookie-consent"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sinter - Genera música con IA',
  description: 'Plataforma profesional de generación de música con IA para artistas y DJs. Crea beats, melodías y vende tu música.',
  keywords: ['música', 'IA', 'inteligencia artificial', 'beats', 'melodías', 'DJ', 'producción musical'],
  authors: [{ name: 'Sinter' }],
  icons: {
    icon: '/SinterLogo.jpeg',
    shortcut: '/SinterLogo.jpeg',
    apple: '/SinterLogo.jpeg',
  },
  openGraph: {
    title: 'Sinter - Genera música con IA',
    description: 'Plataforma profesional de generación de música con IA para artistas y DJs. Crea beats, melodías y vende tu música.',
    url: 'https://sinter.app',
    siteName: 'Sinter',
    images: [
      {
        url: '/SinterLogo.jpeg',
        width: 800,
        height: 800,
        alt: 'Sinter Logo',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sinter - Genera música con IA',
    description: 'Plataforma profesional de generación de música con IA para artistas y DJs.',
    images: ['/SinterLogo.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <BlockchainProvider>
          {children}
          <CookieConsent />
          <Analytics />
        </BlockchainProvider>
      </body>
    </html>
  )
}
