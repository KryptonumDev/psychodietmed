import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlexWithGrid({ data: { content, image, gridKafelkow } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.content}>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <div className={styles.grid}>
        {gridKafelkow.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: item.content }} />
            <Image className={styles.image} src={item.image.mediaItemUrl} alt={item.image.altText} width={item.image.mediaDetails.width} height={item.image.mediaDetails.height} />
          </div>
        ))}
      </div>
    </section>
  )
}