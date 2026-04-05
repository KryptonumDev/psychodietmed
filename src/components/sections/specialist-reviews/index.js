import React from "react"
import dynamic from "next/dynamic"
import styles from "./styles.module.scss"

const Slider = dynamic(() => import("@/components/organisms/specialist-reviews-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function Reviews({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Poznaj opinie pacjentów</h2>
      <Slider items={data} />
    </section>
  )
}