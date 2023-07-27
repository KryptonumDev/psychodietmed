import React from "react"
import { removeWrap } from "../../../utils/title-modification"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function CallToAction({ data: { title, content, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        {link?.url && (
          <Link className="link" href={link.url}>{link.title}</Link>
        )}
      </div>
      <Image quality={80} aspectRatio={true} className={styles.image} width={image.mediaDetails.width} height={image.mediaDetails.height} src={image.mediaItemUrl} alt={image.altText} />
    </section>
  )
}