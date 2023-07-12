'use client'
import React, { useCallback, useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import styles from './styles.module.scss';
import 'swiper/scss';
import Card from "@/components/moleculas/symptoms-card";
import { LeftArrow } from "../../../assets/left-arrow";
import { RightArrow } from "../../../assets/right-arrow";

export default function Slider({ items }) {

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
    <div>
      <div className={styles.control}>
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
        spaceBetween={0}
        slidesPerView={'auto'}
        loop={false}
        enabled={false}
        breakpoints={{
          481: {
            enabled: true,
            spaceBetween: 32
          }
        }}
      >
        {items?.map((el, index) => (
          <SwiperSlide className={styles.cardWrap} key={el.text + index}>
            <Card data={el} index={index} />
          </SwiperSlide>
        ))}
      </Swiper >
    </div>
  )
}