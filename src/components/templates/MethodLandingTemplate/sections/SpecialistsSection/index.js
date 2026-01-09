import React from 'react';
import styles from './styles.module.scss';
import Specialists from '@/components/sections/specialists-slider';

/**
 * SpecialistsSection - Wrapper for specialists carousel on method landing pages
 * Uses the same carousel component as the homepage
 * @param {string} title - Section title
 * @param {Array} specialists - Array of specialist data from global query
 * @param {string} theme - 'pdw' or 'pdr'
 */
export default function SpecialistsSection({ title = 'Poznaj naszych specjalistów', specialists, theme = 'pdw' }) {
  if (!specialists || specialists.length === 0) {
    return null;
  }

  const themeClass = theme === 'pdr' ? styles.themePdr : styles.themePdw;

  return (
    <section className={`${styles.wrapper} ${themeClass}`}>
      <div className={styles.container}>
        <Specialists 
          data={specialists} 
          title={title}
        />
      </div>
    </section>
  );
}

