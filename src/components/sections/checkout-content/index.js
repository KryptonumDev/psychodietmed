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
import Loader from "../loader";

export default function CheckoutContent() {
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [step, setStep] = useState(2);
  const [innerLoading, setInnerLoading] = useState(true);

  useEffect(() => {
    if ((cart && cart?.products?.length === 0) || cart === null) {
      window.location.href = '/koszyk'
    }
  }, [cart])

  // Get Cart Data.
  const { loading } = useQuery(GET_CART, {
    fetchPolicy: 'no-cache', // Disable Apollo cache for this query.
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

      if (!updatedCart && !cart) {
        window.location.href = '/koszyk'
      }

      // Update cart data in React Context.
      setCart(updatedCart || null);
    }
  });

  useEffect(() => {
    setInnerLoading(false)
  }, [])

  // Create New order: Checkout Mutation.
  const [checkout, { loading: checkoutLoad }] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData
    },
    onCompleted: (data) => {
      const mailerlite = axios.post('/api/mailer-lite-register', {
        email: data.checkout.customer?.email || data.checkout.order.billing.email || data.checkout.order.shipping.email,
        status: 'active',
        fields: {
          marketing_permissions: '1',
          name: data.checkout.customer?.firstName || data.checkout.order.billing.firstName || data.checkout.order.shipping.firstName,
        }
      })

      const transaction = axios.post('/api/create-transaction', {
        "amount": data.checkout.order.total * 100,
        "sessionId": data.checkout.order.orderKey,
        "email": data.checkout.customer.email || data.checkout.order.billing.email || data.checkout.order.shipping.email,
        "id": data.checkout.order.orderNumber
      })

      Promise.all([
        transaction,
        mailerlite, 
      ])
        .then(function (values) {
          if (values[0].data.link) {
            window.location.href = values[0].data.link
          }
          setInnerLoading(false)
        })
        .catch(error => {
          setInnerLoading(false)
          throw new Error(error)
        });
    },
    onError: (error) => {
      if (error.message === 'Konto z Twoim adresem e-mail jest już zarejestrowane. <a href="#" class="showlogin">Zaloguj się.</a>') {
        setOrderData(createCheckoutData(input, true))
      } else {
        alert(error)
        window.location.href = '/koszyk'
      }
    }
  });

  useEffect(() => {
    if (null !== orderData) {
      checkout();
    }
  }, [checkout, orderData]);

  const handleSubmit = (props) => {
    const needAccount = cart.products.some((item) => item.categories.some((category) => category.slug === 'kurs'))
    const formattedInput = { ...input, comment: props.comment, needAccount: needAccount }
    setOrderData(createCheckoutData(formattedInput, false))
    setInput(formattedInput)
    setInnerLoading(true)
  }

  return (
    <section className={styles.wrapper}>
      <Loader show={loading || innerLoading || checkoutLoad} />
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
          <Content setCart={setCart} setInnerLoading={setInnerLoading} cart={cart} isCart={false} />
          <Summary submit={handleSubmit} needsShippingAddress={cart?.needsShippingAddress} input={input} setStep={setStep} />
        </>
      )}
    </section>
  )
}