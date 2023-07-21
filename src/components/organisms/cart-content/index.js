'use client'
import React from "react"
import styles from "./styles.module.scss"
import { useMutation } from "@apollo/client";
import { getUpdatedItems } from "../../../utils/get-updated-items";
import UPDATE_CART from "../../../mutations/update-cart";
import { v4 } from "uuid";
import client from "../../../apollo/apolo-client";
import CartItem from "@/components/moleculas/cart-item";
import Link from "next/link";
import APPLY_COUPON from "../../../mutations/apply-coupon";
import { useForm } from "react-hook-form";

export default function Content({ cart, refetch, isCart = true }) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [updateCart, { loading: updateCartProcessing }] = useMutation(UPDATE_CART, {
    client,
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message ? error.graphQLErrors[0].message : '';
        throw new Error(errorMessage);
      }
    }
  });

  const [applyCoupon, { loading: applyCouponProcessing }] = useMutation(APPLY_COUPON, {
    client,
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message ? error.graphQLErrors[0].message : '';
        throw new Error(errorMessage);
      }
    }
  });

  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

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
    applyCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          code: data.coupon
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
        </form>
        <div className={styles.price}>
          <p><span>Wartość zamówienia:</span><span dangerouslySetInnerHTML={{ __html: cart?.subTotalProductPrice }} /></p>
          <p><span>Zniżka:</span><span dangerouslySetInnerHTML={{ __html: cart?.totalProductsDiscount }} /></p>
          <p><span>Razem:</span><span dangerouslySetInnerHTML={{ __html: cart?.totalProductsPrice }} /></p>
        </div>
        {isCart && (
          <>
            <Link href='/akademia'>Kontynuuj zakupy</Link>
            <button className="link">
              Realizuj zamówienie
            </button>
          </>
        )}
      </div>
    </div>
  )
}