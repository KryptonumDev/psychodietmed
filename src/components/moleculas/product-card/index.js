'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import AddToCart from "@/components/atoms/add-to-cart-button/index.js"
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import Price from "@/components/atoms/price"
import { CheckMark } from "../../../assets/check-mark"

export const Card = ({ product }) => {

  const [chosenVariation, setChosenVariation] = useState(product?.variations?.nodes[0] || null)

  return (
    <div className={styles.wrapper}>
      <div>
        <Link href={`/akademia/${product?.slug}`} >
          <Image
            width={product.image.mediaDetails.width}
            height={product.image.mediaDetails.height}
            src={product?.image?.mediaItemUrl ?? ''}
            alt={product?.image?.altText ?? product?.slug}
            aspectRatio={true}
            className={styles.image}
          />
        </Link>
        <h3>{product.name}</h3>
        {product?.variations ? (
          <div className={styles.variables}>
            {product?.variations?.nodes?.map((el, index) => (
              <div key={index} className={styles.group}>
                <label key={index}>
                  <input defaultChecked={chosenVariation?.productId === el.productId} onChange={() => { setChosenVariation(el) }} type="radio" name={product.name} value={el.productId} />
                  <span className={styles.checkbox} />
                  <span>
                    {el.attributes.nodes.map((option, index) => (
                      <React.Fragment key={index}>{option.value}{index + 1 < el.attributes.nodes.length ? ', ' : ''}</React.Fragment>
                    ))}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <ul className={styles.bundle}>
            {product?.product?.bundleItems?.map(el => (
              <li key={el.text}>
                <CheckMark />
                <p>{el.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.flex}>
        <Price salesPrice={chosenVariation?.price || product?.price} regularPrice={chosenVariation?.price || product?.regularPrice} />
        <AddToCart variationId={chosenVariation?.productId} product={product} />
      </div>
    </div>
  )
}