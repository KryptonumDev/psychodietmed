import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Logo } from "../../../assets/logo-pink"
import Link from "next/link"

export default function Compare({ data: { title, text, psychoterapeuta, psychodietyk, psychoterapeutaPsychodietetyk, cta, link } }) {
  const leftTotal = psychodietyk * 4 + psychoterapeuta * 4
  const rightTotal = psychoterapeutaPsychodietetyk * 4
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        <h3 className={styles.leftTitle}>Klasyczna klinika</h3>
        <div className={styles.leftFirst}>
          <h4>Psychoterapeuta</h4>
          <p><strong>{psychoterapeuta} zł</strong> / spotkanie <small>×4</small></p>
        </div>
        <div className={styles.leftSecond}>
          <h4>Psychodietetyka</h4>
          <p><strong>{psychodietyk} zł</strong> / spotkanie <small>×4</small></p>
        </div>
        <div className={styles.leftThird}>
          <h4>Łączna kwota</h4>
          <p><strong>{leftTotal} zł</strong> / miesiąc</p>
        </div>
        <div className={styles.leftRounds}>
          <div>
            <p>Czas na dojazd</p>
            <strong>30 minut</strong>
            <small>×4</small>
          </div>
          <div>
            <p>Spotkanie</p>
            <strong>50 minut</strong>
            <small>×4</small>
          </div>
          <div>
            <p>Łącznie</p>
            <strong>320 minut</strong>
            <small></small>
          </div>
        </div>
        <h3 className={styles.rightTitle}>Terapia w <Logo /></h3>
        <div className={styles.rightFirst}>
          <h4>Psychoterapeuta-psychodietetyk</h4>
          <p><strong>ok. {psychoterapeutaPsychodietetyk} zł</strong> / spotkanie <small>×4</small></p>
        </div>
        <div className={styles.rightSecond}>
          <h4>Łączna kwota</h4>
          <div className={styles.flex}>
            <p><s>{leftTotal} zł</s> <strong>{rightTotal} zł</strong></p>
            <p className={styles.bold}>Oszczędzasz {leftTotal - rightTotal} zł!</p>
          </div>
        </div>
        <div className={styles.rightRounds}>
          <div>
            <p>Czas na dojazd</p>
            <strong>0 minut</strong>
            <small></small>
          </div>
          <div>
            <p>Spotkanie</p>
            <strong>50 minut</strong>
            <small>×4</small>
          </div>
          <div>
            <p>Oszczędzasz</p>
            <strong>120 minut</strong>
            <small></small>
          </div>
        </div>
      </div>
      <div className={styles.cta}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: cta }} />
        <Link className='link' href={link.url}>{link.title}</Link>
      </div>
    </section>
  )
}