import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"

export default function Tiles({ data: { title, text, colorfulTiles } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {colorfulTiles.map(({ text, icon }, index) => (
          <div key={index} className={styles.item}>
            <img src={icon.mediaItemUrl} alt={icon.altText} />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}