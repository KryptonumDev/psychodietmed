import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { BlueWarning } from "../../../assets/blue-warning"

export default function Warning({ data: { title, content, link } }) {
  return (
    <section className={styles.wrapper}>
      <h2><BlueWarning /> <span>{title}</span></h2>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
      <Link className="link" href={link.url}>{link.title}</Link>
    </section>
  )
}