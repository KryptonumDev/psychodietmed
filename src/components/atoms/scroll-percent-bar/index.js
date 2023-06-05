'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'

export default function ScrollPercentBar() {

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const calculatedScrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(calculatedScrollPercentage);
    };

    handleScroll()

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className={styles.bar}>
      <div className={styles.percent} style={{ width: `${scrollPercentage}%` }} />
    </div>
  )
}