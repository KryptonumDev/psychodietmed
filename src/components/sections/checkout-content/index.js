'use client'
import React, { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useMutation } from "@apollo/client";
import GET_CART from "../../../queries/get-cart";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import CHECKOUT_MUTATION from "../../../mutations/checkout";
import Personaldata from "@/components/organisms/checkout-personal-data";
import { AppContext } from "../../../context/app-context";
import Aside from "@/components/organisms/checkout-aside";
import Process from "@/components/organisms/checkout-steps";
import Delivery from "@/components/organisms/checkout-delivery";
import Content from "@/components/organisms/cart-content";
import Summary from "@/components/organisms/checkout-summary";
import { createCheckoutData } from "../../../utils/create-checkout-data";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import axios from "axios";
import { v4 } from "uuid";

export default function CheckoutContent() {
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [step, setStep] = useState(2);
  // Get Cart Data.
  const { refetch } = useQuery(GET_CART, {
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
  const [checkout] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData
    },
    onCompleted: (data) => {
      debugger
      // axios.post('/api/mailer-lite-register', {
      //   email: data.checkout.customer?.email || data.checkout.order.billing.email || data.checkout.order.shipping.email,
      //   status: 'active',
      //   fields: {
      //     marketing_permissions: '1',
      //     name: data.checkout.customer?.firstName || data.checkout.order.billing.firstName || data.checkout.order.shipping.firstName,
      //   }
      // }).then((response) => {
      //   debugger
      // }).catch((error) => {
      //   debugger
      // })

      // axios.post('/api/create-transaction', {
      //   "amount": data.checkout.order.total,
      //   "sessionId": data.checkout.order.orderKey,
      //   "email": data.checkout.customer.email || data.checkout.order.billing.email || data.checkout.order.shipping.email,
      // }).then((response) => {
      //   debugger
      // }).catch((error) => {
      //   debugger
      // })
    },
    onError: (error) => {
      throw new Error(error?.graphQLErrors?.[0]?.message);
    }
  });

  useEffect(() => {
    if (null !== orderData) {
      checkout();
    }
  }, [orderData]);

  const handleSubmit = (props) => {
    const needAccount = cart.products.some((item) => item.categories.some((category) => category.slug === 'kurs'))
    const registred = false // TODO: add check if user is already registred
    setOrderData(createCheckoutData(input, needAccount, registred, props))
  }

  // if(!cart) return null TODO: add loader
  return (
    <section className={styles.wrapper}>
      <h1>
        {step === 2 && 'Dane osobowe'}
        {(step === 3 && cart?.needsShippingAddress) && 'Dostawa'}
        {((step === 4 && cart?.needsShippingAddress) || (step === 3 && !cart?.needsShippingAddress)) && 'Podsumowanie zamówienia'}
      </h1>
      <Process needsShippingAddress={cart?.needsShippingAddress} step={step} />
      {((step < 4 && cart?.needsShippingAddress) || (step < 3 && !cart?.needsShippingAddress)) && (
        <div className={styles.grid}>
          <div className={styles.content} >
            {step === 2 && <Personaldata input={input} setInput={setInput} setStep={setStep} />}
            {(step === 3 && cart?.needsShippingAddress) && <Delivery input={input} setInput={setInput} setStep={setStep} shippingMethods={cart?.shippingMethods} />}
          </div>
          <Aside data={cart} />
        </div>
      )}
      {((step === 4 && cart?.needsShippingAddress) || (step === 3 && !cart?.needsShippingAddress)) && (
        <>
          <Content refetch={refetch} cart={cart} isCart={false} />
          <Summary submit={handleSubmit} needsShippingAddress={cart?.needsShippingAddress} input={input} setStep={setStep} />
        </>
      )}
    </section>
  )
}