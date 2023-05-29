'use client'
import React, { useCallback, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Card from "@/components/moleculas/blog-card-expanded";

import styles from './styles.module.scss';
import 'swiper/scss';
import { LeftArrow } from "../../../assets/left-arrow";
import { RightArrow } from "../../../assets/right-arrow";

export default function Slider({ items }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleDotClick = useCallback((index) => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(index);
  }, []);

  return (
    <Swiper
      ref={sliderRef}
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      onSlideChange={(swiper) => {
        debugger
        setActiveIndex(swiper.realIndex);
      }}
    >
      {items.map((el, index) => (
        <SwiperSlide key={index}>
          <Card data={el} />
        </SwiperSlide>
      ))}
      <div className={styles.control} >
        <button onClick={handlePrev} ><LeftArrow /></button>
        <div className={styles.dots}>
          {items.map((el, index) => (
            <button className={activeIndex !== index ? styles.dot : `${styles.dot} ${styles.active}`} key={index} onClick={() => handleDotClick(index)} />
          ))}
        </div>
        <button onClick={handleNext} ><RightArrow /></button>
      </div >
    </Swiper >
  )
}