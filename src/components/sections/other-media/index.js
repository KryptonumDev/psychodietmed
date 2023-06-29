import React from "react"
import styles from './styles.module.scss'
import Grid from "@/components/organisms/post-grid"
import Card from "@/components/moleculas/media-card"

export default function OtherMedia({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Może Cię również zainteresować:</h2>
      <Grid>
        {data?.map((el, index) => (
          <Card key={index} data={el} />
        ))}
      </Grid>
    </section>
  )
}