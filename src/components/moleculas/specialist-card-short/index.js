'use client'
import React from "react"
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";

export default function Card({ onClick = () => { }, data: { specialisations, proffesional, slug, title } }) {
  return (
    <button onClick={onClick} className={styles.item}>
      <div>
        <Image
          className={styles.image}
          src={proffesional?.personImage?.mediaItemUrl}
          alt={proffesional?.personImage?.altText}
          width={proffesional?.personImage.mediaDetails.width}
          height={proffesional?.personImage.mediaDetails.height}
        />
        <h3>{title}</h3>
        <p>{proffesional?.proffesion}</p>
      </div>
    </button>
  )
}