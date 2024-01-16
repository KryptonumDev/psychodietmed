import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image";

export default function History({ data: { title, text, grid } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {grid.map(el => (
          <div key={el.text} className={styles.item}>
            <Image aspectRatio={true} quality='90' src={el.icon.mediaItemUrl} alt={el.icon.altText || ''} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} className={styles.icon} />
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}