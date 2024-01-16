import React, { useCallback } from "react"
import styles from './styles.module.scss'
import { useSwiper } from "swiper/react";
import ArrowLeft from "@/components/atoms/ArrowLeft";
import ArrowRight from "@/components/atoms/ArrowRight";

export default function Control({ disabelArrows, className = '', activeIndex, setActiveIndex, items }) {
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
    setActiveIndex(index);
    swiper.slideToLoop(index);
  }, [setActiveIndex, swiper]);

  return (
    <div className={`${styles.control} ${disabelArrows ? styles.arrowless : ''}`} >
      {!disabelArrows && (
        <ArrowLeft onClick={handlePrev} aria-label="Przesuń w lewą" />
      )}
      <div className={`${styles.dots} ${className}`}>
        {items.map((el, index) => (
          <button
            className={activeIndex !== index ? styles.dot : `${styles.dot} ${styles.active}`}
            key={index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      {!disabelArrows && (
      <ArrowRight onClick={handleNext} aria-label="Przesuń w prawo" />
      )}
    </div >
  )
}