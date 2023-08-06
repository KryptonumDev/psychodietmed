import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function Card({ data: { slug, title, excerpt, featuredImage } }) {
  return (
    <Link href={`/media/${slug}`} className={styles.wrapper}>
      {featuredImage?.node && (
        <Image
          className={styles.image}
          alt={featuredImage.node.altText}
          src={featuredImage.node.mediaItemUrl}
          width={featuredImage.node.mediaDetails.width}
          height={featuredImage.node.mediaDetails.height}
        />
      )}
      <p className={styles.title}>{title}</p>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: excerpt }} />
    </Link>
  )
}