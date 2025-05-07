"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { v4 } from "uuid";

import { AppContext } from "../../../context/app-context";
import { getFormattedCart } from "../../../utils/get-formatted-cart";
import ADD_TO_CART from "../../../mutations/add-to-cart";
import { useMutation } from "@apollo/client";

export default function AddToCart({
  children,
  chosenAddon,
  variationId,
  quantity,
  product,
}) {
  const addons = chosenAddon
    ? {
        fieldName: { fieldName: chosenAddon?.name },
        value: { fieldName: chosenAddon?.name, value: chosenAddon?.val },
      }
    : null;

  const productQryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    quantity: quantity || 1,
    variationId: variationId || null,
    addons: addons,
  };

  const [, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [clearCart, setClearCart] = useState(false);

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: (res) => {
      const updatedCart = getFormattedCart(res.addToCart);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      setCart(updatedCart || null);
      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (
        error.message === "Przepraszamy, ten produkt nie może zostać kupiony."
      ) {
        alert("Przepraszamy, ten produkt nie może zostać kupiony.");
      } else if (!clearCart) {
        window.localStorage.clear();
        setClearCart(true);
        addToCart();
      }
      console.log(error.message);
    },
  });

  const handleAddToCartClick = async () => {
    addToCart();
  };

  return (
    <>
      {showViewCart ? (
        <Link
          style={{ position: "relative", zIndex: 3 }}
          className="link"
          href="/koszyk"
        >
          Pokaż koszyk
        </Link>
      ) : (
        <button
          className="link"
          disabled={addToCartLoading}
          onClick={handleAddToCartClick}
          style={{ position: "relative", zIndex: 3 }}
        >
          {addToCartLoading
            ? "Dodaje do koszyka..."
            : children
            ? children
            : "Dodaj do koszyka"}
        </button>
      )}
    </>
  );
}
