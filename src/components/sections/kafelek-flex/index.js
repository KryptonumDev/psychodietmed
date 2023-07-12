import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

export default function FlexDoubled({ data: { title, text, imageFirst, imageSecond } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className={styles.images}>
        <Image aspectRatio={true} className={styles.imageFirst} alt={imageFirst.altText} src={imageFirst.mediaItemUrl} width={imageFirst.mediaDetails.width} height={imageFirst.mediaDetails.height} />
        <Image aspectRatio={true} className={styles.imageSecond} alt={imageSecond.altText} src={imageSecond.mediaItemUrl} width={imageSecond.mediaDetails.width} height={imageSecond.mediaDetails.height} />
      </div>
    </section>
  )
}