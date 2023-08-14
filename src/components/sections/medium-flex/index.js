import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"

export default function Flex({ data: { title, text, image } }) {
  return (
    <section className={styles.wrapper}>
      <Image aspectRatio={true} className={styles.image} alt={image.altText} src={image.mediaItemUrl} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={`${styles.text} gutenberg`} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </section>
  )
}