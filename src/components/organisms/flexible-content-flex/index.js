import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import Link from "next/link"
// import AddToCart from "@/components/atoms/add-to-cart-button"

export default function Flex({ productId, data: { content, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        <Link  className="link" href='#zakup'>Chcę ten produkt!</Link>
        {/* <AddToCart product={{ productId: productId }} /> */}
      </div>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}