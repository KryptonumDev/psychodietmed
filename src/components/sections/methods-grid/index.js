import React from 'react';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';
import { removeWrap } from '@/utils/title-modification';

// Dynamic import with SSR disabled to prevent hydration mismatch
const MethodsSlider = dynamic(() => import('./slider'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

/**
 * MethodsGrid - Homepage section displaying methodology cards (PDW, PDR, CBT)
 * Uses Swiper for consistent carousel behavior across devices
 */
export default function MethodsGrid({ data }) {
  if (!data) return null;

  const { title, text, methods } = data;

  if (!methods?.length) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {title && (
              <h2 
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: removeWrap(title) }} 
              />
            )}
            {text && (
              <div 
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: text }} 
              />
            )}
          </div>
        </div>

        <MethodsSlider methods={methods} />
      </div>
    </section>
  );
}
