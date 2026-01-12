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
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }} 
        />

        {link?.url && (
          <Link href={link.url} className={`link ${styles.button}`}>
            {link.title || 'Dowiedz się więcej'}
          </Link>
        )}
      </div>
    </section>
  );
}
