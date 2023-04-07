import './normalize.css'
import './globals.css'

import localFont from 'next/font/local'
import Header from './components/sections/header'
import Footer from './components/sections/footer'
const Satoshi = localFont({ src: '../assets/fonts/satoshi.woff2' })


export const metadata = {
  title: 'Psychodietetyka i Psychoterapia: Zdrowe Relacje z Żywnością – Psychodietmed',
  description: 'Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.',
  openGraph: {
    title: 'Psychodietetyka i Psychoterapia: Zdrowe Relacje z Żywnością – Psychodietmed',
    description: 'Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.',
    url: 'https://nextjs.org',
    siteName: 'Psychodietmed',
    locale: 'pl-PL',
    type: 'website',
  },
  robots: {
    index: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`body ${Satoshi.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
