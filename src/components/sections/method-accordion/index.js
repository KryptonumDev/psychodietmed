'use client';
import React from 'react';
import styles from './styles.module.scss';

/**
 * Accordion component for Method Landing Pages
 * Supports theming (pdw/pdr) via CSS custom properties
 */
export default function MethodAccordion({ data, theme = 'pdw' }) {
  if (!data?.items?.length) return null;

  const { title, items } = data;

  return (
    <section className={`${styles.wrapper} ${styles[theme]}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.accordionList}>
        {items.map((item, index) => (
          <details key={index} className={styles.accordionItem}>
            <summary className={styles.accordionHeader}>
              <span className={styles.accordionIcon} aria-hidden="true" />
              <span className={styles.accordionTitle}>{item.title}</span>
            </summary>
            <div 
              className={styles.accordionContent}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

