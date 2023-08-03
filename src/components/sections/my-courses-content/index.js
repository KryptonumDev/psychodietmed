import React from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/course-card"

export default function Content({ data }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.courses}>
        {data.nodes.map(el => (
          <Card data={el} key={el.id} />
        ))}
      </div>
    </section>
  )
} 