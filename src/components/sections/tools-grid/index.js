import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function Grid({ data: { repeater } }) {
  return (
    <>
      {repeater.map(({ image, title, description, link, illnes }, index) => (
        <section key={index + title} className={styles.wrapper}>
          <Image quality={100} aspectRatio={true} className={styles.image} width={image.mediaDetails.width} height={image.mediaDetails.height} src={image.mediaItemUrl} alt={image.altText} />
          <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.grid}>
              {illnes.map((el, index) => (
                <div key={index} className={styles.item}>
                  <img src={el.icon.mediaItemUrl} alt={el.icon.altText} />
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: description }} />
            <Link className="link" href={link.url}>{link.title}</Link>
          </div>
        </section>
      ))}
    </>
  )
} 