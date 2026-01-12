'use client';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import styles from './styles.module.scss';
import ArrowLeft from '@/components/atoms/ArrowLeft';
import ArrowRight from '@/components/atoms/ArrowRight';

export default function MethodsSlider({ methods }) {
  const sliderRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const updateArrowsVisibility = useCallback(() => {
    if (!sliderRef.current?.swiper) return;
    const swiper = sliderRef.current.swiper;
    // Show arrows only if there are more slides than visible
    const shouldShow = !swiper.isBeginning || !swiper.isEnd;
    setShowArrows(shouldShow);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  useEffect(() => {
    // Update on resize
    const handleResize = () => {
      if (sliderRef.current?.swiper) {
        sliderRef.current.swiper.update();
        updateArrowsVisibility();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateArrowsVisibility]);

  if (!methods?.length) return null;

  return (
    <>
      {/* Navigation arrows - in header area */}
      {showArrows && methods.length > 1 && (
        <div className={styles.control}>
          <ArrowLeft
            onClick={handlePrev}
            aria-label="Poprzednia metoda"
            className={isBeginning ? styles.disabled : ''}
          />
          <ArrowRight
            onClick={handleNext}
            aria-label="Następna metoda"
            className={isEnd ? styles.disabled : ''}
          />
        </div>
      )}

      <div className={styles.sliderWrapper}>
        <Swiper
          ref={sliderRef}
          modules={[A11y]}
          className={styles.slider}
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            1140: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
          }}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setShowArrows(!swiper.isBeginning || !swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onResize={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setShowArrows(!swiper.isBeginning || !swiper.isEnd);
          }}
        >
          {methods.map((method, index) => (
            <SwiperSlide key={index}>
              <MethodCard method={method} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

function MethodCard({ method }) {
  const { title, description, icon, link, themeColor } = method;
  
  // Map theme colors to CSS class
  const themeClass = {
    mint: styles.themeMint,
    yellow: styles.themeYellow,
    purple: styles.themePurple,
    blue: styles.themeBlue,
  }[themeColor] || styles.themeBlue;

  const CardWrapper = link?.url ? Link : 'div';
  const cardProps = link?.url ? { href: link.url } : {};

  return (
    <CardWrapper 
      className={`${styles.card} ${themeClass}`}
      {...cardProps}
    >
      {/* Colored accent bar on top */}
      <div className={styles.accentBar} aria-hidden="true" />
      
      <div className={styles.cardInner}>
        {/* Logo - horizontal display */}
        {icon?.mediaItemUrl && (
          <div className={styles.logoWrapper}>
            <img
              src={icon.mediaItemUrl}
              alt={icon.altText || title || ''}
              className={styles.logo}
            />
          </div>
        )}
        
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          
          {description && (
            <p className={styles.cardDescription}>{description}</p>
          )}
        </div>

        {link?.url && (
          <span className={styles.cardLink}>
            <span>{link.title || 'Dowiedz się więcej'}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path 
                d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </CardWrapper>
  );
}

