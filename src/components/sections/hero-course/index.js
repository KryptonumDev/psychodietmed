import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"
import { Clock } from "../../../assets/clock"
import { Graduate } from "../../../assets/graduate"

export default function Hero({ accessToCourse, title, image, time, count }) {
  return (
    <section className={styles.wrapper}>
      <Image
        width={image.node.mediaDetails.width}
        height={image.node.mediaDetails.height}
        src={image.node.mediaItemUrl}
        alt={image.node.altText}
        className={styles.image}
        aspectRatio={true}
      />
      <div className={styles.info}>
        <div>
          <h1>Kurs: {title}</h1>
          {accessToCourse ? (
            <Link className="link" href='#'>Rozpocznij lekcję</Link>
          ): (
            <Link className="link" href='#'>Zakup dostęp do kursu</Link>
          )}
        </div>
        <div className={styles.flex}>
          <p><Clock /> Łączny czas: <span>{time}</span></p>
          <p><Graduate /> Liczba lekcji: <span>{count}</span></p>
        </div>
      </div>
    </section>
  )
}