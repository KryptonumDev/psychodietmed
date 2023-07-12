import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function Card({ data: { title, text, icon } }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <Image aspectRatio={true} quality='100' src={icon.mediaItemUrl} alt={icon.altText} width={icon.mediaDetails.width} height={icon.mediaDetails.height} className={styles.icon} />
        <p>{title}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}