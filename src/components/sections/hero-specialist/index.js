import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { Star } from "../../../assets/star"

export default function Hero({ data: { title, proffesional: { personImage, proffesion, pacientsAge, specialisations } } }) {
  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.image}
        width={personImage.mediaDetails.width}
        height={personImage.mediaDetails.height}
        src={personImage.mediaItemUrl}
        alt={personImage.altText}
        aspectRatio={true}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <p>{proffesion}</p>
        <div className={styles.rating}>
          <p>Średnia ocena:</p>
          <span><Star /> 4.5</span>
        </div>
        <div className={styles.specialisations}>
          <p>Specjalizuję się w:</p>
          <div>
            {specialisations.map(el => (
              <span key={el.title}>
                {el.title}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.age}>
          <p>Komu pomagam:</p>
          <span>{pacientsAge}</span>
        </div>
      </div>
      <button className={`${styles.button} link`}>Umów wizytę online</button>
    </section>
  )
}