import React from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { htmlDelete } from "../../../utils/delete-html"
import Form from "@/components/moleculas/contact-form"

export default function Contact({ data: { title, text, image, subjects } }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: htmlDelete(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <Form subjects={subjects}/>
      </div>
      <Image width={image.mediaDetails.width} height={image.mediaDetails.height} src={image.mediaItemUrl} alt={image.altText} className={styles.image} />
    </section>
  )
}