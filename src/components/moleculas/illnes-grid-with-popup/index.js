'use client'
import Link from "next/link"
import React from "react"
import styles from './styles.module.scss'
import { Cross } from "../../../assets/cross"
import { CursorFinger } from "../../../assets/cursor-finger"
import { AnimatePresence, motion } from "framer-motion"

export default function IllnesGrid({ problems, active, setActive }) {
  return (
    <React.Fragment>
      <div className={styles.problems_grid}>
        {problems.map((el, index) => (
          <button className={index === active ? styles.active : ''} key={el.id} onClick={() => { setActive(index) }}>
            {el.title}
          </button>
        ))}
      </div>
      <div className={styles.popup_wrap}>
        <AnimatePresence initial={false} mode="wait">
          {problems.map((el, index) => {
            if (active !== index) return null
            return (
              <motion.div key={el.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className={styles.popup}>
                <div className={styles.finger}><CursorFinger /></div>

                <h3 className={styles.title}>{el.specialisation.popupCasestudy.title}</h3>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: el.specialisation.popupCasestudy.text }} />

                <div className={styles.control}>
                  <Link href='/umow-wizyte' className="link">Umów wizytę online</Link>
                  <button onClick={() => { setActive(null) }}><Cross /><span>Zamknij</span></button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </React.Fragment>
  )
}