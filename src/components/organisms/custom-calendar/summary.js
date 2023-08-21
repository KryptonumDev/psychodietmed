'use client'
import React from "react"
import styles from './styles.module.scss'
import Button from "@/components/atoms/button"

const days = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela'
]

export const CalendarSummary = ({ setPopupOpened, service, chosenTime, chosenDate }) => {
  return (
    <div className={styles.summary}>
      <div className={styles.left}>
        <p>{service.name}</p>
        <p>{days[chosenDate.day()]}, {chosenDate.format('DD MMMM YYYY')}</p>
        <p>godzina {chosenTime}</p>
      </div>
      <div>
        <p>{(service.price/100)}&nbsp;zł / sesja {service.duration} minut</p>
        <Button onClick={() => {setPopupOpened(true)}}>Umawiam wizytę</Button>
      </div>
    </div>
  )
}