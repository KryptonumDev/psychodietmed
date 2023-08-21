import React from "react"
import "./styles.css"
import { CustomCalendar } from "@/components/organisms/custom-calendar"

export default function Calendar({ name, specialistId, serviceId }) {
  if (!specialistId || !serviceId) return null

  return (
    <section id='kalendarz'>
      <CustomCalendar name={name} specialistId={specialistId} serviceId={serviceId} />
    </section>
  )
}