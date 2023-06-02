import React, { useCallback } from "react"
import { LeftArrow } from "../../../assets/left-arrow"
import { RightArrow } from "../../../assets/right-arrow"
import styles from './styles.module.scss'

export default function Control({ sliderRef, activeIndex, items }) {

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleDotClick = useCallback((index) => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(index);
  }, []);

  return (
    <div className={styles.control} >
      <button onClick={handlePrev} ><LeftArrow /></button>
      <div className={styles.dots}>
        {items.map((el, index) => (
          <button className={activeIndex !== index ? styles.dot : `${styles.dot} ${styles.active}`} key={index} onClick={() => handleDotClick(index)} />
        ))}
      </div>
      <button onClick={handleNext} ><RightArrow /></button>
    </div >
  )
}