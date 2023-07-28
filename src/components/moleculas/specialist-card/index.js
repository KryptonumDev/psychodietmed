'use client'
import React from "react"
import Link from "next/link";
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";
import { RightArrow } from "../../../assets/small-right-arrow";

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
          {specialisations?.nodes.map(({ title }, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
      {!short && (
        <div className={styles.bottom_inform}>
          <div className={styles.flex}>
            <Link className="link" href={`/umow-sie`}>Umów wizytę</Link>
            <Link className={styles.link} href={`/specjalisci/${slug}`}>Więcej terminów <RightArrow /></Link>
          </div>
        </div>
      )}
    </div>
  )
}