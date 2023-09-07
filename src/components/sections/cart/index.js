'use client'
import React, { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import GET_CART from "../../../queries/get-cart";
import { AppContext } from "../../../context/app-context";
import Process from "@/components/organisms/checkout-steps";
import Content from "@/components/organisms/cart-content";
import Link from "next/link";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Loader from "../loader";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart() {
  const [needAnimation, setNeedAnimation] = useState(false);
  const [cart, setCart] = useContext(AppContext);
  const [innerLoading, setInnerLoading] = useState(true);

  const { loading, refetch } = useQuery(GET_CART, {
    fetchPolicy: 'no-cache', // Disable Apollo cache for this query.
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      // Update cart data in React Context.
      setNeedAnimation(true)
      setCart(updatedCart || null);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    setInnerLoading(false)
  }, [])

  return (
    <section className={styles.wrapper}>
      <Loader show={loading || innerLoading}/>
      <AnimatePresence mode="wait">
        {cart?.products?.length > 0 ? (
          <motion.div className={styles.content} key='three' initial={{ opacity: needAnimation ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className={styles.margin}>Twój koszyk</h1>
            <Process needsShippingAddress={cart?.needsShippingAddress} step={1} />
            <Content isCartPage={true} setInnerLoading={setInnerLoading} setCart={setCart} refetch={refetch} cart={cart} />
          </motion.div>
        ) : (
          <motion.div className={styles.content} key='four' initial={{ opacity: needAnimation ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1>Twój koszyk jest pusty.</h1>
            <p>Nie możesz się zdecydować?</p>
            <Link className="link" href="/oferta">Poznaj nasze pakiety</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}