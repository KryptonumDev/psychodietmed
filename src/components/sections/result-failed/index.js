import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function Failed() {
  return (
    <section className={styles.wrapper}>
      <h1>Ups! Wystąpił błąd płatności.</h1>
      <Link className="link" href='/koszyk'>Spróbuj ponownie</Link>
    </section>
  )
}