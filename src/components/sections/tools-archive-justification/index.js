import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"

export default function Justification({ data: { title, text, illnesTiles } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {illnesTiles.map(el => (
          <div key={el.id} className={styles.item}>
            <img src={el.icon.mediaItemUrl} alt={el.icon.altText} />
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}