import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function Card({ data: { slug, title, featuredImage } }) {
  return (
    <Link href={`/media/${slug}`} className={styles.wrapper}>
      <Image
        className={styles.image}
        alt={featuredImage.node.altText}
        src={featuredImage.node.mediaItemUrl}
        width={featuredImage.node.mediaDetails.width}
        height={featuredImage.node.mediaDetails.height}
      />
      <p>{title}</p>
    </Link>
  )
}