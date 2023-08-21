import React, { useMemo } from "react"
import dayjs from "dayjs"
import styles from './styles.module.scss'

export const CalendarTime = ({ data, setChosenTime, chosenTime, chosenDate }) => {

  const availability = useMemo(() => {
    return data[chosenDate.format('YYYY-MM-DD')]
  }, [data, chosenDate])

  return (
    <div className={styles.time}>
      <header>
        <h3>Wolne terminy</h3>
      </header>
      <div>
        <ul>
          {availability.map(el => (
            <li key={el} className={chosenTime === el ? styles.active : ''}>
              <button
                type='button'
                onClick={() => setChosenTime(el)}
              >
                {el}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}