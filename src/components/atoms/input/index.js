import React from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Input({ type='text', className = '', rows, placeholder, title, name, register, errors, error = 'To pole jest wymagane' }) {
  return (
    <label className={`${styles.wrapper} ${className}`}>
      <span>{title}</span>
      {rows
        ? <textarea rows={rows} placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} {...register} />
        : <input type={type} placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} {...register} />}
      <AnimatePresence mode="wait">
        {errors[name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>{error}</motion.span>}
      </AnimatePresence>
    </label>
  )
}