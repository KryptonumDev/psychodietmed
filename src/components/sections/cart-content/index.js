'use client'
import React, { useContext, useState } from "react"
import styles from "./styles.module.scss"
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import { getUpdatedItems } from "../../../utils/get-updated-items";
import GET_CART from "../../../queries/get-cart";
import UPDATE_CART from "../../../mutations/update-cart";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { AppContext } from "../../../context/app-context";
import client from "../../../apollo/apolo-client";
import CartItem from "@/components/moleculas/cart-item";

export default function Content() {

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
    },
  });

  const [updateCart, { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError }] = useMutation(UPDATE_CART, {
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
  
  
  return (
    <section className={styles.wrapper}>
      <h1>Twój koszyk</h1>
      <div className={styles.cartControl}>
        <span>Produkt</span>
        <span>Cena jedn.</span>
        <span>Ilość</span>
        <span>Wartość</span>
        <span>Usuń</span>
      </div>
      <div>
        {cart?.products?.map(item => (
          <CartItem
            key={item.productId}
            item={item}
            updateCartProcessing={updateCartProcessing}
            products={cart.products}
            handleRemoveProductClick={handleRemoveProductClick}
            updateCart={updateCart}
          />
        ))}
      </div>
    </section>
  )
}