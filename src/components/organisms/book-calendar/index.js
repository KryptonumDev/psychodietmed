import React from "react"
import styles from './styles.module.scss'
import { CustomCalendar } from "../custom-calendar"
import Hero from "@/components/sections/hero-specialist"

export default function Calendar({ chosenSpecialist }) {
  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: 'Wybierz dogodny <span class="underline-second">termin</span> wizyty' }} />
      <p>Sprawdź dostępność naszych specjalistów</p>
      <Hero data={chosenSpecialist} h2={true}/>
      <CustomCalendar specialistId={chosenSpecialist.proffesional.specialistId} serviceId={chosenSpecialist.proffesional.serviceId} specialistData={chosenSpecialist} />
    </section>
  )
}