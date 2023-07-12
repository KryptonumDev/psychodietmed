import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import Slider from "@/components/organisms/illnes-slider"

export default function SliderIllnes({ data: { title, illnes } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{__html: removeWrap(title)}}/>
      <Slider items={illnes}/>
    </section>
  )
}