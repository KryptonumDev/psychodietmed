import React from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/blog-card"

export default function Slider({ data }) {
  return (
    <div className={styles.wrapper}>
      {data.slice(0, 3).map((el, index) => (
        <Card key={index} className={styles.card} data={el} />
      ))}
    </div>
  )
}