import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";
import Button from "@/components/atoms/button";

export default function Academy({ data: { title, text, grid } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {grid.map((el, index) => (
          <details open={!index} className={styles.item} key={index}>
            <summary className={styles.title}>
              <span>{index + 1}</span>
              <h3>{el.title}</h3>
            </summary>
            <div className={styles.content} >
              <div dangerouslySetInnerHTML={{ __html: el.text }} />
              <Button theme="secondary" href={el.link.url}>{el.link.title}</Button>
              <Image aspectRatio={true} className={styles.image} src={el.image.mediaItemUrl} alt={el.image.altText} width={el.image.mediaDetails.width} height={el.image.mediaDetails.height} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}