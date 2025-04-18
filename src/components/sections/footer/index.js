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
      {
        name: 'Opinie',
        url: '/opinie'
      }
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
  }
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link className={styles.logolink} href="/" aria-label="Strona główna">
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.phone}>
            <p>
              Masz wątpliwości lub pytania?<br />
              Zadzwoń do mnie
            </p>
            <a href="tel:+48505800990">
              <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4881_2691)">
                  <path d="M14.624 1.62484C14.624 1.32647 14.7425 1.04033 14.9535 0.829348C15.1645 0.61837 15.4506 0.499843 15.749 0.499843C18.7317 0.503119 21.5912 1.68944 23.7003 3.79851C25.8094 5.90759 26.9957 8.76716 26.999 11.7498C26.999 12.0482 26.8804 12.3344 26.6695 12.5453C26.4585 12.7563 26.1723 12.8748 25.874 12.8748C25.5756 12.8748 25.2895 12.7563 25.0785 12.5453C24.8675 12.3344 24.749 12.0482 24.749 11.7498C24.7463 9.36372 23.7972 7.07609 22.11 5.38884C20.4227 3.7016 18.1351 2.75252 15.749 2.74984C15.4506 2.74984 15.1645 2.63132 14.9535 2.42034C14.7425 2.20936 14.624 1.92321 14.624 1.62484ZM15.749 7.24984C16.9425 7.24984 18.087 7.72395 18.931 8.56786C19.7749 9.41178 20.249 10.5564 20.249 11.7498C20.249 12.0482 20.3675 12.3344 20.5785 12.5453C20.7895 12.7563 21.0756 12.8748 21.374 12.8748C21.6723 12.8748 21.9585 12.7563 22.1695 12.5453C22.3805 12.3344 22.499 12.0482 22.499 11.7498C22.4972 9.96018 21.7855 8.24433 20.52 6.97885C19.2545 5.71336 17.5386 5.00163 15.749 4.99984C15.4506 4.99984 15.1645 5.11837 14.9535 5.32935C14.7425 5.54033 14.624 5.82648 14.624 6.12484C14.624 6.42321 14.7425 6.70936 14.9535 6.92034C15.1645 7.13132 15.4506 7.24984 15.749 7.24984ZM25.9786 19.3312C26.6305 19.985 26.9967 20.8706 26.9967 21.7938C26.9967 22.7171 26.6305 23.6027 25.9786 24.2565L24.9549 25.4366C15.7411 34.2577 -6.68011 11.8421 2.00488 2.59909L3.29863 1.47409C3.95312 0.840355 4.8308 0.489774 5.74179 0.498195C6.65278 0.506617 7.52384 0.873364 8.1665 1.51909C8.20137 1.55397 10.286 4.26184 10.286 4.26184C10.9046 4.91167 11.2489 5.77489 11.2474 6.67205C11.246 7.56921 10.8988 8.43129 10.2781 9.07909L8.97537 10.7171C9.69632 12.4688 10.7563 14.0609 12.0944 15.4017C13.4326 16.7425 15.0224 17.8057 16.7727 18.5302L18.4209 17.2196C19.0688 16.5994 19.9307 16.2527 20.8276 16.2514C21.7245 16.2501 22.5873 16.5945 23.237 17.2128C23.237 17.2128 25.9437 19.2963 25.9786 19.3312ZM24.4306 20.967C24.4306 20.967 21.7385 18.8958 21.7036 18.861C21.4718 18.6312 21.1587 18.5022 20.8323 18.5022C20.5059 18.5022 20.1927 18.6312 19.961 18.861C19.9306 18.8925 17.6615 20.7003 17.6615 20.7003C17.5086 20.8221 17.3266 20.9018 17.1335 20.9318C16.9403 20.9618 16.7427 20.941 16.5601 20.8713C14.2926 20.0271 12.2331 18.7054 10.5209 16.9958C8.8088 15.2862 7.48407 13.2286 6.6365 10.9623C6.56135 10.7772 6.53685 10.5754 6.56552 10.3777C6.59418 10.18 6.67499 9.99349 6.79962 9.83735C6.79962 9.83735 8.6075 7.56709 8.63787 7.53784C8.86767 7.30608 8.99661 6.99291 8.99661 6.66653C8.99661 6.34015 8.86767 6.02698 8.63787 5.79522C8.603 5.76147 6.53187 3.06709 6.53187 3.06709C6.29664 2.85616 5.98963 2.7432 5.67378 2.75136C5.35793 2.75952 5.05716 2.88818 4.83313 3.11097L3.53938 4.23597C-2.80786 11.868 16.622 30.2201 23.3101 23.8998L24.335 22.7186C24.5751 22.4961 24.7194 22.189 24.7372 21.8621C24.7551 21.5353 24.6451 21.2143 24.4306 20.967Z" fill="#194574" />
                </g>
                <defs>
                  <clipPath id="clip0_4881_2691">
                    <rect width="27" height="27" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>+48 505 800 990</span>
            </a>
          </div>
        </div>
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
          <p>Ⓒ Stworzone przez <a href="https://kryptonum.eu/pl" target="_blank" rel="noopener">Kryptonum</a></p>
          <Link className={styles.link} href='/regulamin'>Regulamin</Link>
          <Link className={styles.link} href='/polityka-prywatnosci'>Polityka prywatności</Link>
        </div>
        <div className={`${styles.flex} ${styles.social}`}>
          <a target="__blank" rel="noopener noreferer" href="https://www.instagram.com/psychodietmed/" aria-label="instagram">
            <Instagram />
          </a>
          <a target="__blank" rel="noopener noreferer" href="https://www.facebook.com/psychodietmed" aria-label="facebook">
            <Facebook />
          </a>
        </div>
      </div>
    </footer>
  )
}
