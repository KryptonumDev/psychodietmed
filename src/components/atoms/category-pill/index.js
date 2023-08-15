'use client'
import Link from "next/link"
import React from "react"
import styles from './styles.module.scss'

export default function Category({ active, name, href, onClick }) {
  return (
    href ? (
      <Link className={`${styles.category} ${active ? styles.active : ''}`} href={href}>
        {name}
      </Link>
    ) : onClick ? (
      <button className={`${styles.category} ${active ? styles.active : ''}`} onClick={onClick}>
        {name}
      </button>
    ) : (
      <div className={`${styles.category} ${active ? styles.active : ''}`} >
        {name}
      </div>
    )
  )
}