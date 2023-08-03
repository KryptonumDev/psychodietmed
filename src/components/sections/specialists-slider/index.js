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
    <section className={styles.wrapper}>
      <h2>{title}</h2>
      <div className={`${styles.control} ${styles.desctop}`}>
        <ArrowLeft
          onClick={() => { handlePrev() }}
          aria-label='Poprzedni specjalista'
        />
        <ArrowRight
          onClick={() => { handleNext() }}
          aria-label='Następny specjalista'
        />
      </div>
      <Swiper
        ref={sliderRef}
        modules={[A11y]}
        className={styles.wrapper}
        spaceBetween={28}
        slidesPerView={1}
        breakpoints={{
          1240: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 48
          },
          520: {
            slidesPerView: 1.5,
          }
        }}
      >
        {data?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card data={el} />
          </SwiperSlide>
        ))}
        <div className={`${styles.control} ${styles.mobile}`}>
          <ArrowLeft
            onClick={() => { handlePrev() }}
            aria-label='Poprzedni specjalista'
          />
          <ArrowRight
            onClick={() => { handleNext() }}
            aria-label='Następny specjalista'
          />
        </div>
      </Swiper>
    </section>
  )
}