import React, { useMemo } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"
import { RightArrow } from "../../../assets/small-right-arrow"

export default function Card({ data }) {
  const date = useMemo(() => {
    const loc = new Date(data.dateGmt)
    return loc.getDate() + ' ' + loc.toLocaleString("pl-PL", { month: "long" }) + ' ' + loc.getFullYear()
  }, [data.dateGmt])

  return (
    <div className={styles.card}>
      <Link className={styles.wrap_link} href={`/blog/artykul/${data.slug}`} />
      <Image
        className={styles.image}
        src={data?.featuredImage?.node.mediaItemUrl}
        alt={data?.featuredImage?.node.altText}
        width={data?.featuredImage?.node.mediaDetails.width}
        height={data?.featuredImage?.node.mediaDetails.height}
      />
      <div className={styles.inform}>
        <div className={styles.flex}>
          <div className={styles.categories}>
            {data.categories.nodes?.map((el, index) => (
              <Link className={styles.category} href={`/blog/kategoria/${el.slug}`} key={index}>
                {el.name}
              </Link>
            ))}
          </div>
          <span className={styles.date}>{date}</span>
        </div>
        <h3 dangerouslySetInnerHTML={{ __html: removeWrap(data.title) }} />
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: data.excerpt }} />
        <div className={styles.button}>
          Czytaj dalej <RightArrow />
        </div>
      </div>
    </div>
  )
}