import React from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Checkbox({ text, name, register, errors, error }) {
  return (
    <label className={errors[name] ? `${styles.errored} ${styles.wrapper}` : `${styles.wrapper}`}>
      <input type="checkbox" {...register} />
      <span className={styles.checkbox} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <AnimatePresence mode="wait">
        {errors[name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>{error}</motion.span>}
      </AnimatePresence>
    </label>
  )
}