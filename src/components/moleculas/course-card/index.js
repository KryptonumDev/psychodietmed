import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import AddToCart from "@/components/atoms/add-to-cart-button"
import { RightArrow } from "../../../assets/small-right-arrow"

export default function Card({ data, myCourse = false }) {
  const productId = 1
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/akademia/${data.slug}`} />
      <div>
        <Image
          className={styles.image}
          src={data?.featuredImage?.node.mediaItemUrl}
          alt={data?.featuredImage?.node.altText}
          width={data?.featuredImage?.node.mediaDetails.width}
          height={data?.featuredImage?.node.mediaDetails.height}
          aspectRatio={true}
        />
        <h3>{data.title}</h3>
        {/* <p>{data.course.excerpt}</p> */}
      </div>
      <div className={styles.control}>
        {myCourse ? (
          <Link className="link" href={`/akademia/${data.slug}`}>
            Przejdź do kursu
          </Link>
        ) : (
          <>
            <AddToCart className="link" product={{ productId: productId }}>
              Kup kurs
            </AddToCart>
            <Link href={`/akademia/${data.slug}`}>
              Przejdź do kursu <RightArrow />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}