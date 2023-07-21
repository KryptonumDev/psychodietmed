'use client'
import React, { useCallback, useRef } from "react"
import styles from './styles.module.scss';
import { LeftArrow } from "../../../assets/left-arrow";
import { RightArrow } from "../../../assets/right-arrow";
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "@/components/moleculas/product-card";
import 'swiper/scss';

export default function Slider({ products, title = 'Może Cię zainteresować' }) {

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
        <button onClick={() => { handlePrev() }} aria-label='strzałka w lewo' >
          <LeftArrow />
        </button>
        <button onClick={() => { handleNext() }} aria-label='strzałka w prawo' >
          <RightArrow />
        </button>
      </div>
      <Swiper
        ref={sliderRef}
        modules={[A11y]}
        className={styles.wrapper}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          1025: {
            slidesPerView: 3,
            spaceBetween: 32
          },
          641: {
            slidesPerView: 2,
            spaceBetween: 24
          }
        }}
      >
        {products?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card product={el}/>
          </SwiperSlide>
        ))}
        <div className={`${styles.control} ${styles.mobile}`}>
          <button onClick={() => { handlePrev() }} aria-label='strzałka w lewo' >
            <LeftArrow />
          </button>
          <button onClick={() => { handleNext() }} aria-label='strzałka w prawo' >
            <RightArrow />
          </button>
        </div>
      </Swiper>
    </section>
  )
}