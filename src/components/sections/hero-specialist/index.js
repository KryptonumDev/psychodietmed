import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { Star } from "../../../assets/star"
import Link from "next/link"

export default function Hero({ h2, data: { title, specialisations, proffesional: { personImage, proffesion, pacientsAge } } }) {
  return (
    <section className={styles.wrapper}>
      <Image
        loading='eager'
        className={styles.image}
        width={personImage.mediaDetails.width}
        height={personImage.mediaDetails.height}
        src={personImage.mediaItemUrl}
        alt={personImage.altText}
        aspectRatio={true}
      />
      <div className={styles.info}>
        {h2
          ? <h2 className={styles.title}>{title}</h2>
          : <h1 className={styles.title}>{title}</h1>}
        <p>{proffesion}</p>
        <div className={styles.rating}>
          <p>Średnia ocena:</p>
          <span><Star /> 5</span>
        </div>
        <div className={styles.specialisations}>
          <p>Specjalizuję się w:</p>
          <div>
            {specialisations?.nodes?.map(el => (
              <span key={el.title}>
                {el.title}
              </span>
            ))}
          </div>
        </div>
        {!h2 && (
          <div className={styles.age}>
            <p>Komu pomagam:</p>
            <span>{pacientsAge}</span>
          </div>
        )}
      </div>
      {!h2 && (
        <Link href='#kalendarz' className={`${styles.button} link`}>Umów wizytę online</Link>
      )}
    </section>
  )
}