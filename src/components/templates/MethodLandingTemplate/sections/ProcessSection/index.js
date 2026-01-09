import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/image';
import styles from './styles.module.scss';

export default function ProcessSection({ data, theme }) {
  const { title, description, processImage, items, ctaButton } = data || {};

  // Don't render if no image and no items
  if (!processImage?.mediaItemUrl && !items?.length) return null;

  return (
    <section className={`${styles.process} ${styles[theme]}`}>
      {/* Left side - Process graphic */}
      {processImage?.mediaItemUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={processImage.mediaItemUrl}
            alt={processImage.altText || 'Schemat procesu'}
            width={processImage.mediaDetails?.width || 600}
            height={processImage.mediaDetails?.height || 500}
            aspectRatio={true}
            className={styles.processImage}
          />
        </div>
      )}

      {/* Right side - Items list + CTA */}
      <div className={styles.contentSide}>
        {title && (
          <p 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }} 
          />
        )}
        
        {description && (
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }} 
          />
        )}

        {items?.length > 0 && (
          <ul className={styles.itemsList}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>
                {item.icon?.mediaItemUrl && (
                  <Image
                    src={item.icon.mediaItemUrl}
                    alt={item.icon.altText || ''}
                    width={item.icon.mediaDetails?.width || 32}
                    height={item.icon.mediaDetails?.height || 32}
                    className={styles.itemIcon}
                  />
                )}
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        )}

        {ctaButton?.url && (
          <Link href={ctaButton.url} className={`link ${styles.ctaButton}`}>
            {ctaButton.title || 'Umów wizytę'}
          </Link>
        )}
      </div>
    </section>
  );
}
