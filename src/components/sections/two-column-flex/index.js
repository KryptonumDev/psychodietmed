import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlex({ params, data: { content, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
        {link && (
          <Link className={`link ${styles.link}`}
            href={{
              pathname: link.url,
              query: (params ? { tags: params.map(el => el.id) } : null)
            }}>{link.title}</Link>
        )}
      </div>
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}