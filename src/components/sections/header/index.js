'use client'
import React from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { Logo } from "../../../assets/logo";
import { AngleRight } from "../../../assets/angle-right";
import { AngleLeft } from "../../../assets/angle-left";
import Cart from "@/components/atoms/cart";

const urlSystem = [
  {
    name: 'O kliencie',
    url: null,
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
    url: null,
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
    url: null,
    subpages: [
      {
        name: 'Akademia',
        url: '/dla-specjalisty/akademia'
      }
    ]
  },
  {
    name: 'Blog',
    url: '/blog',
    subpages: null
  }
]

export default function Header({ data }) {

  const [isMenuOpened, setIsMenuOpened] = React.useState(false)
  const [itemOpened, setItemOpened] = React.useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href='/' className={styles.logo_link}>
          <Logo className={styles.logo} />
        </Link>
        <ul className={styles.top_nav}>
          {urlSystem.map((item, index) => (
            <li className={styles.top_nav_item}>
              {item.url ? (
                <Link href={item.url}>
                  {item.name}
                </Link>
              ) : (
                <button>
                  {item.name}
                </button>
              )}
              {item.subpages && (
                <ul className={styles.bottom_nav}>
                  {item.subpages?.map(el => (
                    <li className={styles.bottom_nav_item}>
                      <Link href={el.url}>
                        {el.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link className={`${styles.link} link`} href='mailto: biuro@psychodietmed.pl'>
          Skontaktuj się!
        </Link>
        <Cart className={styles.cart}/>
        <button onClick={() => { setIsMenuOpened(!isMenuOpened); setItemOpened(false) }} className={`${styles.burger} ${isMenuOpened ? styles.active : ''}`}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div onClick={() => { setIsMenuOpened(false); setItemOpened(false) }} className={`${styles.overlay} ${isMenuOpened ? styles.active : ''}`} />
      <div className={`${styles.mobile_menu} ${isMenuOpened ? styles.active : ''}`}>
        {urlSystem.map((item, index) => (
          <>
            {item.url ? (
              <Link href={item.url}>
                {item.name}
              </Link>
            ) : (
              <button onClick={() => { setItemOpened(index) }}>
                {item.name}
                <AngleRight />
              </button>
            )}
          </>
        ))}
      </div>

      {urlSystem.map((item, index) => (
        <>
          {item.subpages && (
            <div className={`${itemOpened === index ? styles.active : ''} ${styles.mobile_menu_sub}`}>
              <button onClick={() => { setItemOpened(false) }}>
                <AngleLeft />
                {item.name}
              </button>
              {item.subpages?.map(el => (
                <Link href={el.url}>{el.name}</Link>
              ))}
            </div>
          )}
        </>
      ))}
    </header>
  )
}