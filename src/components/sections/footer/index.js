import React from "react"
import styles from './styles.module.scss';
import { Logo } from "../../../assets/logo";
import { Instagram } from "../../../assets/instagram";
import { Facebook } from "../../../assets/facebook";
import Link from "next/link";

const urlSystem = [
  {
    name: 'O klinice',
    url: null,
    subpages: [
      {
        name: 'Zespół',
        url: '/zespol'
      },
      {
        name: 'Historia marki',
        url: '/historia-marki'
      },
      {
        name: 'Media',
        url: '/media'
      },
      {
        name: 'Kontakt',
        url: '/kontakt'
      }
    ]
  },
  {
    name: 'Dla pacjenta',
    url: null,
    subpages: [
      {
        name: 'Jak działamy',
        url: '/jak-dzialamy'
      },
      {
        name: 'Efekty współpracy',
        url: '/efekty-wspolpracy'
      },
      {
        name: 'Narzędzia',
        url: '/narzedzia'
      },
      {
        name: 'Oferta',
        url: '/oferta'
      }
    ]
  },
  {
    name: 'Dla specjalisty',
    url: null,
    subpages: [
      {
        name: 'Akademia',
        url: '/akademia'
      },
      {
        name: 'Moje kursy',
        url: '/moje-kursy'
      }
    ]
  }
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link href="/" aria-label="Strona główna">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.links}>
          {urlSystem.map((item, index) => (
            <div key={index} className={styles.link_wrap}>
              {item.url ? (
                <Link href={item.url}>
                  {item.name}
                </Link>
              ) : (
                <p>
                  {item.name}
                </p>
              )}
              {item.subpages.map(el => (
                <Link key={el.url} href={el.url}>{el.name}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.inform}>
        <div className={styles.flex}>
          <h3>Ⓒ Stworzone przez <a href="https://kryptonum.eu" target="_blank">Kryptonum</a></h3>
          <Link className={styles.link} href='/regulamin'>Regulamin</Link>
          <Link className={styles.link} href='/polityka-prywatnosci'>Polityka prywatności</Link>
        </div>
        <div className={`${styles.flex} ${styles.social}`}>
          <a href="https://www.instagram.com/psychodietmed/" aria-label="instagram">
            <Instagram />
          </a>
          <a href="https://www.facebook.com/strefapsychodietetyki" aria-label="facebook">
            <Facebook />
          </a>
        </div>
      </div>
    </footer>
  )
}