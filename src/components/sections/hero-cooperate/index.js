import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function Hero({ data: { title, text, link, grid } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <Link className={`link ${styles.link}`} href={link.url}>{link.title}</Link>
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <div className={styles.item} key={index}>
            <Image
              width={el.icon.mediaDetails.width}
              height={el.icon.mediaDetails.height}
              src={el.icon.mediaItemUrl}
              alt={el.icon.altText}
              className={styles.icon}
              aspectRatio={true}
            />
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}