import "./normalize.css";
import "./gutenberg.css";
import "./globals.scss";
import localFont from "next/font/local";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { AppProvider } from "../context/app-context";
import SubHeader from "@/components/sections/mobile-sub-header";
import { ApolloWrapper } from "../context/apolo-provider";
import GlobalScript from "../utils/global.js";
// import { Suspense } from 'react'
import { FacebookPixelEvents } from "../context/facebook-pixel";
import { Suspense } from "react";
import Script from "next/script";
import Analytics from "../context/google-tag-manager";

const Satoshi = localFont({
  src: "../assets/fonts/satoshi.woff2",
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata = {
  metadataBase: new URL("https://www.psychodietmed.pl"),
  title:
    "Psychodietetyka i Psychoterapia: Zdrowe Relacje z Jedzeniem – Psychodietmed",
  description:
    "Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.",
  openGraph: {
    title:
      "Psychodietetyka i Psychoterapia: Zdrowe Relacje z Jedzeniem – Psychodietmed",
    description:
      "Odkryj, jak poprawić swoje relacje z jedzeniem dzięki psychodietetyce i psychoterapii. Zdrowa dieta i zdrowe podejście do jedzenia dzięki PsychoDietMed.",
    url: "/",
    siteName: "Psychodietmed",
    locale: "pl-PL",
    type: "website",
    images: ["/opengraph-image.jpg"],
  },
  other: {
    "google-site-verification": "do6-BIwGFZGHQ9pGU8UhEhX5o9F9lapaOmRMNCEEUQQ",
  },
  robots: {
    index: true,
  },
};

const schema = {
  "@context": "http://schema.org",
  "@type": "Organization",
  name: "Psychodietmed",
  description:
    "Psychodietetyka i Psychoterapia: Zdrowe Relacje z Jedzeniem - Psychodietmed",
  url: "https://www.psychodietmed.pl",
  logo: "https://www.psychodietmed.pl/icon.jpg",
  founders: [
    {
      "@type": "Person",
      name: "Mgr. Sylwia Prawdzik",
      jobTitle: "Founder & CEO",
    },
  ],
  sameAs: [
    "https://www.instagram.com/psychodietmed/",
    "https://www.facebook.com/strefapsychodietetyki",
  ],
};

export const revalidate = 600;

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`body ${Satoshi.variable}`}>
        <Script
          id={`organisation`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <ApolloWrapper>
          <AppProvider>
            <Header />
            <SubHeader />
            {children}
            <Footer />
          </AppProvider>
        </ApolloWrapper>
        <GlobalScript />
        <Suspense fallback={null}>
          <FacebookPixelEvents fb_id={"616809410630433"} />
        </Suspense>
        <Suspense fallback={null}>
          <Analytics gtm_id={"GTM-KWLN9N8V"} />
        </Suspense>
        {/* <GoogleAnalytics ga_id={''} /> */}
      </body>
    </html>
  );
}
