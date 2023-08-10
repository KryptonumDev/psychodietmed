'use client'
import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import Slider from "@/components/organisms/digital-slider";

export default function DigitalSlider({ data, title='Poznaj nasze usługi cyfrowe' }) {
  let preformatedData = [...data]
  const arrays = []

  for (let i = 0; i < preformatedData.length; i += 3) {
    arrays.push(preformatedData.slice(i, i + 3))
  }

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <Slider data={arrays} />
    </section>
  )
}