'use client'
import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import Slider from "@/components/organisms/digital-slider";

export default function DigitalSlider({ data, title='Poznaj nasze usługi cyfrowe' }) {
  return (
    <section className={styles.wrapper}>
      <Slider title={title} data={data} />
    </section>
  )
}