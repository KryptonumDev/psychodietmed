'use client'
import React, { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import Bundle from "@/components/moleculas/product-bundle";

export default function Slider({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
    >
      {data.map((el, index) => (
        <SwiperSlide key={index}>
          <div>
            {el.map((item, index) => (
              <Bundle key={index} data={item} />
          ))}
          </div>
        </SwiperSlide>
      ))}
      {data.length > 1 && (
        <Control items={data} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      )}
    </Swiper >
  )
}