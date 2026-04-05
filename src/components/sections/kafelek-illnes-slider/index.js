import React from "react"
import dynamic from "next/dynamic"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"

const Slider = dynamic(() => import("@/components/organisms/illnes-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function SliderIllnes({ data: { title, illnes } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{__html: removeWrap(title)}}/>
      <Slider items={illnes}/>
    </section>
  )
}