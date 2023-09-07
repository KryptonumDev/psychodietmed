import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import AddToCart from "@/components/atoms/add-to-cart-button"
import Price from "@/components/atoms/price"
import Button from "@/components/atoms/button"
import { FiveStars } from "../../../assets/five-stars"

export default function CardFeatured({ data, myCourse = false }) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={myCourse ? `/moje-kursy/${data.product.course.slug}` : `/akademia/kurs/${data.product.course.slug}`} aria-label={data.name} />
      <Image
        className={styles.image}
        src={data?.image.mediaItemUrl}
        alt={data?.image.altText}
        width={data?.image.mediaDetails.width}
        height={data?.image.mediaDetails.height}
        aspectRatio={true}
      />
      <div>
        <h3>{data.name}</h3>
        <p className={styles.stars}>Średnia ocena: <FiveStars/> </p>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.excerpt }} />
        <div className={styles.control}>
          {myCourse ? (
            <Link className="link" href={`/moje-kursy/${data.product.course.slug}`}>
              Przejdź do kursu
            </Link>
          ) : (
            <>
              <div className={styles.priceflex}>
                <Price salesPrice={data.price} regularPrice={data.regularPrice} />
                <AddToCart className="link" product={{ productId: data.productId }}>
                  Kup kurs
                </AddToCart>
              </div>
              <Button theme="secondary" href={`/akademia/kurs/${data.slug}`}>Przejdź do kursu</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}