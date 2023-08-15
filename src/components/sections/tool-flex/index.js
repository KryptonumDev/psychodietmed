import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { removeWrap } from "../../../utils/title-modification"

export default function Flex({ data: { title, text, image } }) {
  return (
    <section className={styles.wrapper}>
      <Image loading='eager' aspectRatio={true} width={image.mediaDetails.width} height={image.mediaDetails.height} src={image.mediaItemUrl} alt={image.altText} className={styles.image} />
      <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </section>
  )
}