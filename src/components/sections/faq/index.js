import React from "react"
import styles from './styles.module.scss'

export default function FAQ({ data: { title, text, qa } }) {

  if (!qa) return null

  const arrays = (() => {
    const arr = []

    qa.forEach(el => {
      arr.push({
        "@type": "Question",
        "name": el.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": el.answer
        }
      })
    })

    return arr
  })()

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": arrays
  };

  return (
    <section className={styles.wrapper}>
      <script
        key={`faq`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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