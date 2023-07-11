import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { removeWrap } from "../../../utils/title-modification"

export default function RepeaterFlex({ data }) {
  return (
    <>
      {data.map((el, index) => (
        <section className={`${styles.wrapper} ${index % 2 === 0 ? styles.reversed : ''}`}>
          <Image aspectRatio={true} className={styles.image} src={el.image.mediaItemUrl} alt={el.image.altText} width={el.image.mediaDetails.width} height={el.image.mediaDetails.height} />
          <div className={styles.content}>
            <h2 dangerouslySetInnerHTML={{ __html: removeWrap(el.title) }} />
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: el.text }} />
          </div>
        </section>
      ))}
    </>
  )
}