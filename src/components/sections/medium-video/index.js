import React from "react"
import styles from "./styles.module.scss"
import { removeWrap } from "../../../utils/title-modification"

export default function Video({ data: { title = 'Zobacz całą rozmowę:', oembed } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title || 'Zobacz całą rozmowę:') }} />
      <iframe title='video' className={styles.video} src={oembed} />
    </section>
  )
}
