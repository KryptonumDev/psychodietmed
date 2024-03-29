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
    if ((cart && cart?.products?.length === 0)) {
      window.location.href = '/koszyk'
    }
  }, [cart])

  // Get Cart Data.
  const { loading } = useQuery(GET_CART, {
    fetchPolicy: 'no-cache', // Disable Apollo cache for this query.
    onCompleted: (data) => {
      if (data.viewer) {
        setInput({
          ...input,
          billing: {
            ...input.billing,
            firstName: data.viewer.firstName,
            lastName: data.viewer.lastName,
            email: data.viewer.email,
          },
          shipping: {
            ...input.shipping,
            firstName: data.viewer.firstName,
            lastName: data.viewer.lastName,
            email: data.viewer.email,
          }
        })
      }
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
    fetchPolicy: 'no-cache', // Disable Apollo cache for this query.
    variables: {
      input: orderData
    },
    onCompleted: (data) => {
      const email = data.checkout.customer?.email || data.checkout.order.billing.email || data.checkout.order.shipping.email
      const firstName = data.checkout.customer?.firstName || data.checkout.order.billing.firstName || data.checkout.order.shipping.firstName
      const lastName = data.checkout.customer?.lastName || data.checkout.order.billing.lastName || data.checkout.order.shipping.lastName

      const mailerlite = axios.post('/api/mailer-lite-register', {
        email: email,
        type: 'active',
        fields: {
          marketing_permissions: '1',
          name: firstName,
        }
      })

      if (data.checkout.order.total == 0) {
        window.location.href = `https://www.psychodietmed.pl/api/complete-free-order/?id=${data.checkout.order.orderNumber}`
        return;
      }

      const transaction = axios.post('/api/create-transaction', {
        "client": firstName + ' ' + lastName,
        "address": orderData.billing.address1,
        "zip": orderData.billing.postcode,
        "city": orderData.billing.city,
        "amount": data.checkout.order.total * 100,
        "sessionId": data.checkout.order.orderKey,
        "email": data.checkout.customer.email || data.checkout.order.billing.email || data.checkout.order.shipping.email,
        "urlReturn": `https://www.psychodietmed.pl/api/verify-transaction-status/?session=${data.checkout.order.orderKey}&id=${data.checkout.order.orderNumber}`,
        "urlStatus": `https://www.psychodietmed.pl/api/complete-order/?amount=${data.checkout.order.total * 100}&session=${data.checkout.order.orderKey}&id=${data.checkout.order.orderNumber}`,
      })

      Promise.all([
        transaction,
        mailerlite,
      ])
        .then(function (values) {
          if (values[0].data.link) {
            localStorage.setItem('woo-next-cart', null);
            localStorage.setItem('payLink', values[0].data.link)
            window.location.href = values[0].data.link
          }
          setInnerLoading(false)
        })
        .catch(error => {
          setInnerLoading(false)
          alert(error)
        });
    },
    onError: (error) => {
      if (error.message === 'Konto z Twoim adresem e-mail jest już zarejestrowane. <a href="#" class="showlogin">Zaloguj się.</a>') {
        setOrderData(createCheckoutData(input, true))
      } else {
        setInnerLoading(false)
        alert(error)
      }
    }
  });

  useEffect(() => {
    if (null !== orderData) {
      checkout();
    }
  }, [checkout, orderData]);

  const handleSubmit = (props) => {
    const needAccount = cart.products.some((item) => item.categories.some((category) => category.slug === 'kurs' || category.slug === 'program'))
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
          <Content delivery={input.shippingMethod} setCart={setCart} setInnerLoading={setInnerLoading} cart={cart} isCart={false} />
          <Summary submit={handleSubmit} needsShippingAddress={cart?.needsShippingAddress} input={input} setStep={setStep} />
        </>
      )}
    </section>
  )
}