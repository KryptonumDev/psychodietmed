import React from "react"
import styles from "./styles.module.scss"

const getClassNameByIndex = (index) => {
  if (index === 0 || index === 4 || index === 8 || index === 12 || index === 16 || index === 20 || index === 24 || index === 28) {
    return styles['card-1']
  } else if (index === 1 || index === 5 || index === 9 || index === 13 || index === 17 || index === 21 || index === 25 || index === 29) {
    return styles['card-2']
  } else if (index === 2 || index === 6 || index === 10 || index === 14 || index === 18 || index === 22 || index === 26 || index === 30) {
    return styles['card-3']
  } else if (index === 3 || index === 7 || index === 11 || index === 15 || index === 19 || index === 23 || index === 27 || index === 31) {
    return styles['card-4']
  } else {
    return styles['card-1']
  }
}

export default function Card({ index, data: { text } }) {

  return (
    <div className={`${styles.wrapper} ${getClassNameByIndex(index)}`}>
      <p>{text}</p>
    </div>
  )
}