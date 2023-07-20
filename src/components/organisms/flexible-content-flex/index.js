import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import AddToCart from "@/components/atoms/add-to-cart-button"

export default function Flex({ productId, data: { content, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        <AddToCart product={{ productId: productId }} />
      </div>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}