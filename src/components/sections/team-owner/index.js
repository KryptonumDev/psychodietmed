import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";
import { Diplom } from "../../../assets/diplom";

export default function Owner({ data: { title, text, owner, image } }) {
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
            alt={img.altText} className={styles.image}
          />
          <div>
            <h3>{owner.title}</h3>
            <p>{owner.proffesional.proffesion}</p>
            <div>
              {owner.proffesional.diploms.map(el => (
                <div key={el.diplom} className={styles.item}>
                  <Diplom />
                  <span>{el.diplom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
    </section>
  )
}