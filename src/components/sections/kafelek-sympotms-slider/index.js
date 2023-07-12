import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import Slider from "@/components/organisms/symptoms-slider"

export default function SliderSymptoms({ data: { title, text, symptoms } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.text}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <Slider items={symptoms} />
    </section>
  )
}