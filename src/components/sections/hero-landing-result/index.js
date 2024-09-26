import React from "react"
import styles from './styles.module.scss'
import Button from "@/components/atoms/button"

export default function HeroLanding({ data }) {
  return (
    <section className={styles.wrapper}>
      <h1>Dziękujemy za wypełnienie formularza</h1>
      <p>To pierwszy krok na drodze do dobrej zmiany! Odezwiemy się najszybciej, jak to możliwe. Masz pytania?</p>
      <Button href='/kontakt'>Skontaktuj się</Button>
    </section>
  )
}