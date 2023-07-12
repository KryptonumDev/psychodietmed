'use client'
import React, { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import Card from "@/components/moleculas/illnes-card";

export default function Slider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={16}
      slidesPerView={1}
      loop={false}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
      breakpoints={{
        581: {
          slidesPerView: 'auto',
          loop: true,
          spaceBetween: 10
        }
      }}
    >
      {items?.map((el, index) => (
        <SwiperSlide className={styles.cardWrap} key={el.title + index}>
          <Card data={el} />
        </SwiperSlide>
      ))}
      {items?.length > 1 && (
        <Control items={items} activeIndex={activeIndex} />
      )}
    </Swiper >
  )
}