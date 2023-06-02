import Link from "next/link"
import React from "react"
import styles from './styles.module.scss'

export default function Category({ name, href }) {
  return (
    <Link className={styles.category} href={href}>
      {name}
    </Link>
  )
}