import React from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"

export default function CombinedSpecialisations({ data: { title, combinedCards } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        {combinedCards.map((el, index) => (
          <React.Fragment key={index}>
            <div>
              <div dangerouslySetInnerHTML={{ __html: el.text }} />
              <Image
                aspectRatio={true}
                className={styles.image}
                alt={el.image.altText}
                src={el.image.mediaItemUrl}
                width={el.image.mediaDetails.width}
                height={el.image.mediaDetails.height}
              />
            </div>
            <span className={styles.line} />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}