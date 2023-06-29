import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"

export default function Hero({ data: { pageTitle, text } }) {
  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </section>
  )
}