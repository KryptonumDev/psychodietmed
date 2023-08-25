'use client'
// import Calendar from "@/components/organisms/book-calendar"
import Specialisations from "@/components/organisms/book-specialisations"
import Specialists from "@/components/organisms/book-specialists"
import React, { useEffect, useMemo, useState } from "react"

export default function Content({ specialists }) {

  const [currentStep, setCurrentStep] = useState(1)
  const [chosenSpecialisations, setChosenSpecialisations] = useState(null)
  const specializations = useMemo(() => {
    let arr = []

    specialists.forEach((el) => {
      el?.specialisations?.nodes?.forEach((el) => {
        if (!arr.find((e) => e.id === el.id)) {
          arr.push(el)
        }
      })
    })

    return arr
  }, [specialists])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  return (
    <div>
      {currentStep === 1 && (
        <Specialisations setCurrentStep={setCurrentStep} chosenSpecialisations={chosenSpecialisations} setChosenSpecialisations={setChosenSpecialisations} specializations={specializations} />
      )}
      {currentStep === 2 && (
        <Specialists specialists={specialists} chosenSpecialisations={chosenSpecialisations} />
      )}
      {/* {currentStep === 3 && (
        <Calendar chosenSpecialist={chosenSpecialist} />
      )} */}
    </div>
  )
}