import React from "react"
import styles from './styles.module.scss';
import Image from "next/image";

export default function FlexAlt({ data: { content, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}