import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function CallToActionGray({ data }) {
  const { text, link } = data
  return (
    <section className={styles.wrapper}>
      <h2>{text}</h2>
      <Link className={"link " + styles.link} href={link.url}>{link.title}</Link>
    </section>
  )
}