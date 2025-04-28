'use client'
import React, { useContext, useState } from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { Logo } from "../../../assets/logo";
import { AngleRight } from "../../../assets/angle-right";
import { AngleLeft } from "../../../assets/angle-left";
import Cart from "@/components/atoms/cart";
import { AppContext } from "../../../context/app-context";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'

const urlSystem = [
  {
    name: 'O klinice',
    url: null,
    subpages: [
      {
        name: 'O nas',
        url: '/o-nas'
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
      },
    ]
  },
  {
    name: 'Dla pacjenta',
    url: null,
    subpages: [
      {
        name: 'Specjaliści',
        url: '/specjalisci'
      },
      {
        name: 'Jak umówić wizytę?',
        url: '/wspolpraca'
      },
      {
        name: 'Efekty współpracy',
        url: '/efekty-wspolpracy'
      },
      {
        name: 'Zrób test',
        url: '/narzedzia'
      },
      {
        name: 'Cennik',
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
    name: 'Opinie',
    url: '/opinie'
  },
  {
    name: 'Blog',
    url: '/blog',
    subpages: null
  }
]

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [itemOpened, setItemOpened] = useState(false)
  const [cart] = useContext(AppContext);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const pathname = usePathname();

  const handleClick = (e) => {
    const target = e.target;
    target.blur();
    target.closest('ul').style.display = "none";
    setTimeout(() => {
      target.closest('ul').style = null;
    }, 100);
  }

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setIsMenuOpened(false);
      setItemOpened(false);
    }
  }

  return (
    <>
      <a href="#main" className={styles.skipToMain}>Przejdź do treści głownej</a>
      <header className={`${styles.header} ${scrollY > 0 ? styles.scrolled : ''}`}>
        <div className={styles.content}>
          <Link
            href='/'
            className={styles.logo_link}
            aria-label='Strona główna'
            onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}
          >
            <Logo className={styles.logo} />
          </Link>
          <ul className={styles.top_nav}>
            {urlSystem.map((item, index) => (
              <li key={index} className={styles.top_nav_item}>
                {item.url ? (
                  <Link href={item.url} aria-current={pathname == item.url ? 'page' : false}>
                    {item.name}
                  </Link>
                ) : (
                  <span className={item.subpages.some(el => el.url == pathname) ? styles.active : ''}>
                    {item.name}
                  </span>
                )}
                {item.subpages && (
                  <ul className={styles.bottom_nav}>
                    {item.subpages?.map(el => (
                      <li key={el.url} className={styles.bottom_nav_item}>
                        <Link href={el.url} aria-current={pathname == el.url ? 'page' : false} onClick={(e) => handleClick(e)}>
                          {el.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            className={`${styles.link} link`}
            href='/umow-wizyte'
            onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}
          >
            Umów się
          </Link>
          <Cart
            cart={cart?.totalProductsCount}
            className={styles.cart}
            onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}
          />
          <button
            onClick={() => { setIsMenuOpened(!isMenuOpened); setItemOpened(false) }}
            className={`${styles.burger} ${isMenuOpened ? styles.active : ''}`}
            aria-label="Otwórz/Zamknij nawigację"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}
          className={`${styles.overlay} ${isMenuOpened ? styles.active : ''}`}
        />
        <div className={`${styles.mobile_menu} ${isMenuOpened ? styles.active : ''} ${itemOpened ? styles.overlayed : ''}`}>
          {urlSystem.map((item, index) => (
            <React.Fragment key={index} >
              {item.url ? (
                <Link href={item.url} onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}>
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
                  <Link
                    key={el.url}
                    href={el.url}
                    onClick={() => { setIsMenuOpened(false); setItemOpened(false) }}
                    aria-current={pathname == el.url ? 'page' : false}
                  >{el.name}</Link>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </header>
    </>
  )
}
