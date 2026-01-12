import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

/**
 * ResearchBanner - Premium statement banner for "Badania pokazują..." section
 * Acts as visual separator between colorful Methods Grid and Specialists Slider
 * Full-width background with centered, larger text for authority/social proof
 */
export default function ResearchBanner({ data }) {
  if (!data?.content) return null;

  const { content, style, link } = data;

  // Map style to CSS class
  const styleClass = {
    highlight: styles.styleHighlight,
    subtle: styles.styleSubtle,
    accent: styles.styleAccent,
  }[style] || styles.styleHighlight;

  return (
    <section className={`${styles.wrapper} ${styleClass}`}>
      {/* Decorative background elements */}
      <div className={styles.bgPattern} aria-hidden="true">
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>

      <div className={styles.container}>
        {/* Decorative quote icon */}
        <div className={styles.quoteIcon} aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path 
              d="M14 24H8C8 15.163 15.163 8 24 8V14C18.477 14 14 18.477 14 24ZM34 24H28C28 15.163 35.163 8 44 8V14C38.477 14 34 18.477 34 24Z" 
              fill="currentColor"
            />
            <path 
              d="M14 24C14 29.523 9.523 34 4 34V40C12.837 40 20 32.837 20 24H14ZM34 24C34 29.523 29.523 34 24 34V40C32.837 40 40 32.837 40 24H34Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }} 
        />

        {link?.url && (
          <Link href={link.url} className={`link ${styles.button}`}>
            {link.title || 'Dowiedz się więcej'}
          </Link>
        )}

        {/* Decorative line */}
        <div className={styles.decorLine} aria-hidden="true" />
      </div>
    </section>
  );
}
