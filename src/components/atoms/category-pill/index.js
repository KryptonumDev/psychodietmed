'use client'
import React from "react"
import styles from './styles.module.scss'

export default function Category({ active, name, onClick = () => { } }) {
  return (
    <button className={`${styles.category} ${active ? styles.active : ''}`} onClick={onClick}>
      {name}
    </button>
  )
}