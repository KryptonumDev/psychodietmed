'use client'
import React, { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import Card from "@/components/moleculas/case-card";

export default function Slider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      modules={[A11y]}
      className={styles.wrapper}
      spaceBetween={50}
      slidesPerView={1}
      loop={false}
      autoHeight={true}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
    >
      {items.length > 1 && (
        <Control items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      )}
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
            boldText={el.histori.information.boldText}
            specialist={el.histori.information.specialist}
          />
        </SwiperSlide>
      ))}
    </Swiper >
  )
}