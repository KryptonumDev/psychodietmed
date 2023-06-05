import React from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/blog-card"

export default function Slider({ data }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.first}>
        {data.slice(0, 1).map((el, index) => (
          <Card key={index} className={styles.card} data={el} />
        ))}
      </div>
      <div className={styles.flex}>
        {data.slice(1, 3).map((el, index) => (
          <Card key={index} className={styles.card} data={el} />
        ))}
      </div>
    </div>
  )
}