'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'

export default function CalculatorHomaIr() {

  const [insulina, setInsulina] = useState(null)
  const [glukoza, setGlukoza] = useState(null)
  const [homa, setHoma] = useState(null)
  debugger

  useEffect(() => {
    if (insulina !== null && glukoza !== null) {


      setHoma(((glukoza * insulina) / 405).toFixed(2))
    }
  }, [insulina, glukoza, setHoma])

  return (
    <form className={styles.wrapper}>
      <label>
        <span>Insulina na czczo::</span>
        <input placeholder="mU/ml" onChange={(e) => { setInsulina(e.currentTarget.value) }} type="number" name="insulina" />
      </label>
      <label>
        <span>Glukoza na czczo::</span>
        <input placeholder="mg/dl" onChange={(e) => { setGlukoza(e.currentTarget.value) }} type="number" name="glukoza" />
      </label>
      <label>
        <span>Twoje HOMA-IR wynosi:</span>
        <input disabled={true} value={homa} />
      </label>
    </form>
  )
}