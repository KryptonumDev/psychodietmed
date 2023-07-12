import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";
import Link from "next/link";

export default function Prediction({ data: { title, text, illnes, image, grid, cta, link } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <Image aspectRatio={true} className={styles.image} alt={image.altText} src={image.mediaItemUrl} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.content}>
          <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.illnes}>
            {illnes.map((el, index) => (
              <p key={index}>{el.title}</p>
            ))}
          </div>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <div className={styles.item} key={index}>
            <Image aspectRatio={true} className={styles.icon} alt={el.icon.altText} src={el.icon.mediaItemUrl} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} />
            <p>{el.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.cta}>
        <div className={styles.text} dangerouslySetInnerHTML={{__html: cta}}/>
        <Link className="link" href={link.url}>{link.title}</Link>
      </div>
    </section>
  )
}