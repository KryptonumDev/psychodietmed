'use client'
import React, { useState } from "react"
import styles from "./styles.module.scss"
import { useMutation } from "@apollo/client";
import { getUpdatedItems } from "../../../utils/get-updated-items";
import UPDATE_CART from "../../../mutations/update-cart";
import { v4 } from "uuid";
import CartItem from "@/components/moleculas/cart-item";
import Link from "next/link";
import APPLY_COUPON from "../../../mutations/apply-coupon";
import { useForm } from "react-hook-form";
import REMOVE_COUPON from "../../../mutations/remove-coupon";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import { AnimatePresence, motion } from "framer-motion";

export default function Content({ delivery = {}, setCart, setInnerLoading, cart, isCart = true }) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [couponError, setCouponError] = useState(null);

  const [updateCart, { loading: updateCartProcessing }] = useMutation(UPDATE_CART, {
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data.updateItemQuantities);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      // Update cart data in React Context.

      if (!updatedCart && !isCart) {
        window.location.href = '/koszyk'
      }

      setCart(updatedCart || null);
      setInnerLoading(false)
    },
    onError: (error) => {
      setInnerLoading(false)
      if (error) {
        throw new Error(error?.graphQLErrors?.[0]?.message);
      }
    }
  });

  const [applyCoupon, { loading: applyCouponProcessing }] = useMutation(APPLY_COUPON, {
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data.applyCoupon);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      // Update cart data in React Context.
      setCart(updatedCart || null);
      setInnerLoading(false)
      setCouponError(null)
    },
    onError: (error) => {
      setInnerLoading(false)
      setCouponError(error?.graphQLErrors?.[0]?.message)
    }
  });

  const [removeCoupon, { loading: removeCouponProcessing }] = useMutation(REMOVE_COUPON, {
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data.removeCoupons);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      // Update cart data in React Context.
      setCart(updatedCart || null);
      setInnerLoading(false)
      setCouponError(null)
    },
    onError: (error) => {
      setInnerLoading(false)
      reload()
    }
  });

  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);
      setInnerLoading(true)
      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems
          }
        },
      });
    }
  };

  const handleApplyCoupon = (data) => {
    setInnerLoading(true)
    applyCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          code: data.coupon
        }
      }
    });
  };

  const handleRemoveCoupon = (data) => {
    setInnerLoading(true)
    removeCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          codes: data
        }
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Twój koszyk</h2>
      <div className={styles.cartControl}>
        <span>Produkt</span>
        <span>Cena jedn.</span>
        <span>Ilość</span>
        <span className={styles.total}>Wartość</span>
        <span>Usuń</span>
      </div>
      <div className={styles.grid}>
        {cart?.products?.map((item, index) => (
          <CartItem
            setInnerLoading={setInnerLoading}
            key={item.productId + index}
            item={item}
            updateCartProcessing={updateCartProcessing}
            products={cart.products}
            handleRemoveProductClick={handleRemoveProductClick}
            updateCart={updateCart}
          />
        ))}
      </div>
      <div className={styles.summary}>
        <form onSubmit={handleSubmit(handleApplyCoupon)} className={styles.discount}>
          <label>
            <span>Dodaj kod rabatowy</span>
            <input {...register('coupon', { required: true })} />
          </label>
          <button className="link">
            Aktywuj
          </button>
          <AnimatePresence mode="wait">
            {couponError && (
              <motion.span className={styles.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{couponError}</motion.span>
            )}
          </AnimatePresence>
        </form>
        <div className={styles.price}>
          <p><span>Wartość zamówienia:</span><span dangerouslySetInnerHTML={{ __html: cart?.subTotalProductPrice }} /></p>
          <p><span>Zniżka:</span><span dangerouslySetInnerHTML={{ __html: cart?.totalProductsDiscount }} /></p>
          {cart?.appliedCoupons?.map((coupon, index) => (
            <p key={index} className={styles.coupon}>
              <span>Zastosowano kod kuponu -<span dangerouslySetInnerHTML={{ __html: coupon.discountAmount }} />: {coupon.code}</span>
              <button onClick={() => { handleRemoveCoupon(coupon.code) }}>
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2493 7.74976C23.0071 7.50761 22.6786 7.37158 22.3361 7.37158C21.9936 7.37158 21.6651 7.50761 21.4229 7.74976L15.4993 13.6733L9.57569 7.74976C9.33347 7.50761 9.00499 7.37158 8.66248 7.37158C8.31998 7.37158 7.9915 7.50761 7.74928 7.74976C7.50713 7.99199 7.37109 8.32047 7.37109 8.66297C7.37109 9.00548 7.50713 9.33396 7.74928 9.57618L13.6729 15.4998L7.74928 21.4234C7.50713 21.6656 7.37109 21.9941 7.37109 22.3366C7.37109 22.6791 7.50713 23.0075 7.74928 23.2498C7.9915 23.4919 8.31998 23.6279 8.66248 23.6279C9.00499 23.6279 9.33347 23.4919 9.57569 23.2498L15.4993 17.3262L21.4229 23.2498C21.6651 23.4919 21.9936 23.6279 22.3361 23.6279C22.6786 23.6279 23.0071 23.4919 23.2493 23.2498C23.4914 23.0075 23.6275 22.6791 23.6275 22.3366C23.6275 21.9941 23.4914 21.6656 23.2493 21.4234L17.3257 15.4998L23.2493 9.57618C23.4914 9.33396 23.6275 9.00548 23.6275 8.66297C23.6275 8.32047 23.4914 7.99199 23.2493 7.74976Z" fill="#194574" />
                </svg>
              </button>
            </p>
          ))}
          {delivery?.cost && (
            <p><span>Dostawa:</span> <span>{delivery?.cost}&nbsp;zł</span></p>
          )}
          <p><span>Razem:</span><span>{Number(cart?.totalProductsPrice) + Number(delivery?.cost || 0)}&nbsp;zł</span></p>
        </div>
        {isCart && (
          <>
            <Link href='/oferta' className={styles.left}>Kontynuuj zakupy</Link>
            <Link href='/zamowienie' className={`link ${styles.right}`}>
              Realizuj zamówienie
            </Link>
          </>
        )}
      </div>
    </div>
  )
}