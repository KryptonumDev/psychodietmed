import React from "react"
import styles from "./styles.module.scss"
import { Clock } from "../../../assets/clock"
import { FiveStars } from "../../../assets/five-stars"

export default function Metrics({ data: { terapyTime, happyPacientPercent, goopReviewsCount } }) {
  return (
    <section className={styles.wrapper}>
      <div className={`${styles.item} ${styles.clock}`}>
        <p>Ponad</p>
        <Clock />
        <div>
          <p><strong>{terapyTime}</strong></p>
          <p>godzin terapii</p>
        </div>
      </div>
      <div className={`${styles.item} ${styles.pie}`}>
        <div className={styles.graph}>{happyPacientPercent}%</div>
        <p>Zadowolonych pacjentów!</p>
      </div>
      <div className={`${styles.item} ${styles.stars}`}>
        <p>Mamy ponad</p>
        <FiveStars />
        <div>
          <p><strong>{goopReviewsCount}</strong></p>
          <p>Zadowolonych pacjentów!</p>
        </div>
      </div>
    </section>
  )
}