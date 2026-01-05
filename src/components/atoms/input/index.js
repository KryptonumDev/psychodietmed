'use client'
import React, { useState } from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import { Eye } from "../../../assets/eye"

export default function Input({ type = 'text', className = '', rows, placeholder, title, name, register, errors, error = 'To pole jest wymagane', disabled = false }) {

  const [curType, setCurType] = useState(type)

  return (
    <label className={`${styles.wrapper} ${className}`}>
      {title && (
        <span>{title}</span>
      )}
      {rows
        ? <textarea rows={rows} placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} disabled={disabled} {...register} />
        : <div className={styles.inputWrap}>
          <input type={curType} placeholder={placeholder} className={errors[name] ? `${styles.errored} ${styles.input}` : styles.input} disabled={disabled} {...register} />
          {type === 'password' && (
            <button type="button" onClick={() => { setCurType(curType === 'text' ? type : 'text') }} disabled={disabled}><Eye /></button>
          )}
        </div>
      }

      <AnimatePresence mode="wait">
        {errors[name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>{error}</motion.span>}
      </AnimatePresence>
    </label>
  )
}