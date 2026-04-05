'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import Link from "next/link"
import Calendar from "@/components/atoms/specialist-card-calendar"
import Loader from "@/components/sections/loader"
import { Star } from "../../../assets/star"
import Category from "@/components/atoms/category-pill"

export default function Card({ clickDate, data }) {
  const { slug, title, proffesional, specialisations } = data
  const excerpt = proffesional.courseExcerpt;

  const fetchData = () => {
    fetch("/api/get-avaible-dates", {
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
          <div className={styles.inform}>
            <div>
              <h3>{title}</h3>
              <p>{proffesional?.proffesion}</p>
            </div>
            <div className={styles.rating}>
              <p>Średnia ocena:</p>
              <span><Star /> 5</span>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {specialisations?.nodes.map(({ title }, index) => {
            if(index > 5) return null
            return <Category key={index} name={title}></Category>
          })}
        </div>
        <p>{excerpt}</p>
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
