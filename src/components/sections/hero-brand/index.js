import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";
import Link from "next/link";
import { RightArrow } from "../../../assets/small-right-arrow";

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
            <img src={comment.avatar.mediaItemUrl} alt={comment.avatar.altText} />
            <p>{comment.name}</p>
          </div>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: comment.content }} />
          <Link href={comment.link.url}>{comment.link.title}<RightArrow/></Link>
        </div>
      </div>
    </section>
  )
}