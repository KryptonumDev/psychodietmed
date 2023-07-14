import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";

export default function Citate({ data }) {
  const { cytat, author, image } = data
  return (
    <section className={styles.wrapper}>
    <Image aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: cytat }} />
        <Image aspectRatio={true} className={styles.icon} src={author.mediaItemUrl} alt={author.altText} width={author.mediaDetails.width} height={author.mediaDetails.height} />
      </div>
    </section>
  )
}