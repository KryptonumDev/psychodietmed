import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlex({ data: { content, link, image }, reverse }) {
  return (
    <section className={`${styles.wrapper} ${reverse ? styles.reverse : ''}`}>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        <Link className={`link ${styles.link}`} href={link.url}>{link.title}</Link>
      </div>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}