import React from 'react';
import { Image } from '@/components/atoms/image';
import Button from '@/components/atoms/button';
import styles from './styles.module.scss';

export default function HeroMethod({ data, theme, methodName }) {
  const { title, subtitle, specialist, ctaButton, backgroundImage, heroImage } = data || {};

  const specialistData = specialist?.proffesional;
  const specialistImage = specialistData?.personImage;
  const specialistName = specialist?.title;
  const specialistProfession = specialistData?.proffesion;
  const specialistSlug = specialist?.slug;
  const excerpt = specialistData?.excerpt;

  // Use heroImage if provided, otherwise fall back to specialist image
  const mainImage = heroImage?.mediaItemUrl ? heroImage : specialistImage;

  return (
    <section className={`${styles.wrapper} ${styles[theme]}`}>
      {/* Left column - Logo + Title */}
      <div className={styles.content}>
        {backgroundImage?.mediaItemUrl && (
          <img 
            src={backgroundImage.mediaItemUrl}
            alt={backgroundImage.altText || methodName || ''}
            className={styles.logo}
            loading="eager"
          />
        )}
        
        {title && (
          <h1 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }} 
          />
        )}

        {subtitle && (
          <div 
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: subtitle }} 
          />
        )}
      </div>

      {/* Right column - Image with decorators + specialist card */}
      <div className={styles.imageWrapper}>
        <div className={styles.blueSquare} />
        <div className={styles.pinkSquare} />
        
        {mainImage?.mediaItemUrl && (
          <Image
            src={mainImage.mediaItemUrl}
            alt={mainImage.altText || specialistName || 'Hero'}
            width={mainImage.mediaDetails?.width || 600}
            height={mainImage.mediaDetails?.height || 700}
            aspectRatio={true}
            className={styles.mainImage}
            loading="eager"
          />
        )}

        {/* Specialist card overlay */}
        {specialist && (
          <div className={styles.specialistCard}>
            <div className={styles.avatar}>
              {specialistImage?.mediaItemUrl && (
                <Image
                  src={specialistImage.mediaItemUrl}
                  alt=""
                  width={60}
                  height={60}
                  className={styles.avatarImage}
                />
              )}
              <div>
                {specialistName && <p className={styles.name}>{specialistName}</p>}
                {specialistProfession && <p className={styles.profession}>{specialistProfession}</p>}
              </div>
            </div>
            
            {excerpt && (
              <div 
                className={styles.excerpt}
                dangerouslySetInnerHTML={{ __html: excerpt }} 
              />
            )}
            
            {ctaButton?.url ? (
              <Button theme="secondary" href={ctaButton.url}>
                {ctaButton.title || 'Umów wizytę'}
              </Button>
            ) : specialistSlug && (
              <Button theme="secondary" href={`/specjalisci/${specialistSlug}`}>
                Zobacz profil
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
