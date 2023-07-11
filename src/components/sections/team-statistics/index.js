import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function Statistics({ data: { title, text, link, counters, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.counters}>
        {counters.map((counter, index) => (
          <div className={styles.counterItem} key={index}>
            <span>{counter.number}</span>
            <p>{counter.text}</p>
          </div>
        ))}
      </div>
      <Image aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        <Link className="link" href={link.url}>{link.title}</Link>
      </div>
    </section>
  )
}