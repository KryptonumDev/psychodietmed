'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"
import Calendar from "@/components/atoms/specialist-card-calendar"
import Loader from "@/components/sections/loader"
import { AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/button"

const regex = /<[^>]+>([^<]*)<\/[^>]+>/;

export default function Card({ clickDate, data }) {
  const { slug, title, proffesional, specialisations } = data
  const excerpt = proffesional.excerpt.match(regex);

  const fetchData = () => {
    fetch("https://psychodietmed-git-develop-kryptonum.vercel.app/api/get-avaible-dates", {
      method: 'POST',
      body: JSON.stringify({
        employeId: proffesional.specialistId,
        serviceId: proffesional.serviceId
      })
    })
      .then(response => response.json())
      .then(({ service: serviceData, dates: datesData }) => {
        setDates(datesData)
        setService(serviceData)
      })
  }

  const [dates, setDates] = useState(null)
  const [service, setService] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Link href={`/specjalisci/${slug}`}>
        <div className={styles.flex}>
          <Image
            className={styles.image}
            src={proffesional?.personImage?.mediaItemUrl}
            alt={proffesional?.personImage?.altText}
            width={proffesional?.personImage.mediaDetails.width}
            height={proffesional?.personImage.mediaDetails.height}
          />
          <div>
            <h3>{title}</h3>
            <p>{proffesional?.proffesion}</p>
          </div>
        </div>
        <ul>
          {specialisations?.nodes.map(({ title }, index) => {
            return <li key={index}>{title}</li>
          })}
        </ul>
        <p>{excerpt[1]}</p>
      </Link>
      <div className={styles.relative}>
        <Loader show={!dates} className={styles.loader} />
        {dates && (
          <Calendar service={service} data={data} clickDate={clickDate} dates={dates} />
        )}
      </div>
    </div>
  )
}