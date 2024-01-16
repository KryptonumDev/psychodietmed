'use client'
import React, { useCallback, useRef } from "react"
import styles from './styles.module.scss';
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "@/components/moleculas/product-card";
import 'swiper/scss';
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";

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
      <div className={`${styles.control} ${styles.desctop}`}>
        <ArrowLeft
          className={styles.left}
          onClick={() => { handlePrev() }}
          aria-label='Poprzedni produkt'
        />
        <h2>{title}</h2>
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
        spaceBetween={16}
        slidesPerView={1}
        autoHeight={true}
        breakpoints={{
          1025: {
            autoHeight: false,  
            slidesPerView: 3,
            spaceBetween: 32
          },
          641: {
            autoHeight: false,  
            slidesPerView: 2,
            spaceBetween: 24
          }
        }}
      >
        {products?.map((el, index) => (
          <SwiperSlide key={index}>
            <Card product={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}