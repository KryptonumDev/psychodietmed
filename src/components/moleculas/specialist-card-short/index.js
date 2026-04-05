'use client'
import React, { useEffect, useState } from "react"
import { Image } from "@/components/atoms/image";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import { Clock } from "../../../assets/clock";
import Button from "@/components/atoms/button";

export default function Card({ chosenTime, setChosenTime, data }) {
  const fetchData = () => {
    fetch("/api/get-avaible-dates", {
      method: 'POST',
      body: JSON.stringify({
        employeId: data.proffesional.specialistId,
        serviceId: data.proffesional.serviceId
      })
    })
      .then(response => response.json())
      .then(({ service, dates: data }) => {
        const arr = []
        for (const [key, value] of Object.entries(data)) {
          if (value.length > 0 && arr.length < 2) {
            arr.push({
              date: dayjs(key).locale('pl'),
              hours: value
            })
          } else if (arr.length === 2) {
            break
          }
        }
        setDates(arr)
        setService(service)
        setLoading(false)
      })
  }

  const [dates, setDates] = useState()
  const [loading, setLoading] = useState(false)
  const [service, setService] = useState()

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  return (
    <div className={styles.item}>
      <div>
        <Image
          className={styles.image}
          src={data.proffesional?.personImage?.mediaItemUrl}
          alt={data.proffesional?.personImage?.altText}
          width={data.proffesional?.personImage.mediaDetails.width}
          height={data.proffesional?.personImage.mediaDetails.height}
        />
        <h3>{data.title}</h3>
        <p>{data.proffesional?.proffesion}</p>
      </div>
      <div className={styles.dates}>
        <p className={styles.title}>Najbliższe terminy</p>
        {dates?.length > 0 && (
          <div className={styles.buttons}>
            {dates?.map(el => (
              <button onClick={() => { setChosenTime({ service: service, person: data, date: el.date, time: el.hours[0] }) }} key={el.date} className={(chosenTime?.person.title === data.title && chosenTime?.date === el.date) ? styles.active : ''}>
                <p>{el.date.format('DD MMMM')}</p>
                <p><Clock />{el.hours[0]}</p>
              </button>
            ))}
          </div>
        )}
        {loading && <p>Pobieramy dane...</p>}
        {dates?.length === 0 && <p>Brak wolnych terminów</p>}
        <Button href={`/specjalisci/${data.slug}#kalendarz`} className={styles.button} theme="secondary" >Więcej terminów</Button>
      </div>
    </div>
  )
}