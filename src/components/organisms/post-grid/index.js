import React from "react"
import styles from './styles.module.scss';

export default function Grid({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}