import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import { AngleRightDouble } from "../../../assets/angle-right-double"
import Flex from "@/components/organisms/case-hero-flex"

export default function Hero({ data: { beforeImage, afterImage, result, title, text, resultTitle, problems } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.images}>
        <Image
          width={beforeImage.mediaDetails.width}
          height={beforeImage.mediaDetails.height}
          src={beforeImage.mediaItemUrl}
          alt={beforeImage.altText}
          className={styles.left}
          aspectRatio={true}
        />
        <AngleRightDouble />
        <div className={styles.left_wrap}>
          <Image
            width={afterImage.mediaDetails.width}
            height={afterImage.mediaDetails.height}
            src={afterImage.mediaItemUrl}
            alt={afterImage.altText}
            className={styles.right}
            aspectRatio={true}
          />
          <span className={styles.result}>
            {result}
          </span>
        </div>
      </div>
      <Flex title={title} text={text} resultTitle={resultTitle} result={result} problems={problems} />
    </section>
  )
}