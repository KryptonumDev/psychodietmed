import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { Image } from "@/components/atoms/image"

export default function Card({ data }) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/akademia/${data.slug}`} />
      <div>
        <Image
          className={styles.image}
          src={data?.featuredImage?.node?.mediaItemUrl}
          alt={data?.featuredImage?.node?.altText}
          width={data?.featuredImage?.node?.mediaDetails.width}
          height={data?.featuredImage?.node?.mediaDetails.height}
          aspectRatio={true}
        />
        <h3>{data.title}</h3>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.course.excerpt }} />
      </div>
      <div className={styles.control}>
        <Link className="link" href={`/akademia/${data.slug}`}>
          Przejdź do kursu
        </Link>
      </div>
    </div>
  )
}