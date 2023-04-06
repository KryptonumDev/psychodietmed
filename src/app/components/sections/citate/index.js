import React from "react"
import styles from './styles.module.scss';
import Image from "next/image";

export default function Citate({ data }) {
  const { cytat, author } = data
  return (
    <section className={styles.wrapper}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: cytat }} />
      <Image className={styles.image} src={author.mediaItemUrl} alt={author.altText} width={author.mediaDetails.width} height={author.mediaDetails.height} />
    </section>
  )
}