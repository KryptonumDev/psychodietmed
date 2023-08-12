import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function Error() {
  return (
    <section className={styles.wrapper}>
      <h1>Ups! Wystąpił błąd przetwarzania zamówienia, skontaktuj sie z obsługą sklepu.</h1>
      <Link className="link" href='/oferta'>Wróc do sklepu</Link>
    </section>
  )
}