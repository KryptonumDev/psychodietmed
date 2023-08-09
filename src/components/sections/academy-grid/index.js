import React from "react"
import styles from './styles.module.scss'
import Course from "@/components/moleculas/course-card-product"
import { Card } from "@/components/moleculas/product-card"

export default function Grid({ user, courses, ebooks }) {
  return (
    <section className={styles.wrapper}>
      {/* <h1>Sprawdź najnowszy kurs</h1> */}

      <h2>Nasze kursy</h2>
      <div className={styles.grid}>
        {courses.nodes.map((item, index) => (
          <Course myCourse={!!user?.courses?.nodes?.find((el) => el.databaseId === item.product.course.databaseId)} data={item} key={index} />
        ))}
      </div>
      <h2>Nasze eBooki</h2>
      <div className={styles.grid}>
        {ebooks.nodes.map((item, index) => (
          <Card offer={false} product={item} key={index} />
        ))}
      </div>
    </section>
  )
}