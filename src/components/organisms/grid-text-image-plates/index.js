import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"

export default function GridTextImagePlates({ grid }) {
  return (
    <div className={styles.grid}>
      {grid?.map((item, index) => (
        <div key={index} className={styles.item}>
          <Image className={styles.image} src={item.image.mediaItemUrl} alt={item.image.altText} width={item.image.mediaDetails.width} height={item.image.mediaDetails.height} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      ))}
    </div>
  )
}