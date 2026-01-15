'use client';
import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/image';
import styles from './styles.module.scss';

/**
 * ProcessSection - 2-column layout:
 * Left: Process Image (sticky on desktop)
 * Right: Accordion items + CTA button
 * Title + Description: Large centered heading above the whole section
 */
export default function ProcessSection({ data, accordion, theme }) {
  const { title, description, processImage, ctaButton } = data || {};
  const accordionItems = accordion?.items || [];

  // Don't render if no image and no accordion items
  if (!processImage?.mediaItemUrl && !accordionItems.length) return null;

  return (
    <section className={`${styles.wrapper} ${styles[theme]}`}>
      {/* Large centered heading + description above the section */}
      {(title || description) && (
        <div className={styles.sectionHeader}>
          {title && (
            <h2 
              className={styles.sectionTitle}
              dangerouslySetInnerHTML={{ __html: title }} 
            />
          )}
          {description && (
            <div 
              className={styles.sectionDescription}
              dangerouslySetInnerHTML={{ __html: description }} 
            />
          )}
        </div>
      )}

      <div className={styles.process}>
        {/* Left side - Process graphic (sticky) */}
        {processImage?.mediaItemUrl && (
          <div className={styles.imageContainer}>
            <div className={styles.stickyWrapper}>
              <Image
                src={processImage.mediaItemUrl}
                alt={processImage.altText || 'Schemat procesu'}
                width={processImage.mediaDetails?.width || 600}
                height={processImage.mediaDetails?.height || 500}
                aspectRatio={true}
                className={styles.processImage}
              />
            </div>
          </div>
        )}

        {/* Right side - Accordion + CTA */}
        <div className={styles.contentSide}>
          {/* Accordion items */}
          {accordionItems.length > 0 && (
            <div className={styles.accordionList}>
              {accordionItems.map((item, index) => (
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
          )}

          {/* CTA Button below accordion */}
          {ctaButton?.url && (
            <Link href={ctaButton.url} className={`link ${styles.ctaButton}`}>
              {ctaButton.title || 'Umów wizytę'}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
