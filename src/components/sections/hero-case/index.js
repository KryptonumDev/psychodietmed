import React from "react"
import styles from "./styles.module.scss"
import Flex from "@/components/organisms/case-hero-flex"

export default function Hero({ comment, data: { beforeImage, afterImage, result, title, text, resultTitle, problems } }) {
  return (
    <section className={styles.wrapper}>
      <Flex comment={comment} title={title} text={text} resultTitle={resultTitle} result={result} problems={problems} beforeImage={beforeImage} afterImage={afterImage}/>
    </section>
  )
}