import React from "react"
import styles from './styles.module.scss'

export default function Content({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Polityka prywatności</h2>
      {data?.map((item, index) => (
        <details key={index}>
          <summary><span className={styles.plus}/>{item.title}</summary>
          <div dangerouslySetInnerHTML={{ __html: item?.content }} />
        </details>
      ))}
    </section>
  )
}
