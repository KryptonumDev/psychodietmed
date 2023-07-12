import React from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Input({ rows, placeholder, title, name, register, errors, error = 'To pole jest wymagane' }) {
  return (
    <label className={styles.wrapper}>
      <span>{title}</span>
      {rows
        ? <textarea rows={rows} placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} {...register} />
        : <input placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} {...register} />}
      <AnimatePresence>
        {errors[name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>{error}</motion.span>}
      </AnimatePresence>
    </label>
  )
}