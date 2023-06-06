import React from "react"
import styles from './styles.module.scss'
import Cart from "@/components/atoms/cart"
import Link from "next/link"

export default function SubHeader() {
  return (
    <aside className={styles.wrapper}>
      <Link className={`${styles.link} link`} href='mailto: biuro@psychodietmed.pl'>
        Skontaktuj się!
      </Link>
      <Cart />
    </aside>
  )
}