import React from "react"
import dynamic from "next/dynamic"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"

const Slider = dynamic(() => import("@/components/organisms/symptoms-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

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