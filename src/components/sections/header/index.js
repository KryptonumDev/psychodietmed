import React from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { Logo } from "../../../assets/logo";

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
  },
  {
    name: 'Blog',
    url: '/blog',
    subpages: null
  }
]

export default function Header({ data }) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href='/' className={styles.logo_link}>
          <Logo className={styles.logo} />
        </Link>
        <ul className={styles.top_nav}>
          {urlSystem.map((item, index) => (
            <li className={styles.top_nav_item}>
              <Link href={item.url}>
                {item.name}
              </Link>
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
        <Link className="link" href='mailto: biuro@psychodietmed.pl'>
          Skontaktuj się!
        </Link>
        <Link href='/koszyk' className={styles.cart}>
          <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 8.5H24C24 6.37827 23.1571 4.34344 21.6569 2.84315C20.1566 1.34285 18.1217 0.5 16 0.5C13.8783 0.5 11.8434 1.34285 10.3431 2.84315C8.84286 4.34344 8 6.37827 8 8.5H4C2.93913 8.5 1.92172 8.92143 1.17157 9.67157C0.421427 10.4217 0 11.4391 0 12.5L0 25.8333C0.00211714 27.6008 0.705176 29.2953 1.95496 30.545C3.20474 31.7948 4.89921 32.4979 6.66667 32.5H25.3333C27.1008 32.4979 28.7953 31.7948 30.045 30.545C31.2948 29.2953 31.9979 27.6008 32 25.8333V12.5C32 11.4391 31.5786 10.4217 30.8284 9.67157C30.0783 8.92143 29.0609 8.5 28 8.5ZM16 3.16667C17.4145 3.16667 18.771 3.72857 19.7712 4.72876C20.7714 5.72896 21.3333 7.08551 21.3333 8.5H10.6667C10.6667 7.08551 11.2286 5.72896 12.2288 4.72876C13.229 3.72857 14.5855 3.16667 16 3.16667V3.16667ZM29.3333 25.8333C29.3333 26.8942 28.9119 27.9116 28.1618 28.6618C27.4116 29.4119 26.3942 29.8333 25.3333 29.8333H6.66667C5.6058 29.8333 4.58839 29.4119 3.83824 28.6618C3.08809 27.9116 2.66667 26.8942 2.66667 25.8333V12.5C2.66667 12.1464 2.80714 11.8072 3.05719 11.5572C3.30724 11.3071 3.64638 11.1667 4 11.1667H8V13.8333C8 14.187 8.14048 14.5261 8.39052 14.7761C8.64057 15.0262 8.97971 15.1667 9.33333 15.1667C9.68696 15.1667 10.0261 15.0262 10.2761 14.7761C10.5262 14.5261 10.6667 14.187 10.6667 13.8333V11.1667H21.3333V13.8333C21.3333 14.187 21.4738 14.5261 21.7239 14.7761C21.9739 15.0262 22.313 15.1667 22.6667 15.1667C23.0203 15.1667 23.3594 15.0262 23.6095 14.7761C23.8595 14.5261 24 14.187 24 13.8333V11.1667H28C28.3536 11.1667 28.6928 11.3071 28.9428 11.5572C29.1929 11.8072 29.3333 12.1464 29.3333 12.5V25.8333Z" fill="#194574" />
          </svg>
        </Link>
      </div>
    </header>
  )
}