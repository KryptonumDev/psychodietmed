'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { AnimatePresence, motion } from "framer-motion"
import { Alert } from "../../../assets/alert"
import { Success } from "../../../assets/success-hearth"

export default function CalculatorHomaIr() {

  const [insulina, setInsulina] = useState(null)
  const [glukoza, setGlukoza] = useState(null)
  const [homa, setHoma] = useState(null)


  useEffect(() => {
    if (insulina !== null && glukoza !== null) {


      setHoma(((glukoza * insulina) / 405).toFixed(2))
    }
  }, [insulina, glukoza, setHoma])

  return (
    <form className={styles.wrapper}>
      <label>
        <span>Insulina <br/>na czczo:</span>
        <input placeholder="mU/ml" onChange={(e) => { setInsulina(e.currentTarget.value) }} type="number" name="insulina" />
      </label>
      <label>
        <span>Glukoza <br/>na czczo:</span>
        <input placeholder="mg/dl" onChange={(e) => { setGlukoza(e.currentTarget.value) }} type="number" name="glukoza" />
      </label>
      <label className={styles.last}>
        <span>Twoje HOMA-IR <br/>wynosi:</span>
        <input disabled={true} value={homa} />
      </label>
      <div className={styles.result}>
        <AnimatePresence mode="wait">
          {(homa && homa < 2.5) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={1} className={styles.success}>
              <Success /><span>Twój wynik jest prawidłowy</span>
            </motion.p>
          }
          {(homa && homa >= 2.5) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={2} className={styles.error}>
              <Alert /><span>Wynik wskazuje na insulinooporność</span>
            </motion.p>
          }
        </AnimatePresence>
      </div>
    </form>
  )
}