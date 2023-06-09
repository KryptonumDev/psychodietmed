import React from "react"
import styles from "./styles.module.scss"
import Slider from "@/components/organisms/specialist-reviews-slider"

export default function Reviews({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Poznaj opinie pacjentów</h2>
      <Slider items={data} />
    </section>
  )
}