'use client'
import React, { useMemo } from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import Image from "next/image";

export default function Specialisations({ data, activities }) {
  const { text, title } = data

  const sortedActivities = useMemo(() => {
    return activities.sort((a, b) => a.obszar_dzialania.specialisationCard.number - b.obszar_dzialania.specialisationCard.number)
  }, [activities])

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {sortedActivities?.map(({ title, obszar_dzialania: { specialisationCard } }, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemContent}>
              <Image className={styles.icon} src={specialisationCard.icon.mediaItemUrl} alt={specialisationCard.icon.altText} width={specialisationCard.icon.mediaDetails.width} height={specialisationCard.icon.mediaDetails.height} />
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