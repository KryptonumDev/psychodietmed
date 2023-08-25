import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import GridTextImagePlates from "@/components/organisms/grid-text-image-plates"

export default function TwoColumnFlexWithGrid({ data: { content, image, gridKafelkow } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.content}>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <GridTextImagePlates grid={gridKafelkow}/>
    </section>
  )
}