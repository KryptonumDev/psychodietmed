'use client'
import React, { useCallback, useMemo, useState } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { CheckMark } from "../../../assets/check-mark"
import Price from "@/components/atoms/price"
import AddToCart from "@/components/atoms/add-to-cart-button"
import Link from "next/link"

export default function Bundle({ data: { addons, variations, slug, image, name, product, productId, price, regularPrice } }) {

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
      <Link href={`/oferta/${slug}`} className={styles.link} aria-label={name}></Link>
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
            {addons?.map((el, index) => (
              <div key={index} className={styles.group}>
                {el.options.map(inEl => (
                  <label key={inEl.label}>
                    <input checked={chosenAddon?.val === inEl.label} onClick={(e) => { handleAddonClick(e, { name: el.fieldName, val: inEl.label, price: inEl.price }) }} type="radio" name={el.name + slug} value={inEl.label} />
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
          <Price salesPrice={prices.price} regularPrice={prices.regularPrice} />
          <AddToCart chosenAddon={chosenAddon} variationId={chosenVariation?.productId} product={{ productId: productId }} />
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