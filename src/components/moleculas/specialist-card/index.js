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

export default function Card({ setPopupOpened, setChosenTime, data }) {
  const { specialisations, proffesional, slug, title } = data
  const fetchData = () => {
    fetch("/api/get-avaible-dates", {
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
        setService(service)
        if (!arr) {
          setDate({ date: null, hours: null })
        } else {
          setDate(arr)
        }
      })
  }

  const [service, setService] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const clickHandler = () => {
    setChosenTime({
      person: data,
      date: date.date,
      service: service,
      time: date.hours[0]
    })
    setPopupOpened(true)
  }

  return (
    <div className={styles.item}>
      <Link href={`/specjalisci/${slug}`} tabIndex={-1} className={styles.link} aria-label={`Sprawdź specjalistę ${title}`} />
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
          ? date?.hours
            ? <p>{days[date.date.day()]}, {date.date.format('D MMMM')} {date.hours[0]}</p>
            : <p>Brak wolnych terminów</p>
          : <p>Pobieramy dane...</p>
        }

      </div>
      <div className={styles.bottom_inform}>
        <div className={styles.flex}>
          <Button disabled={!date?.hours} onClick={() => { clickHandler() }}>Umów wizytę</Button>
          <Button theme="secondary" href={`/specjalisci/${slug}#kalendarz`}>Więcej terminów</Button>
        </div>
      </div>
    </div>
  )
}