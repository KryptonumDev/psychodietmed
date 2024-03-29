import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function List({ data: { title, lista } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        {lista.map((el, index) => (
          <div key={index} className={styles.item}>
            <Image aspectRatio={true} className={styles.icon} src={el.icon.mediaItemUrl} alt={el.icon.altText} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} />
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}