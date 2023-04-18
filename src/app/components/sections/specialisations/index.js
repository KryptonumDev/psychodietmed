'use client'
import React, { useMemo } from "react"
import styles from './styles.module.scss';
import { removeWrap } from "@/app/helpers/title-modification";
import Image from "next/image";

export default function Specialisations({ data, specialisations }) {
  const { text, title } = data

  const sortedSpecialisations = useMemo(() => {
    return specialisations.sort((a, b) => a.specialisation.specialisationCard.number - b.specialisation.specialisationCard.number)
  }, [])

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {sortedSpecialisations?.map(({ title, specialisation: { specialisationCard } }, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemContent}>
              <Image src={specialisationCard.icon.mediaItemUrl} alt={specialisationCard.icon.altText} width={specialisationCard.icon.mediaDetails.width} height={specialisationCard.icon.mediaDetails.height} />
              <div>
                <h3>{title}</h3>
                <p>{specialisationCard.zajawkaSpecjalizacji}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}