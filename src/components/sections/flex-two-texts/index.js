import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlexMultiText({ data: { contentFirstPart, contentSecondPart, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textFirst} dangerouslySetInnerHTML={{ __html: contentFirstPart }} />
      <div className={styles.textSecond} dangerouslySetInnerHTML={{ __html: contentSecondPart }} />
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}