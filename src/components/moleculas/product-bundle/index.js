'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { CheckMark } from "../../../assets/check-mark"
import Price from "@/components/atoms/price"
import AddToCart from "@/components/atoms/add-to-cart-button"
import Link from "next/link"

export default function Bundle({ data: { variations, slug, image, name, product, productId, price, regularPrice } }) {

  const [chosenVariation, setChosenVariation] = useState(variations?.nodes[0] || null)

  return (
    <div className={styles.wrapper}>
      <Link href={`/akademia/${slug}`} className={styles.link}></Link>
      <Image
        width="259"
        height="259"
        loading="lazy"
        src={image?.mediaItemUrl ?? ''}
        alt={image?.altText ?? product?.slug}
        className={styles.image}
        aspectRatio={true}
      />
      <div className={styles.content}>
        <h3>{name}</h3>
        <ul>
          {product?.bundleItems?.map(el => (
            <li key={el.text}>
              <CheckMark />
              <p>{el.text}</p>
            </li>
          ))}
        </ul>
        {product?.discount && (
          <div className={styles.discount}>
            <SaveSvg />
            <div className={styles.text}>
              <small>Oszędzasz:</small>
              <span>{product?.discount}</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.radios}>
          <div className={styles.variables}>
            {variations?.nodes?.map((el, index) => (
              <div key={index} className={styles.group}>
                <label key={index}>
                  <input defaultChecked={chosenVariation?.productId === el.productId} onChange={() => { setChosenVariation(el) }} type="radio" name={name} value={el.productId} />
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
        </div>
        <div className={styles.flex}>
          <Price salesPrice={chosenVariation?.price || price} regularPrice={chosenVariation?.price || regularPrice} />
          <AddToCart variationId={chosenVariation?.productId} product={{ productId: productId }} />
        </div>
      </div>
    </div>
  )
}

const SaveSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="108" height="92" viewBox="0 0 108 92" fill="none">
    <path d="M100 0H8C3.58172 0 0 3.58172 0 8V89.7286C0 91.2238 1.58089 92.1903 2.91174 91.5087L52.4485 66.1367C53.0149 65.8466 53.6855 65.8433 54.2547 66.1279L105.106 91.5528C106.435 92.2177 108 91.2507 108 89.764V8C108 3.58172 104.418 0 100 0Z" fill="#194574" />
  </svg>
)