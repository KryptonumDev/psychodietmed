import React from "react"
import styles from "./styles.module.scss"

export default function Cards({ data: { title, leftColumnTitle, leftColumnList, rightColumnTitle, rightColumnList } }) {
  return (
    <section className={styles.wrapper}>
      <div dangerouslySetInnerHTML={{ __html: title }} />

      <div className={styles.grid}>
        <div className={styles.left}>
          <h3 dangerouslySetInnerHTML={{ __html: leftColumnTitle }} />
          {leftColumnList.map((el, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: el.text }} />
          ))}
        </div>
        <div className={styles.right}>
          <h3 dangerouslySetInnerHTML={{ __html: rightColumnTitle }} />
          {rightColumnList.map((el, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: el.text }} />
          ))}
        </div>
      </div>
    </section>
  )
}