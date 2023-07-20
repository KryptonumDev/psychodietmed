import AddToCart from "@/components/atoms/add-to-cart-button"
import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import ImageSRC from './../../../assets/bundle.jpg'

export default function BundleContains({ productId, data }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <h2>Co otrzymasz w pakiecie?</h2>
        <div className={styles.grid}>
          {data.map((el, index) => (
            <p key={index} className={styles.item}>
              {el.text}
            </p>
          ))}
        </div>
        <AddToCart product={{ productId: productId }} />
      </div>
      <Image className={styles.image} src={ImageSRC} alt='Obrazek dokarycyjny' width={547} height={487} />
    </section>
  )
}