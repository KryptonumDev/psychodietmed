import React from "react"
import styles from './styles.module.scss'

export default function FAQ({ data: { title, text, qa } }) {
  return (
    <section className={styles.wrapper}>
      <h2>{title}</h2>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {qa.map(el => (
          <details key={el.question}>
            <summary>
              <div className={styles.plus} />
              <span>{el.question}</span>
            </summary>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: el.answer }} />
          </details>
        ))}
      </div>
    </section>
  )
}