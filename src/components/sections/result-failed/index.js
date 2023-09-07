'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default function Failed() {
  const [payLink, setPayLink] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPayLink(localStorage.getItem('payLink'))
    }
  }, [])

  return (
    <section className={styles.wrapper}>
      <h1>Ups! Wystąpił błąd płatności.</h1>
      {payLink
        ? <a className="link" href={resLink}>Spróbuj ponownie</a>
        : <Link className="link" href='/koszyk'>Wróć do koszyka</Link>
      }
    </section>
  )
}