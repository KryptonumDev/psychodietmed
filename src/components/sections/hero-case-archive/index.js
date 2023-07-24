import React from "react"
import { removeWrap } from "../../../utils/title-modification"
import styles from "./styles.module.scss"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function Hero({ data: { title, text, link, topImage, rightImage, leftImage, wordLine } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <div>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
          <Link className="link" href={link.url}>{link.title}</Link>
        </div>
        <div className={styles.grid}>
          <Image
            width={topImage.mediaDetails.width}
            height={topImage.mediaDetails.height}
            src={topImage.mediaItemUrl}
            alt={topImage.altText}
            className={styles.top}
            aspectRatio={true}
          />
          <Image
            width={leftImage.mediaDetails.width}
            height={leftImage.mediaDetails.height}
            src={leftImage.mediaItemUrl}
            alt={leftImage.altText}
            className={styles.left}
            aspectRatio={true}
          />
          <Image
            width={rightImage.mediaDetails.width}
            height={rightImage.mediaDetails.height}
            src={rightImage.mediaItemUrl}
            alt={rightImage.altText}
            className={styles.right}
            aspectRatio={true}
          />
        </div>
      </div>
      <div className={styles.line_wrapper}>
        <div className={styles.line}>
          {wordLine.map((el, index) => (
            <React.Fragment key={index} >
              {el.word}
              <span className={styles.dot} />
            </React.Fragment>
          ))}
        </div>
        <div className={`${styles.line_sub} ${styles.line}`}>
          {wordLine.map((el, index) => (
            <React.Fragment key={index} >
              {el.word}
              <span className={styles.dot} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}