import React from 'react';
import styles from './styles.module.scss';

export default function StagesSection({ data, theme }) {
  const { title, items } = data;

  if (!items?.length) return null;

  return (
    <section className={`${styles.stages} ${styles[theme]}`}>
      {title && (
        <h2 className={styles.title}>{title}</h2>
      )}

      <div className={styles.timeline}>
        {items.map((item, index) => (
          <div key={index} className={styles.stageItem}>
            <div className={styles.stageNumber}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.stageContent}>
              <h3 className={styles.stageTitle}>{item.title}</h3>
              {item.description && (
                <div 
                  className={styles.stageDescription}
                  dangerouslySetInnerHTML={{ __html: item.description }} 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

