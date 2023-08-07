'use client'
import React, { useContext } from "react"
import styles from "./styles.module.scss"
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import GET_CART from "../../../queries/get-cart";
import { AppContext } from "../../../context/app-context";
import Process from "@/components/organisms/checkout-steps";
import Content from "@/components/organisms/cart-content";
import Link from "next/link";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export default function Cart() {

  const [cart, setCart] = useContext(AppContext);

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      // Update cart data in React Context.
      setCart(updatedCart);
    }
  });

  return (
    <section className={styles.wrapper}>
      {cart?.products?.length > 0 ? (
        <>
          <h1 className={styles.margin}>Twój koszyk</h1>
          <Process needsShippingAddress={cart?.needsShippingAddress} step={1} />
          <Content refetch={refetch} cart={cart} />
        </>
      ) : (
        <>
          <h1>Twój koszyk jest pusty.</h1>
          <p>Nie możesz się zdecydować?</p>
          <Link className="link" href="/oferta">Poznaj nasze pakiety</Link>
        </>
      )}
    </section>
  )
}