import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function FlexAlt({ data: { image, content } }) {
  return (
    <section className={styles.wrapper}>
      <Image
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        src={image.mediaItemUrl}
        alt={image.altText}
        className={styles.image}
        aspectRatio={true}
      />
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  )
}