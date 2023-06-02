import React from "react"
import Card from "@/components/moleculas/blog-card"
import styles from './styles.module.scss';

export default function Grid({ data }) {
  return (
    <div className={styles.wrapper}>
      {data.map((el, index) => (
        <Card key={index} data={el} />
      ))}
    </div>
  )
}