import './normalize.css'
import './globals.css'

import localFont from 'next/font/local'
import Header from './components/sections/header'
const Satoshi = localFont({ src: '../assets/fonts/satoshi.woff2' })


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`body ${Satoshi.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
