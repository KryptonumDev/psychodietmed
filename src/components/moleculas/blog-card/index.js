import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"
import { RightArrow } from "../../../assets/small-right-arrow"
import Category from "@/components/atoms/category-pill"

export default function Card({ className, data }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <Link className={styles.wrap_link} href={`/blog/${data.slug}`} aria-label={`Przejdź do artykułu '${removeWrap(data.title)}'`} />
      <Image
        className={styles.image}
        src={data?.featuredImage?.node.mediaItemUrl}
        alt={data?.featuredImage?.node.altText}
        width={data?.featuredImage?.node.mediaDetails.width}
        height={data?.featuredImage?.node.mediaDetails.height}
      />
      <div className={styles.categories}>
        {data.categories.nodes?.map((el) => (
          <Category key={el.id} name={el.name} />
        ))}
      </div>
      <h3 dangerouslySetInnerHTML={{ __html: removeWrap(data.title) }} />
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: removeWrap(data.excerpt) }} />
      <div className={styles.button}>
        Czytaj dalej <RightArrow />
      </div>
    </div>
  )
}