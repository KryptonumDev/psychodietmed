import React from "react"
import { htmlDelete } from "../../../utils/delete-html"
import styles from './styles.module.scss'
import Form from "@/components/moleculas/newsletter-form"

export default function Newsletter({ data: { title, text, consent } }) {

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: htmlDelete(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <Form consent={consent} />
    </section>
  )
}