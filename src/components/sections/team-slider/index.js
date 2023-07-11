'use client'
import React from "react"
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Image } from "@/components/atoms/image";
import { removeWrap } from "../../../utils/title-modification";

export default function Slider({ data: { title, content, subTitle, slider } }) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.subTitle} dangerouslySetInnerHTML={{ __html: subTitle }} />
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.slider}
      >
        {slider.map((el, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Image aspectRatio={true} className={styles.image} src={el.mediaItemUrl} alt={el.altText} width={el.mediaDetails.width} height={el.mediaDetails.height} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
} 