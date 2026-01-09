'use client';
import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/image';
import styles from './styles.module.scss';

/**
 * MethodsGrid - Homepage section displaying methodology cards (PDW, PDR, CBT)
 * Features hover effects and theme-based color coding
 */
export default function MethodsGrid({ data }) {
  if (!data) return null;

  const { title, text, methods } = data;

  if (!methods?.length) return null;

  return (
    <section className={styles.wrapper}>
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

      <div className={styles.grid}>
        {methods.map((method, index) => (
          <MethodCard key={index} method={method} />
        ))}
      </div>
    </section>
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
      <div className={styles.cardInner}>
        {icon?.mediaItemUrl && (
          <div className={styles.iconWrapper}>
            <Image
              src={icon.mediaItemUrl}
              alt={icon.altText || ''}
              width={icon.mediaDetails?.width || 64}
              height={icon.mediaDetails?.height || 64}
              className={styles.icon}
            />
          </div>
        )}
        
        <h3 className={styles.cardTitle}>{title}</h3>
        
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}

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

      {/* Hover effect background */}
      <div className={styles.cardBg} aria-hidden="true" />
    </CardWrapper>
  );
}

