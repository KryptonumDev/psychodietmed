import React from "react";
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";
import { removeWrap } from "../../../utils/title-modification";
import Link from "next/link";

export default function ReviewsHero({ data: { title, text, link, image } }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
          {link && link.url && (
            <Link className={styles.link + " link"} href={link.url}>
              {link.title}
            </Link>
          )}
        </div>
        <div className={styles.imageWrap}>
          <Image
            loading="eager"
            quality={90}
            aspectRatio={true}
            className={styles.image}
            src={image.mediaItemUrl}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />
        </div>
      </div>
    </section>
  );
}
