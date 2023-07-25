'use client'
import React, { useMemo, useState } from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import { removeWrap } from "../../../utils/title-modification"
import AddToCart from "@/components/atoms/add-to-cart-button"
import Price from "@/components/atoms/price"

export default function Hero({ data: { addons, variations, productId, title, description, featuredImage, price, regularPrice } }) {

  const [productCount, setProductCount] = useState(1);
  const [chosenVariation, setChosenVariation] = useState(variations?.nodes[0] || null)
  const [chosenAddon, setChosenAddon] = useState(null)

  const prices = useMemo(() => {
    let localprice = chosenVariation?.price || price
    let localregularPrice = chosenVariation?.regularPrice || regularPrice

    if (!chosenAddon) return { price: parseInt(localprice), regularPrice: parseInt(localregularPrice) }

    const newPrice = parseInt(localprice) + parseInt(chosenAddon.price)
    const newRegularPrice = parseInt(localregularPrice) + parseInt(chosenAddon.price)

    return { price: newPrice, regularPrice: newRegularPrice }

  }, [price, regularPrice, chosenAddon, chosenVariation])

  return (
    <section className={styles.wrapper}>
      <Image aspectRatio={true} className={styles.image} src={featuredImage.node.mediaItemUrl} alt={featuredImage.node.altText} width={featuredImage.node.mediaDetails.width} height={featuredImage.node.mediaDetails.height} />
      <div className={styles.conten}>
        <h1 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div dangerouslySetInnerHTML={{ __html: description }} />

        <div className={styles.variables}>
          {addons?.map((el, index) => (
            <div key={index} className={styles.group}>
              {el.options.map(inEl => (
                <label key={inEl.label}>
                  <input onChange={() => { setChosenAddon({ name: el.fieldName, val: inEl.label, price: inEl.price }) }} type="radio" name={el.name} value={inEl.label} />
                  <span className={styles.checkbox} />
                  <span>
                    {inEl.label} <small>+&nbsp;{inEl.price}&nbsp;zł</small>
                  </span>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.variables}>
          {variations?.nodes?.map((el, index) => (
            <div key={index} className={styles.group}>
              <label key={index}>
                <input defaultChecked={chosenVariation?.productId === el.productId} onChange={() => { setChosenVariation(el) }} type="radio" name={title} value={el.productId} />
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
        <div className={styles.flex}>
          <div className={styles.qtyWrap}>
            <p>Ilość produktów:</p>
            <div className={styles.calculator}>
              <button onClick={(event) => { setProductCount(productCount - 1) }} aria-label='usuń zbędne z koszyka' disabled={productCount <= 1}>
                <Minus />
              </button>
              <input
                disabled={true}
                value={productCount}
                min="1"
                onChange={(event) => handleQtyChange(event, item.cartKey)}
              />
              <button onClick={(event) => { setProductCount(productCount + 1) }} aria-label='dodaj więcej do koszyka'>
                <Plus />
              </button>
            </div>
          </div>
          <div className={styles.addToCart}>
            <Price quantity={productCount} salesPrice={prices.price} regularPrice={prices.regularPrice} />
            <AddToCart chosenAddon={chosenAddon} quantity={productCount} variationId={chosenVariation?.productId} product={{ productId: productId }} />
          </div>
        </div>
      </div>
    </section>
  )
}

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