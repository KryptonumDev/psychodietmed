import React, { useMemo } from "react"
import styles from "./styles.module.scss"
import { Hearth } from "../../../assets/hearth"
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"

export default function Hero({ title, excerpt, image, dateGmt }) {

  const date = useMemo(() => {
    const loc = new Date(dateGmt)
    return loc.getDate() + ' ' + loc.toLocaleString("pl-PL", { month: "long" }) + ' ' + loc.getFullYear()
  }, [dateGmt])

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.date}>{date}</div>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: excerpt }} />
        {/* <div className={styles.info}>
          <Hearth />
          <span>11 osób lubi to</span>
        </div> */}
      </div>
      {image && (
        <Image loading='eager' className={styles.image} alt={image.altText} src={image.mediaItemUrl} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      )}
    </section>
  )
}
