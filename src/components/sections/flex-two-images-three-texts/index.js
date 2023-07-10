import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlexMultiImages({ data: { contentFirst, contentSecond, contentThird, imageFirst, imageSecond } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textFirst} dangerouslySetInnerHTML={{ __html: contentFirst }} />
      <div className={styles.textSecond} dangerouslySetInnerHTML={{ __html: contentSecond }} />
      <div className={styles.textThird} dangerouslySetInnerHTML={{ __html: contentThird }} />
      <Image aspectRatio={true} className={styles.imageFirst} src={imageFirst.mediaItemUrl} alt={imageFirst.altText} width={imageFirst.mediaDetails.width} height={imageFirst.mediaDetails.height} />
      <Image aspectRatio={true} className={styles.imageSecond} src={imageSecond.mediaItemUrl} alt={imageSecond.altText} width={imageSecond.mediaDetails.width} height={imageSecond.mediaDetails.height} />
    </section>
  )
}