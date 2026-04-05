import React from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/course-card"
import Link from "next/link"

export default function Content({ data }) {
  if (!data?.nodes?.length) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.empty}>
          <p>Nie masz jeszcze żadnych kursów.</p>
          <Link href="/akademia" className="link">
            Przeglądaj dostępne kursy
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.courses}>
        {data.nodes.map(el => (
          <Card data={el} key={el.id} />
        ))}
      </div>
    </section>
  )
} 