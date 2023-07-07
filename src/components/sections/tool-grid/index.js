import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"

export default function Grid({ data: { title, grid } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <div key={index} className={styles.item}>
            <p>{el.tile}</p>
          </div>
        ))}
      </div>
    </section>

  )
}