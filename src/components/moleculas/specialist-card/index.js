'use client'
import React from "react"
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/button";

export default function Card({ onClick = () => { }, short = false, data: { specialisations, proffesional, slug, title } }) {
  return (
    <div onClick={onClick} className={styles.item}>
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
        <ul>
          {specialisations?.nodes.map(({ title }, index) => {
            if(index > 4) return null
            return <li key={index}>{title}</li>
          })}
        </ul>
      </div>
      {!short && (
        <div className={styles.bottom_inform}>
          <div className={styles.flex}>
            <Button href='/umow-sie'>Umów wizytę</Button>
            <Button theme="secondary" href={`/specjalisci/${slug}`}>Więcej terminów</Button>
          </div>
        </div>
      )}
    </div>
  )
}