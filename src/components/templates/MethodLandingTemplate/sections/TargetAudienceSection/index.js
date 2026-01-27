import React from 'react';
import styles from './styles.module.scss';
import { removeWrap } from '@/utils/title-modification';

export default function TargetAudienceSection({ data, theme }) {
  const { title, content, tiles } = data || {};

  if (!title && !content && !tiles?.length) return null;

  return (
    <section className={`${styles.wrapper} ${styles[theme]}`}>
      {title && (
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      )}
      
      {content && (
        <div 
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )}

      {tiles?.length > 0 && (
        <div className={styles.grid}>
          {tiles.map((tile, index) => (
            <div key={index} className={styles.item}>
              {tile.icon?.mediaItemUrl && (
                <img src={tile.icon.mediaItemUrl} alt={tile.icon.altText || ''} />
              )}
              <p>{tile.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
