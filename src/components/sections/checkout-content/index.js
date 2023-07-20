'use client'
import React, { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useMutation, useQuery } from "@apollo/client";
import GET_CART from "../../../queries/get-cart";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import CHECKOUT_MUTATION from "../../../mutations/checkout";
import Personaldata from "@/components/organisms/checkout-personal-data";
import { AppContext } from "../../../context/app-context";
import client from "../../../apollo/apolo-client";
import Aside from "@/components/organisms/checkout-aside";

export default function Content() {
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data } = useQuery(GET_CART, {
    client,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    }
  });

  // Create New order: Checkout Mutation.
  const [checkout, {
    data: checkoutResponse,
    loading: isOrderProcessing,
  }] = useMutation(CHECKOUT_MUTATION, {
    client,
    variables: {
      input: orderData
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
      }
    }
  });

  useEffect(async () => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      await checkout();
    }
  }, [orderData]);

  // cart.needsShippingAddress  - bool
  // cart.availableShippingMethods - arr

  // if(!cart) return null TODO: add loader

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <Personaldata />
      </div>
      <Aside data={cart} />
    </section>
  )
}