import React, { useMemo } from "react"
import styles from './styles.module.scss'
import { A11y } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import Card from "@/components/moleculas/specialist-card";

export default function Specialists({ setCurrentStep, setChosenSpecialist, chosenSpecialisations, specialists }) {


  const filtredSpecialists = useMemo(() => {
    if (!chosenSpecialisations) return specialists
    // filter specialists by specialisations
    const filtredSpecialists = specialists.filter(specialist => {
      if (!specialist.specialisations) return false

      const filtredSpecialisations = specialist.specialisations.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })

      return filtredSpecialisations.length > 0
    })

    // sort specialists by number of specialisations
    filtredSpecialists.sort((a, b) => {
      const aSpecialisations = a.specialisations.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })
      const bSpecialisations = b.specialisations.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })
      return bSpecialisations.length - aSpecialisations.length
    })

    return filtredSpecialists.slice(0, 3)

  }, [specialists, chosenSpecialisations])

  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: 'Wybierz <span class="underline-third">specjalistę</span>, który wesprze Cię na drodze do dobrej zmiany' }} />
      <p>Jaki jest Twój problem?</p>

      <Swiper
        modules={[A11y]}
        className={styles.grid}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 28
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50
          },
        }}
      >
        {filtredSpecialists.map((el, index) => (
          <SwiperSlide key={index}>
            <Card onClick={() => { setChosenSpecialist(el); setCurrentStep(3) }} chosenSpecialisations={chosenSpecialisations} short={true} data={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}