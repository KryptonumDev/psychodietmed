import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import Button from "@/components/atoms/button"

export default function FlexAlt({ data: { image, content, link } }) {
  return (
    <section className={styles.wrapper}>
      <Image
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        src={image.mediaItemUrl}
        alt={image.altText}
        className={styles.image}
        aspectRatio={true}
      />
      <div className={styles.content} >
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {link && (
          <Button href={link.url}>{link.title}</Button>
        )}
      </div>
    </section>
  )
}