import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";

export default function Hero({ data: { image, content, grid } }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className={styles.grid}>
          {grid?.map((item, index) => (
            <div key={index}>
              <Image
                className={styles.icon}
                src={item.icon.mediaItemUrl}
                alt={item.icon.altText}
                width={'28'}
                height={'28'}
                quality={100}
                aspectRatio={true}
                loading="eager"
              />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Image
        className={styles.image}
        src={image.mediaItemUrl}
        alt={image.altText}
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        quality={100}
        aspectRatio={true}
        loading="eager"
      />
    </section>
  )
}