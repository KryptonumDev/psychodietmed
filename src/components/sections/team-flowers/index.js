import React from "react"
import styles from './styles.module.scss';
import Link from "next/link";

export default function Flowers({ data: { repeater, text, link } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.first}>
          {repeater.slice(0, 4).map((el, i) => (
            <div key={i} className={styles.item}>
              {el.text}
            </div>
          ))}
        </div>
        <div className={styles.second}>
          {repeater.slice(4, 8).map((el, i) => (
            <div key={i} className={styles.item}>
              {el.text}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cta}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        <Link className='link' href={link.url}>{link.title}</Link>
      </div>
    </section>
  )
}