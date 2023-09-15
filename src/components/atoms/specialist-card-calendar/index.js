import React, { useCallback, useMemo, useState } from "react"
import styles from './styles.module.scss'
import dayjs from "dayjs"
import 'dayjs/locale/pl';
import ArrowLeft from "../ArrowLeft";
import ArrowRight from "../ArrowRight";
import Button from "../button";
import Link from "next/link";
import { AngleRight } from "../../../assets/angle-right";

function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pl-PL', { weekday: 'long' })

  let array = Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1, 3)) + '.'
    })
  const lastItem = array.pop();
  array.unshift(lastItem);

  return array
}

export default function Calendar({ service, clickDate, dates, data }) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().locale('pl').set('date', 1)
  })

  const firstDay = useMemo(() => {
    let arr

    for (let [key, value] of Object.entries(dates)) {
      if (value.length > 0) {
        arr = {
          date: dayjs(key).locale('pl'),
          hours: value
        }
        break
      }
    }

    return arr
  }, [dates])

  const parsedDates = useMemo(() => {
    const arr = []
    const summaryHours = []

    for (let [key, value] of Object.entries(dates)) {
      value.forEach(el => {
        if (!summaryHours.includes(el)) {
          summaryHours.push(el)
        }
      })
    }

    summaryHours.sort((a, b) => {
      const aHour = parseInt(a.split(':')[0])
      const bHour = parseInt(b.split(':')[0])
      const aMinute = parseInt(a.split(':')[1])
      const bMinute = parseInt(b.split(':')[1])

      if (aHour > bHour) return 1

      if (aHour < bHour) return -1

      if (aMinute > bMinute) return 1

      if (aMinute < bMinute) return -1

      return 0
    })

    for (let [key, value] of Object.entries(dates)) {
      arr.push({
        date: dayjs(key).locale('pl'),
        hours: summaryHours.map((hour) => {
          const found = value.find(el => el === hour)
          if (found)
            return {
              hour,
              avaible: true
            }

          return {
            hour,
            avaible: false
          }
        })
      })
    }

    return arr

  }, [dates])

  const [chosenIndexes, setChosenIndexes] = useState([0, 1, 2, 3])

  const nextClick = useCallback(() => {
    if (chosenIndexes.includes(Object.keys(dates).length - 1)) return
    setChosenIndexes(chosenIndexes.map(el => el + 1))
  }, [chosenIndexes, setChosenIndexes, dates])

  const prevClick = useCallback(() => {
    if (chosenIndexes.includes(0)) return

    setChosenIndexes(chosenIndexes.map(el => el - 1))
  }, [chosenIndexes, setChosenIndexes])

  return (
    <>
      <div className={styles.control}>
        <button onClick={prevClick} disabled={chosenIndexes.includes(0)}>
          <ArrowLeft />
        </button>
        <div className={styles.grid}>
          {parsedDates.map(({ date, hours }, index) => {
            if (chosenIndexes.includes(index)) {
              return (
                <div key={index + hours[0] + date.format('DD-MM-YYYY')}>
                  <div className={styles.title}>
                    <strong>{(() => {
                      if (date.format('DD MM YYYY') === dayjs().format('DD MM YYYY'))
                        return 'Dziś'
                      return getWeekDays()[date.day()]
                    })()}</strong>
                    <span>{date.format('DD MMM')}</span>
                  </div>
                  <div className={styles.subgrid}>
                    {hours?.map(({ hour, avaible }) => {
                      if (avaible)
                        return (
                          <button key={hour + avaible} onClick={() => { clickDate(date, hour, data, service) }} className={styles.hour}>
                            {hour}
                          </button>
                        )
                      return <span key={hour + avaible} >-</span>
                    })}
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
        <button onClick={nextClick} disabled={chosenIndexes.includes(Object.keys(dates).length - 1)}>
          <ArrowRight />
        </button>
      </div>
      <Button theme="secondary" href={`/specjalisci/${data.slug}#kalendarz`}>Więcej terminów</Button>
      <div className={styles.mobile}>
        <p>Najbliższy termin: <span>{(() => {
          if (firstDay) {
            let day = firstDay.date.format('DD MM YYYY') === dayjs().format('DD MM YYYY') ? 'Dziś' : getWeekDays()[firstDay.date.day()]
            return `${day} ${firstDay.date.format('DD MMMM')}`
          }
          return 'Brak terminów'
        })()}</span></p>
        {firstDay && (
          <div className={styles.grid}>
            {firstDay?.hours?.map((el, index) => {
              if (index > 1) return null
              return (
                <button key={index} onClick={() => { clickDate(firstDay.date, el, data, service) }} className={styles.hour}>
                  {el}
                </button>
              )
            })}
            <Link className={styles.hour} href={`/specjalisci/${data.slug}#kalendarz`}>
              więcej <AngleRight />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}