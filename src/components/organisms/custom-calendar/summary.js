'use client'
import React from "react"
import styles from './styles.module.scss'
import Button from "@/components/atoms/button"

const days = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota'
]

export const CalendarSummary = ({ setPopupOpened, service, chosenTime, chosenDate }) => {
  debugger
  return (
    <div className={styles.summary}>
      <div className={styles.left}>
        <p>{service.name}</p>
        <p>{days[chosenDate.day()]}, {chosenDate.format('DD MMMM YYYY')}</p>
        <p>godzina {chosenTime}</p>
      </div>
      <div>
        <p>{(service.price / 100)}&nbsp;zł / sesja {service.duration} minut</p>
        <Button disabled={!chosenTime || !chosenDate} onClick={() => { setPopupOpened(true) }}>Umawiam wizytę</Button>
      </div>
    </div>
  )
}
