import './normalize.css'
import './globals.scss'
import localFont from 'next/font/local'
import Header from '@/components/sections/header'
import Footer from '@/components/sections/footer'
import { AppProvider } from '../context/app-context'
import SubHeader from '@/components/sections/mobile-sub-header'

const Satoshi = localFont({
  src: '../assets/fonts/satoshi.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ["sans-serif"]
})

export const metadata = {
  title: 'Psychodietetyka i Psychoterapia: Zdrowe Relacje z Jedzeniem – Psychodietmed',
  description: 'Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.',
  openGraph: {
    title: 'Psychodietetyka i Psychoterapia: Zdrowe Relacje z Jedzeniem – Psychodietmed',
    description: 'Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.',
    url: 'https://www.psychodietmed.pl/',
    siteName: 'Psychodietmed',
    locale: 'pl-PL',
    type: 'website',
  },
  robots: {
    index: false,
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="pl">
      <AppProvider>
        {/* <ApolloProvider client={client}> */}
        <body className={`body ${Satoshi.variable}`}>
          <Header />
          <SubHeader />
          {children}
          <Footer />
        </body>
        {/* </ApolloProvider> */}
      </AppProvider>
    </html>
  )
}
