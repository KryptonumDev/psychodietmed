import React, { useMemo } from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import Image from "next/image";
import Link from "next/link";
import { RightArrow } from "../../../assets/right-arrow";

export default function Specialisations({ data: { text, title }, activities }) {
  const sortedActivities = useMemo(() => {
    let arr = [...activities]
    return arr.sort((a, b) => a.obszar_dzialania.specialisationCard.number - b.obszar_dzialania.specialisationCard.number)
  }, [activities])

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div className={styles.grid}>
        {sortedActivities?.map(({ slug, title, obszar_dzialania: { heroKafelek, specialisationCard } }, index) => {

          if (heroKafelek.title) return (
            <Link href={`/wspolpraca/${slug}`} key={index} className={`${styles.item} ${styles.active}`}>
              <div className={styles.itemContent}>
                <Image className={styles.icon} src={specialisationCard.icon.mediaItemUrl} alt={specialisationCard.icon.altText} width={specialisationCard.icon.mediaDetails.width} height={specialisationCard.icon.mediaDetails.height} />
                <div>
                  <h3>{title}</h3>
                  <p>{specialisationCard.zajawkaSpecjalizacji}</p>
                </div>
              </div>
              <RightArrow />
            </Link>
          )

          return (
            <div key={index} className={`${styles.item}`}>
              <div className={styles.itemContent}>
                <Image className={styles.icon} src={specialisationCard.icon.mediaItemUrl} alt={specialisationCard.icon.altText} width={specialisationCard.icon.mediaDetails.width} height={specialisationCard.icon.mediaDetails.height} />
                <div>
                  <h3>{title}</h3>
                  <p>{specialisationCard.zajawkaSpecjalizacji}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}