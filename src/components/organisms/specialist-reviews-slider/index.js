'use client'
import React, { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import Card from "@/components/moleculas/specialist-review-card";
import 'swiper/scss';

export default function Slider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={24}
      slidesPerView={1}
      loop={false}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
      breakpoints={{
        1200: {
          slidesPerView: 2.5,
        },
        972: {
          slidesPerView: 2,
          spaceBetween: 36
        },
        520: {
          slidesPerView: 1.5,
        }
      }}
    >
      {items.map((el, index) => (
        <SwiperSlide key={index}>
          <Card data={el} />
        </SwiperSlide>
      ))}
      {items.length > 1 && (
        <Control className={styles.buttons} activeIndex={activeIndex} setActiveIndex={setActiveIndex} items={items} />
      )}
    </Swiper >
  )
}