import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function CallToActionGray({ data }) {
  const { content, link } = data
  return (
    <section className={styles.wrapper}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
      <Link className={"link " + styles.link} href={link.url}>{link.title}</Link>
    </section>
  )
}