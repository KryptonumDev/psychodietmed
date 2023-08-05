import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"
import { CursorFinger } from "../../../assets/cursor-finger"

const NameDivider = () => (
  <svg className={styles.dots} xmlns="http://www.w3.org/2000/svg" width="96" height="6" viewBox="0 0 103 7" fill="none">
    <path d="M99.5 3.5H3.5" stroke="#DEAFB8" strokeWidth="6" stroke-miterlimit="16" strokeLinecap="round" strokeLinejoin="round" stroke-dasharray="0.1 19" />
  </svg>
)


export default function Name({ data: { image, title, text, signature, psycho, diet, med } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.instruction}>
        <CursorFinger />
        <p>Najedź, aby dowiedzieć się więcej</p>
      </div>
      <div className={styles.name}>
        <span tabIndex="0">
          Psycho
          <div className={styles.description} >
            <div className={styles.icon}>
              <CursorFinger />
            </div>
            <div dangerouslySetInnerHTML={{ __html: psycho }} />
          </div>
        </span>
        <NameDivider />
        <span tabIndex="0">
          Diet
          <div className={styles.description} >
            <div className={styles.icon}>
              <CursorFinger />
            </div>
            <div dangerouslySetInnerHTML={{ __html: diet }} />
          </div>
        </span>
        <NameDivider />
        <span tabIndex="0">
          Med
          <div className={styles.description} >
            <div className={styles.icon}>
              <CursorFinger />
            </div>
            <div dangerouslySetInnerHTML={{ __html: med }} />
          </div>
        </span>
      </div>
      <div className={styles.flex}>
        <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
          <Image aspectRatio={true} className={styles.signature} src={signature.mediaItemUrl} alt={signature.altText} width={signature.mediaDetails.width} height={signature.mediaDetails.height} />
        </div>
      </div>
    </section>
  )
}