import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import AddToCart from "@/components/atoms/add-to-cart-button"
import { RightArrow } from "../../../assets/small-right-arrow"

export default function Card({ data, myCourse = false }) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={myCourse ? `/moje-kursy/${data.product.course.slug}` : `/akademia/${data.product.course.slug}`} />
      <div>
        <Image
          className={styles.image}
          src={data?.image.mediaItemUrl}
          alt={data?.image.altText}
          width={data?.image.mediaDetails.width}
          height={data?.image.mediaDetails.height}
          aspectRatio={true}
        />
        <h3>{data.name}</h3>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.excerpt }} />
      </div>
      <div className={styles.control}>
        {myCourse ? (
          <Link className="link" href={`/moje-kursy/${data.product.course.slug}`}>
            Przejdź do kursu
          </Link>
        ) : (
          <>
            <AddToCart className="link" product={{ productId: data.productId }}>
              Kup kurs
            </AddToCart>
            <Link className={styles.link} href={`/akademia/${data.slug}`}>
              Przejdź do kursu <RightArrow />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}