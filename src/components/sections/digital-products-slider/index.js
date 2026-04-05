'use client'
import React from "react"
import dynamic from "next/dynamic"
import styles from './styles.module.scss';

const Slider = dynamic(() => import("@/components/organisms/digital-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function DigitalSlider({ data, title='Poznaj nasze usługi cyfrowe' }) {
  return (
    <section className={styles.wrapper}>
      <Slider title={title} data={data} />
    </section>
  )
}