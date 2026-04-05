'use client'
import React, { useCallback, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import Control from "@/components/moleculas/slider-control";
import styles from './styles.module.scss';
import 'swiper/scss';
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";
import { removeWrap } from "../../../utils/title-modification";
import { Card } from "@/components/moleculas/product-card";

export default function Slider({ title, data }) {
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
    <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {data.map((el, index) => (
          <SwiperSlide key={index}>
            <Card product={el} key={index}/>
          </SwiperSlide>
        ))}
        {data.length > 1 && (
          <Control disabelArrows={false} items={data} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
      </Swiper >
    </>
  )
}