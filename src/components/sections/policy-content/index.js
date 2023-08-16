import React from "react"
import styles from './styles.module.scss'

export default function Content({ data }) {
  return (
    <section className={styles.wrapper}>
      <h1>Polityka prywatności</h1>
      {data?.map((item, index) => (
        <details key={index}>
          <summary><span className={styles.plus}/>{item.title}</summary>
          <div dangerouslySetInnerHTML={{ __html: item?.content }} />
        </details>
      ))}
    </section>
  )
}
