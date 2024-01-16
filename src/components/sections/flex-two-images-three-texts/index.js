import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlexMultiImages({ data: { content, contenSecond, imageFirst } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <Image aspectRatio={true} className={styles.imageFirst} src={imageFirst.mediaItemUrl} alt={imageFirst.altText} width={imageFirst.mediaDetails.width} height={imageFirst.mediaDetails.height} />
        <div className={styles.textFirst} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: contenSecond }} />
    </section>
  )
}