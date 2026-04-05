import React from "react"
import Link from "next/link"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

export default function Hero({ data: { title, text, link, image, grid } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.info_content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
          <Link className={styles.link + " link"} href={link.url}>
            {link.title}
          </Link>
        </div>
        <div className={styles.imageWrap}>
          <Image quality={90} aspectRatio={true} priority className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <div key={index} className={styles.item}>
            <Image quality={100} className={styles.icon} src={el.icon.mediaItemUrl} alt={el.icon.altText} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} />
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}