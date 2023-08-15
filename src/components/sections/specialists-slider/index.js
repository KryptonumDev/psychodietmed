'use client'
import React, { useCallback, useRef } from "react"
import styles from './styles.module.scss';
import Card from "@/components/moleculas/specialist-card";
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";

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

  return (
    <section id='zespol' className={styles.wrapper}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.control}>
          <ArrowLeft
            onClick={() => { handlePrev() }}
            aria-label='Poprzedni specjalista'
          />
          <ArrowRight
            onClick={() => { handleNext() }}
            aria-label='Następny specjalista'
          />
        </div>
      </header>
      <Swiper
        ref={sliderRef}
        modules={[A11y]}
        className={styles.wrapper}
        spaceBetween={28}
        slidesPerView={1}
        breakpoints={{
          1366: {
            slidesPerView: 2.5,
          },

          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 48
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1.5,
          }
        }}
      >
        {data?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card data={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}