import React from "react"
import styles from './styles.module.scss'

export default function Calendar({ chosenSpecialist }) {
  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: 'Wybierz dogodny <span class="underline-second">termin</span> wizyty' }} />
      <p>Sprawdź dostępność naszych specjalistów</p>
      
      <iframe class={styles.calendesk} src={chosenSpecialist.proffesional.docotorCalendarCode} title="PsychoDietMed" frameBorder="0"></iframe>
    </section>
  )
}