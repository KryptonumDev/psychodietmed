'use client'
import React, { useState } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from '../../../utils/get-updated-items';
import styles from './styles.module.scss';
import { Image } from '@/components/atoms/image';
import { Trash } from '../../../assets/trash';

export default function CartItem({
  item,
  products,
  updateCartProcessing,
  handleRemoveProductClick,
  updateCart,
}) {

  const [productCount, setProductCount] = useState(item.qty);

  const handleQtyChange = (event, cartKey, count) => {

    if (typeof window !== 'undefined') {
      event.stopPropagation();

      const newQty = (event.target.value) ? parseInt(event.target.value) : count;

      if (updateCartProcessing || count < 1) {
        return;
      }

      setProductCount(newQty);

      if (products.length) {
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
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <Image aspectRatio={true} className={styles.image} src={item.image.mediaItemUrl} alt={item.image.altText} width={item.image.mediaDetails?.width} height={item.image.mediaDetails?.height} />
        <p>{item.name}</p>
      </div>
      <div>
        {('string' !== typeof item.price) ? item.price.toFixed(0) : item.price}
      </div>
      <div className={styles.calculator}>
        <button onClick={(event) => { handleQtyChange(event, item.cartKey, productCount - 1) }} aria-label='usuń zbędne z koszyka' disabled={updateCartProcessing}>
          <Minus />
        </button>
        <input
          disabled={true}
          value={productCount}
          min="1"
          onChange={(event) => handleQtyChange(event, item.cartKey)}
        />
        <button onClick={(event) => { handleQtyChange(event, item.cartKey, productCount + 1) }} aria-label='dodaj więcej do koszyka' disabled={updateCartProcessing}>
          <Plus />
        </button>
      </div>
      <div>
        {('string' !== typeof item.totalPrice) ? item.totalPrice.toFixed(0) : item.totalPrice}
      </div>
      <button className={styles.cart} aria-label='Usuń produkt z koszyka' onClick={(event) => handleRemoveProductClick(event, item.cartKey, products)} >
        <Trash />
      </button>
    </div>
  )
};

const Minus = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 12H19.5" stroke="#194574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Plus = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 5V19" stroke="#194574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 12H19.5" stroke="#194574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)