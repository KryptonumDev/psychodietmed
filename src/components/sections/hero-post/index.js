import React, { useMemo } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Category from "@/components/atoms/category-pill"
import { Hearth } from "../../../assets/hearth"
import { Clock } from "../../../assets/clock"

export default function Hero({ data: { featuredImage, title, categories, dateGmt, readingTime } }) {

  const date = useMemo(() => {
    const loc = new Date(dateGmt)
    return loc.getDate() + ' ' + loc.toLocaleString("pl-PL", { month: "long" }) + ' ' + loc.getFullYear()
  }, [dateGmt])

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div>
          <div className={styles.flex}>
            <div className={styles.categories}>
              {categories.nodes?.map((el) => (
                <Category key={el.id} name={el.name} href={`/blog/${el.slug}`} />
              ))}
            </div>
            <div className={styles.date}>
              {date}
            </div>
          </div>
          <h1>{title}</h1>
        </div>
        <div className={styles.bottom}>
          {/* <div className={styles.info}>
            <Hearth />
            <span>11 osób lubi to</span>
          </div> */}
          <div className={styles.info}>
            <Clock />
            <span>Czas czytania: <b>{readingTime} {Number(readingTime) > 4 ? 'minut' : 'minuty'}</b></span>
          </div>
        </div>
      </div>
      <Image
        loading='eager'
        width={featuredImage.node.mediaDetails.width}
        height={featuredImage.node.mediaDetails.height}
        src={featuredImage.node.mediaItemUrl}
        alt={featuredImage.node.altText}
        className={styles.image}
      />
    </section>
  )
}