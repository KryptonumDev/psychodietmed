import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function CallToAction({ data: { content, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{__html: content}}/>
        <Link className="link" href={link.url}>{link.title}</Link>
      </div>
      <Image
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        src={image.mediaItemUrl}
        alt={image.altText}
        className={styles.image}
        aspectRatio={true}
      />
    </section>
  )
}