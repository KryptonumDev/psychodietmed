import React from "react"
import Link from "next/link";
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";
import { RightArrow } from "../../../assets/small-right-arrow";

export default function Card({ data: { proffesional, slug, title } }) {
  return (
    <div className={styles.item}>
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
          {proffesional?.specialisations?.map(({ title }, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom_inform}>
        <div className={styles.flex}>
          <p>Najbliższy termin:</p>
          <p>Wt., 9 Mar 9:30</p>
        </div>
        <div className={styles.flex}>
          <Link className="link" href={`/specjalista/${slug}#shedule`}>Umów wizytę</Link>
          <Link className={styles.link} href={`/specjalista/${slug}`}>Więcej terminów <RightArrow /></Link>
        </div>
      </div>
    </div>
  )
}