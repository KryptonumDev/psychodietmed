import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"

export default function InterviewImage({ data: { qaRepeater, image, imageSide } }) {
  return (
    <section className={`${styles.wrapper} ${imageSide === 'right' ? styles.reverse : ''}`}>
      <div className={styles.repeater}>
        {qaRepeater.map((qa, index) => (
          <div key={index}>
            <h3><span>R:</span>{qa.question}</h3>
            <div className={styles.answer}>
              <span>SP:</span>
              <div dangerouslySetInnerHTML={{ __html: qa.answer }} />
            </div>
          </div>
        ))}
      </div>
      <Image className={styles.image} width={image.mediaDetails.width} height={image.mediaDetails.height} src={image.mediaItemUrl} alt={image.altText} />
    </section>
  )
}