import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification";
import Slider from "@/components/organisms/reviews-slider";

export default function ReviewsSlider({ data }) {
  const { title, text, comments } = data
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <Slider items={comments} />
    </section >
  )
}