'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

/**
 * MethodsGrid - Homepage section displaying methodology cards (PDW, PDR, CBT)
 * Features carousel on mobile, grid on desktop, subtle hover effects
 */
export default function MethodsGrid({ data }) {
  if (!data) return null;

  const { title, text, methods } = data;

  if (!methods?.length) return null;

  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, [methods]);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.querySelector('[data-card]')?.offsetWidth || 340;
    const gap = 24;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          {title && (
            <h2 
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }} 
            />
          )}
          {text && (
            <div 
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: text }} 
            />
          )}
        </div>

        <div className={styles.sliderWrapper}>
          {/* Navigation arrows - only show if scrollable */}
          {canScrollLeft && (
            <button 
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={() => scroll('left')}
              aria-label="Poprzednia metoda"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          {canScrollRight && (
            <button 
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={() => scroll('right')}
              aria-label="Następna metoda"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div className={styles.slider} ref={sliderRef}>
            {methods.map((method, index) => (
              <MethodCard key={index} method={method} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodCard({ method, index }) {
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
      data-card
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
