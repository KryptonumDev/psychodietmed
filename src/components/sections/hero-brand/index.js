import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";
import Button from "@/components/atoms/button";

export default function Hero({ data: { logo, text, image, comment } }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <Image className={styles.logo} aspectRatio={true} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
        <h1>{text}</h1>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.blueSquare} />
        <div className={styles.pinkSquare} />
        <Image aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.comment}>
          <div className={styles.avatar}>
            <Image src={comment.avatar.mediaItemUrl} alt={comment.avatar.altText || ''} width={comment.avatar.mediaDetails.width} height={comment.avatar.mediaDetails.height} />
            <p>{comment.name}</p>
          </div>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: comment.content }} />
          <Button theme="secondary" href={comment.link.url}>{comment.link.title}</Button>
        </div>
      </div>
    </section>
  )
}