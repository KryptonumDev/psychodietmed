import React, { useCallback } from "react"
import styles from './styles.module.scss'
import { useSwiper } from "swiper/react";
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";

export default function Control({ className = '', activeIndex, items }) {
  const swiper = useSwiper();

  const handlePrev = useCallback(() => {
    if (!swiper) return;
    swiper.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    if (!swiper) return;
    swiper.slideNext();
  }, [swiper]);

  const handleDotClick = useCallback((index) => {
    if (!swiper) return;
    swiper.slideTo(index);
  }, [swiper]);

  return (
    <div className={`${styles.control}`} >
      <ArrowLeft onClick={handlePrev} aria-label="Przesuń w lewą" />
      <div className={`${styles.dots} ${className}`}>
        {items.map((el, index) => (
          <button
            className={activeIndex !== index ? styles.dot : `${styles.dot} ${styles.active}`}
            key={index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      <ArrowRight onClick={handleNext} aria-label="Przesuń w prawo"  />
    </div >
  )
}