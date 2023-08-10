import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"

export default function TwoColumnFlexMultiText({ data: { contentFirstPart, contentSecondPart, image } }) {
  return (
    <section className={styles.wrapper}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex itaque, cum fugit consectetur iste quae, dolor expedita impedit doloribus saepe atque delectus maxime molestiae soluta numquam exercitationem enim? Placeat maiores, tempore sit, delectus magni laudantium quaerat rerum aliquid fuga iure repellendus ea. Rem illo ipsam culpa ducimus? Cumque, dignissimos dolor? Ratione aspernatur quasi dignissimos amet illum explicabo rem, cum, autem iure quos quam? Nulla doloribus libero nemo, vitae deserunt beatae possimus ipsam totam necessitatibus assumenda. Esse ducimus autem consectetur tempore assumenda enim repellendus nesciunt voluptates quas necessitatibus, id repellat officiis quos dolorem sed in neque beatae repudiandae tenetur, facilis impedit!</p>
      <div className={styles.textFirst} dangerouslySetInnerHTML={{ __html: contentFirstPart }} />
      <div className={styles.textSecond} dangerouslySetInnerHTML={{ __html: contentSecondPart }} />
      <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
    </section>
  )
}