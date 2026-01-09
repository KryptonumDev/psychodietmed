import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/image';
import Button from '@/components/atoms/button';
import styles from './styles.module.scss';
import { removeWrap } from '@/utils/title-modification';

/**
 * FounderSection - Section about the method creator/founder
 * Based on team-owner component layout
 */
export default function FounderSection({ data, theme = 'pdw' }) {
  const { title, image, ownerName, ownerProfession, repeater, content, ctaButton } = data || {};
  
  // Don't render if no meaningful content
  if (!title && !content && !image?.mediaItemUrl && !repeater?.length) {
    return null;
  }
  
  const themeClass = theme === 'pdr' ? styles.pdr : '';

  return (
    <section className={`${styles.wrapper} ${themeClass}`}>
      {/* Left side - Card with photo and info */}
      <div className={styles.card}>
        {title && (
          <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        )}
        
        <div className={styles.flex}>
          {image?.mediaItemUrl && (
            <Image
              width={image.mediaDetails?.width || 300}
              height={image.mediaDetails?.height || 400}
              src={image.mediaItemUrl}
              quality={100}
              alt={image.altText || ownerName || 'Założycielka'}
              className={styles.image}
              aspectRatio={true}
            />
          )}
          
          <div className={styles.info}>
            {ownerName && <h3>{ownerName}</h3>}
            {ownerProfession && <p className={styles.profession}>{ownerProfession}</p>}
            
            {repeater?.length > 0 && (
              <div className={styles.repeaterList}>
                {repeater.map((item, index) => (
                  <div key={index} className={styles.item}>
                    {item.icon?.mediaItemUrl && (
                      <Image
                        width={item.icon.mediaDetails?.width || 24}
                        height={item.icon.mediaDetails?.height || 24}
                        aspectRatio={true}
                        src={item.icon.mediaItemUrl}
                        alt={item.icon.altText || ''}
                        className={styles.icon}
                      />
                    )}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Text content and CTA */}
      <div className={styles.contentSide}>
        {content && (
          <div 
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {ctaButton?.url && (
          <Button href={ctaButton.url}>
            {ctaButton.title || 'Dowiedz się więcej'}
          </Button>
        )}
      </div>
    </section>
  );
}
