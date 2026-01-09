import React from 'react';
import styles from './styles.module.scss';

export default function IntroductionSection({ data, theme }) {
  const { title, content } = data || {};

  if (!title && !content) return null;

  return (
    <section className={`${styles.introduction} ${styles[theme]}`}>
      <div className={styles.textContent}>
        {title && (
          <h2 className={styles.title}>{title}</h2>
        )}
        {content && (
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </div>
    </section>
  );
}
