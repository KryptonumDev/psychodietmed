import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function CallToActionGray({ data, params }) {
  const { content, link } = data
  return (
    <section className={styles.wrapper}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
      <Link className={"link " + styles.link} href={{
        pathname: link.url,
        query: (((params && link.url.includes('umow-wizyte'))  && link.url.includes('umow-wizyte'))  ? { tags: JSON.stringify(params.map(el => el.id)) } : null),
      }}>{link.title}</Link>
    </section>
  )
}