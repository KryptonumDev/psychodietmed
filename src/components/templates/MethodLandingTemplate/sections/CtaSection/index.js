import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function CtaSection({ data, theme }) {
  const { content, primaryButton, secondaryButton } = data;

  if (!content && !primaryButton) return null;

  return (
    <section className={`${styles.cta} ${styles[theme]}`}>
      <div className={styles.inner}>
        {content && (
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}

        <div className={styles.buttons}>
          {primaryButton?.url && (
            <Link 
              href={primaryButton.url} 
              className={`link ${styles.primaryButton}`}
            >
              {primaryButton.title || 'Umów konsultację'}
            </Link>
          )}
          
          {secondaryButton?.url && (
            <Link 
              href={secondaryButton.url} 
              className={`link-secondary ${styles.secondaryButton}`}
            >
              <span>{secondaryButton.title || 'Dowiedz się więcej'}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

