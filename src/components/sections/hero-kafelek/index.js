import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"

export default function Hero({ data: { title, text, image, logo } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className={styles.imageWrap}>
        <Image loading='eager' aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <Image loading='eager' aspectRatio={true} className={styles.logo} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
      </div>
    </section>
  )
}