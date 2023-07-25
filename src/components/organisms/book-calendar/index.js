import React from "react"
import styles from './styles.module.scss'

export default function Calendar({ specialists, chosenSpecialist }) {
  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: 'Wybierz dogodny <span class="underline-second">termin</span> wizyty' }} />
      <p>Sprawdź dostępność naszych specjalistów</p>

    </section>
  )
}