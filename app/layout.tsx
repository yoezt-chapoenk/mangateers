import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mangateers.com'),
  title: {
    default: 'Mangateers - Baca Manga, Manhwa, Manhua Online Gratis',
    template: '%s | Mangateers'
  },
  description: 'Baca manga, manhwa, dan manhua online gratis di Mangateers. Koleksi lengkap komik terbaru dengan kualitas HD. Update setiap hari!',
  keywords: [
    'manga online',
    'manhwa online', 
    'manhua online',
    'baca manga gratis',
    'komik online',
    'manga indonesia',
    'webtoon',
    'mangateers',
    'baca komik'
  ],
  authors: [{ name: 'Mangateers Team' }],
  creator: 'Mangateers',
  publisher: 'Mangateers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.mangateers.com',
    siteName: 'Mangateers',
    title: 'Mangateers - Baca Manga, Manhwa, Manhua Online Gratis',
    description: 'Baca manga, manhwa, dan manhua online gratis dengan kualitas HD. Koleksi lengkap dan update setiap hari!',
    images: [{
      url: '/og-homepage.png',
      width: 1200,
      height: 630,
      alt: 'Mangateers - Baca Komik Online Gratis'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mangateers - Baca Manga, Manhwa, Manhua Online Gratis',
    description: 'Baca komik online gratis dengan kualitas HD di Mangateers',
    images: ['/og-homepage.png'],
    creator: '@mangateers'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
