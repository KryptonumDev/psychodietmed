import React from "react"
import styles from './styles.module.scss';
import Image from "next/image";

export default function Flex({ data }) {
  const { content, image } = data
  return (
    <section className={styles.wrapper}>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}/>
    </section>
  )
}