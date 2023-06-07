'use client'
import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import Card from "@/components/moleculas/case-card";

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
        <SwiperSlide key={el.slug + index}>
          <Card
            slug={el.slug}
            name={el.histori.caseStudyCard.name}
            avatar={el.histori.caseStudyCard.avatar}
            comment={el.histori.caseStudyCard.comment}
            linkText={el.histori.caseStudyCard.linkText}
            before={el.histori.information.beforeImage}
            after={el.histori.information.afterImage}
          />
        </SwiperSlide>
      ))}
      {items.length > 1 && (
        <Control items={items} sliderRef={sliderRef} activeIndex={activeIndex} />
      )}
    </Swiper >
  )
}