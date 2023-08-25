'use client'
import React, { useEffect, useState } from "react"
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/button";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/pl';

const days = [
  'Pon.',
  'Wt.',
  'Śr.',
  'Czw.',
  'Pt.',
  'Sob.',
  'Niedz.'
]

export default function Card({ data: { specialisations, proffesional, slug, title } }) {

  const fetchData = () => {
    fetch("https://www.psychodietmed.pl/api/get-avaible-dates", {
      method: 'POST',
      body: JSON.stringify({
        employeId: proffesional.specialistId,
        serviceId: proffesional.serviceId
      })
    })
      .then(response => response.json())
      .then(({ service, dates: data }) => {
        let arr = null
        for (const [key, value] of Object.entries(data)) {
          if (value.length > 0) {
            arr = {
              date: dayjs(key).locale('pl'),
              hours: value
            }
            break
          }
        }
        setDate(arr)
      })
  }

  const [date, setDate] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.item}>
      <Link href={`/specjalisci/${slug}`} tabIndex={-1} className={styles.link} />
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
            if (index > 4) return null
            return <li key={index}>{title}</li>
          })}
        </ul>
      </div>
      <div className={styles.flex}>
        <p>Najbliższy termin:</p>
        {date
          ? <p>{days[date.date.day()]}, {date.date.format('D MMMM')} {date.hours[0]}</p>
          : <p>Pobieramy dane...</p>
        }

      </div>
      <div className={styles.bottom_inform}>
        <div className={styles.flex}>
          <Button href={`/specjalisci/${slug}#kalendarz`}>Umów wizytę</Button>
          <Button theme="secondary" href={`/specjalisci/${slug}#kalendarz`}>Więcej terminów</Button>
        </div>
      </div>
    </div>
  )
}