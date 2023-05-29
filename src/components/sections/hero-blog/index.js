import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import Slider from "@/components/organisms/blog-slider";

export default function Hero({ data, posts }) {
  const { pageTitle, text } = data

  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <h2 className={styles.sub_title}>Najnowsze artykuły</h2>
      <Slider items={posts} />
    </section>
  )
}