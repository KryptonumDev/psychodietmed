import React from "react"
import styles from './styles.module.scss';
import CardFeatured from "@/components/moleculas/course-card-featured";

export default function Featured({ isFeaturedMyProduct, post, data: { content } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <h2>Sprawdź najnowszy kurs</h2>
        <CardFeatured myCourse={isFeaturedMyProduct} data={post}/>
      </div>
    </section>
  )
}