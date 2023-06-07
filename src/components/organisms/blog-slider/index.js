'use client'
import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Card from "@/components/moleculas/blog-card-expanded";
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';

export default function Slider({ items }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      ref={sliderRef}
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
    >
      {items.map((el, index) => (
        <SwiperSlide key={index}>
          <Card data={el} />
        </SwiperSlide>
      ))}
      <Control items={items} sliderRef={sliderRef} activeIndex={activeIndex} />
    </Swiper >
  )
}