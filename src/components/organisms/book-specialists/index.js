import React, { useMemo, useState } from "react"
import styles from './styles.module.scss'
import { A11y } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import Card from "@/components/moleculas/specialist-card-short";
import Button from "@/components/atoms/button";
import { PopUp } from "../custom-calendar/pop-up";
import { AnimatePresence } from "framer-motion";

export default function Specialists({ chosenSpecialisations, specialists }) {


  const filtredSpecialists = useMemo(() => {
    if (!chosenSpecialisations) return specialists
    // filter specialists by specialisations
    const filtredSpecialists = specialists.filter(specialist => {
      if (!specialist.specialisations.nodes) return false

      const filtredSpecialisations = specialist.specialisations.nodes.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })

      return filtredSpecialisations.length > 0
    })

    // sort specialists by number of specialisations
    filtredSpecialists.sort((a, b) => {
      const aSpecialisations = a.specialisations.nodes.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })
      const bSpecialisations = b.specialisations.nodes.filter(specialisation => {
        return chosenSpecialisations.includes(specialisation.title)
      })
      return bSpecialisations.length - aSpecialisations.length
    })

    return filtredSpecialists.slice(0, 3)

  }, [specialists, chosenSpecialisations])

  const [chosenTime, setChosenTime] = useState(null)
  const [popupOpened, setPopupOpened] = useState(false)

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
          520: {
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
            <Card chosenTime={chosenTime} setChosenTime={setChosenTime} data={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button onClick={() => { setPopupOpened(true) }} disabled={!chosenTime}>Wybieram termin</Button>
      <AnimatePresence mode="wait">
        {popupOpened && (
          <PopUp
            service={chosenTime.service}
            specialistId={chosenTime.person.proffesional.specialistId}
            serviceId={chosenTime.person.proffesional.serviceId}
            setPopupOpened={setPopupOpened}
            chosenDate={chosenTime.date}
            chosenTime={chosenTime.time}
            name={chosenTime.person.title}
          />
        )}
      </AnimatePresence>
    </section>
  )
}