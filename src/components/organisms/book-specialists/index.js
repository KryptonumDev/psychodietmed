import React, { useMemo } from "react"
import styles from './styles.module.scss'
import Specialists from "@/components/sections/specialists-slider";
import Button from "@/components/atoms/button";

export default function Specialistss({ chosenSpecialisations, specialists, setCurrentStep }) {
  const filtredSpecialists = useMemo(() => {
    if (!chosenSpecialisations) return specialists

    // filter specialists by specialisations show only specialist that have all chosen specialisations
    const filtredSpecialists = specialists.filter(specialist => {
      if (!specialist.specialisations.nodes) return false

      const filtredSpecialisations = specialist.specialisations.nodes.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })

      return filtredSpecialisations.length === chosenSpecialisations.length
    })

    //sort specialisations in specialists by chosenSpecialisations (first chosenSpecialisations, then rest)
    filtredSpecialists.forEach(specialist => {
      const filtredSpecialisations = specialist.specialisations.nodes.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })
      const restSpecialisations = specialist.specialisations.nodes.filter(specialisation => {
        return !chosenSpecialisations.includes(specialisation.title)
      })
      specialist.specialisations.nodes = [...filtredSpecialisations, ...restSpecialisations]
    })

    return filtredSpecialists.slice(0, 3)

  }, [specialists, chosenSpecialisations])

  return (
    <section className={styles.wrapper}>
      {filtredSpecialists.length > 0 ? (
        <>
          <h1 dangerouslySetInnerHTML={{ __html: 'Wybierz <span class="underline-third">specjalistę</span>, który wesprze Cię na drodze do dobrej zmiany' }} />
          <p>Jaki jest Twój problem?</p>
          <Specialists data={filtredSpecialists} />
        </>
      ) : (
        <>
          <h1>Nie możemy dobrać odpowiedniego specjalisty. Sprawdź wszystkich specjalistów lub wybierz mniej specjalizacji.</h1>
          <Button onClick={() => { setCurrentStep(1) }}>Wybierz inne specjalizacje</Button>
        </>
      )}
      <Button theme='secondary' href='/specjalisci'>Wszyscy specjaliści</Button>
    </section>
  )
}