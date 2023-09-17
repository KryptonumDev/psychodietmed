'use client'
import React, { useCallback, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Card from "@/components/moleculas/blog-card-expanded";
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";

export default function Slider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <>
      <div className={`${styles.control} ${styles.desctop}`}>
        <ArrowLeft
          className={styles.left}
          onClick={() => { handlePrev() }}
          aria-label='Poprzedni produkt'
        />
        <h2 className={styles.sub_title}>Najnowsze artykuły</h2>
        <ArrowRight
          className={styles.right}
          onClick={() => { handleNext() }}
          aria-label='Następny produkt'
        />
      </div>
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
        <Control disabelArrows={true} items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </Swiper >
    </>
  )
}