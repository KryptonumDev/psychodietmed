import React from "react"
import dynamic from "next/dynamic"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";

const Slider = dynamic(() => import("@/components/organisms/blog-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function Hero({ data, posts }) {
  const { pageTitle, text } = data

  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <Slider items={posts} />
    </section>
  )
}