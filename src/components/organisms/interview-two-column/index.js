import React from "react"
import styles from './styles.module.scss'

export default function InterviewText({ data: { qaRepeater } }) {
  return (
    <section className={styles.wrapper}>
      {qaRepeater.map((qa, index) => (
        <div className={styles.item} key={index}>
          <h3><span>R:</span>{qa.question}</h3>
          <div className={styles.answer}>
            <span>SP:</span>
            <div className={styles.answer_text} dangerouslySetInnerHTML={{ __html: qa.answer }} />
          </div>
        </div>
      ))}
    </section>
  )
}