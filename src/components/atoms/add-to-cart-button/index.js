'use client'
import { useState, useContext } from "react";
import { useQuery, useMutation } from '@apollo/client';
import Link from "next/link";
import { v4 } from 'uuid';

import { AppContext } from "../../../context/app-context";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import GET_CART from "../../../queries/get-cart";
import ADD_TO_CART from "../../../mutations/add-to-cart";
import client from "../../../apollo/apolo-client";

export default function AddToCart({ chosenAddon, variationId, quantity, product }) {

  const addons = chosenAddon ? {
    fieldName: { fieldName: chosenAddon?.name },
    value: { fieldName: chosenAddon?.name, value: chosenAddon?.val }
  } : null


  const productQryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    quantity: quantity || 1,
    variationId: variationId || null,
    addons: addons
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

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
  // Add to Cart Mutation.
  const [addToCart, {
    data: addToCartRes,
    loading: addToCartLoading,
    error: addToCartError
  }] = useMutation(ADD_TO_CART, {
    client,
    variables: {
      input: productQryInput,
    },
    onCompleted: (res) => {
      
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true)
    },
    onError: (error) => {

      
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
      }
    }
  });

  const handleAddToCartClick = async () => {
    setRequestError(null);
    await addToCart();
  };

  return (
    <div >
      {showViewCart ? (
        <Link style={{ position: "relative", zIndex: 3 }} className="link" href="/koszyk">
          Pokaż koszyk
        </Link>
      ) : (
        <button
          className="link"
          disabled={addToCartLoading}
          onClick={handleAddToCartClick}
          style={{ position: "relative", zIndex: 3 }}
        >
          {addToCartLoading ? 'Dodaje do koszyka...' : 'Dodaj do koszyka'}
        </button>
      )}
    </div>
  );
};
