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
import Process from "@/components/organisms/checkout-steps";
import Delivery from "@/components/organisms/checkout-delivery";
import Content from "@/components/organisms/cart-content";
import Summary from "@/components/organisms/checkout-summary";
import { createCheckoutData } from "../../../utils/create-checkout-data";
import Payment from "@/components/organisms/checkout-payment";

export default function CheckoutContent() {
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [step, setStep] = useState(2);
  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
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
      throw new Error(error?.graphQLErrors?.[0]?.message);
    }
  });

  useEffect(async () => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      await checkout();
    }
  }, [orderData]);

  const handleSubmit = (data) => {
    //
    setOrderData(createCheckoutData(data))
  }

  // if(!cart) return null TODO: add loader
  return (
    <section className={styles.wrapper}>
      <h1>Podsumowanie zamówienia</h1>
      <Process needsShippingAddress={cart?.needsShippingAddress} step={step} />
      {((step < 5 && cart?.needsShippingAddress) || (step < 4 && !cart?.needsShippingAddress)) && (
        <div className={styles.grid}>
          <div className={styles.content} >
            {step === 2 && <Personaldata input={input} setInput={setInput} setStep={setStep} />}
            {(step === 3 && cart?.needsShippingAddress) && <Delivery input={input} setInput={setInput} setStep={setStep} shippingMethods={cart?.shippingMethods} />}
            {((step === 4 && cart?.needsShippingAddress) || (step === 3 && !cart?.needsShippingAddress)) && <Payment input={input} setInput={setInput} setStep={setStep} paymentMethods={cart?.paymentMethods}  />}
          </div>
          <Aside data={cart} />
        </div>
      )}
      {((step === 5 && cart?.needsShippingAddress) || (step === 4 && !cart?.needsShippingAddress)) && (
        <>
          <Content refetch={refetch} cart={cart} isCart={false} />
          <Summary setStep={setStep} />
        </>
      )}
    </section>
  )
}