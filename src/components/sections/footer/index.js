import React from "react"
import styles from './styles.module.scss';
import { Logo } from "../../../assets/logo";
import { Instagram } from "../../../assets/instagram";
import { Facebook } from "../../../assets/facebook";
import Link from "next/link";

const urlSystem = [
  {
    name: 'O kliencie',
    url: '/o-kliencie',
    subpages: [
      {
        name: 'Zespół',
        url: '/o-kliencie/zespol'
      },
      {
        name: 'Historia marki',
        url: '/o-kliencie/historia-marki'
      },
      {
        name: 'Media',
        url: '/o-kliencie/media'
      },
      {
        name: 'Kontakt',
        url: '/o-kliencie/kontakt'
      }
    ]
  },
  {
    name: 'Dla pacjenta',
    url: '/dla-pacjenta',
    subpages: [
      {
        name: 'Jak działamy',
        url: '/dla-pacjenta/jak-dzialamy'
      },
      {
        name: 'Efekty współpracy',
        url: '/dla-pacjenta/efekty-wspolpracy'
      },
      {
        name: 'Pakiety',
        url: '/dla-pacjenta/pakiety'
      },
      {
        name: 'Narzędzia',
        url: '/dla-pacjenta/narzedzia'
      },
    ]
  },
  {
    name: 'Dla specjalisty',
    url: '/dla-specjalisty',
    subpages: [
      {
        name: 'Akademia',
        url: '/dla-specjalisty/akademia'
      }
    ]
  }
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <div className={styles.links}>
          {urlSystem.map((item, index) => (
            <div key={index} className={styles.link_wrap}>
              <Link href={item.url}>{item.name}</Link>
              {item.subpages.map(el => (
                <Link href={el.url}>{el.name}</Link>
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
        <div className={styles.flex}>
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