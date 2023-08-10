'use client'
import React, { useState } from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";
import Button from "@/components/atoms/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Academy({ data: { title, text, grid } }) {
  const [ activeElement, setActiveElement ] = useState(0);
  const [ isSmallWidth, setIsSmallWidth ] = useState(0);

  useEffect(() => {
    const checkWidth = () => {
      window.innerWidth <= 700 ? setIsSmallWidth(1) : setIsSmallWidth(0);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    }
  }, [])

  const handleItemClick = (e, index) => {
    e.preventDefault();
    setActiveElement(index);
  };

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <motion.details
            onClick={(e) => handleItemClick(e, index)}
            open={activeElement === index}
            className={styles.item}
            key={index}
            initial={false}
            animate={{ flexGrow: activeElement === index ? 1 : 0 }}
            exit={{ flexGrow: 0 }}
            transition={{ width: { duration: 1, type: 'spring' } }}
          >
            <motion.summary
              initial={false}
              animate={isSmallWidth ? { rotate: 0 } : { rotate: activeElement === index ? 0 : 90 }}
              exit={isSmallWidth ? { rotate: 0 } : { rotate: 90 }}
              style={{ originX: 0 }} 
              transition={{ duration: .6, type: 'spring' }}
              className={styles.title}
            >
              <span>{index + 1}</span>
              <h3>{el.title}</h3>
            </motion.summary>
            <AnimatePresence mode="wait" initial={false}>
              {activeElement === index && (
                <motion.div
                  key={index}
                  className={styles.content}
                  initial={
                    isSmallWidth
                    ? { height: 0 }
                    : { opacity: 0, display: 'none' }
                  }
                  animate={
                    isSmallWidth
                    ? { height: 'auto' }
                    : { opacity: 1, display: 'flex' }
                  }
                  exit={
                    isSmallWidth
                    ? { height: 0 }
                    : { opacity: 0, display: 'none' }
                  }
                  transition={
                    isSmallWidth
                    ? { duration: 1, type: 'spring' }
                    : { delay: .2, duration: 1, type: 'spring' }
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: el.text }} />
                  <Button theme="secondary" href={el.link.url}>{el.link.title}</Button>
                  <Image aspectRatio={true} className={styles.image} src={el.image.mediaItemUrl} alt={el.image.altText} width={el.image.mediaDetails.width} height={el.image.mediaDetails.height} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.details>
        ))}
      </div>
    </section>
  )
}