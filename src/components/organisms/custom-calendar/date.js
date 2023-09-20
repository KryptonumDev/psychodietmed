'use client'
import dayjs from "dayjs"
import 'dayjs/locale/pl';
import React, { useMemo, useState } from "react"
import styles from './styles.module.scss'
import { AngleLeft } from "../../../assets/angle-left";
import { AngleRight } from "../../../assets/angle-right";

function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pl-PL', { weekday: 'short' })
  let arr = Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      let word = weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1, 3))
      if (word[word.length - 1] !== '.')
        word = word.concat('.')

      return word
    })
  arr.unshift(arr.pop());
  return arr
}

export const CalendarDate = ({ data, today, setChosenDate, chosenDate }) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().locale('pl').set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    if (!data) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = dayjs(daysInMonthArray[0]).get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, outRange: true }
      }),
      ...daysInMonthArray.map((date) => {
        let current = date.format('YYYY-MM-DD')
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            !data[current] ||
            data[current].length === 0,
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, outRange: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )
    return calendarWeeks
  }, [
    currentDate,
    data
  ])

  return (
    <div className={styles.date}>
      <header>
        <button type='button' onClick={handlePreviousMonth}>
          <AngleLeft />
        </button>
        <p>
          {currentMonth} {currentYear}
        </p>
        <button type='button' onClick={handleNextMonth}>
          <AngleRight />
        </button>
      </header>
      <div>
        <ul className={styles.grid}>
          {shortWeekDays.map((weekDay) => (
            <li className={styles.day} key={weekDay}>{weekDay}</li>
          ))}
        </ul>
        <ul >
          {calendarWeeks.map((week) => (
            <li key={week.week}>
              <ul className={styles.grid}>
                {week.days.map((day) => (
                  <li
                    className={
                      (chosenDate?.format('DD/MM/YYYY') === day.date.format('DD/MM/YYYY') ? styles.active : '')
                      + ' ' +
                      (today.format('DD/MM/YYYY') === day.date.format('DD/MM/YYYY') ? styles.today : '')
                      + ' ' +
                      (day.disabled ? styles.noTimes : '')
                    }
                    key={day.date.format('DD/MM/YYYY')}
                  >
                    <button onClick={() => { setChosenDate(day.date) }} type='button' disabled={day.outRange || day.disabled}>
                      {day.date.format('DD')}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}