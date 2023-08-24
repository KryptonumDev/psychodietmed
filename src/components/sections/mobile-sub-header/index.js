'use client'
import React, { useContext } from "react"
import styles from './styles.module.scss'
import Cart from "@/components/atoms/cart"
import Link from "next/link"
import { AppContext } from "../../../context/app-context";

export default function SubHeader() {
  const [cart] = useContext(AppContext);
  return (
    <aside className={styles.wrapper}>
      <Link className={`${styles.link} link`} href='/umow-wizyte'>
        Umów się!
      </Link>
      <Cart
        cart={cart?.totalProductsCount}
        className={styles.cart}
      />
    </aside>
  )
}