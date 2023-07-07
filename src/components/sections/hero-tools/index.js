import React from "react"
import styles from './styles.module.scss';
import Image from "next/image";
import { removeWrap } from "../../../utils/title-modification";

export default function Hero({ data }) {
  const { title, text, image } = data

  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.info_content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <Image loading="eager" className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      </div>
    </section>
  )
}