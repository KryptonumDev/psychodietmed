import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";

export default function Grid({ data }) {
  return (
    <section className={styles.wrapper}>
      {data.map((el, index) => (
        <div className={styles.item} key={index}>
          <Image
            width={el.image.mediaDetails.width}
            height={el.image.mediaDetails.height}
            src={el.image.mediaItemUrl}
            alt={el.image.altText}
            className={styles.image}
          />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: el.content }} />
        </div>
      ))}
    </section>
  )
}