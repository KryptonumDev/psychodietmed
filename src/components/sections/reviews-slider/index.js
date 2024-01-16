import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification";
import Slider from "@/components/organisms/reviews-slider";

export default function ReviewsSlider({ data }) {
  const { title = 'Efekty, o których się mówi!', text = '<p>Sprawdź opinie naszych pacjentów.</p>', comments } = data
  return (
    <section className={styles.wrapper}>
      {title && (
        <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      )}
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <Slider items={comments} />
    </section >
  )
}