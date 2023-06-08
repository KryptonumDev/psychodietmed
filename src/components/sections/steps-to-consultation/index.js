import React from "react"
import styles from './styles.module.scss'
import Image from "next/image"
import { removeWrap } from "../../../utils/title-modification"

export default function StepsToConsultation({ data }) {
  const { title, image } = data

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        {/* <div className={styles.sub_grid}>
          {steps.map((step, index) => (
            <details key={index} className={styles.item}>
              <summary className={styles.step_flex}>
                <div className={styles.step_number}>0{index + 1}</div>
                <h3 className={styles.step_title}>{step.title}</h3>
              </summary>
              <div className={styles.step_content} dangerouslySetInnerHTML={{ __html: step.content }} />
            </details>
          ))}
        </div> */}
      </div>
    </section>
  )
}