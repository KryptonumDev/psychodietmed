'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { CalendarDate } from "./date"
import dayjs from "dayjs"
import 'dayjs/locale/pl';
import { CalendarTime } from "./time"
import { CalendarSummary } from "./summary"
import { PopUp } from "./pop-up"
import { AnimatePresence } from "framer-motion"
import Loader from "@/components/sections/loader"

export const CustomCalendar = ({ specialistId, serviceId, specialistData }) => {
  const fetchData = () => {
    fetch("https://psychodietmed-git-develop-kryptonum.vercel.app/api/get-avaible-dates", {
      method: 'POST',
      body: JSON.stringify({
        employeId: specialistId,
        serviceId: serviceId
      })
    })
      .then(response => response.json())
      .then(data => { setService(data.service); setData(data.dates) })
  }

  const [service, setService] = useState()
  const [data, setData] = useState()
  const [today] = useState(dayjs().locale('pl'))
  const [inputValue, setInputValue] = useState(today.format('DD/MM/YYYY'))
  const [chosenDate, setChosenDate] = useState(today)
  const [chosenTime, setChosenTime] = useState(null)
  const [popupOpened, setPopupOpened] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value.length > 0) {
          setChosenDate(dayjs(key).locale('pl'))
          break
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (chosenDate) {
      setInputValue(chosenDate.format('DD/MM/YYYY'))
    }
    if (data) {
      setChosenTime(data[chosenDate.format('YYYY-MM-DD')][0])
    }
  }, [chosenDate])

  return (
    <div className={styles.box}>
      <div className={styles.wrapper}>
        <div className={`${styles.placehodler}`}><Loader show={!data} /></div>
        {data && (
          <>
            <div className={styles.content}>
              <h2>Umów wizytę online</h2>
              <label className={styles.inputWrap}>
                <span className={styles.title}>Wybrana data</span>
                <input
                  value={inputValue}
                  placeholder="26/01/2023  |  Godzina"
                />
                <span className={styles.anotation}>DD/MM/YYYY</span>
                <CalendarIcon />
              </label>
              <CalendarDate
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                today={today}
                data={data}
              />
            </div>
            <CalendarTime
              chosenDate={chosenDate}
              chosenTime={chosenTime}
              setChosenTime={setChosenTime}
              data={data}
            />
            <CalendarSummary
              service={service}
              chosenDate={chosenDate}
              chosenTime={chosenTime}
              setPopupOpened={setPopupOpened}
            />
            <AnimatePresence>
              {popupOpened && (
                <PopUp
                  service={service}
                  chosenDate={chosenDate}
                  chosenTime={chosenTime}
                  specialistData={specialistData}
                  setPopupOpened={setPopupOpened}
                  specialistId={specialistId}
                  serviceId={serviceId}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

const CalendarIcon = () => (
  <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1645_6693)">
      <path d="M29 3.08333H27.5V1.54167C27.5 1.13279 27.342 0.740662 27.0607 0.451544C26.7794 0.162425 26.3978 0 26 0C25.6022 0 25.2206 0.162425 24.9393 0.451544C24.658 0.740662 24.5 1.13279 24.5 1.54167V3.08333H12.5V1.54167C12.5 1.13279 12.342 0.740662 12.0607 0.451544C11.7794 0.162425 11.3978 0 11 0C10.6022 0 10.2206 0.162425 9.93934 0.451544C9.65804 0.740662 9.5 1.13279 9.5 1.54167V3.08333H8C6.01161 3.08578 4.10534 3.89869 2.69933 5.34376C1.29332 6.78882 0.502382 8.74804 0.5 10.7917L0.5 29.2917C0.502382 31.3353 1.29332 33.2945 2.69933 34.7396C4.10534 36.1846 6.01161 36.9976 8 37H29C30.9884 36.9976 32.8947 36.1846 34.3007 34.7396C35.7067 33.2945 36.4976 31.3353 36.5 29.2917V10.7917C36.4976 8.74804 35.7067 6.78882 34.3007 5.34376C32.8947 3.89869 30.9884 3.08578 29 3.08333ZM3.5 10.7917C3.5 9.56504 3.97411 8.38865 4.81802 7.5213C5.66193 6.65394 6.80653 6.16667 8 6.16667H29C30.1935 6.16667 31.3381 6.65394 32.182 7.5213C33.0259 8.38865 33.5 9.56504 33.5 10.7917V12.3333H3.5V10.7917ZM29 33.9167H8C6.80653 33.9167 5.66193 33.4294 4.81802 32.562C3.97411 31.6947 3.5 30.5183 3.5 29.2917V15.4167H33.5V29.2917C33.5 30.5183 33.0259 31.6947 32.182 32.562C31.3381 33.4294 30.1935 33.9167 29 33.9167Z" fill="#DEAFB8" />
      <path d="M18.5 25.4375C19.7426 25.4375 20.75 24.4022 20.75 23.125C20.75 21.8478 19.7426 20.8125 18.5 20.8125C17.2574 20.8125 16.25 21.8478 16.25 23.125C16.25 24.4022 17.2574 25.4375 18.5 25.4375Z" fill="#DEAFB8" />
      <path d="M11 25.4375C12.2426 25.4375 13.25 24.4022 13.25 23.125C13.25 21.8478 12.2426 20.8125 11 20.8125C9.75736 20.8125 8.75 21.8478 8.75 23.125C8.75 24.4022 9.75736 25.4375 11 25.4375Z" fill="#DEAFB8" />
      <path d="M26 25.4375C27.2426 25.4375 28.25 24.4022 28.25 23.125C28.25 21.8478 27.2426 20.8125 26 20.8125C24.7574 20.8125 23.75 21.8478 23.75 23.125C23.75 24.4022 24.7574 25.4375 26 25.4375Z" fill="#DEAFB8" />
    </g>
    <defs>
      <clipPath id="clip0_1645_6693">
        <rect width="36" height="37" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)

// {
//   "2023-08-17": [],
//   "2023-08-18": [],
//   "2023-08-19": [],
//   "2023-08-20": [],
//   "2023-08-21": [
//       "11:00",
//       "12:00",
//       "13:00"
//   ],
//   "2023-08-22": [
//       "11:00",
//       "12:00",
//       "13:00"
//   ],
//   "2023-08-23": [
//       "11:00",
//       "12:00",
//       "13:00"
//   ],
//   "2023-08-24": [
//       "11:00",
//       "12:00",
//       "13:00"
//   ],
//   "2023-08-25": [
//       "11:00",
//       "12:00",
//       "13:00"
//   ],
//   "2023-08-26": []
// }