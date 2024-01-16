import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";
import Button from "@/components/atoms/button";

export default function Owner({ data: { link, title, text, owner, image, repeater } }) {
  const img = image ? image : owner.proffesional.personImage;
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.flex}>
          <Image
            width={img.mediaDetails.width}
            height={img.mediaDetails.height}
            src={img.mediaItemUrl}
            quality={100}
            alt={img.altText} className={styles.image}
          />
          <div>
            <h3>{owner.title}</h3>
            <p>{owner.proffesional.proffesion}</p>
            <div>
              {repeater.map(el => (
                <div key={el.text} className={styles.item}>
                  <Image
                    width={el.icon.mediaDetails.width}
                    height={el.icon.mediaDetails.height}
                    aspectRatio={true}
                    src={el.icon.mediaItemUrl}
                    alt={el.icon.altText} className={styles.icon}
                  />
                  <span>{el.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        {link?.url && (
          <Button href={link.url}>{link.title}</Button>
        )}
      </div>
    </section>
  )
}