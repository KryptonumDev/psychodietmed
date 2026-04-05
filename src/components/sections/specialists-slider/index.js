'use client'
import React, { useCallback, useRef, useState, useEffect } from "react"
import styles from './styles.module.scss';
import Card from "@/components/moleculas/specialist-card";
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/scss';
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";
import { AnimatePresence } from "framer-motion";
import { PopUp } from "@/components/organisms/custom-calendar/pop-up";

export default function Specialists({ data, title = 'Wybierz specjalistę' }) {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const [chosenTime, setChosenTime] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [allDates, setAllDates] = useState({});

  const [EndShadow, setEndShadow] = useState(true);
  const [StartShadow, setStartShadow] = useState(false);

  // Batch fetch all specialists' dates in one request
  useEffect(() => {
    const specialists = data
      .filter(s => s.proffesional?.specialistId && s.proffesional?.serviceId)
      .map(s => ({
        specialistId: s.proffesional.specialistId,
        serviceId: s.proffesional.serviceId
      }));

    if (specialists.length === 0) return;

    fetch("/api/get-all-specialists-dates", {
      method: 'POST',
      body: JSON.stringify({ specialists })
    })
      .then(response => response.json())
      .then(data => {
        setAllDates(data);
      })
      .catch(err => console.error('Failed to fetch specialists dates:', err));
  }, [data]);

  const sortedPosts = data.sort((a, b) => {
    let aIndex = a.proffesional.index || 0;
    let bIndex = b.proffesional.index || 0;

    return aIndex - bIndex;
  });

  return (
    <section id='zespol' className={styles.wrapper}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.control}>
          {(!sliderRef?.current?.swiper?.isBeginning || !sliderRef?.current?.swiper?.isEnd) && (
            <>
              <ArrowLeft
                onClick={() => { handlePrev() }}
                aria-label='Poprzedni specjalista'
              />
              <ArrowRight
                onClick={() => { handleNext() }}
                aria-label='Następny specjalista'
              />
            </>
          )}
        </div>
      </header>
      <Swiper
        ref={sliderRef}
        modules={[A11y]}
        className={styles.wrapper}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          1140: {
            slidesPerView: 2.5,
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1.5,
          }
        }}
        onSwiper={(e) => {
          setStartShadow(!e.isBeginning)
          setEndShadow(!e.isEnd)
        }}
        onSlideChange={(e) => {
          setStartShadow(!e.isBeginning)
          setEndShadow(!e.isEnd)
        }}
      >
        {sortedPosts?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card 
              setPopupOpened={setPopupOpened} 
              setChosenTime={setChosenTime} 
              data={el} 
              prefetchedDates={allDates[el.proffesional?.specialistId]}
            />
          </SwiperSlide>
        ))}
        <div className={`${styles.overlayRight} ${EndShadow ? styles.active : ''}`} />
        <div className={`${styles.overlayLeft} ${StartShadow ? styles.active : ''}`} />
      </Swiper>
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
            specialistData={chosenTime.person}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
