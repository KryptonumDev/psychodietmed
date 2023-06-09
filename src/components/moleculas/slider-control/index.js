import React, { useCallback, useEffect, useMemo } from "react"
import { LeftArrow } from "../../../assets/left-arrow"
import { RightArrow } from "../../../assets/right-arrow"
import styles from './styles.module.scss'
import { useSwiper } from "swiper/react";

export default function Control({ className = '', activeIndex, items }) {
  const swiper = useSwiper();

  const handlePrev = useCallback(() => {
    if (!swiper) return;
    swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiper) return;
    swiper.slideNext();
  }, []);

  const handleDotClick = useCallback((index) => {
    if (!swiper) return;
    swiper.slideTo(index);
  }, []);

  return (
    <div className={`${styles.control}`} >
      <button onClick={handlePrev} ><LeftArrow /></button>
      <div className={`${styles.dots} ${className}`}>
        {items.map((el, index) => (
          <button className={activeIndex !== index ? styles.dot : `${styles.dot} ${styles.active}`} key={index} onClick={() => handleDotClick(index)} />
        ))}
      </div>
      <button onClick={handleNext} ><RightArrow /></button>
    </div >
  )
}