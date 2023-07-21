'use client'
import React, { useContext, useState } from "react"
import styles from "./styles.module.scss"
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import { getUpdatedItems } from "../../../utils/get-updated-items";
import GET_CART from "../../../queries/get-cart";
import UPDATE_CART from "../../../mutations/update-cart";
import { v4 } from "uuid";
import { AppContext } from "../../../context/app-context";
import client from "../../../apollo/apolo-client";
import CartItem from "@/components/moleculas/cart-item";
import Link from "next/link";
import APPLY_COUPON from "../../../mutations/apply-coupon";
import { useForm } from "react-hook-form";
import Process from "@/components/organisms/checkout-steps";
import Content from "@/components/organisms/cart-content";

export default function Cart() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [cart, setCart] = useContext(AppContext);

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    client,
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
      <h1>Twój koszyk</h1>
      <Process needsShippingAddress={cart?.needsShippingAddress} step={1} />
      <Content refetch={refetch} cart={cart} />
    </section>
  )
}