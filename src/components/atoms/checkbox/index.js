import React from "react"
import styles from "./styles.module.scss"

export default function Checkbox({ text, name, register, errors, error }) {
  return (
    <label className={errors[name] ? `${styles.errored} ${styles.wrapper}` : `${styles.wrapper}`}>
      <input type="checkbox" {...register} />
      <span className={styles.checkbox} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      {error && (
        <>{errors[name] && <span className={styles.error}>{error}</span>}</>
      )}
    </label>
  )
}