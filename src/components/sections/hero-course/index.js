import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"
import { Clock } from "../../../assets/clock"
import { Graduate } from "../../../assets/graduate"
import AddToCart from "@/components/atoms/add-to-cart-button"
import Price from "@/components/atoms/price"

export default function Hero({ regularPrice, price, lessonSlug, slug, databaseId, accessToCourse, title, image, time, count }) {
  return (
    <section className={styles.wrapper}>
      <Image
        width={image.node.mediaDetails.width}
        height={image.node.mediaDetails.height}
        src={image.node.mediaItemUrl}
        alt={image.node.altText}
        className={styles.image}
        aspectRatio={true}
      />
      <div className={styles.info}>
        <div>
          <h1>Kurs: {title}</h1>
          <div className={styles.priecflex}>
            {!accessToCourse && (
              <Price salesPrice={price} regularPrice={regularPrice} />
            )}
            {accessToCourse ? (
              <Link className="link" href={`/moje-kursy/${slug}/${lessonSlug}`}>Rozpocznij lekcję</Link>
            ) : (
              <AddToCart className="link" product={{ productId: databaseId }}>Zakup dostęp do kursu</AddToCart>
            )}
          </div>
        </div>
        <div className={styles.flex}>
          <p><Clock /> Łączny czas: <span>{time}</span></p>
          <p><Graduate /> Liczba lekcji: <span>{count}</span></p>
        </div>
      </div>
    </section>
  )
}