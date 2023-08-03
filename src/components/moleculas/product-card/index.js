'use client'
import React, { useCallback, useMemo, useState } from "react"
import styles from './styles.module.scss'
import AddToCart from "@/components/atoms/add-to-cart-button/index.js"
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import Price from "@/components/atoms/price"
import { CheckMark } from "../../../assets/check-mark"

export const Card = ({ product }) => {

  const [chosenVariation, setChosenVariation] = useState(product?.variations?.nodes[0] || null)
  const [chosenAddon, setChosenAddon] = useState(null)

  const prices = useMemo(() => {
    let localprice = chosenVariation?.price || product.price
    let localregularPrice = chosenVariation?.regularPrice || product.regularPrice

    if (!chosenAddon) return { price: parseInt(localprice), regularPrice: parseInt(localregularPrice) }

    const newPrice = parseInt(localprice) + parseInt(chosenAddon.price)
    const newRegularPrice = parseInt(localregularPrice) + parseInt(chosenAddon.price)

    return { price: newPrice, regularPrice: newRegularPrice }

  }, [product.price, product.regularPrice, chosenAddon, chosenVariation])

  const handleAddonClick = useCallback((e, add) => {
    //if its addon already chosen, remove it
    if (chosenAddon?.val === add?.val) {
      setChosenAddon(null)
      return
    }

    setChosenAddon(add)
  }, [chosenAddon, setChosenAddon])

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/oferta/${product?.slug}`} />
      <div>
        <Image
          width={product.image.mediaDetails.width}
          height={product.image.mediaDetails.height}
          src={product?.image?.mediaItemUrl ?? ''}
          alt={product?.image?.altText ?? product?.slug}
          aspectRatio={true}
          className={styles.image}
        />
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
        ) : product?.product?.bundleItems ? (
          <ul className={styles.bundle}>
            {product?.product?.bundleItems?.map(el => (
              <li key={el.text}>
                <CheckMark />
                <p>{el.text}</p>
              </li>
            ))}
          </ul>
        ) : product.addons ? (
          <div className={styles.variables}>
            {product.addons?.map((el, index) => (
              <div key={index} className={styles.group}>
                {el.options.map(inEl => (
                  <label key={inEl.label}>
                    <input checked={chosenAddon?.val === inEl.label} onClick={(e) => { handleAddonClick(e, { name: el.fieldName, val: inEl.label, price: inEl.price }) }} type="radio" name={el.name} value={inEl.label} />
                    <span className={styles.checkbox} />
                    <span>
                      {inEl.label} <small>+&nbsp;{inEl.price}&nbsp;zł</small>
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.flex}>
        <Price salesPrice={prices.price} regularPrice={prices.regularPrice} />
        <AddToCart chosenAddon={chosenAddon} variationId={chosenVariation?.productId} product={product} />
      </div>
    </div>
  )
}