import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { removeWrap } from '@/utils/title-modification';

/**
 * FeaturesGrid - 2-column layout:
 * Left: Text Content (heading + text + CTA)
 * Right: 2x2 colorful tiles grid
 */
export default function FeaturesGrid({ data, theme }) {
  const { title, content, items, ctaButton } = data || {};

  if (!items?.length && !title && !content) return null;

  return (
    <section className={`${styles.wrapper} ${styles[theme]}`}>
      {/* Left side - heading, text, CTA */}
      <div className={styles.contentSide}>
        {title && (
          <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        )}
        
        {content && (
          <div 
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}

        {ctaButton?.url && (
          <Link href={ctaButton.url} className={`link ${styles.ctaButton}`}>
            {ctaButton.title || 'Dowiedz się więcej'}
          </Link>
        )}
      </div>

      {/* Right side - 2x2 tiles grid */}
      {items?.length > 0 && (
        <div className={styles.tilesGrid}>
          {items.slice(0, 4).map((item, index) => (
            <div key={index} className={styles.tile}>
              <p>{item.title || item.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
