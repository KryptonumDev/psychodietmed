import React from "react"
import styles from './styles.module.scss'
import Bundle from "@/components/moleculas/product-bundle"

export default function Bundles({ data }) {
  return (
    <section className={styles.wrapper}>
      <h2>Pakiety</h2>
      {data?.map(bundle => (
        <Bundle key={bundle.id} data={bundle} />
      ))}
    </section>
  )
}