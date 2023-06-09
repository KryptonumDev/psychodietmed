import { Image } from "@/components/atoms/image"
import React from "react"
import styles from "./styles.module.scss"

export default function Card({ data: { authorName, title, content, authorAvatar } }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        {authorAvatar && (
          <Image
            width={authorAvatar.mediaDetails.width}
            height={authorAvatar.mediaDetails.height}
            src={authorAvatar.mediaItemUrl}
            alt={authorAvatar.altText}
          />
        )}
        {authorName}
      </div>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}