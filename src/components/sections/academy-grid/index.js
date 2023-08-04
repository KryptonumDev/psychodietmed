import React from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/course-card-product"

export default function Grid({ user, data }) {
  return (
    <section className={styles.wrapper}>
      {/* <h1>Sprawdź najnowszy kurs</h1> */}

      <h2>Nasze kursy</h2>
      <div className={styles.grid}>
        {data.nodes.map((item, index) => (
          <Card myCourse={!!user?.courses?.nodes?.find((el) => el.databaseId === item.product.course.databaseId)} data={item} key={index} />
        ))}
      </div>
    </section>
  )
}