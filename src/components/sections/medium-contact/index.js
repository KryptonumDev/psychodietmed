import React from "react"
import styles from './styles.module.scss'
import Form from "@/components/moleculas/media-form"

export default function Contact({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Powiedz nam co o tym sądzisz</h2>
      <Form />
    </section>
  )
}