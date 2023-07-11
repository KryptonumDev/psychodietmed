import React from "react"
import Link from "next/link"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

export default function Hero({ data: { title, text, link, image, logo, grid, subTitle } }) {
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
          <Image quality={80} aspectRatio={true} loading="eager" className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
          <Image quality={100} className={styles.logo} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
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