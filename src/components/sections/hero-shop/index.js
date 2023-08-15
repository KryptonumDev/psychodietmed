import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Price from "@/components/atoms/price"
import AddToCart from "@/components/atoms/add-to-cart-button" 
import Link from "next/link"

export default function Hero({ hero, data }) {
  return (
    <section className={styles.wrapper}>
      <h1>Nasz topowy produkt</h1>
      <div className={styles.product}>
      <Link href={`/oferta/${data.slug}`} className={styles.link} />
        <Image loading='eager' className={styles.image} aspectRatio={true} src={data.image?.mediaItemUrl} alt={data.title} width={data.image.mediaDetails.width} height={data.image.mediaDetails.height} />
        <div>
          <p className={styles.name}>{data.name}</p>
          <div className={styles.rating}>
            <p>Średnia ocena:</p>
            <Stars />
          </div>
          <ul className={styles.list}>
            {hero.list.map(el => (
              <li key={el.text}>
                <Image className={styles.icon} aspectRatio={true} src={el.icon.mediaItemUrl} alt={el.icon.alText} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} />
                <p>{el.text}</p>
              </li>
            ))}
          </ul>
          <div className={styles.flex}>
            <Price salesPrice={data.price} regularPrice={data.regularPrice} />
            <AddToCart product={data} />
          </div>
        </div>
      </div>
    </section>
  )
}

const Stars = () => (
  <svg width="142" height="26" viewBox="0 0 142 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0489 3.42705C12.3483 2.50574 13.6517 2.50574 13.9511 3.42705L15.5819 8.4463C15.7158 8.85833 16.0997 9.13729 16.533 9.13729H21.8105C22.7792 9.13729 23.182 10.3769 22.3983 10.9463L18.1287 14.0484C17.7782 14.303 17.6315 14.7544 17.7654 15.1664L19.3963 20.1857C19.6956 21.107 18.6411 21.8731 17.8574 21.3037L13.5878 18.2016C13.2373 17.947 12.7627 17.947 12.4122 18.2016L8.14258 21.3037C7.35887 21.8731 6.30439 21.107 6.60374 20.1857L8.2346 15.1664C8.36847 14.7544 8.22181 14.303 7.87132 14.0484L3.60169 10.9463C2.81798 10.3769 3.22075 9.13729 4.18948 9.13729H9.46703C9.90026 9.13729 10.2842 8.85833 10.4181 8.4463L12.0489 3.42705Z" fill="#DEAFB8" />
    <path d="M41.0489 3.42705C41.3483 2.50574 42.6517 2.50574 42.9511 3.42705L44.5819 8.4463C44.7158 8.85833 45.0997 9.13729 45.533 9.13729H50.8105C51.7792 9.13729 52.182 10.3769 51.3983 10.9463L47.1287 14.0484C46.7782 14.303 46.6315 14.7544 46.7654 15.1664L48.3963 20.1857C48.6956 21.107 47.6411 21.8731 46.8574 21.3037L42.5878 18.2016C42.2373 17.947 41.7627 17.947 41.4122 18.2016L37.1426 21.3037C36.3589 21.8731 35.3044 21.107 35.6037 20.1857L37.2346 15.1664C37.3685 14.7544 37.2218 14.303 36.8713 14.0484L32.6017 10.9463C31.818 10.3769 32.2208 9.13729 33.1895 9.13729H38.467C38.9003 9.13729 39.2842 8.85833 39.4181 8.4463L41.0489 3.42705Z" fill="#DEAFB8" />
    <path d="M70.0489 3.42705C70.3483 2.50574 71.6517 2.50574 71.9511 3.42705L73.5819 8.4463C73.7158 8.85833 74.0997 9.13729 74.533 9.13729H79.8105C80.7792 9.13729 81.182 10.3769 80.3983 10.9463L76.1287 14.0484C75.7782 14.303 75.6315 14.7544 75.7654 15.1664L77.3963 20.1857C77.6956 21.107 76.6411 21.8731 75.8574 21.3037L71.5878 18.2016C71.2373 17.947 70.7627 17.947 70.4122 18.2016L66.1426 21.3037C65.3589 21.8731 64.3044 21.107 64.6037 20.1857L66.2346 15.1664C66.3685 14.7544 66.2218 14.303 65.8713 14.0484L61.6017 10.9463C60.818 10.3769 61.2208 9.13729 62.1895 9.13729H67.467C67.9003 9.13729 68.2842 8.85833 68.4181 8.4463L70.0489 3.42705Z" fill="#DEAFB8" />
    <path d="M99.0489 3.42705C99.3483 2.50574 100.652 2.50574 100.951 3.42705L102.582 8.4463C102.716 8.85833 103.1 9.13729 103.533 9.13729H108.811C109.779 9.13729 110.182 10.3769 109.398 10.9463L105.129 14.0484C104.778 14.303 104.632 14.7544 104.765 15.1664L106.396 20.1857C106.696 21.107 105.641 21.8731 104.857 21.3037L100.588 18.2016C100.237 17.947 99.7627 17.947 99.4122 18.2016L95.1426 21.3037C94.3589 21.8731 93.3044 21.107 93.6037 20.1857L95.2346 15.1664C95.3685 14.7544 95.2218 14.303 94.8713 14.0484L90.6017 10.9463C89.818 10.3769 90.2208 9.13729 91.1895 9.13729H96.467C96.9003 9.13729 97.2842 8.85833 97.4181 8.4463L99.0489 3.42705Z" fill="#DEAFB8" />
    <path d="M128.049 3.42705C128.348 2.50574 129.652 2.50574 129.951 3.42705L131.582 8.4463C131.716 8.85833 132.1 9.13729 132.533 9.13729H137.811C138.779 9.13729 139.182 10.3769 138.398 10.9463L134.129 14.0484C133.778 14.303 133.632 14.7544 133.765 15.1664L135.396 20.1857C135.696 21.107 134.641 21.8731 133.857 21.3037L129.588 18.2016C129.237 17.947 128.763 17.947 128.412 18.2016L124.143 21.3037C123.359 21.8731 122.304 21.107 122.604 20.1857L124.235 15.1664C124.368 14.7544 124.222 14.303 123.871 14.0484L119.602 10.9463C118.818 10.3769 119.221 9.13729 120.189 9.13729H125.467C125.9 9.13729 126.284 8.85833 126.418 8.4463L128.049 3.42705Z" fill="#DEAFB8" />
  </svg>
)