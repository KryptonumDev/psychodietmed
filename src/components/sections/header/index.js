'use client'
import React, { useContext, useState } from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { Logo } from "../../../assets/logo";
import { AngleRight } from "../../../assets/angle-right";
import { AngleLeft } from "../../../assets/angle-left";
import Cart from "@/components/atoms/cart";
import { AppContext } from "../../../context/app-context";

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
        url: '/wspolpraca'
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
  },
  {
    name: 'Blog',
    url: '/blog',
    subpages: null
  }
]

export default function Header({ data }) {

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [itemOpened, setItemOpened] = useState(false)
  const [cart] = useContext(AppContext);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href='/' className={styles.logo_link}>
          <Logo className={styles.logo} />
        </Link>
        <ul className={styles.top_nav}>
          {urlSystem.map((item, index) => (
            <li key={index} className={styles.top_nav_item}>
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
                    <li key={el.url} className={styles.bottom_nav_item}>
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
        <Link className={`${styles.link} link`} href='/umow-wizyte'>
          Umów się
        </Link>
        <Cart cart={cart?.totalProductsCount} className={styles.cart} />
        <button onClick={() => { setIsMenuOpened(!isMenuOpened); setItemOpened(false) }} className={`${styles.burger} ${isMenuOpened ? styles.active : ''}`}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div onClick={() => { setIsMenuOpened(false); setItemOpened(false) }} className={`${styles.overlay} ${isMenuOpened ? styles.active : ''}`} />
      <div className={`${styles.mobile_menu} ${isMenuOpened ? styles.active : ''} ${itemOpened ? styles.overlayed : ''}`}>
        {urlSystem.map((item, index) => (
          <React.Fragment key={index} >
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
          </React.Fragment>
        ))}
      </div>

      {urlSystem.map((item, index) => (
        <React.Fragment key={index}>
          {item.subpages && (
            <div className={`${itemOpened === index ? styles.active : ''} ${styles.mobile_menu_sub}`}>
              <button onClick={() => { setItemOpened(false) }}>
                <AngleLeft />
                {item.name}
              </button>
              {item.subpages?.map(el => (
                <Link key={el.url} href={el.url}>{el.name}</Link>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </header>
  )
}