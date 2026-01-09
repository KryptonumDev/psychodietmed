import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

/**
 * ResearchBanner - Highlighted banner section for statistics/research info
 * "Badania pokazują..." section
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
      <div className={styles.inner}>
        <div className={styles.decorLeft} aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path 
              d="M24 4L29.5 17H43L32 27L37 42L24 32L11 42L16 27L5 17H18.5L24 4Z" 
              fill="currentColor" 
              opacity="0.3"
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

        <div className={styles.decorRight} aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path 
              d="M24 4L29.5 17H43L32 27L37 42L24 32L11 42L16 27L5 17H18.5L24 4Z" 
              fill="currentColor" 
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

