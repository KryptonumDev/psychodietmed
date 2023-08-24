import React from "react"
import { CustomCalendar } from "@/components/organisms/custom-calendar"

export default function Calendar({ data, specialistId, serviceId }) {
  if (!specialistId || !serviceId) return null

  return (
    <section id='kalendarz'>
      <CustomCalendar specialistData={data} specialistId={specialistId} serviceId={serviceId} />
    </section>
  )
}