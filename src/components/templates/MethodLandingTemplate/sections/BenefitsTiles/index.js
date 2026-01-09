import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

/**
 * BenefitsTiles - Section with 8 colorful tiles in 2x4 grid + CTA
 * Based on team-flowers component layout
 */
export default function BenefitsTiles({ data, theme = 'pdw' }) {
  const { items, content, ctaButton } = data || {};
  
  if (!items?.length) return null;
  
  const themeClass = theme === 'pdr' ? styles.themePdr : styles.themePdw;

  return (
    <section className={`${styles.wrapper} ${themeClass}`}>
      <div className={styles.grid}>
        {/* First column - 4 tiles */}
        <div className={styles.first}>
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className={styles.item}>
              {item.text}
            </div>
          ))}
        </div>
        
        {/* Second column - 4 tiles */}
        {items.length > 4 && (
          <div className={styles.second}>
            {items.slice(4, 8).map((item, i) => (
              <div key={i} className={styles.item}>
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {(content || ctaButton?.url) && (
        <div className={styles.cta}>
          {content && (
            <div 
              className={styles.text} 
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          )}
          {ctaButton?.url && (
            <Link className='link' href={ctaButton.url}>
              {ctaButton.title || 'Dowiedz się więcej'}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

