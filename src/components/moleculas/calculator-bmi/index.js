'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { AnimatePresence, motion } from "framer-motion"
import { Alert } from "../../../assets/alert"
import { Success } from "../../../assets/success-hearth"

export default function CalculatorBmi() {

  const [waga, setWaga] = useState(null)
  const [wzrost, setWzrost] = useState(null)
  const [bmi, setBmi] = useState(null)

  useEffect(() => {
    if (waga > 0 && wzrost > 0) {
      setBmi((waga / (wzrost * wzrost) * 10000).toFixed(2))
    } else {
      setBmi(null)
    }
  }, [waga, wzrost, setBmi])

  return (
    <form className={styles.wrapper}>
      <label>
        <span>Waga:</span>
        <input min={0} max={250} placeholder="kg" onChange={(e) => { setWaga(e.currentTarget.value) }} type="number" name="waga" />
      </label>
      <label>
        <span>Wzrost:</span>
        <input min={0} max={250} placeholder="cm" onChange={(e) => { setWzrost(e.currentTarget.value) }} type="number" name="wzrost" />
      </label>
      <label className={styles.last}>
        <span>Twoje BMI wynosi:</span>
        <input disabled={true} value={bmi || " "} />
      </label>
      <div className={styles.result}>
        <AnimatePresence mode="wait">
          {(bmi && bmi < 16) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={1} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na wygłodzenie</span>
            </motion.p>
          }
          {(bmi < 17 && bmi >= 16) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={2} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na wychudzenie</span>
            </motion.p>
          }
          {(bmi < 18.5 && bmi >= 17) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={3} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na niedowagę</span>
            </motion.p>
          }
          {(bmi < 25 && bmi >= 18.5) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={4} className={styles.success}>
              <Success /><span>Twoje BMI jest prawidłowe</span>
            </motion.p>
          }
          {(bmi >= 25 && bmi < 30) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={5} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na nadwagę</span>
            </motion.p>
          }
          {(bmi >= 30 && bmi < 35) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={6} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na otyłość I stopnia</span>
            </motion.p>
          }
          {(bmi >= 35 && bmi < 40) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={7} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na otyłość II stopnia</span>
            </motion.p>
          }
          {(bmi >= 40) &&
            <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={8} className={styles.error}>
              <Alert /><span>Twoje BMI wskazuje na otyłość skrajną</span>
            </motion.p>
          }
        </AnimatePresence>
      </div>
    </form>
  )
}