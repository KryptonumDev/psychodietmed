'use client'
import React, { useContext, useEffect } from "react"
import styles from './styles.module.scss'
import { AppContext } from "../../../context/app-context";

export default function Success() {
  const [cart, setCart] = useContext(AppContext);

  useEffect(() => {
    setCart(null)
  }, [])
  
  return (
    <section className={styles.wrapper}>
      <h1>Dziękujemy za złożenie zamówienia</h1>
      <p>To Twój pierwszy krok na drodze do dobrej zmiany.</p>
      <p>Informacje dotyczące zamówienia oraz dalsze zalecenia, zostaną wysłane na adres mailowy podany przy składaniu zamówienia.</p>
      <p>W razie problemów kontakt pod adresem e-mail: <a href="mailto:psychodietmed@gmail.com">psychodietmed@gmail.com</a></p>
    </section>
  )
}