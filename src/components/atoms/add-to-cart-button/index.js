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

export default function AddToCart({ product }) {

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
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
    onCompleted: () => {
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
    <div>
      <button
        disabled={addToCartLoading}
        onClick={handleAddToCartClick}
      >
        {addToCartLoading ? 'Adding to cart...' : 'Add to cart'}
      </button>
      {showViewCart ? (
        <Link href="/cart">
          <button>
            View Cart
          </button>
        </Link>
      ) : ''}
    </div>
  );
};
