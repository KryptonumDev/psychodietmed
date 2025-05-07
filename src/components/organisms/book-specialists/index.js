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
          <svg width="82" height="85" viewBox="0 0 82 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5819_8576)">
              <path d="M54.6654 28.3338C54.0247 27.6699 53.1558 27.2969 52.2498 27.2969C51.3439 27.2969 50.475 27.6699 49.8343 28.3338L40.9988 37.4926L32.1633 28.3338C31.5189 27.6887 30.6559 27.3317 29.76 27.3398C28.8642 27.3478 28.0072 27.7203 27.3738 28.377C26.7403 29.0336 26.381 29.9219 26.3732 30.8505C26.3654 31.7791 26.7098 32.6738 27.3321 33.3417L36.1676 42.5005L27.3321 51.6592C26.7098 52.3272 26.3654 53.2218 26.3732 54.1504C26.381 55.0791 26.7403 55.9674 27.3738 56.624C28.0072 57.2807 28.8642 57.6531 29.76 57.6612C30.6559 57.6693 31.5189 57.3123 32.1633 56.6672L40.9988 47.5084L49.8343 56.6672C50.4787 57.3123 51.3417 57.6693 52.2376 57.6612C53.1334 57.6531 53.9903 57.2807 54.6238 56.624C55.2573 55.9674 55.6166 55.0791 55.6244 54.1504C55.6322 53.2218 55.2878 52.3272 54.6654 51.6592L45.8299 42.5005L54.6654 33.3417C55.306 32.6776 55.6658 31.7769 55.6658 30.8378C55.6658 29.8987 55.306 28.998 54.6654 28.3338Z" fill="#B40909" />
              <path d="M41 0C32.891 0 24.9641 2.49258 18.2216 7.16254C11.4792 11.8325 6.22415 18.4701 3.12096 26.236C0.0177647 34.0018 -0.794172 42.5471 0.787822 50.7913C2.36982 59.0355 6.27469 66.6083 12.0086 72.552C17.7426 78.4958 25.0481 82.5435 33.0013 84.1834C40.9545 85.8232 49.1983 84.9816 56.69 81.7649C64.1818 78.5482 70.5851 73.1008 75.0903 66.1117C79.5954 59.1227 82 50.9057 82 42.5C81.9883 31.232 77.6649 20.4291 69.9784 12.4614C62.292 4.49377 51.8703 0.0121872 41 0V0ZM41 77.9167C34.2425 77.9167 27.6367 75.8395 22.018 71.9479C16.3994 68.0562 12.0201 62.5249 9.43414 56.0534C6.84814 49.5818 6.17153 42.4607 7.48986 35.5906C8.80818 28.7204 12.0622 22.4097 16.8405 17.4566C21.6188 12.5035 27.7068 9.13041 34.3344 7.76385C40.9621 6.39729 47.8319 7.09866 54.075 9.77927C60.3182 12.4599 65.6543 16.9993 69.4086 22.8236C73.1628 28.6478 75.1667 35.4952 75.1667 42.5C75.1567 51.8899 71.5539 60.8923 65.1485 67.532C58.7432 74.1717 50.0585 77.9064 41 77.9167Z" fill="#B40909" />
            </g>
            <defs>
              <clipPath id="clip0_5819_8576">
                <rect width="82" height="85" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1>Nie udało nam się znaleźć odpowiedniego specjalisty.</h1>
          <p>Sprawdź wszystkich specjalistów lub wybierz mniej specjalizacji</p>
          <Button onClick={() => { setCurrentStep(1) }}>Wybierz inne specjalizacje</Button>
        </>
      )}
      <Button theme='secondary' href='/specjalisci'>Wszyscy specjaliści</Button>
    </section>
  )
}